const reviews = require('../src/reviews/reviews-router')
const knex = require('knex')
const app = require('../src/app')

describe('Reviews Endpoint', () => {

    const testReviews = [
        {
            title: "The Stranger",
            author: "Albert Camus",
            content: "A quality work! ",
            rating: 4,
        },
        {
            title: "Ruthless",
            author: "Lisa Jackson",
            content: "A quality work! ",
            rating: 4,
        }
    ]

    describe('GET /reviews', () => {
        context('Given there are reviews in the database', () => {
            it('responds with 200 and the specified review by rating', (done) => {
            const rating = 2
            const expectedReview = testReviews[rating - 1]
                return supertest(reviews)
                    .get(`/reviews?/rating=${rating}`)
                    .expect(200, expectedReview, done())
            })
        })
    })
  
    describe('GET /reviews/:user_name', () => {
        context('Given there are reviews in the database', () => {
            it('responds with 200 and the specified review by user_name', (done) => {
                const user_name = 'Lorem'
                const expectedReview = testReviews[user_name]
                    return supertest(reviews)
                        .get(`/reviews?/rating=${user_name}`)
                        .expect(200, expectedReview, done())
            })
        })
    })
})