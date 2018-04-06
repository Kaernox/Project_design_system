/**
 * directive use to manipulate the behavior of alert
 * it let you choose the type and its content
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
                        event: "@",
                        type: "@",
                        isDisplayed: "=",
                        isClosable: "="
                    },
                    link: function postLink(scope, element, attrs) {
                        
                        scope.view = {
                        };
                        
                        scope.methods = {
                            init: function() {
//                                scope.isDisplayed = true;
                            },
                            close: function() {
                                scope.isDisplayed = false;
                                console.log('close', scope.isDisplayed);

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