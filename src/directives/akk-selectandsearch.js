/*
 * directive who open a modal for search an item in a list and select him
 * the selected item is return for an ulterior use
 * @return {int}
 */

'use strict';
angular.module('akkurate-design-system').directive('akkSelectandsearch', ['$rootScope', '$window', '$filter', '$uibModal',
    function ($rootScope, $window, $filter, $uibModal) {
        return {
            templateUrl: 'templates/akk-selectandsearch.html',
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: {
                label: "@",
                options: "=",
                optionsType: "@",
                fields: "=",
                filterType: "@",
                filterBy: "@",
                placeholder: "@",
                hasError: "=",
                req: "@",
                model: "=",
                event: "@",
                add: "@",
                modalSize: "@",
                templateItem: "@",
                orderBy: "@"
            },
            link: function postLink(scope, element, attrs) {

                scope.view = {
                    keywords: '',
                    item: null,
                    template: {
                        item: 'default'
                    },
                    modal: {
                        size: 'sm'
                    },
                    display: false,
                    isValid: true
                };

                scope.methods = {
                    init: function () {
                        if (scope.templateItem) {
                            scope.view.template.item = scope.templateItem;
                        }

                        if (scope.modalSize) {
                            scope.view.modal.size = scope.modalSize;
                        }

                        if (angular.isDefined(scope.filterType) && angular.isDefined(scope.filterBy)) {
                            scope.options = $filter(scope.filterType)(angular.copy(scope.options), scope.filterBy);
                        }
//                        console.log('OPTIONS', scope.options);
                        scope.view.item = $filter('getBy')(scope.options, 'id', scope.model);
                    },
                    add: function () {
                        if (scope.add != null && scope.add != '') {
                            $rootScope.$broadcast(scope.add);
                        }
                    },
                    wizard: function () {
                        var modalInstance = $uibModal.open({
                            templateUrl: 'templates/modals/akk-selectandsearch-modal.html',
                            controller: [
                                '$scope',
                                '$uibModalInstance',
                                'view',
                                function ($scope, $uibModalInstance, view) {

                                    $scope.view = angular.copy(view);
                                    $scope.view.orderBy = scope.orderBy;

                                    $scope.methods = {
                                        init: function () {
                                            if ($scope.view.item != null) {
                                                $scope.view.selected = true;
                                            }
                                        },
                                        select: function (item) {
                                            $scope.view.item = item;
                                            $scope.view.selected = true;
                                        },
                                        template: {
                                            get: function () {
                                                return view.template;
                                            }
                                        },
                                        valid: function () {
                                            $uibModalInstance.close($scope.view.item);
                                        },
                                        close: function () {
                                            $uibModalInstance.dismiss('cancel');
                                        }
                                    };

                                    $scope.$on('modal.closing', function (event, reason, closed) {
                                        if ($scope.view.selected) {
                                            $scope.view.item = null;
                                        }
                                        if (view.item == null && scope.req === true) {
                                            scope.view.isValid = false;
                                        }
                                    });
                                }],
                            size: scope.view.modal.size,
                            windowClass: 'show modal-select',
                            backdrop: true,
                            resolve: {
                                view: function () {
                                    return {
                                        item: scope.view.item,
                                        fields: scope.fields,
                                        selected: false,
                                        options: scope.options,
                                        template: 'templates/modals/akk-selectandsearch-modal-' + scope.view.template.item + '.html',
                                        placeholder: scope.placeholder
                                    };
                                }
                            }
                        });

                        // Get the element returned by the modal
                        modalInstance.result.then(function (item) {
                            scope.view.display = false;
                            if (item != null) {
                                scope.view.isValid = true;
                                if (angular.isDefined(scope.optionsType) && scope.optionsType === 'array') {
                                    scope.model.push(item);
                                } else {
                                    scope.model = item.id;
                                }
                                scope.view.item = item;

                                if (scope.event) {
                                    $rootScope.$broadcast(scope.event, item);
                                }
                            } else {
                                scope.view.isValid = false;
                            }
                        });
                    }
                };

                scope.methods.init();
            }
        };
    }
]);
