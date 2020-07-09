const express = require('express')
const xss = require('xss')
const ReviewsService = require('./reviews-service')
const reviewsRouter = express.Router()

const serializeReview = review => ({
    id: review.id,
    title: xss(review.title),
    author: xss(review.author),
    content: xss(review.content),
    rating: review.rating,
    created: review.created
})

reviewsRouter
    .route('/')
    .get((req, res, next) => {
        const { rating } = req.query

        const knexInstance = req.app.get('db')

        console.log(rating)

        const ratingNumber = Number(rating)

        if (!ratingNumber) {
            console.log(typeof ratingNumber)
            return res.status(400).json({ error: { message: `Oops, rating must be a number` }})
        }


        ReviewsService.getByRating(knexInstance, ratingNumber)
            .then(reviews => {
                if (!reviews) {
                    return res.status(404).json({
                        error: { message: `Oops! There are no reviews available for this rating.` }
                    })
                } 
                res
                    .status(200)
                    .json(reviews.map(review => {
                        serializeReview(review)}
                    ))
                    console.log(reviews.map(review => serializeReview(review)))
            })
            .catch(next)
    })

// reviewsRouter
//     .route('/:rating')
//     .get((req, res, next) => {
//         const { rating } = req.params
//         const reqRating = { rating }

//         const knexInstance = req.app.get('db')

//         ReviewsService.getByRating(knexInstance, reqRating)
//             .then(rating => {
//                 if (!rating) {
//                     return res.status(404).json({
//                         error: { message: `Oops! There are no reviews available for this rating.` }
//                     })
//                 } else {
//                     next()
//                 }
//                 res
//                     .status(200)
//                     .json(serializeReview(rating))
//             })
//             .catch(next)
//     })

module.exports = reviewsRouter