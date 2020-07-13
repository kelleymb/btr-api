const ReviewsService = {
    getByRating(knex, rating) {
        return knex
            .select('*')
            .from('reviews')
            .where('rating', rating)
    },
    getByUser(knex, user_name) {
        return knex
            .select('*')
            .from('reviews')
            .where('user_name', user_name) 
            .orderBy('user_name')
            
    }
}

module.exports = ReviewsService