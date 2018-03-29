/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';
angular.module('akkurate-design-system').directive('akkInputInt', [
    function () {
        return {
            templateUrl: '/templates/akk-input-int.html',
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: {
                label: "@",
                elementclass: "@",
                model: "=",
                max: "@",
                min: "@",
                step: "@"
            },
            link: function postLink(scope, element, attrs, ngModel) {
                // Set the model if null at the init
                if (scope.model == null && scope.min != null) {
                    scope.model = scope.min / 1;
                } else if (scope.model == null) {
                    scope.model = 0;
                }

                // Set a step if null at the init
                if (scope.step == null) {
                    scope.step = 1;
                }

                // Add 'step' to the model if the result isn't above max
                scope.add = function () {
                    if (scope.model / 1 + scope.step / 1 <= scope.max) {
                        scope.model = scope.model / 1 + scope.step / 1;
                    }
                };

                // Substract 'step' to the model if the result isn't under min & if there's a min
                scope.substract = function () {
                    if (scope.min != null && scope.model - scope.step >= scope.min || scope.min == null) {
                        scope.model -= scope.step;
                    }
                };

            }
        };
    }
]);
