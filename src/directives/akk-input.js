/**
 * Akkurate v1.0.0 (https://ww.akkurate.io)
 * Copyright 2017-2018 Subvitamine(tm) (https://www.subvitamine.com)
 * Commercial License 
 * @description: directive to create a zone for an text entry the entry can be use for ulterior fonction
 */

'use strict';
angular.module('akkurate-design-system').directive('akkInput', [
    function () {
        return {
            templateUrl: 'templates/akk-input.html',
            restrict: 'E',
            transclude: true,
            replace: true,
            eventUpdate: "@",
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
                if (scope.eventUpdate != null && scope.eventUpdate != '') {
                    $rootScope.$broadcast(scope.eventUpdate, scope.model);
                };
            }
        };
    }
]);