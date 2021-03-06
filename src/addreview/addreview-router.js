const express = require('express')
const xss = require('xss')
const AddReviewService = require('./addreview-service')

const addReviewRouter = express.Router()
const jsonParser = express.json()

const serializeReview = review => ({
    id: review.id,
    title: xss(review.title),
    author: xss(review.author),
    content: xss(review.content),
    rating: review.rating,
    created: review.created
})

addReviewRouter
    .route('/')
    .post(jsonParser, (req, res, next) => {
        const { title, author, content, rating, user_name } = req.body
        const newReview = { title, author, content, rating, user_name }

        if (!title) {
            return next({ status: 400, message: 'Title is required' })
        }

        if (!author) {
            return next({ status: 400, message: 'Author is required' })
        }

        if (!content) {
            return next({ status: 400, message: 'Content is required' })
        }

        if (!rating) {
            return next({ status: 400, message: 'Rating is required' })
        }

        AddReviewService.insertReview(
            req.app.get('db'),
            newReview
        )
        .then(review => {
            res
                .status(201)
                .json(serializeReview(review))
        })
        .catch(next)

    })

module.exports = addReviewRouter