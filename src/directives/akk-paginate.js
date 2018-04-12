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
            restrict: "E",
            templateUrl: 'templates/akk-paginate.html',
            transclude: true,
            replace: false,
            scope: {
                items: "=",
                itemPerPage: "=",
                size: "@",
                alignment: "@",
                eventUpdate: "@"
            },
            link: function postLink(scope, element, attrs) {
                scope.view = {
                    displayPage: 9,
                    limits: [10, 20, 50, 100],
                    pagin: {
                        itemPerPage: 10,
                        pages: null,
                        current: 0
                    }
                };

                scope.methods = {
                    init: function () {
                        console.log('INIT', scope.items);
                        
                        if (scope.itemPerPage) {
                            console.log('ITEMPERPAGE', scope.itemPerPage);
                            scope.view.pagin.itemPerPage = scope.itemPerPage;
                        }

                        scope.methods.numberOfPages();
                    },
                    numberOfPages: function () {
                        scope.view.pagin.pages = Math.ceil(scope.items.length / scope.view.pagin.itemPerPage);
                        console.log('NUMBEROFPAGES', scope.view.pagin.pages);
                    },
                    isFirstPage: function () {
                        return scope.view.pagin.current == 0;
                    },
                    isLastPage: function () {
                        return scope.view.pagin.current >= scope.view.pagin.pages - 1;
                    },
                    next: function () {
                        if (!scope.methods.isLastPage()) {
                            scope.view.pagin.current++;
                        }
                    },
                    goto: function (page) {
                        scope.view.pagin.current = page;
                    },
                    previous: function () {
                        if (!scope.methods.isFirstPage()) {
                            scope.view.pagin.current--;
                        }
                    },
                    firstPage: function () {
                        scope.view.pagin.current = 0;
                    },
                    lastPage: function () {
                        scope.view.pagin.current = scope.view.pagin.pages - 1;
                    },
                    setSize: function() {
                        return scope.size ? 'pagination-' + scope.size : '';
                    },
                    setAlignement: function() {
                        return scope.alignment ? 'justify-content-' + scope.alignment : '';
                    },
                    setDisplay: function() {
                        return scope.methods.setSize() + ' ' + scope.methods.setAlignement();
                    }
                };
//                scope.$watch('view.pagin.', function (newValue, oldValue) {
//                    if (newValue != oldValue) {
//                        scope.methods.firstPage();
//                    }
//                });

//                scope.$parent.firstPage = function () {
//                    scope.methods.firstPage();
//                };
//                // Function that returns the reduced items list, to use in ng-repeat
//                scope.$parent.pageItems = function () {
//                    var start = scope.view.pagin.current * scope.view.pagin.itemPerPage;
//                    return scope.items.slice(start, start + scope.view.pagin.itemPerPage);
//                };

                scope.methods.init();

//            },
//            link: function postLink(scope, element, attrs) {
            }
        };
    }
]);

