/*
 * directive use to choose an option from a list.
 * it manage the behavior of the modal who display the list
 * 
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
                eventUpdate: "@",
                defaultDisplayEnabled: "@",
                defaultDisplay: "@"
            },
            link: function postLink(scope, element, attrs, ngModel) {
                // Check for validity after the element has lost focus
                // Change display if not valid
                scope.view = {
                    isValid: true
                };
                scope.model = scope.model || scope.options[0];
                scope.defaultEnabled = (scope.defaultDisplayEnabled != null && scope.defaultDisplay != null) ? true : false;

                scope.methods = {
                    checkValidity: function () {
                        scope.view.isValid = element[0].children[1].validity.valid;
                    },
                    change: function () {
                        if (scope.eventUpdate != null && scope.eventUpdate != '') {
                            $rootScope.$broadcast(scope.eventUpdate);
                        }
                    }
                };
            }
        };
    }
]);
