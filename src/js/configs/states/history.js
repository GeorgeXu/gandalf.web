'use strict';

angular.module('app').config(function ($stateProvider) {

  $stateProvider.state('history', {
    parent: 'private',
    url: '/history',
    template: '<ui-view />',
    abstract: 'history-list',
    ncyBreadcrumb: {
      skip: true
    }
  });

  $stateProvider.state('history-list', {
    parent: 'history',
    url: '?tableId?size?page',
    params: {
      size: '25'
    },
    controller: 'HistoryListController',
    templateUrl: 'templates/history-list.html',
    ncyBreadcrumb: {
      label: 'History'
    },
    resolve: {
      selectedTable: ['DecisionTable', '$stateParams', function (DecisionTable, $stateParams) {
        return $stateParams.tableId ? DecisionTable.byId($stateParams.tableId) : null;
      }]
    }
  }).state('history-details', {
    parent: 'history',
    url: '/:id',
    controller: 'HistoryDetailsController',
    templateUrl: 'templates/history-details.html',
    ncyBreadcrumb: {
      label: 'Decision: {{table.id}}',
      parent: 'history-list'
    },
    resolve: {
      historyResult: ['DecisionHistoryTable', '$stateParams', function (DecisionHistoryTable, $stateParams) {
        var res = new DecisionHistoryTable($stateParams.id);
        return res.fetch();
      }]
    }
  });


});