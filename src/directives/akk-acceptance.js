/**
 * the akkAction directive is use to validate.
 * 
 *
 */

'use strict';
angular.module('akkurate-design-system').directive("akkAcceptance", [
    '$rootScope',
    '$window',
    function ($rootScope, $window) {
        return {
            restrict: "E",
            templateUrl: 'templates/akk-acceptance.html',
            transclude: true,
            replace: true,
            scope: {
                label: "@",
                alignment: "@",
                elementclass: "@",
                req: "@",
                model: "=",
                property: "@",
                event: "@"
            },
            link: function postLink(scope, element, attrs) {

                scope.methods = {
                    change: function () {
                        scope.model[scope.property] = !scope.model[scope.property];

                        if (scope.event != null && scope.event != '') {
                            $rootScope.$broadcast(scope.event, scope.model);
                        }
                    }
                };

            }
        };
    }
]);