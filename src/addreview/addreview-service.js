const AddReviewService = {
    insertReview(knex, review) {
        return knex
            .insert(review)
            .into('reviews')
            .then(rows => {
                return rows[0]
            })
    },
}

module.exports = AddReviewService