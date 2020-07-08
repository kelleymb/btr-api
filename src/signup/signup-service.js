const SignUpService = {
    insertUser(knex, user) {
        return knex
            .insert(user)
            .into('users')
            .then(rows => {
                return rows[0]
            })
    }
        
}

module.exports = SignUpService