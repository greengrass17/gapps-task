(function () {
  'use strict';

  angular
    .module('gappsTaskApp')
    .directive('googleMap', googleMap);

  googleMap.$inject = [];

  /* @ngInject */
  function googleMap() {
    var directive = {
      bindToController: true,
      controller: Controller,
      controllerAs: 'vm',
      link: link,
      restrict: 'E',
      template: '<span></span>',
      transclude: true,
      replace: true,
      scope: {}
    };
    return directive;

    function link(scope, element, attrs, controller, linker) {

      init();

      function init() {
        var scriptTag = document.createElement('script');
        scriptTag.type = 'text/javascript';
        scriptTag.async = true;
        scriptTag.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCSJDV0zNfNwEiz1k2bELKx93M35JAu49w&libraries=places';
        var firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode.insertBefore(scriptTag, firstScript);


        linker(function (elem, mScope) {
          scriptTag.onload = function () {
            if (elem.length) {
              element.append(elem);
            }
            var startPoint = new google.maps.LatLng(60.2072596, 24.6809068)
            var mapElem = document.createElement('span');
            var map = new google.maps.Map(mapElem, {
              center: startPoint,
              zoom: 15
            });
            var request = {
              location: startPoint,
              radius: '5000',
              types: ['museum']
            };

            var service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, callback);
            mapElem.style.cssText = '' +
              'display: inline-block;' +
              'width: 400px;' +
              'height: 400px;';
            element.append(mapElem);

            function callback(results, status) {
              if (status == google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                  var place = results[i];
                  console.log(place);
                }
              }
            }
          }
        })
      }

    }
  }

  Controller.$inject = [];

  /* @ngInject */
  function Controller() {}
})();
