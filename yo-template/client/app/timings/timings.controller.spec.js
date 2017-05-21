'use strict';

describe('Component: TimingsComponent', function () {

  // load the controller's module
  beforeEach(module('yoTemplateApp'));

  var TimingsComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    TimingsComponent = $componentController('timings', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
