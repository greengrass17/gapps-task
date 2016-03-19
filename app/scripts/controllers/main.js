(function () {
  'use strict';

  angular
    .module('gappsTaskApp')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['GoogleSignin', '$http', '$scope'];

  /* @ngInject */
  function MainCtrl(GoogleSignin, $http, $scope) {
    var vm = this;
    vm.signin = signin;
    vm.parseDate = parseDate;
    vm.deleteFile = deleteFile;

    activate();

    ////////////////

    function activate() {}

    function signin() {
      GoogleSignin.signIn().then(function () {
        console.log(GoogleSignin.getBasicProfile());
        gapi.client.load('drive', 'v3', listFiles);
        function listFiles () {

          var request = gapi.client.drive.files.list({
            'pageSize': 20,
            'orderBy': 'quotaBytesUsed desc',
            'fields': 'files(createdTime,viewedByMe,viewedByMeTime,mimeType,ownedByMe,quotaBytesUsed,name,id)'
          });

          request.execute(function(resp) {
            vm.files = resp.files;
            console.log(vm.files);
            $scope.$apply();
          });
        }
      }, function (err) {
        console.log(err);
      });
    }

    function parseDate (time) {
      return new Date(Date.parse(time)).toLocaleDateString();
    }

    function deleteFile (id) {
      console.log(id);
      var delReq = gapi.client.drive.files.delete({
        fileId: id
      });

      delReq.execute(removeInArray)
      //removeInArray();
      function removeInArray() {
        for (var i = 0; i < vm.files.length; i++) {
          if (vm.files[i].id == id) {
            vm.files.splice(i, 1);
            $scope.$apply();
          }
        }
      }
    }
  }
})();
