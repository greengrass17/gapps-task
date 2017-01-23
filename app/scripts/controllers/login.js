(function() {
  'use strict';

  angular
    .module('gappsTaskApp')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['GoogleSignin', '$state'];

  /* @ngInject */
  function LoginCtrl(GoogleSignin, $state){
    var vm = this;
    vm.signin = signin;

    ////////////////

    function signin() {
      GoogleSignin.signIn().then(function () {
        $state.go('nav.main');
      }).catch(function (err) {
        console.log(err);
      });
    }
  }
})();
