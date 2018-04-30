/**
 * Akkurate v1.0.0 (https://ww.akkurate.io)
 * Copyright 2017-2018 Subvitamine(tm) (https://www.subvitamine.com)
 * Commercial License 
 * @description: directives for picking a date 
 */

'use strict';
angular.module('akkurate-design-system').directive("akkDatepicker",
        [
            '$rootScope',
            '$window',
            '$uibModal',
            'gettextCatalog',
            function ($rootScope, $window, $uibModal, gettextCatalog) {
                return {
                    restrict: "E",
                    templateUrl: 'templates/akk-datepicker.html',
                    transclude: true,
                    replace: true,
                    scope: {
                        label: "@",
                        req: "@",
                        model: "=",
                        eventUpdate: "@"
                    },
                    link: function postLink(scope, element, attrs) {

                        scope.view = {
                            isValid: true
                        };

                        scope.methods = {
                            init: function () {
//                                console.log(scope.model);
//                                scope.view.isValid = scope.model.length > 0;
                            },
                            checkValidity: function () {
//                                scope.view.isValid = scope.model.length > 0;
                            },
                            clear: function () {
                                scope.model = null;
//                                console.log(scope.model);
                            },
                            datepicker: function () {
                                var modalInstance = $uibModal.open({
                                    templateUrl: 'templates/modals/akk-datepicker-modal.html',
                                    controller: [
                                        '$scope',
                                        '$uibModalInstance',
                                        'gettextCatalog',
                                        'Notification',
                                        'params',
                                        function ($scope, $uibModalInstance, gettextCatalog, Notification, params) {
                                            $scope.view = {
                                                title: params.title,
                                                datetime: params.datetime,
                                                datepickerOptions: {
                                                    minDate: params.mindate,
                                                    maxDate: params.maxdate,
                                                    showWeeks: false
                                                }
                                            };

                                            $scope.methods = {
                                                valid: function () {
                                                    if ($scope.view.datetime == null || $scope.view.datetime == "Invalid Date") {
                                                        Notification.error({message: gettextCatalog.getString('The date entered is invalid, please check.')});
                                                        return false;
                                                    }

                                                    $uibModalInstance.close($scope.view.datetime);
                                                },
                                                cancel: function () {
                                                    console.log('DATEPICKER CANCEL');
                                                    $uibModalInstance.dismiss('cancel');
                                                }
                                            };
                                        }
                                    ],
                                    windowClass: 'show modal-datepicker',
                                    resolve: {
                                        params: function () {
                                            return {
                                                title: gettextCatalog.getString('Date'),
                                                datetime: scope.model
                                            };
                                        }
                                    }
                                });
                                modalInstance.result.then(function (date) {
                                    scope.model = date;
//                                    console.log(scope.model);
                                });
                            },
                            change: function () {
                                scope.model[scope.property] = !scope.model[scope.property];

                                if (scope.eventUpdate != null && scope.eventUpdate != '') {
                                    $rootScope.$broadcast(scope.eventUpadate, scope.model);
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

                        scope.methods.init();
                    }
                };
            }
        ]);