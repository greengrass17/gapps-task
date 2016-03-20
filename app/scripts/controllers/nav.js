(function() {
  'use strict';

  angular
    .module('gappsTaskApp')
    .controller('NavCtrl', NavCtrl);

  NavCtrl.$inject = ['$rootScope'];

  /* @ngInject */
  function NavCtrl($rootScope){
    var vm = this;

    activate();

    ////////////////

    function activate() {
      $rootScope.$watch('currentUser', function (newVal, oldVal) {
        if (newVal !== undefined) {
          vm.currentUser = newVal;
        }
      })
    }
  }
})();
