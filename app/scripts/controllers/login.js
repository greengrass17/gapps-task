(function() {
  'use strict';

  angular
    .module('gappsTaskApp')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['GoogleSignin', '$state', '$rootScope'];

  /* @ngInject */
  function LoginCtrl(GoogleSignin, $state, $rootScope){
    var vm = this;
    vm.signin = signin;

    ////////////////

    function signin() {
      GoogleSignin.signIn().then(function () {
        $rootScope.currentUser = GoogleSignin.getBasicProfile();
        $state.go('nav.main');
      }, function (err) {
        console.log(err);
      });
    }
  }
})();
