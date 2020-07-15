const reviews = require('../src/reviews/reviews-router')
const knex = require('knex')
const app = require('../src/app')

describe('Reviews Endpoint', () => {
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

    const testReviews = [
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

    describe('GET /reviews', () => {
        context('Given there are reviews in the database', () => {
            beforeEach('insert articles', () => {
                return db
                    .into('reviews')
                    .insert(testReviews)
            })

            it('responds with 200 and the specified review by rating', () => {
            const rating = 2
            const expectedReview = testReviews[rating - 1]
                return supertest(reviews)
                    .get(`/reviews?/rating=${rating}`)
                    .expect(200, expectedReview)
            })
        })
    })
  
    describe('GET /reviews/:user_name', () => {
        context('Given there are reviews in the database', () => {
            beforeEach('insert articles', () => {
                return db
                    .into('reviews')
                    .insert(testReviews)
            })
            it('responds with 200 and the specified review by user_name', () => {
                const user_name = 'Lorem'
                const expectedReview = testReviews[user_name]
                    return supertest(reviews)
                        .get(`/reviews?/rating=${user_name}`)
                        .expect(200, expectedReview)
            })
        })
    })
})