/* 
 * directive qui permet de rentré du text dans uen zone limité
 */


'use strict';
angular.module('akkurate-design-system').directive('akkInput', [
    function () {
        return {
            templateUrl: 'templates/akk-input.html',
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: {
                label: "@",
                elementclass: "@",
                type: "@",
                step: "@",
                placeholder: "@",
                req: "@",
                hasError: "=",
                model: "=",
                event: "@"
            },
            link: function postLink(scope, element, attrs, ngModel) {
                // Watch the 'hasError' attribute 
                scope.$watch('hasError', function () {
                    scope.isValid = (scope.hasError == null || scope.hasError != true);
                });

                // Check for validity after the element has lost focus
                scope.checkValidity = function () {
                    scope.isValid = element[0].children[1].validity.valid;
                };
                if (scope.event != null && scope.event != '') {
                    $rootScope.$broadcast(scope.event, scope.model);
                };
            }
        };
    }
]);