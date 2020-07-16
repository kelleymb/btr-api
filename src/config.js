module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    API_TOKEN: process.env.API_TOKEN || 'dummy-api-token',
    SESSION_SECRET: process.env.SESSION_SECRET || 'dummyy-session-secret',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://dunder_mifflin@localhost/born-to-read',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://dunder_mifflin@localhost/born-to-read',
    CLIENT_ORIGIN: 'https://btr-client.kelleymb.vercel.app/'
}