'use strict';

var app = require('../..');
import request from 'supertest';

var newRunningmoviesendpoint;

describe('Runningmoviesendpoint API:', function() {

  describe('GET /api/runningmoviesendpoints', function() {
    var runningmoviesendpoints;

    beforeEach(function(done) {
      request(app)
        .get('/api/runningmoviesendpoints')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          runningmoviesendpoints = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(runningmoviesendpoints).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/runningmoviesendpoints', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/runningmoviesendpoints')
        .send({
          name: 'New Runningmoviesendpoint',
          info: 'This is the brand new runningmoviesendpoint!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newRunningmoviesendpoint = res.body;
          done();
        });
    });

    it('should respond with the newly created runningmoviesendpoint', function() {
      expect(newRunningmoviesendpoint.name).to.equal('New Runningmoviesendpoint');
      expect(newRunningmoviesendpoint.info).to.equal('This is the brand new runningmoviesendpoint!!!');
    });

  });

  describe('GET /api/runningmoviesendpoints/:id', function() {
    var runningmoviesendpoint;

    beforeEach(function(done) {
      request(app)
        .get('/api/runningmoviesendpoints/' + newRunningmoviesendpoint._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          runningmoviesendpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      runningmoviesendpoint = {};
    });

    it('should respond with the requested runningmoviesendpoint', function() {
      expect(runningmoviesendpoint.name).to.equal('New Runningmoviesendpoint');
      expect(runningmoviesendpoint.info).to.equal('This is the brand new runningmoviesendpoint!!!');
    });

  });

  describe('PUT /api/runningmoviesendpoints/:id', function() {
    var updatedRunningmoviesendpoint;

    beforeEach(function(done) {
      request(app)
        .put('/api/runningmoviesendpoints/' + newRunningmoviesendpoint._id)
        .send({
          name: 'Updated Runningmoviesendpoint',
          info: 'This is the updated runningmoviesendpoint!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedRunningmoviesendpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedRunningmoviesendpoint = {};
    });

    it('should respond with the updated runningmoviesendpoint', function() {
      expect(updatedRunningmoviesendpoint.name).to.equal('Updated Runningmoviesendpoint');
      expect(updatedRunningmoviesendpoint.info).to.equal('This is the updated runningmoviesendpoint!!!');
    });

  });

  describe('DELETE /api/runningmoviesendpoints/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/runningmoviesendpoints/' + newRunningmoviesendpoint._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when runningmoviesendpoint does not exist', function(done) {
      request(app)
        .delete('/api/runningmoviesendpoints/' + newRunningmoviesendpoint._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
