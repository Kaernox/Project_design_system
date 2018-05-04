/** 
 * Akkurate v1.0.0 (https://ww.akkurate.io)
 * Copyright 2017-2018 Subvitamine(tm) (https://www.subvitamine.com)
 * Commercial License 
 * @description: Directives who manage the infinite scroll of an HTML page
 */

'use strict';
angular.module('akkurate-design-system').directive('akkInfiniteScroll', [
    '$rootScope',
    '$window,',
    function ($rootScope, $window) {
        return {
            restrict: "E",
            templateUrl: 'templates/akk-infinite-scroll.html',
            transclude: true,
            replace: true,
            scope: {
                infiniteScroll: '@',
                container: '='
            },
            link: function postLink(scope, element, attrs) {
                scope.view = {
                    container: null
                };
                scope.methods = {
                    loadMore: function(){
                        var el = element[0] || element;
                        
                        if((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                            scope.$apply (attr.akkInfiniteScroll);
                        }
                        
                    }
                }
            }
        }
    }

]);
