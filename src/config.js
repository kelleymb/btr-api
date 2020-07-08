module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    API_TOKEN: process.env.API_TOKEN || 'dummy-api-token',
    SESSION_SECRET: process.env.SESSION_SECRET || 'dummyy-session-secret',
    DB_URL: process.env.DB_URL || 'postgresql://dunder_mifflin@localhost/born-to-read',
    TEST_DB_URL: process.env.TEST_DB_URL || 'postgresql://dunder_mifflin@localhost/born-to-read',
    CLIENT_ORIGIN: 'https://btr-client.kelleymb.vercel.app/'
}