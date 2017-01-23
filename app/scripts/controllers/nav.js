(function() {
  'use strict';

  angular
    .module('gappsTaskApp')
    .controller('NavCtrl', NavCtrl);

  NavCtrl.$inject = ['currentUser', 'GoogleSignin', '$state'];

  /* @ngInject */
  function NavCtrl(currentUser, GoogleSignin, $state){
    var vm = this;

    activate();

    ////////////////

    function activate() {
      vm.currentUser = currentUser;
    }

    function signOut() {
      GoogleSignin.signOut().then(function () {
        $state.go('login');
      }).catch(function (err) {
        console.log(err);
      })
    }
  }
})();
