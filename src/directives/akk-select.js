/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


'use strict';
angular.module('akkurate-design-system').directive('akkSelect', [
    '$rootScope',
    function ($rootScope) {
        return {
            templateUrl: 'templates/akk-select.html',
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: {
                label: "@",
                elementclass: "@",
                req: "@",
                model: "=",
                options: "=",
                value: "@",
                display: "@",
                event: "@",
                defaultDisplayEnabled: "@",
                defaultDisplay: "@"
            },
            link: function postLink(scope, element, attrs, ngModel) {
                // Check for validity after the element has lost focus
                // Change display if not valid
                scope.isValid = true;

                scope.defaultEnabled = (scope.defaultDisplayEnabled != null && scope.defaultDisplay != null) ? true : false;

                scope.methods = {
                    checkValidity: function () {
                        scope.isValid = element[0].children[1].validity.valid;
                    },
                    change: function () {
                        if (scope.event != null && scope.event != '') {
                            $rootScope.$broadcast(scope.event);
                        }
                    }
                };
            }
        };
    }
]);