/**
 * the akkAlert is use when you use une alert
 * 
 */

'use strict';
angular.module('akkurate-design-system').directive("akkAlert",
        [
            '$rootScope', '$window',
            function ($rootScope, $window) {
                return {
                    restrict: "E",
                    templateUrl: 'templates/akk-alert.html',
                    transclude: true,
                    replace: true,
                    scope: {
                        title: "@",
                        message: "@",
                        icon: "@",
                        type: "@",
                        event: "@",
                        close: "="
                    },
                    link: function postLink(scope, element, attrs) {
                        
                        scope.view = {
                            display: true
                        };
                        
                        scope.methods = {
                            init: function() {
                                if(scope.title) {
                                    scope.view.title = scope.title;
                                }
                                if(scope.message) {
                                    scope.view.message = scope.message;
                                }
                                if(scope.icon) {
                                    scope.view.icon = scope.icon;
                                }
                                if(scope.type) {
                                    scope.view.type = scope.type;
                                }
                                if(scope.close) {
                                    scope.view.close = scope.close;
                                }
                            },
                            close: function() {
                                scope.view.display = false;

                                if (scope.event != null && scope.event != '') {
                                    $rootScope.$broadcast(scope.event);
                                }
                            }
                        };
                        
                        scope.methods.init();
                    }
                };
            }
        ]);