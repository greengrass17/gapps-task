(function () {
  'use strict';

  angular
    .module('gappsTaskApp')
    .directive('percentChart', percentChart);

  percentChart.$inject = [];

  /* @ngInject */
  function percentChart() {
    var directive = {
      link: link,
      restrict: 'E',
      template: '' +
        '<div class="summary">' +
        '<div class="summary__title">{{title}}</div>' +
        '<div class="summary__total">{{total}}</div>' +
        '</div>' +
        '<canvas id="doughnut" class="chart chart-doughnut"' +
        'chart-data="data" chart-labels="labels">' +
        '</canvas>',
      scope: {
        total: '@',
        data: '=',
        labels: '=',
        title: '@'
      }
    };
    return directive;

    function link(scope, element, attrs, controller) {
      scope.data = [];
      scope.total = 0;
      scope.labels = [];
    }
  }

  Controller.$inject = [];

  /* @ngInject */
  function Controller() {}
})();
