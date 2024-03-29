require('dotenv').config()

module.exports = {
    "migrationsDirectory": "migrations",
    "driver": "pg",
    "connectionString": (process.env.NODE_ENV === 'test')
        ? process.env.TEST_DATABASE_URL
        : process.env.DATABASE_URL,
        //deploy prep
      //previous ssl setting
      //  ssl: { rejectUnauthorized: false} 
      ssl: process.env.DATABASE_URL ? true : false
}