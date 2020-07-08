module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    API_TOKEN: process.env.API_TOKEN || 'dummy-api-token',
    DB_URL: process.env.DB_URL || 'postgresql://dunder_mifflin@localhost/born-to-read',
    TEST_DB_URL: process.env.TEST_DB_URL || 'postgresql://dunder_mifflin@localhost/born-to-read',
    CLIENT_ORIGIN: 'https://btr-client.kelleymb.vercel.app/'
}