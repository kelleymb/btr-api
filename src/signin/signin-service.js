const SignInService = {
    getByUserEmail(knex, email) {
        return knex
            .from('users')
            .select('*')
            .where('email', email)
            .first()
    },
    getByUserId(knex, id) {
        return knex
            .from('users')
            .select('*')
            .where('id', id)
            .first()
    },
    getUserNameByEmail(knex, email, user_name) {
        return knex
            .from('users')
            .select(user_name)
            .where('email', email)
            .first()
    }
}


module.exports = SignInService