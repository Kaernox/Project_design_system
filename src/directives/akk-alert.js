/*
 * Akkurate v1.0.0 (https://ww.akkurate.io)
 * Copyright 2017-2018 Subvitamine(tm) (https://www.subvitamine.com)
 * Commercial License 
 * @description: directive use to manipulate the behavior of alert it let you choose the type and its content 
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
                        eventUpdate: "@",
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

                                if (scope.eventUpdate != null && scope.eventUpdate != '') {
                                    $rootScope.$broadcast(scope.eventUpdate);
                                }
                            }
                        };
                        
                        scope.methods.init();
                    }
                };
            }
        ]);