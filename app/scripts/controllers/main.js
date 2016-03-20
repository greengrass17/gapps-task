(function () {
  'use strict';

  angular
    .module('gappsTaskApp')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['GoogleSignin', '$http', '$scope', '$rootScope'];

  /* @ngInject */
  function MainCtrl(GoogleSignin, $http, $scope, $rootScope) {
    var vm = this;
    vm.roundTo = roundTo;
    vm.parseDate = parseDate;
    vm.deleteFile = deleteFile;

    activate();

    ////////////////

    function activate() {
      //$scope.$on('ng-google-signin:isSignedIn', getFileLists);
      //getFileLists();
      $rootScope.$watch('currentUser', function (newVal, oldVal) {
        if (newVal !== undefined) {
          gapi.client.load('drive', 'v3', function () {
            getAboutInfo();
            getFileLists();
          });
        }
      })
    }

    function getAboutInfo () {
      var request = gapi.client.drive.about.get({
        'fields': 'storageQuota'
      });

      request.execute(function (resp) {
        vm.about = resp.storageQuota;
        vm.limit = roundTo(vm.about.limit, 9, 2);
        var trashed = roundTo(vm.about.usageInDriveTrash, 9, 2);
        var drive = roundTo(vm.about.usageInDrive, 9, 2);
        var usage = roundTo(vm.about.usage, 9, 2);
        vm.data = [trashed, drive - trashed, usage - drive, vm.limit - usage];
        vm.labels = ['Trash', 'Other drive folders', 'Other services', 'Free'];
        $scope.$apply();
      })
    }

    function getFileLists() {

      var request = gapi.client.drive.files.list({
        'pageSize': 20,
        'orderBy': 'quotaBytesUsed desc,viewedByMeTime desc',
        'fields': 'files(createdTime,trashed,viewedByMeTime,mimeType,ownedByMe,quotaBytesUsed,name,id)'
      });

      request.execute(function (resp) {
        vm.files = resp.files;
        console.log(vm.files);
        $scope.$apply();
      });
    }

    function roundTo(size, pow, dec) {
      var intVal = Math.round(parseInt(size) * Math.pow(10, dec) / Math.pow(10, pow));
      return intVal / Math.pow(10, dec);
    }

    function parseDate(time) {
      if (!time) {
        return '--';
      }
      return new Date(Date.parse(time)).toLocaleDateString();
    }

    function deleteFile(id) {
      console.log(id);
      var delReq = gapi.client.drive.files.delete({
        fileId: id
      });

      delReq.execute(removeInArray);
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
