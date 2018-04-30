/**
 * Akkurate v1.0.0 (https://ww.akkurate.io)
 * Copyright 2017-2018 Subvitamine(tm) (https://www.subvitamine.com)
 * Commercial License 
 * @description: directive who order a list in a table. This one can be reorder and can use chebox for passing somme parameter
 */

'use strict';
angular.module('akkurate-design-system').directive("akkDatagrid", [
    '$rootScope',
    '$filter',
    '$window',
    function ($rootScope, $filter, $window) {
        return {
            restrict: 'E',
            templateUrl: 'templates/akk-datagrid.html',
            transclude: true,
            replace: true,
            scope: {
                caption: "@",
                items: "=",
                columns: "=",
                selected: "=",
                selector: "=",
                options: "=",
                paginate: "=",
                eventClick: "@",
                eventHover: "@",
                eventToggle: "@",
                eventToggleAll: "@"
            },
            link: function postLink(scope, element, attrs) {
                scope.view = {
                    dimension: scope.columns[0],
                    way: 'asc',
                    items: angular.copy(scope.items),
                    paginate: null,
                    limitTo: {
                        limit: 0,
                        start: 0
                    }
                };

                scope.methods = {
                    init: function () {
                        if (scope.paginate && scope.paginate.itemPerPage) {
                            scope.view.paginate = scope.paginate;
                            scope.view.limitTo.limit = scope.paginate.itemPerPage;
                            scope.view.limitTo.start = 0;
                        } else {
                            scope.view.limitTo.limit = scope.view.items.length;
                            scope.view.limitTo.start = 0;
                        }
                    },
                    toggle: function (item) {
                        var index = $filter('getIndexBy')(scope.selected, 'id', item.id);
                        if (index != null) {
                            scope.methods.unselect(item);
                        } else {
                            scope.methods.select(item);
                        }
                        if (scope.selector != null && scope.selector == true && scope.eventToggle != null && scope.eventToggle != '') {
                            $rootScope.$broadcast(scope.eventToggle, item);
                        }
                    },
                    select: function (item) {
                        scope.selected.push(item);
                        item.isChecked = true;
                    },
                    unselect: function (item) {

                        var indexInSelected = $filter('getIndexBy')(scope.selected, 'id', item.id);
                        scope.selected.splice(indexInSelected, 1);

                        var index = $filter('getIndexBy')(scope.view.items, 'id', item.id);
                        scope.view.items[index].isChecked = false;
                    },
                    toggleAll: function () {
                        if (scope.selected.length > 0) {
                            scope.selected = [];
                            angular.forEach(scope.view.items, function (item, key) {
                                item.isChecked = false;
                            });
                        } else {
                            scope.selected = angular.copy(scope.view.items);
                            angular.forEach(scope.view.items, function (item, key) {
                                item.isChecked = true;
                            });
                        }

                        if (scope.selector != null && scope.selector == true && scope.eventToggleAll != null && scope.eventToggleAll != '') {
                            $rootScope.$broadcast(scope.eventToggleAll, item);
                        }
                    },
                    eventClick: function (item) {
                        if (scope.eventClick != null && scope.eventClick != '') {
                            $rootScope.$broadcast(scope.eventClick, item);
                        }
                    },
                    eventHover: function (item) {
                        if (scope.eventHover != null && scope.eventHover != '') {
                            $rootScope.$broadcast(scope.eventHover, item);
                        }
                    },
                    optionClick: function (item, option) {
                        $rootScope.$broadcast(option.event, item);
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

                scope.$on('updatePaginate', function (event, page) {
                    scope.view.limitTo.start = page;
                });


                scope.methods.init();
            }
        };

    }]);


 