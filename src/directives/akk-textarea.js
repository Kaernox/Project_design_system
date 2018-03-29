/* 
 * directive qui permet de rentré et passé des grande portion de texte
 */
'use strict';
angular.module('akkurate-design-system').directive('akkTextarea', [
    function () {
        return {
            templateUrl: 'templates/akk-textarea.html',
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: {
                label: "@",
                elementclass: "@",
                size: "@",
                placeholder: "@",
                req: "@",
                model: "=",
                event: "@"
            },
            link: function postLink(scope, element, attrs, ngModel) {
                // Check for validity after the element has lost focus
                // Change display if not valid
                scope.isValid = true;

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

