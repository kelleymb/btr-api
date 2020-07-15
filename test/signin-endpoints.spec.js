const signIn = require('../src/signin/signin-router')

const user = {
  email: 'lorem@lorem.com',
  password: 'thisislorem',
}

describe.only('/signin endpoint', () => {

  context('Given a user signs in', () => {

    it('POST /signin successfully signs in user', (done) => {
      return supertest(signIn)
        .post('/signin')
        .expect(200, 'Login Successful!', done())
    })

    it('logs in a user', (done) => {
      return supertest(signIn)
        .post(`/signin`)
        .send(user)
        .expect(200, res => {
          expect(res.body.email).to.eql(user.email)
          expect(res.body.password).to.eql(user.password)
          expect(res.body).to.have.property('id')
          expect(res.body).to.have.property('user_name')
        }, done())
      })

  // context('Successfully signs in',  () => {
  //   it('POST /signin successfully signs in user', (done) => {
  //     return supertest(signIn)
  //       .post('/signin')
  //       .expect(200, 'Login Successful!', done())
  //   })
  // })
    
  })
})