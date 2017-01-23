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
  .module('gappsTaskApp', [
  'google-signin',
  'ui.router',
  'ngMaterial',
  'chart.js'
])

.run(function ($rootScope, $state) {
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    event.preventDefault();
    console.log(error);
    $state.go('login');
  })
})

.config(setConfig);

setConfig.$inject = ['GoogleSigninProvider', '$stateProvider', '$urlRouterProvider', 'ChartJsProvider'];

function setConfig (GoogleSigninProvider, $stateProvider, $urlRouterProvider, ChartJsProvider) {
  var SCOPES = [
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive.metadata',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.appdata',
  ];
  GoogleSigninProvider.init({
    client_id: '735680481775-osl4350j9njmbc6qge6gc4fmb0b2d7am.apps.googleusercontent.com',
    scope: SCOPES.join(' '),
  });

  $urlRouterProvider.otherwise('/main');
  $stateProvider

    .state('login', {
    url: '/login',
    templateUrl: 'views/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'vm'
  })

  .state('nav', {
    url: "",
    abstract: true,
    templateUrl: "views/nav.html",
    controller: 'NavCtrl',
    controllerAs: 'vm',
    resolve: {
      currentUser: function (GoogleSignin, $rootScope, $q) {
        var defer = $q.defer();
        $rootScope.$on('ng-google-signin:currentUser', function (event, user) {
          if (user.isSignedIn()) defer.resolve(user.getBasicProfile())
          else defer.reject('Unauthenticated');
        })
        return defer.promise;
      }
    }
  })

  .state('nav.main', {
    url: "/main",
    templateUrl: "views/main.html",
    controller: 'MainCtrl',
    controllerAs: 'vm'
  })

  ChartJsProvider.setOptions('Doughnut', {
    percentageInnerCutout : 75,
    responsive: true,
    segmentShowStroke : false,
    tooltipCornerRadius: 5,
    colours: ['#25373D', '#3D8EB9', '#63bf89', '#CCCCCC'],
    tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %> GB",
    animationEasing: "easeOutQuart",
    animationSteps: 60,
  })
}
