const signOut = require('../src/signout/signout-router')

describe('/signout endpoint', () => {
  it('DELETE /signout successfully signs out a user', (done) => {
    return supertest(signOut)
      .delete('/signout')
      .expect(204, 'User has signed out!', done())
  })
})