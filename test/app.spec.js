const app = require('../src/app')

describe('App', () => {
  it('GET / responds with 200 containing "Home"', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Home')
  })
})