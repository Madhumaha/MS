'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var citiesendpointCtrlStub = {
  index: 'citiesendpointCtrl.index',
  show: 'citiesendpointCtrl.show',
  create: 'citiesendpointCtrl.create',
  update: 'citiesendpointCtrl.update',
  destroy: 'citiesendpointCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var citiesendpointIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './citiesendpoint.controller': citiesendpointCtrlStub
});

describe('Citiesendpoint API Router:', function() {

  it('should return an express router instance', function() {
    expect(citiesendpointIndex).to.equal(routerStub);
  });

  describe('GET /api/citiesendpoints', function() {

    it('should route to citiesendpoint.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'citiesendpointCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/citiesendpoints/:id', function() {

    it('should route to citiesendpoint.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'citiesendpointCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/citiesendpoints', function() {

    it('should route to citiesendpoint.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'citiesendpointCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/citiesendpoints/:id', function() {

    it('should route to citiesendpoint.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'citiesendpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/citiesendpoints/:id', function() {

    it('should route to citiesendpoint.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'citiesendpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/citiesendpoints/:id', function() {

    it('should route to citiesendpoint.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'citiesendpointCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
