'use strict';

/**
 * @ngdoc overview
 * @name gappsTaskApp
 * @description
 * # gappsTaskApp
 *
 * Main module of the application.
 */
angular
  .module('gappsTaskApp', ['google-signin'])

.config(['GoogleSigninProvider', function (GoogleSigninProvider) {
  var SCOPES = [
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive.metadata'
  ];
  GoogleSigninProvider.init({
    client_id: '735680481775-osl4350j9njmbc6qge6gc4fmb0b2d7am.apps.googleusercontent.com',
    scope: SCOPES.join(' '),
  });
}]);
