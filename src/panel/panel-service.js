const PanelService =  {
    getReviewsByUser(knex, user_name) {
        return knex
            .select('*')
            .from('reviews')
            .where('user_name', user_name)
            
    }

module.exports = PanelService