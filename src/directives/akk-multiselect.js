'use strict';
angular.module('akkurate-design-system').directive("akkMultiselect", function ($uibModal) {
    return {
        restrict: 'E',
        templateUrl: 'templates/akk-multiselect.html',
        transclude: true,
        replace: true,
        scope: {
            label: "@",
            model: "@",
            placeholder: "@",
            items: "=",
            selected: "=",
            field: "@"
        },
        link: function postLink(scope, element, attrs) {

            scope.view = {
                label: scope.label,
                model: scope.model,
                placeholder: scope.placeholder,
                items: scope.items,
                selected: scope.selected,
                field: scope.field
            };

            scope.methods = {
                init: function () {
                },
                open: function () {
                    var modalInstance = $uibModal.open({
                        templateUrl: 'templates/modals/akk-multiselect-modal.html',
                        controller: [
                            '$scope',
                            '$filter',
                            '$uibModalInstance',
                            'params',
                            function ($scope, $filter, $uibModalInstance, params) {

                                $scope.view = {
                                };

                                $scope.methods = {
                                    init: function () {
                                        $scope.view.placeholder = params.placeholder;
                                        $scope.view.items = angular.copy(params.items);
                                        $scope.view.selected = angular.copy(params.selected);
                                        $scope.view.field = params.field;
                                    },
                                    select: function (item) {
                                        var index = $filter('getIndexBy')($scope.view.items, 'id', item.id);
                                        $scope.view.selected.push(item);
                                        $scope.view.items.splice(index, 1);
                                    },
                                    unselect: function (item) {
                                        var index = $filter('getIndexBy')($scope.view.selected, 'id', item.id);
                                        $scope.view.items.push(item);
                                        $scope.view.selected.splice(index, 1);
                                    },
                                    close: function(){
                                        $uibModalInstance.dismiss('cancel');
                                    },
                                    cancel : function(){
                                        $scope.methods.close();
                                    },
                                    save : function(){
                                        $uibModalInstance.close({
                                            items : $scope.view.items,
                                            selected : $scope.view.selected
                                        });
                                    }
                                };



                                var xhr = {
                                };

                                $scope.methods.init();

                            }
                        ],
                        size: 'md',
                        windowClass: 'show modal-multiselect',
                        resolve: {
                            params: function () {
                                console.log("params : ", {
                                    placeholder: scope.view.placeholder,
                                    items: scope.view.items,
                                    selected: scope.view.selected,
                                    field: scope.view.field
                                });
                                return {
                                    placeholder: scope.view.placeholder,
                                    items: scope.view.items,
                                    selected: scope.view.selected,
                                    field: scope.view.field
                                };
                            }
                        }
                    });
                    modalInstance.result.then(function (response) {
                        scope.view.items = scope.items = response.items;
                        scope.view.selected = scope.selected = response.selected;
                    });
                }
            };

            scope.methods.init();
        }
    };
});
