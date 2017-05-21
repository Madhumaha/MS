'use strict';

describe('Component: BookingseatsComponent', function () {

  // load the controller's module
  beforeEach(module('yoTemplateApp'));

  var BookingseatsComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    BookingseatsComponent = $componentController('bookingseats', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
