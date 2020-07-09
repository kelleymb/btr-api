const ReviewsService = {
    getByRating(knex, rating) {
        return knex
            .select('*')
            .from('reviews')
            .where('rating', rating)
    },
}

module.exports = ReviewsService