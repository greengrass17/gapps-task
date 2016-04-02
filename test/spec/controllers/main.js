'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('gappsTaskApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should round 123456 to 12.3', function () {
    expect(MainCtrl.roundTo(123456, 4, 1)).toBe(12.3);
  });
});
