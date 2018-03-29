'use strict';
angular.module('akkurate-design-system').directive("akkSwitch",
        [
            '$rootScope', '$window',
            function ($rootScope, $window) {
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