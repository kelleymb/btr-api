const signIn = require('../src/signin/signin-router')

describe('/signin endpoint', () => {

  it('POST /signin successfully signs in user', () => {
    return supertest(signIn)
      .post('/signin')
      .expect(200, 'Login Successful!')
  })

  it('logs in a user', (done) => {
    const user = {
      email: 'lorem@lorem.com',
      password: 'thisislorem',
    }
    return supertest(signIn)
      .post(`/signin`)
      .send(user)
      .expect(200, res => {
        expect(res.body.email).to.eql(user.email)
        expect(res.body.password).to.eql(user.password)
        expect(res.body).to.have.property('id')
        expect(res.body).to.have.property('user_name')
        done()
      })
      .then(res =>
        supertest(signIn)
          .expect(res.body)
      )
  })
})