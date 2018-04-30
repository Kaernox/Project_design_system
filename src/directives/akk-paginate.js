/**
 * Akkurate v1.0.0 (https://ww.akkurate.io)
 * Copyright 2017-2018 Subvitamine(tm) (https://www.subvitamine.com)
 * Commercial License 
 * @description: directive use to create a pagination
 */

'use strict';
angular.module('akkurate-design-system').directive("akkPaginate", [
    '$rootScope',
    function ($rootScope) {
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

                        if (scope.itemPerPage) {
                            scope.view.pagin.itemPerPage = scope.itemPerPage;
                        }

                        scope.methods.numberOfPages();
                    },
                    numberOfPages: function () {
                        scope.view.pagin.pages = Math.ceil(scope.items.length / scope.view.pagin.itemPerPage);
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
                            scope.methods.update();
                        }
                    },
                    goto: function (page) {
                        scope.view.pagin.current = page;
                        scope.methods.update();
                    },
                    previous: function () {
                        if (!scope.methods.isFirstPage()) {
                            scope.view.pagin.current--;
                            scope.methods.update();
                        }
                    },
                    firstPage: function () {
                        scope.view.pagin.current = 0;
                        scope.methods.update();
                    },
                    lastPage: function () {
                        scope.view.pagin.current = scope.view.pagin.pages - 1;
                        scope.methods.update();
                    },
                    setSize: function () {
                        return scope.size ? 'pagination-' + scope.size : '';
                    },
                    setAlignement: function () {
                        return scope.alignment ? 'justify-content-' + scope.alignment : '';
                    },
                    setDisplay: function () {
                        return scope.methods.setSize() + ' ' + scope.methods.setAlignement();
                    },
                    update: function () {
                        if (scope.eventUpdate != null && scope.eventUpdate != '') {
                            $rootScope.$broadcast(scope.eventUpdate, scope.view.pagin.current * scope.view.pagin.itemPerPage);
                        }
                    }
                };

                scope.methods.init();
            }
        };
    }
]);

