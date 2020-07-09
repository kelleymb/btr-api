//you need to get rating to be an integer, right now it is a string
//this function does absolutely nothing
function parseRating(rating) {
    console.log(rating)
    return parseInt(rating) || 0
}

const ReviewsService = {
    getByRating(knex, rating) {
        return knex
            .select('*')
            .from('reviews')
            .where('rating', parseRating(rating))
    },
}

module.exports = ReviewsService