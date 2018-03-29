/* 
 * directive qui gere une check box
 */


'use strict';
angular.module('akkurate-design-system').directive('akkCheckbox', [
    function () {
        return {
            templateUrl: 'templates/akk-checkbox.html',
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: {
                label: "@",
                elementclass: "@",
                req: "@",
                model: "=",
                truevalue: "@",
                falsevalue: "@",
                onchange: "&"
            },
            link: function postLink(scope, element, attrs, ngModel) {
            }
        };
    }
]);
