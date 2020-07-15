const knex = require('knex')
const addReview = require('../src/addreview/addreview-router')
const app = require('../src/app')
// const { delete } = require('../src/app')

function makeReviewsArray() {
  return [
    {
      id: 1,
      user_name: "Lorem",
      title: "The Stranger",
      author: "Albert Camus",
      content: "A quality work! ",
      rating: 4,
      created: "2020-07-08T04:51:32.452Z"
    },
    {
      id: 2,
      user_name: "LoremIpsum",
      title: "Ruthless",
      author: "Lisa Jackson",
      content: "A quality work! ",
      rating: 4,
      created: "2020-04-08T04:51:32.452Z"
    }
  ]
}

const testReviews = makeReviewsArray() 

describe('Add Review Endpoint', () => {
  let db

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())
  before('cleanup', () => db('reviews').truncate())
  afterEach('cleanup', () => db('reviews').truncate())

    describe('POST /add', () => {
      context('Given a field is missing', () => {
        ['title', 'author', 'content', 'rating'].forEach(field =>{
          const newReview = {
            title: 'test-title',
            author: 'test-author',
            content: 'test-content',
            rating: 3,
          }

          it(`responds with 400 missing '${field}' if not supplied`, () => {
            delete newReview[field]

            return supertest(addReview)
              .post('/add')
              .send(newReview)
              .expect(400, {
                error: { message: `${field} is required` }
          })
        })
      })
      
      context('Give rating is not in range of 1-5', () => {
        it(`responds with 400 invalid 'rating' if not between 1 and 5`, () => {
          const newReviewInvalidRating = {
            title: 'test-title',
            author: 'test-author',
            content: 'test-content',
            rating: 'invalid',
          }
          return supertest(addReview)
            .post(`/add`)
            .send(newReviewInvalidRating)
            .expect(400, {
              error: { message: `'rating' must be a number between 1 and 5` }
            })
        })
      })
    
      context('Given a new review is added', () => {
        it('adds a new review', () => {
          const newReview = {
            title: 'test-title',
            author: 'test-author',
            content: 'test-content',
            rating: 3,
          }
            return supertest(addReview)
              .post(`/add`)
              .send(newReview)
              .expect(201)
              .expect(res => {
                expect(res.body.title).to.eql(newReview.title)
                expect(res.body.author).to.eql(newReview.author)
                expect(res.body.content).to.eql(newReview.content)
                expect(res.body.rating).to.eql(newReview.rating)
                expect(res.body).to.have.property('id')
                expect(res.body).to.have.property('user_name')
              })
                .then(res =>
                  supertest(addReview)
                    .expect(res.body)
                )
        })
      })

      context('Given an XSS attack review', () => {
        it('removes XSS attack content from response', () => {
          const { maliciousReview, expectedReview } = testReviews
          return supertest(addReview)
            .post(`/add`)
            .send(maliciousReview)
            .expect(201)
            .expect(res => {
              expect(res.body.title).to.eql(expectedReview.title)
              expect(res.body.author).to.eql(expectedReview.author)
              expect(res.body.content).to.eql(expectedReview.content)
            })
        })
      })
    
      context('Given a review is posted successfully', () => {
        it('responds with 200 containing "Review added successfully posted!"',  () => {
        return supertest(addReview)
          .post('/add')
          .expect(201, 'Review added successfully posted!')
        })
      })

    })
  })
})