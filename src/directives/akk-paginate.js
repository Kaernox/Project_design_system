/* 
 * Akkurate v1.0.0 (https://ww.akkurate.io)
 * Copyright 2017-2018 Subvitamine(tm) (https://www.subvitamine.com)
 * Commercial License 
 * @description: directive use to create a pagination
 */

'use strict';
angular.module('akkurate-design-system').directive("akkPaginate", [
    '$rootScope',
    '$window',
    function ($rootScope, $window) {
        return {
            restrict: "A",
            templateUrl: 'templates/akk-paginate.html',
            transclude: true,
            replace: false,
            scope: {
                item: "&",
                itemPerPage: "=",
                eventUpdate: "@"
            },
            pre: function preLink(scope, iElement, iAttrs, controller) {
                scope.view = {
                    displayPage: 9,
                    limits: [10, 20, 50, 100],
                    pagin: {
                        itemPerPage: 10,
                        current: 0
                    }
                };

                scope.methods = {
                    init: function() {
                        if(scope.itemPerPage) {
                            scope.view.pagin.itemPerPage = scope.itemPerPage;
                        }
                    },
                    isFirstPage: function () {
                        return scope.view.pagin.current == 0;
                    },
                    isLastPage: function () {
                        return scope.view.pagin.current
                                >= scope.items().length / scope.view.pagin.itemPerPage - 1;
                    },
                    next: function () {
                        if (!methods.isLastPage()) {
                            scope.view.pagin.current++;
                        }
                    },
                    previous: function () {
                        if (!methods.isFirstPage()) {
                            scope.view.pagin.current--;
                        }
                    },
                    first: function () {
                        scope.view.pagin.current = 0;
                    },
                    last: function () {
                        scope.view.pagin.current = scope.view.pagin.itemPerPage - 1;
                    },
                    numberOfPages: function () {
                        return Math.ceil(scope.items().length / scope.view.pagin.itemPerPage);
                    }
                },
                scope.$watch('view.pageSize', function (newValue, oldValue) {
                    if (newValue != oldValue) {
                        scope.methods.firstPage();
                    }
                });

                scope.$parent.firstPage = function () {
                    scope.methods.firstPage();
                };
                // Function that returns the reduced items list, to use in ng-repeat
                scope.$parent.pageItems = function () {
                    var start = scope.view.pagin.current * scope.view.pagin.itemPerPage;
                    return scope.items().slice(start, start + scope.view.pagin.itemPerPage);
                };
                
                scope.methods.init();
            },
            link: function postLink(scope, element, attrs) {
            }
        };
    }
]);

