/*
 * UI Directive for a datagrid
 */
'use strict';
angular.module('akkurate-design-system').directive("akkDatagrid", function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/akk-datagrid.html',
        transclude: true,
        replace: true,
        scope: {
            legend: "@",
            items: "=",
            columns: "=",
            selected: "=",
            eventClick: "@",
            eventHover: "@"
        },
        link: function postLink(scope, element, attrs) {
            scope.view = {
                dimension: scope.columns[0],
                way: 'asc'
            };

            scope.methods = {
                init: function () {
                },
                select: function (item) {
                    var index = $filter('getIndexBy')(scope.items, 'id', item.id);
                    scope.selected.push(item);
                },
                unselect: function (item) {
                    var index = $filter('getIndexBy')(scope.selected, 'id', item.id);
                    scope.selected.splice(index, 1);
                },
                selectAll: function () {
                    var index = $filter('getIndexBy')(scope.items, 'id', item.id);
                    scope.selected.push(item);
                },
                unselectAll: function () {
                    var index = $filter('getIndexBy')(scope.selected, 'id', item.id);
                    scope.selected.splice(index, 1);
                },
                sortBy: function (dimension, way) {
                    scope.view.dimension = dimension;
                    scope.view.way = way;
                },
                inverseWay: function (dimension) {
                    if (dimension == scope.view.dimension) {
                        if (scope.view.way == 'desc') {
                            return 'asc';
                        } else {
                            return 'desc';
                        }
                    } else {
                        return 'asc';
                    }
                },
                order: function () {
                    var way = scope.view.way == 'desc' ? '-' : '';
                    return way + scope.view.dimension;
                }
            };
        }
    };
});


 