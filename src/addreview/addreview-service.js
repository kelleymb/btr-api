const AddReviewService = {
    insertReview(knex, review) {
        return knex
            .insert(review)
            .into('reviews')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
}

module.exports = AddReviewService