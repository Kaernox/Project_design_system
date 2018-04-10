/*
 * Akkurate v1.0.0 (https://ww.akkurate.io)
 * Copyright 2017-2018 Subvitamine(tm) (https://www.subvitamine.com)
 * Commercial License 
 * @description: directive use to manage the behavior of the radio button the choice can be use afterward
 * 
 */

'use strict';
angular.module('akkurate-design-system').directive('akkRadio', [
    function () {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            templateUrl: 'templates/akk-radio.html',
            scope: {
                label: "@",
                elementclass: "@",
                req: "@", /* required */
                name: "@",
                model: "=",
                options: "=",
                property: "@",
                eventUpdate: "@",
            },
            link: function postLink(scope, element, attrs) {
                scope.view = {
                    isValid: false,
                    count: 0
                }

                scope.methods = {
                    init: function () {
                        scope.methods.checkValidity();
                    },
                    select: function (option) {
                        scope.model = option[scope.property] || option;
                        scope.methods.checkValidity();
                    },
                    checkValidity: function () {
                        if (scope.req) {
                            if (scope.model != null) {
                                scope.view.isValid = true;
                            } else {
                                scope.view.isValid = false;
                            }
                        } else {
                            scope.view.isValid = true;
                        }
                    },
                    /**
                     * @description
                     *
                     * This function will be used when no property is specified for the directive.
                     * It ill check wether the option's object is equal to the scope.model object.
                     *
                     * @param {object} option The object to compare to the model.
                     * @returns {boolean} Returns true if option is equal to the scope.model object
                     */
                    checkEqualsModel: function (option) {
                        console.log("called : " + ++scope.view.count)
                        if (scope.model == null) {
                            return false;
                        }
                        for (var index in option) {
                            if (option[index] !== scope.model[index]) {
                                return false;
                            }
                        }
                        if (scope.eventUpdate != null && scope.eventUpdate != '') {
                            $rootScope.$broadcast(scope.eventUpdate);
                        }
                        return true;
                    }
                };

                scope.methods.init();
            }
        };
    }
]);
