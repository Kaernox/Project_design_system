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