/**
 * Akkurate v1.0.0 (https://ww.akkurate.io)
 * Copyright 2017-2018 Subvitamine(tm) (https://www.subvitamine.com)
 * Commercial License 
 * @description: Directive who manage the behavior of a switch he can be use to set the position and the size
 */

'use strict';
angular.module('akkurate-design-system').directive("akkSwitch", [
    '$rootScope',
    function ($rootScope) {
        return {
            restrict: "E",
            templateUrl: 'templates/akk-switch.html',
            transclude: true,
            replace: true,
            scope: {
                label: "@",
                alignment: "@",
                elementclass: "@",
                icon: "@",
                size: "@",
                req: "@",
                model: "=",
                property: "@",
                eventUpdate: "@"
            },
            link: function postLink(scope, element, attrs) {

                scope.view = {
                    active: angular.copy(scope.model[scope.property])
                }

                scope.methods = {
                    init: function() {
                        if(scope.alignment == undefined) {
                            scope.alignment = 'right';
                        }
                    },
                    toggle: function () {
                        scope.model[scope.property] = !scope.model[scope.property];
                        scope.view.active = scope.model[scope.property];

                        if (scope.eventUpdate != null && scope.eventUpdate != '') {
                            $rootScope.$broadcast(scope.eventUpdate, scope.model);
                        }
                    }
                };

                scope.methods.init();
            }
        };
    }
]);