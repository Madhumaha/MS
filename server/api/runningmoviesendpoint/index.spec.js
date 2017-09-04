'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var runningmoviesendpointCtrlStub = {
  index: 'runningmoviesendpointCtrl.index',
  show: 'runningmoviesendpointCtrl.show',
  create: 'runningmoviesendpointCtrl.create',
  update: 'runningmoviesendpointCtrl.update',
  destroy: 'runningmoviesendpointCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var runningmoviesendpointIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './runningmoviesendpoint.controller': runningmoviesendpointCtrlStub
});

describe('Runningmoviesendpoint API Router:', function() {

  it('should return an express router instance', function() {
    expect(runningmoviesendpointIndex).to.equal(routerStub);
  });

  describe('GET /api/runningmoviesendpoints', function() {

    it('should route to runningmoviesendpoint.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'runningmoviesendpointCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/runningmoviesendpoints/:id', function() {

    it('should route to runningmoviesendpoint.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'runningmoviesendpointCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/runningmoviesendpoints', function() {

    it('should route to runningmoviesendpoint.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'runningmoviesendpointCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/runningmoviesendpoints/:id', function() {

    it('should route to runningmoviesendpoint.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'runningmoviesendpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/runningmoviesendpoints/:id', function() {

    it('should route to runningmoviesendpoint.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'runningmoviesendpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/runningmoviesendpoints/:id', function() {

    it('should route to runningmoviesendpoint.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'runningmoviesendpointCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
