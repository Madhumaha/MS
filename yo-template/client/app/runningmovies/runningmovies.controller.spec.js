'use strict';

describe('Component: RunningmoviesComponent', function () {

  // load the controller's module
  beforeEach(module('yoTemplateApp'));

  var RunningmoviesComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    RunningmoviesComponent = $componentController('runningmovies', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
