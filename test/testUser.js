// Importing modules
const chai = require('chai');
const chaihttp = require('chai-http');
const { user, course, dbReq } = require('./fixtures/db.js');
const app = require('../app.js');

// Requiring should style of chai js
const should = require('chai').should();

chai.use(chaihttp);

beforeEach(dbReq);

describe('Create User', () => {
    it('should create a new user', (done) => {
      let userOne = {
        name: 'Julie Doe',
        email: 'doejulie@gmail.com',
        password: 'iamdoejulie',
        userType: 'INSTRUCTOR',
      };
      chai
        .request(app)
        .post('/users/createuser')
        .send(userOne)
        .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('data');
            done();
         });
    });
});


describe('User Login', () => {
    it('should log the user in', (done) => {
      chai
        .request(app)
        .post('/users/login')
        .send({
          email: user.email,
          password: user.password,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

describe('User Logout', () => {
    it('should log the user out', (done) => {
      let utokens = user.tokens;
      chai
        .request(app)
        .post('/users/logout')
        .set('Authorization', `Bearer ${utokens[0].token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          done();
        });
    });
  });

describe('User Logout All', () => {
    it('should log the user out of all the devices', (done) => {
      let utokens = user.tokens;
      chai
        .request(app)
        .post('/users/logout')
        .set('Authorization', `Bearer ${utokens[0].token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          done();
        });
    });
  });
  
describe('User Update', () => {
    it('should update user details', (done) => {
      let utokens = user.tokens;
        chai
            .request(app)
            .put('/users/update/self')
            .set('Authorization', `Bearer ${utokens[0].token}`)
            .send({
                name: "Johnnie Doe"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
                done();
            })
    })
})

describe('User Delete', () => {
    it('should delete current user', (done) => {
        let utokens = user.tokens;
        chai
            .request(app)
            .delete('/users/delete/self')
            .set('Authorization', `Bearer ${utokens[0].token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message')
                done();
            })
    })
})

describe('Upload profile picture', () => {
  it('should upload profile picture', (done) => {
    let utokens = user.tokens;
    chai
      .request(app)
      .post('/users/profilePicture')
      .set('Authorization', `Bearer ${utokens[0].token}`)
      .attach('profilePicture', ('C:/Users/optimus/Desktop/pfp.jpg'))
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('success').eql(true);
        res.body.should.have.property('message');
        done();
      })
  })
})

describe('View user', () => {
  it('should display user details', (done) => {
    let utokens = user.tokens;
    chai
      .request(app)
      .get('/users/view/self')
      .set('Authorization', `Bearer ${utokens[0].token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message');
        res.body.should.be.a('object');
        done();
      })
  })
})