/* 
 * directive use to manage the behavior of a checkbox
 * 
 * 
 */

'use strict';
angular.module('akkurate-design-system').directive("akkCheckbox", [
    '$rootScope',
    '$window',
    function ($rootScope, $window) {
        return {
            restrict: "E",
            templateUrl: 'templates/akk-checkbox.html',
            transclude: true,
            replace: true,
            scope: {
                label: "@",
                alignment: "@",
                elementclass: "@",
                req: "@",
                model: "=",
                property: "@",
                eventUpdate: "@"
            },
            link: function postLink(scope, element, attrs) {

                scope.methods = {
                    change: function () {
                        scope.model[scope.property] = !scope.model[scope.property];

                        if (scope.eventUpdate != null && scope.eventUpdate != '') {
                            $rootScope.$broadcast(scope.eventUpdate, scope.model);
                        }
                    }
                };

            }
        };
    }
]);