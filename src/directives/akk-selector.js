/* 
 * 
 * 
 * 
 */

'use strict';
angular.module('akkurate-design-system').directive('akkSelector', [
    function () {
        return {
            templateUrl: 'templates/akk-selector.html',
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: {
                label: "@",
                elementclass: "@",
                req: "@",
                model: "=",
                property: "@",
                eventUpdate: "@"
            }
        };
    }
]);
