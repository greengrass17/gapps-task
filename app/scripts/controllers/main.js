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
      gapi.client.load('drive', 'v3', function () {
        getAboutInfo();
        getFileLists();
      });
    }

    function getAboutInfo () {
      var request = gapi.client.drive.about.get({
        'fields': 'storageQuota'
      });

      request.execute(function (resp) {
        vm.about = resp.storageQuota;
        var limit = +(vm.about.limit);
        var trashed = +(vm.about.usageInDriveTrash);
        var drive = +(vm.about.usageInDrive);
        var usage = +(vm.about.usage);
        trashed = roundTo(vm.about.usageInDriveTrash, 9, 2);
        var otherFolder = roundTo(drive - trashed, 9, 2);
        var otherService = roundTo(usage - drive, 9, 2);
        var free = roundTo(limit - usage, 9, 2);
        vm.limit = roundTo(vm.about.limit, 9, 2);
        vm.data = [trashed, otherFolder, otherService, free];
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
      var intVal = Math.round( +(+(size) + 'e' + (dec - pow)) );
      return +(intVal + 'e' + -dec);
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
