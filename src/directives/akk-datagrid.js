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
            items: "=",
            columns: "=",
            event: "@"
        },
        link: function postLink(scope, element, attrs) {
            scope.view = {
                dimension: scope.columns[0],
                way: 'asc'
            };

            scope.methods = {
                sortBy: function (dimension, way) {
                    scope.view.dimension = dimension;
                    scope.view.way = way;
                },
                inverseWay: function (dimension) {
                    if(dimension == scope.view.dimension) {
                        if(scope.view.way == 'desc') {
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


 