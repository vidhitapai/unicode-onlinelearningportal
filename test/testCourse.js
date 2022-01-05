// Importing modules
const chai = require('chai');
const chaihttp = require('chai-http');
const { user, course, dbReq } = require('./fixtures/db.js');
const app = require('../app.js');

// Requiring should style of chai js
const should = require('chai').should();

chai.use(chaihttp);

beforeEach(dbReq);

describe('Create Course', () => {
    it('should create a new course', (done) => {
      let courseOne = {
        name: 'Learning Hindi',
        instructor: user._id,
        rating: 4,
        courseType: 'Language'
      };
      let utokens = user.tokens;
      chai
        .request(app)
        .post('/courses/createcourse')
        .send(courseOne)
        .set('Authorization', `Bearer ${utokens[0].token}`)
        .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('data');
            done();
         });
    });
});

describe('Course Update', () => {
    it('should update course details', (done) => {
      let utokens = user.tokens;
        chai
            .request(app)
            .put(`/courses/updatecourse/${course._id}`)
            .set('Authorization', `Bearer ${utokens[0].token}`)
            .send({
                courseType: "Technology"
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

describe('Course Delete', () => {
    it('should delete current course', (done) => {
        let utokens = user.tokens;
        chai
            .request(app)
            .delete(`/courses/deletecourse/${course._id}`)
            .set('Authorization', `Bearer ${utokens[0].token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message')
                done();
            })
    })
})

describe('Upload document', () => {
    it('should upload documents', (done) => {
      let utokens = user.tokens;
      chai
        .request(app)
        .post('/courses/course-upload-file')
        .set('Authorization', `Bearer ${utokens[0].token}`)
        .attach('file', ('C:/Users/optimus/Desktop/abc.pdf'))
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message');
          done();
        })
    })
  })

  describe('Upload video', () => {
    it('should upload videos', (done) => {
      let utokens = user.tokens;
      chai
        .request(app)
        .post('/courses/course-upload-video')
        .set('Authorization', `Bearer ${utokens[0].token}`)
        .attach('video', ('C:/Users/optimus/Desktop/xyz.mp4'))
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message');
          done();
        })
    })
  })