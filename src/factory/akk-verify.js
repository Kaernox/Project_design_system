/**
 * Akkurate v1.0.0 (https://ww.akkurate.io)
 * Copyright 2017-2018 Subvitamine(tm) (https://www.subvitamine.com)
 * Commercial License 
 * @description: Directive who can let you manage the behavior of multiple checkbox order in a list
 */

angular.module('akkurate-design-system').factory('akkVerify', [
    '$q',
    '$uibModal',
    function ($q, $uibModal) {
        return {
            alert: function (title, message, windowClass) {
                var q = $q.defer();
                var modalInstance = $uibModal.open({
                    templateUrl: "templates/modals/akk-verify-alert.html",
                    controller: [
                        '$scope',
                        '$uibModalInstance',
                        'title',
                        'message',
                        function ($scope, $uibModalInstance, title, message) {
                            $scope.title = title;
                            $scope.message = message;
                            $scope.close = function () {
                                $uibModalInstance.close();
                            };
                        }],
                    windowClass: 'show' + (windowClass != undefined ? ' ' + windowClass : ''),
                    size: 'sm',
                    backdrop: 'static',
                    keyboard: false,
                    resolve: {
                        title: function () {
                            return title;
                        },
                        message: function () {
                            return message;
                        }
                    }
                });
                modalInstance.result.then(function (response) {
                    q.resolve(response);
                }, function () {});
                return q.promise;
            },
            confirm: function (title, message, buttons, windowClass) {
                var q = $q.defer();
                var modalInstance = $uibModal.open({
                    templateUrl: "templates/modals/akk-verify-confirm.html",
                    controller: [
                        '$scope',
                        '$uibModalInstance',
                        'title',
                        'message',
                        'buttons',
                        function ($scope, $uibModalInstance, title, message, buttons) {
                            $scope.title = title;
                            $scope.message = message;
                            $scope.buttons = buttons;
                            $scope.response = function (result) {
                                $uibModalInstance.close(result);
                            };
                        }],
                    windowClass: 'show' + (windowClass != undefined ? ' ' + windowClass : ''),
                    size: 'sm',
                    backdrop: 'static',
                    keyboard: false,
                    resolve: {
                        title: function () {
                            return title;
                        },
                        message: function () {
                            return message;
                        },
                        buttons: function () {
                            return buttons;
                        }
                    }
                });
                modalInstance.result.then(function (response) {
                    q.resolve(response);
                }, function () {});
                return q.promise;
            }
        };
    }
]);