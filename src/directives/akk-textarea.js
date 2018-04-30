/**
 * Akkurate v1.0.0 (https://ww.akkurate.io)
 * Copyright 2017-2018 Subvitamine(tm) (https://www.subvitamine.com)
 * Commercial License 
 * @description: Directive who manage to let the user input a large text the input zone can be sized manualy by the user or fit the input
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
                eventUpdate: "@"
            },
            link: function postLink(scope, element, attrs, ngModel) {
                // Check for validity after the element has lost focus
                // Change display if not valid
                scope.isValid = true;

                scope.checkValidity = function () {
                    scope.isValid = element[0].children[1].validity.valid;
                };
                if (scope.eventUpdate != null && scope.eventUpdate != '') {
                    $rootScope.$broadcast(scope.eventUpdate, scope.model);
                };
            }
        };
    }
]);

