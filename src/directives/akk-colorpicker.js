/*
 * directive qui premet de choisir et de changé la couleur
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
                        event: "@"
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

                                if (scope.event != null && scope.event != '') {
                                    $rootScope.$broadcast(scope.event, scope.model);
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