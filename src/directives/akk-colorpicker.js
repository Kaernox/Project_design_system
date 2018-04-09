/*
 * directive who let the user pick a  color
 * the color pick can be pass for ulterior use
 * 
 */

'use strict';
angular.module('akkurate-design-system').directive("akkColorpicker",
        [
            '$rootScope', '$window',
            function ($rootScope, $window) {
                return {
                    restrict: "E",
                    templateUrl: 'templates/akk-colorpicker.html',
                    transclude: true,
                    replace: true,
                    scope: {
                        label: "@",
                        req: "@",
                        model: "=",
                        options: "=",
                        eventUpdate: "@"
                    },
                    link: function postLink(scope, element, attrs) {

                        scope.view = {
                            options: angular.copy(scope.options),
                            isValid: true
                        };

                        scope.methods = {
                            checkValidity: function () {
                                scope.view.isValid = scope.model.length > 0;
                            },
                            change: function () {
                                scope.model[scope.property] = !scope.model[scope.property];

                                if (scope.eventUpdate != null && scope.eventUpdate != '') {
                                    $rootScope.$broadcast(scope.eventUpdate, scope.model);
                                }
                            }
                        };

                        scope.events = {
                            onChange: function (api, color, $event) {},
                            onBlur: function (api, color, $event) {
                                scope.methods.checkValidity();
                            },
                            onOpen: function (api, color, $event) {},
                            onClose: function (api, color, $event) {},
                            onClear: function (api, color, $event) {},
                            onReset: function (api, color, $event) {},
                            onDestroy: function (api, color) {},
                        }
                    }
                };
            }
        ]);