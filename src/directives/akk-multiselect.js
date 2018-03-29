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
                        templateUrl: '/apps/brain/templates/modal/multiselect.html',
                        controller: 'multiSelectCtrl',
                        size: 'md',
                        resolve: {
                            params: function () {
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
                        scope.view.items = response.items;
                        scope.view.selected = response.selected;
                    });
                }
            };

            scope.methods.init();
        }
    };
});


 