const signUp = require('../src/signup/signup-router')

describe('/signup endpoint', () => {
  context('Given a user signs up', () => {
    it('POST /signup successfully signs up user', (done) => {
    return supertest(signUp)
      .post('/signup')
      .expect(201, 'User account created!', done())
    })

    it('signs up a user', (done) => {
      const user = {
          user_name: 'Lorem',
          email: 'lorem@lorem.com',
          password: 'thisislorem',
      }
      return supertest(signUp)
        .post(`/signup`)
        .send(user)
        .expect(201)
        .expect(res => {
          expect(res.body.user_name).to.eql(user.user_name)
          expect(res.body.email).to.eql(user.email)
          expect(res.body.password).to.eql(user.password)
          expect(res.body).to.have.property('id')
          expect(res.body).to.have.property('created')
        }, done())
    })
  })
  
})