'use strict';

var app = require('../..');
import request from 'supertest';

var newCitiesendpoint;

describe('Citiesendpoint API:', function() {

  describe('GET /api/citiesendpoints', function() {
    var citiesendpoints;

    beforeEach(function(done) {
      request(app)
        .get('/api/citiesendpoints')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          citiesendpoints = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(citiesendpoints).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/citiesendpoints', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/citiesendpoints')
        .send({
          name: 'New Citiesendpoint',
          info: 'This is the brand new citiesendpoint!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newCitiesendpoint = res.body;
          done();
        });
    });

    it('should respond with the newly created citiesendpoint', function() {
      expect(newCitiesendpoint.name).to.equal('New Citiesendpoint');
      expect(newCitiesendpoint.info).to.equal('This is the brand new citiesendpoint!!!');
    });

  });

  describe('GET /api/citiesendpoints/:id', function() {
    var citiesendpoint;

    beforeEach(function(done) {
      request(app)
        .get('/api/citiesendpoints/' + newCitiesendpoint._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          citiesendpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      citiesendpoint = {};
    });

    it('should respond with the requested citiesendpoint', function() {
      expect(citiesendpoint.name).to.equal('New Citiesendpoint');
      expect(citiesendpoint.info).to.equal('This is the brand new citiesendpoint!!!');
    });

  });

  describe('PUT /api/citiesendpoints/:id', function() {
    var updatedCitiesendpoint;

    beforeEach(function(done) {
      request(app)
        .put('/api/citiesendpoints/' + newCitiesendpoint._id)
        .send({
          name: 'Updated Citiesendpoint',
          info: 'This is the updated citiesendpoint!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCitiesendpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCitiesendpoint = {};
    });

    it('should respond with the updated citiesendpoint', function() {
      expect(updatedCitiesendpoint.name).to.equal('Updated Citiesendpoint');
      expect(updatedCitiesendpoint.info).to.equal('This is the updated citiesendpoint!!!');
    });

  });

  describe('DELETE /api/citiesendpoints/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/citiesendpoints/' + newCitiesendpoint._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when citiesendpoint does not exist', function(done) {
      request(app)
        .delete('/api/citiesendpoints/' + newCitiesendpoint._id)
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
