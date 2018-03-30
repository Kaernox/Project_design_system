/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


'use strict';
angular.module('akkurate-design-system').directive('akkRadio', [
    function () {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            templateUrl: 'templates/akk-radio.html',
            scope: {
                label: "@",
                elementclass: "@",
                req: "@",
                name: "@",
                model: "=",
                options: "=",
                property: "@",
                event: "@"
            },
            link: function postLink(scope, element, attrs) {
                scope.view = {
                    isValid: false
                }
                
                scope.methods = {
                    init: function() {
                        scope.methods.checkValidity();
                    },
                    select: function(option) {
                        scope.model = option[scope.property];
                        scope.methods.checkValidity();
                    },
                    checkValidity : function() {
                        if(scope.req) {
                            if(scope.model != null) {
                                scope.view.isValid = true;
                            } else {
                                scope.view.isValid = false;
                            }
                        } else {
                            scope.view.isValid = true;
                        }
                    }
                }
                
                scope.methods.init();
            }
        };
    }
]);