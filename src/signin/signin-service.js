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
    }
}


module.exports = SignInService