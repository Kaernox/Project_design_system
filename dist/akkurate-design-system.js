angular.module('akkurate-design-system', [
    'ui.bootstrap',
    'ngSanitize',
    'ui-notification',
    'gettext',
    'color.picker'
]);

angular.module('akkurate-design-system').config([
    'NotificationProvider',
    function (NotificationProvider) {
        /**
         * Notification default configuration
         */
        NotificationProvider.setOptions({
            delay: 3500,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'right',
            positionY: 'top'
        });
    }
]);
/*
 * Akkurate v1.0.0 (https://ww.akkurate.io)
 * Copyright 2017-2018 Subvitamine(tm) (https://www.subvitamine.com)
 * Commercial License 
 * @description: directive use to manipulate the behavior of alert it let you choose the type and its content 
 */

'use strict';
angular.module('akkurate-design-system').directive("akkAlert",
        [
            '$rootScope', '$window',
            function ($rootScope, $window) {
                return {
                    restrict: "E",
                    templateUrl: 'templates/akk-alert.html',
                    transclude: true,
                    replace: true,
                    scope: {
                        title: "@",
                        message: "@",
                        icon: "@",
                        eventUpdate: "@",
                        type: "@",
                        isDisplayed: "=",
                        isClosable: "="
                    },
                    link: function postLink(scope, element, attrs) {
                        
                        scope.view = {
                        };
                        
                        scope.methods = {
                            init: function() {
//                                scope.isDisplayed = true;
                            },
                            close: function() {
                                scope.isDisplayed = false;
                                console.log('close', scope.isDisplayed);

                                if (scope.eventUpdate != null && scope.eventUpdate != '') {
                                    $rootScope.$broadcast(scope.eventUpdate);
                                }
                            }
                        };
                        
                        scope.methods.init();
                    }
                };
            }
        ]);
/*
 * Akkurate v1.0.0 (https://ww.akkurate.io)
 * Copyright 2017-2018 Subvitamine(tm) (https://www.subvitamine.com)
 * Commercial License 
 * @description: directive use to calibrate modal when use on smartphone and other portable device.
 */

'use strict';
angular.module('akkurate-design-system').directive('akkAutoFocus', function($timeout) {
    return {
        restrict: 'AC',
        link: function(_scope, _element) {
            $timeout(function(){
                _element[0].focus();
            }, 0);
        }
    };
});
/*
 * Akkurate v1.0.0 (https://ww.akkurate.io)
 * Copyright 2017-2018 Subvitamine(tm) (https://www.subvitamine.com)
 * Commercial License 
 * @description: directive use to manipulate the behavior of card it let you choose the type and its content
 * 
 */

'use strict';
angular.module('akkurate-design-system').directive("akkCard",
        [
            '$rootScope',
            function ($rootScope) {
                return {
                    restrict: "E",
                    templateUrl: 'templates/akk-card.html',
                    transclude: true,
                    replace: true,
                    scope: {
                        title: "@",
                        content: "@",
                        media: "@",
                        options: "="
                    },
                    link: function postLink(scope, element, attrs) {
                        
                        scope.view = {
                        };
                        
                        scope.methods = {
                            init: function() {
                            },
                            action: function(option) {
                                $rootScope.$broadcast(option.event);
                            }
                        };
                        
                        scope.methods.init();
                    }
                };
            }
        ]);
/* 
 * Akkurate v1.0.0 (https://ww.akkurate.io)
 * Copyright 2017-2018 Subvitamine(tm) (https://www.subvitamine.com)
 * Commercial License 
 * @description: directive use to manage the behavior of a checkbox
 */

'use strict';
angular.module('akkurate-design-system').directive("akkCheckbox", [
    '$rootScope',
    '$window',
    function ($rootScope, $window) {
        return {
            restrict: "E",
            templateUrl: 'templates/akk-checkbox.html',
            transclude: true,
            replace: true,
            scope: {
                label: "@",
                alignment: "@",
                elementclass: "@",
                req: "@",
                model: "=",
                property: "@",
                eventUpdate: "@"
            },
            link: function postLink(scope, element, attrs) {

                scope.methods = {
                    change: function () {
                        scope.model[scope.property] = !scope.model[scope.property];

                        if (scope.eventUpdate != null && scope.eventUpdate != '') {
                            $rootScope.$broadcast(scope.eventUpdate, scope.model);
                        }
                    }
                };

            }
        };
    }
]);
/*
 * Akkurate v1.0.0 (https://ww.akkurate.io)
 * Copyright 2017-2018 Subvitamine(tm) (https://www.subvitamine.com)
 * Commercial License 
 * @description: Directive who can let you manage the behavior of multiple checkbox order in a list
 */

'use strict';
angular.module('akkurate-design-system').directive('akkCheckboxList', [
    '$filter',
    function ($filter) {
        return {
            templateUrl: 'templates/akk-checkbox-list.html',
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: {
                label: "@",
                elementclass: "@",
                req: "@",
                model: "=",
                options: "=",
                value: "@",
                display: "@",
                eventUpdate: "@"
            },
            link: function (scope, element, attrs, ngModel) {
                scope.view = {
                    isValid: true
                };

                scope.methods = {
                    inModel: function (option) {
                        return $filter('inArray')(scope.model, option);
                    },
                    toggle: function (item) {
                        if (angular.isObject(item) && scope.value == null) {    // If array of objects and result should contain objects
                            var i = $filter('inArray')(scope.model, item);      // Try to find the object

                            if (i !== -1) {
                                scope.model.splice(i, 1);   // If the item exists in the result, remove it
                            } else {
                                scope.model.push(item);     // If the item isn't in the result, add it
                            }

                        } else if (angular.isObject(item) && scope.value != null) {   // If array of objects and result should contain values
                            var i = scope.model.indexOf(item[scope.value]);

                            if (i !== -1) {
                                scope.model.splice(i, 1);
                            } else {
                                scope.model.push(item[scope.value]);
                            }

                        } else {    // If array of values
                            var i = scope.model.indexOf(item);

                            if (i !== -1) {
                                scope.model.splice(i, 1);
                            } else {
                                scope.model.push(item);
                            }
                        }
                        if (scope.eventUpdate != null && scope.eventUpdate != '') {
                            $rootScope.$broadcast(scope.eventUpdate);
                        }
                    },
                    checkValidity: function () {
                        scope.view.isValid = scope.model.length > 0;
                    }
                };

//                // Find the index of an object in an array of objects
//                function arrayObjectIndexOf(arr, obj) {
//                    for (var i = 0; i < arr.length; i++) {
//                        if (angular.equals(arr[i], obj)) {
//                            return i;
//                        }
//                    }
//                    ;
//                    return -1;
//                }

            }
        };
    }
]);


/*
 * Akkurate v1.0.0 (https://ww.akkurate.io)
 * Copyright 2017-2018 Subvitamine(tm) (https://www.subvitamine.com)
 * Commercial License 
 * @description: Directive who let the user pick a  color the color pick can be pass for ulterior use
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
/*
 * Akkurate v1.0.0 (https://ww.akkurate.io)
 * Copyright 2017-2018 Subvitamine(tm) (https://www.subvitamine.com)
 * Commercial License 
 * @description: directive who order a list in a table. This one can be reorder and can use chebox for passing somme parameter
 */

'use strict';
angular.module('akkurate-design-system').directive("akkDatagrid", [
    '$rootScope',
    '$filter',
    '$window',
    function ($rootScope, $filter, $window) {
        return {
            restrict: 'E',
            templateUrl: 'templates/akk-datagrid.html',
            transclude: true,
            replace: true,
            scope: {
                caption: "@",
                items: "=",
                columns: "=",
                selected: "=",
                selector: "=",
                options: "=",
                eventClick: "@",
                eventHover: "@",
                eventToggle: "@",
                eventToggleAll: "@"
            },
            link: function postLink(scope, element, attrs) {
                scope.view = {
                    dimension: scope.columns[0],
                    way: 'asc',
                    items: null
                };

                scope.methods = {
                    init: function () {
                    },
                    toggle: function (item) {
                        var index = $filter('getIndexBy')(scope.selected, 'id', item.id);
                        if (index != null) {
                            scope.methods.unselect(item);
                        } else {
                            scope.methods.select(item);
                        }
                        if (scope.selector != null && scope.selector == true && scope.eventToggle != null && scope.eventToggle != '') {
                            $rootScope.$broadcast(scope.eventToggle, item);
                        }
                    },
                    select: function (item) {
                        scope.selected.push(item);
                        item.isChecked = true;
                    },
                    unselect: function (item) {

                        var indexInSelected = $filter('getIndexBy')(scope.selected, 'id', item.id);
                        scope.selected.splice(indexInSelected, 1);

                        var index = $filter('getIndexBy')(scope.items, 'id', item.id);
                        scope.items[index].isChecked = false;
                    },
                    toggleAll: function () {
                        if (scope.selected.length > 0) {
                            scope.selected = [];
                            angular.forEach(scope.items, function (item, key) {
                                item.isChecked = false;
                            });
                        } else {
                            scope.selected = angular.copy(scope.items);
                            angular.forEach(scope.items, function (item, key) {
                                item.isChecked = true;
                            });
                        }

                        if (scope.selector != null && scope.selector == true && scope.eventToggleAll != null && scope.eventToggleAll != '') {
                            $rootScope.$broadcast(scope.eventToggleAll, item);
                        }
                    },
                    eventClick: function (item) {
                        if (scope.eventClick != null && scope.eventClick != '') {
                            $rootScope.$broadcast(scope.eventClick, item);
                        }
                    },
                    eventHover: function (item) {
                        if (scope.eventHover != null && scope.eventHover != '') {
                            $rootScope.$broadcast(scope.eventHover, item);
                        }
                    },
                    optionClick: function (item, option) {
                        $rootScope.$broadcast(option.event, item);
                    },
                    sortBy: function (dimension, way) {
                        scope.view.dimension = dimension;
                        scope.view.way = way;
                    },
                    inverseWay: function (dimension) {
                        if (dimension == scope.view.dimension) {
                            if (scope.view.way == 'desc') {
                                return 'asc';
                            } else {
                                return 'desc';
                            }
                        } else {
                            return 'asc';
                        }
                    },
                    order: function () {
                        var way = scope.view.way == 'desc' ? '-' : '';
                        return way + scope.view.dimension;
                    }
                };
            }
        };

    }]);


 
/*
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
/**
 * The Wizard directive 
 * A Wizard needs to be initialized with a data model.
 * It can search for an existing item, update it if found and create a new one.
 */

'use strict';
angular.module('akkurate-design-system').directive("akkIframe", function () {

    return {
        restrict: 'E',
        scope: {
            content: '='
        },

        link: function (scope, element, attrs) {
            var iframe = document.createElement('iframe');
            var element0 = element[0];
            element0.appendChild(iframe);
            var body = iframe.contentDocument.body;
            
            var iFrameHeight = 0;

            scope.$watch('content', function () {
                body.innerHTML = scope.content;
//                console.log(body.scrollHeight);
                $(iframe).css('height', (body.scrollHeight + 100) + 'px');
//                var height = document.body.scrollHeight;
//                iframe.height(document.body.scrollHeight);
            });
        }
    };
});
/* 
 * directive for an input configurate to let accept only integer
 * it an variation of akk-input
 * 
 */

'use strict';
angular.module('akkurate-design-system').directive('akkInputInt', [
    function () {
        return {
            templateUrl: '/templates/akk-input-int.html',
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: {
                label: "@",
                elementclass: "@",
                model: "=",
                max: "@",
                min: "@",
                step: "@"
            },
            link: function postLink(scope, element, attrs, ngModel) {
                // Set the model if null at the init
                if (scope.model == null && scope.min != null) {
                    scope.model = scope.min / 1;
                } else if (scope.model == null) {
                    scope.model = 0;
                }

                // Set a step if null at the init
                if (scope.step == null) {
                    scope.step = 1;
                }

                // Add 'step' to the model if the result isn't above max
                scope.add = function () {
                    if (scope.model / 1 + scope.step / 1 <= scope.max) {
                        scope.model = scope.model / 1 + scope.step / 1;
                    }
                };

                // Substract 'step' to the model if the result isn't under min & if there's a min
                scope.substract = function () {
                    if (scope.min != null && scope.model - scope.step >= scope.min || scope.min == null) {
                        scope.model -= scope.step;
                    }
                };

            }
        };
    }
]);

/* 
 * Akkurate v1.0.0 (https://ww.akkurate.io)
 * Copyright 2017-2018 Subvitamine(tm) (https://www.subvitamine.com)
 * Commercial License 
 * @description: directive to create a zone for an text entry the entry can be use for ulterior fonction
 */

'use strict';
angular.module('akkurate-design-system').directive('akkInput', [
    function () {
        return {
            templateUrl: 'templates/akk-input.html',
            restrict: 'E',
            transclude: true,
            replace: true,
            eventUpdate: "@",
            scope: {
                label: "@",
                elementclass: "@",
                type: "@",
                step: "@",
                placeholder: "@",
                req: "@",
                hasError: "=",
                model: "=",
                event: "@"
            },
            link: function postLink(scope, element, attrs, ngModel) {
                // Watch the 'hasError' attribute 
                scope.$watch('hasError', function () {
                    scope.isValid = (scope.hasError == null || scope.hasError != true);
                });

                // Check for validity after the element has lost focus
                scope.checkValidity = function () {
                    scope.isValid = element[0].children[1].validity.valid;
                };
                if (scope.eventUpdate != null && scope.eventUpdate != '') {
                    $rootScope.$broadcast(scope.eventUpdate, scope.model);
                };
            }
        };
    }
]);
/*
 * Akkurate v1.0.0 (https://ww.akkurate.io)
 * Copyright 2017-2018 Subvitamine(tm) (https://www.subvitamine.com)
 * Commercial License 
 * @description: Directive to display a loader
 */

'use strict';
angular.module('akkurate-design-system').directive('akkLoading', function () {
    return {
        templateUrl: 'templates/akk-loader.html',
        restrict: 'A',
        transclude: true,
        replace: true,
        scope: {
            loading: "="
        }
    };
});
/*
 * Akkurate v1.0.0 (https://ww.akkurate.io)
 * Copyright 2017-2018 Subvitamine(tm) (https://www.subvitamine.com)
 * Commercial License 
 * @description: Can open a modal to display a list then the user can chose multiple choice of the selectio this choices can be use at the exit of the modal
 */

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
            field: "@",
            event: "@"
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

/*
 * Akkurate v1.0.0 (https://ww.akkurate.io)
 * Copyright 2017-2018 Subvitamine(tm) (https://www.subvitamine.com)
 * Commercial License 
 * @description: directive use to choose an option from a list. It manage the behavior of the modal who display the list
 */

'use strict';
angular.module('akkurate-design-system').directive('akkSelect', [
    '$rootScope',
    function ($rootScope) {
        return {
            templateUrl: 'templates/akk-select.html',
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: {
                label: "@",
                elementclass: "@",
                req: "@",
                model: "=",
                options: "=",
                value: "@",
                display: "@",
                eventUpdate: "@",
                defaultDisplayEnabled: "@",
                defaultDisplay: "@"
            },
            link: function postLink(scope, element, attrs, ngModel) {
                // Check for validity after the element has lost focus
                // Change display if not valid
                scope.view = {
                    isValid: true
                };
                scope.model = scope.model || scope.options[0];
                scope.defaultEnabled = (scope.defaultDisplayEnabled != null && scope.defaultDisplay != null) ? true : false;

                scope.methods = {
                    checkValidity: function () {
                        scope.view.isValid = element[0].children[1].validity.valid;
                    },
                    change: function () {
                        if (scope.eventUpdate != null && scope.eventUpdate != '') {
                            $rootScope.$broadcast(scope.eventUpdate);
                        }
                    }
                };
            }
        };
    }
]);

/*
 * Akkurate v1.0.0 (https://ww.akkurate.io)
 * Copyright 2017-2018 Subvitamine(tm) (https://www.subvitamine.com)
 * Commercial License 
 * @description: directive who open a modal for search an item in a list and select him the selected item is return for an ulterior use. @return {int}
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
                eventUpdate: "@",
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

                                if (scope.eventUpdate) {
                                    $rootScope.$broadcast(scope.eventUpdate, item);
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

/* 
 * Akkurate v1.0.0 (https://ww.akkurate.io)
 * Copyright 2017-2018 Subvitamine(tm) (https://www.subvitamine.com)
 * Commercial License 
 * @description: 
 */

'use strict';
angular.module('akkurate-design-system').directive('akkSelector', [
    function () {
        return {
            templateUrl: 'templates/akk-selector.html',
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: {
                label: "@",
                elementclass: "@",
                req: "@",
                model: "=",
                property: "@",
                eventUpdate: "@"
            }
        };
    }
]);

/* 
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
/* 
 * Akkurate v1.0.0 (https://ww.akkurate.io)
 * Copyright 2017-2018 Subvitamine(tm) (https://www.subvitamine.com)
 * Commercial License 
 * @description: Directive who manage to let the user input a large text the input zone can be sized manualy by the user or fit the input
 */

'use strict';
angular.module('akkurate-design-system').directive('akkTextarea', [
    function () {
        return {
            templateUrl: 'templates/akk-textarea.html',
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: {
                label: "@",
                elementclass: "@",
                size: "@",
                placeholder: "@",
                req: "@",
                model: "=",
                eventUpdate: "@"
            },
            link: function postLink(scope, element, attrs, ngModel) {
                // Check for validity after the element has lost focus
                // Change display if not valid
                scope.isValid = true;

                scope.checkValidity = function () {
                    scope.isValid = element[0].children[1].validity.valid;
                };
                if (scope.eventUpdate != null && scope.eventUpdate != '') {
                    $rootScope.$broadcast(scope.eventUpdate, scope.model);
                };
            }
        };
    }
]);


/* 
 * Akkurate v1.0.0 (https://ww.akkurate.io)
 * Copyright 2017-2018 Subvitamine(tm) (https://www.subvitamine.com)
 * Commercial License 
 * @description: Directives who create a tree using a model checkbox and toggle are implement you can open-closed all and check-uncheck all
 */

'use strict';
angular.module('akkurate-design-system').directive('akkTree', [
    '$rootScope',
    '$window',
    '$filter',
    'AkkTreeManager',
    function ($rootScope, $window, $filter, AkkTreeManager) {
        return {
            restrict: "E",
            templateUrl: 'templates/akk-tree.html',
            transclude: true,
            replace: true,
            scope: {
                title: "@",
                items: "=",
                model: "=",
                options: "=",
                eventUpdate: "@"
            },
            link: function postLink(scope, element, attrs) {
                scope.view = {
                    items: null,
                    title: null
                };
                scope.methods = {
                    init: function () {
                        if (scope.items) {
                            scope.view.items = scope.items;
                        }
                        if (scope.title) {
                            scope.view.title = scope.title;
                        }

                        AkkTreeManager.setTree(scope.model, scope.items, scope.options);
                    },
                    /*
                     * verify if exist in array
                     * yes -> you remove it
                     * no -> you add it
                     * @value is use for isChecked
                     */
                    check: function (item) {
                        var value;
                        if ($filter('getBy')(scope.model, 'value', item.value)) {
                            var itemIndex = $filter('getIndexBy')(scope.model, 'value', item.value);
                            scope.model.splice(itemIndex, 1);
                            value= item.isChecked = false;
                            
                        } else {
                            scope.model.push({label: item.label, value: item.value});
                            value= item.isChecked = true;
                        }

                        AkkTreeManager.recursiveCheckVerif( [item], value, false);
                        
                        if (scope.eventUpdate != null && scope.eventUpdate != ''){
                            $rootScope.$broadcast(scope.eventUpdate, scope.model);
                        }
                        
                        scope.model = AkkTreeManager.getValues();
                    },
                    expandAll: function () {
                        AkkTreeManager.expandAll();
                        scope.view.items = AkkTreeManager.getTree();
                    },
                    inpandAll: function () {
                        AkkTreeManager.inpandAll();
                        scope.view.items = AkkTreeManager.getTree();
                    },
                    selectAll: function () {
                        AkkTreeManager.selectAll();
                        scope.view.items = AkkTreeManager.getTree();
                        scope.model = AkkTreeManager.getValues();
                    },
                    unselectAll: function () {
                        AkkTreeManager.unselectAll();
                        scope.view.items = AkkTreeManager.getTree();
                        scope.model = AkkTreeManager.getValues();
                    },
                    debug: function () {
                        console.log(AkkTreeManager.getTree());
                        console.log(scope.view.items);
                    }
                };

                scope.methods.init();
            }
        };
    }
]);
/*
 * directive for inside the ng-foreach 
 * he have thr "akkTree" directive has parents.
 * 
 */
'use strict';
angular.module('akkurate-design-system').directive('akkTreeItem', [
    '$rootScope',
    '$window',
    '$filter',
    'AkkTreeManager',
    function ($rootScope, $window, $filter, AkkTreeManager) {

        return {
            restrict: "E",
            templateUrl: 'templates/akk-tree-item.html',
            transclude: true,
            replace: true,
            scope: {
                item: "="
            },
            link: function postLink(scope, element, attrs) {
                scope.view = {
                    item: null
                };
                scope.methods = {
                    init: function () {
                        if (scope.item) {
                            scope.view.item = scope.item;
                        }
                        if (scope.isShown) {
                            scope.view.isShown = scope.isShown;
                        }
                    },
                    check: function (item) {
                        scope.$parent.methods.check(item);
                    },
                    select: function (item) {
                        scope.$parent.methods.select(item);
                    },
                    unselect: function (item) {
                        scope.$parent.methods.unselect(item);
                    },
                    toggle: function (item) {
                        if (item.isShown == undefined) {
                            item.isShown = false;
                        }
                        item.isShown = !item.isShown;
                    }
                };

                scope.methods.init();
            }
        };
    }
]);


'use strict';
angular.module('akkurate-design-system').service('AkkTreeManager', [
    '$rootScope',
    '$window',
    '$filter',
    function ($rootScope, $window, $filter) {
        /*
         * check recursively in the scope and update mostly
         * for the toggle all and the check all
         * @data is use for isChecked and isPartialyChecked
         */
        var recursiveUpdate = function (tree, property, value, selected) {

            var nbCheck = 0;
            var data = {
                isChecked:false,
                isPartialyChecked: false
            };
            angular.forEach(tree, function (item, key) {
                var sonData = {
                    isChecked:false,
                    isPartialyChecked: false
                };
                if (item.childs != undefined && item.childs.length > 0) {
                    sonData = recursiveUpdate(item.childs, property, value, selected);
                }
                if (selected == 'all') {
                    item[property] = value;
                } else if ($filter('getBy')(selected, 'value', item.value)) {
                    item[property] = value;
                }
                if(item.isChecked || sonData.isChecked || sonData.isPartialyChecked) {
                    if(sonData.isPartialyChecked) {
                        item.isPartialyChecked = true;
                        item.isChecked = false;
                    }
                    else {
                        item.isPartialyChecked = false;
                        item.isChecked = true;
                        if(Array.isArray(selected) && !$filter('getBy')(selected, 'value', item.value)) {
                            var topush = angular.copy(item);
                            delete topush.isShown;
                            delete topush.isChecked;
                            delete topush.childs;
                            delete topush.isPartialyChecked;
                            
                            selected.push(topush);
                        }
                    } 
                    nbCheck++;
                }
            });
            
            if(nbCheck === tree.length) {
                data.isChecked = true;
            }
            else if(nbCheck > 0 && nbCheck < tree.length) {
                data.isPartialyChecked = true;
            }
            
            return data;
        };
        /*
         * check recursively in all the tree and update
         * the checkbox and update if its partialy checked
         * @data is use for isChecked and isPartialyChecked
         */
        var _recursiveCheckVerif = function (tree, selected, value, isSonOf) {

            var nbCheck = 0;
            var data = {
                isChecked:false,
                isPartialyChecked: false
            };
            angular.forEach(tree, function (item, key) {
                var sonData = {
                        isChecked:false,
                        isPartialyChecked: false
                    },
                    localIsSonOf = isSonOf;
                    
                if ($filter('getBy')(selected, 'value', item.value) || isSonOf) {
                    item.isChecked = value;
                    sonData.isChecked = value;
                    localIsSonOf = true;
                }
                if (item.childs != undefined && item.childs.length > 0) {
                    sonData = _recursiveCheckVerif(item.childs,selected, value, localIsSonOf);
                }
                if(item.isChecked || sonData.isChecked || sonData.isPartialyChecked) {
                    if(sonData.isPartialyChecked) {
                        item.isPartialyChecked = true;
                        item.isChecked = false;
                    }
                    else {
                        item.isPartialyChecked = false;
                        item.isChecked = true;
                    } 
                    nbCheck++;
                }
                else {
                    item.isPartialyChecked = false;
                    item.isChecked = false;
                }
            });

            if(nbCheck === tree.length) {
                data.isChecked = true;
            }
            else if(nbCheck > 0 && nbCheck < tree.length) {
                data.isPartialyChecked = true;
            }
            
            return data;
        };
        
        /*
         * recuperate the information of the model
         * and put it in the var collection
         * @topush is use to update the model
         */
        var recursiveGet = function (tree, collection) {
            angular.forEach(tree, function (item, key) {

                if (item.isChecked == true) {
                    var topush = angular.copy(item);
                    delete topush.isShown;
                    delete topush.isChecked;
                    delete topush.childs;
                    delete topush.isPartialyChecked;
                    collection.push(topush);
                }

                if (item.childs != undefined && item.childs.length > 0) {
                    collection = (recursiveGet(item.childs, collection));
                }
            });

            return collection;
        };

        return {
            tree: [],
            getTree: function () {
                return this.tree;
            },
            getValues: function () {
                return recursiveGet(this.tree, []);
            },
            setTree: function (selecteds, tree, options) {
                this.tree = tree;

                if (selecteds.length > 0) {
                    recursiveUpdate(tree, 'isChecked', true, selecteds);
                }
            },
            expandAll: function () {
                recursiveUpdate(this.tree, 'isShown', true, 'all');
            },
            inpandAll: function () {
                recursiveUpdate(this.tree, 'isShown', false, 'all');
            },
            selectAll: function () {
                recursiveUpdate(this.tree, 'isChecked', true, 'all');
            },
            unselectAll: function () {
                recursiveUpdate(this.tree, 'isChecked', false, 'all');
            },
            recursiveUpdate: recursiveUpdate,
            recursiveCheckVerif: function(selected, value, isSonOf) {
                _recursiveCheckVerif(this.tree, selected, value, isSonOf);
            }
        };
    }]);
angular.module('akkurate-design-system')
        .filter('inArray', function () {
            return function (array, value) {
                return array.indexOf(value) !== -1;
            };
        })
        .filter('getBy', function () {
            return function (input, field, value, toReturn) {
                var i = 0, len = input.length;
                for (; i < len; i++) {
                    if (input[i][field] == value) {
                        return (toReturn) ? input[i][toReturn] : input[i];
                    }
                }
                return null;
            };
        })
        .filter('getIndexBy', function () {
            return function (input, field, value, toReturn) {
                var i = 0, len = input.length;
                for (; i < len; i++) {
                    if (input[i][field] == value) {
                        return i;
                    }
                }
                return null;
            };
        })
        .filter('range', function () {
            return function (input, total) {
                total = parseInt(total);
                for (var i = 0; i < total; i++) {
                    input.push(i);
                }
                return input;
            };
        })
        .filter('ucfirst', function () {
            return function ucFirst(str) {
                if (str.length > 0) {
                    return str[0].toUpperCase() + str.substring(1);
                } else {
                    return str;
                }
            };
        })
        .filter('dateShortFormat', function ($filter) {
            return function (input) {
                if (input) {
                    var _date = $filter('date')(new Date(input), 'mediumDate');
                    return _date;
                } else {
                    return input;
                }
            };
        })
        .filter('timeFormat', function ($filter) {
            return function (input) {
                if (input) {
                    var _date = $filter('date')(new Date(input), 'shortTime');
                    return _date;
                } else {
                    return input;
                }
            };
        })
        .filter('formatBytes', function ($filter) {
            return function (bytes, decimals) {
                if (bytes == 0)
                    return '0 Byte';
                var k = 1000; // or 1024 for binary
                var dm = decimals + 1 || 3;
                var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
                var i = Math.floor(Math.log(bytes) / Math.log(k));
                return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
            };
        })
        .filter('extensionIcon', function ($filter) {
            return function (extension) {
                var unknow = ['apk', 'sql'];
                if (extension == null || unknow.indexOf(extension.toLowerCase()) >= 0) {
                    return "css";
                }
                return extension.toLowerCase();
            };
        })
        .filter('searchAndDisplay', function ($filter) {
            return function (displayKey, array, searchKey, searchValue) {
                var value = $filter('getBy')(array, searchKey, searchValue, displayKey);
                if (value == null) {
                    return null;
                }
                return value;
            };
        })
        .filter('toArray', [function () {
                return function (obj, addKey) {
                    if (!angular.isObject(obj))
                        return obj;
                    if (addKey === false) {
                        return Object.keys(obj).map(function (key) {
                            return obj[key];
                        });
                    } else {
                        return Object.keys(obj).map(function (key) {
                            var value = obj[key];
                            return angular.isObject(value) ?
                                    Object.defineProperty(value, '$key', {enumerable: false, value: key}) :
                                    {$key: key, $value: value};
                        });
                    }
                };
            }])
        /**
         * Filter credential by typeName
         * 
         * @param {Credential[]} credentials 
         * @param {String} filterName   
         */
        .filter('credentialType', [function () {
                return function (credentials, filterName) {
                    var objects = [];
                    angular.forEach(credentials, function (a, b) {
                        if (a.type != null && a.type.name == filterName) {
                            objects.push(a);
                        }
                    });
                    return objects;

                };
            }])

        .filter('truncate', function () {
            return function (value, wordwise, max, tail) {
                if (!value)
                    return '';

                max = parseInt(max, 10);
                if (!max)
                    return value;
                if (value.length <= max)
                    return value;

                value = value.substr(0, max);
                if (wordwise) {
                    var lastspace = value.lastIndexOf(' ');
                    if (lastspace != -1) {
                        //Also remove . and , so its gives a cleaner result.
                        if (value.charAt(lastspace - 1) == '.' || value.charAt(lastspace - 1) == ',') {
                            lastspace = lastspace - 1;
                        }
                        value = value.substr(0, lastspace);
                    }
                }

                return value + (tail || ' …');
            };
        })

        .filter('nl2br', function ($sce) {
            return function (msg, is_xhtml) {
                var is_xhtml = is_xhtml || true;
                var breakTag = (is_xhtml) ? '<br />' : '<br>';
                var msg = (msg + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
                return $sce.trustAsHtml(msg);
            };
        });
angular.module('akkurate-design-system').run(['$templateCache', function($templateCache) {$templateCache.put('templates/akk-alert.html','<div>\n    <div data-ng-show="isDisplayed" class="alert" role="alert" data-ng-class="type ? \'alert-\' + type : \'alert-dark\'">\n        <div class="d-flex align-items-center">\n            <i class="material-icons mr-1 align-self-start" data-ng-bind="icon" data-ng-if="icon"></i>\n            <span data-ng-if="icon">&nbsp;&nbsp;&nbsp;</span>\n            <div>\n                <h4 class="alert-heading" data-ng-if="title">{{title}}</h4>\n                <div data-ng-bind-html="message"></div>\n            </div>\n            <i class="material-icons align-self-start ml-auto" ng-if="isClosable" data-ng-click="methods.close()">clear</i>\n        </div>\n    </div>\n</div>\n');
$templateCache.put('templates/akk-card.html','<div class="card"> \n  <img data-ng-if="media && media != \'\'" class="card-img-top" data-ng-src="{{media}}" alt="{{title}}">\n  <div class="card-body">\n    <h5 class="card-title">{{title}}</h5>\n    <p data-ng-if="content && content != \'\'" class="card-text">{{content}}</p>\n    <button data-ng-if="options.length > 0" type="button" class="btn btn-primary" data-ng-repeat="option in options" ng-click="methods.action(option)">{{option.label}}</a>\n  </div>\n</div>');
$templateCache.put('templates/akk-checkbox-list.html','<div class="form-group form-checkbox form-checkbox-list {{!view.isValid ? \'has-error\' : \'\'}}" data-ng-class="elementclass">\n    <div class="d-flex">\n        <i ng-if="!view.isValid" class="material-icons md-14">warning</i>\n        <div class="ml-1">{{label}}</div>\n        <sup ng-if="req">*</sup>\n    </div>\n    <div class="d-flex" ng-repeat="option in options track by $index" ng-click="methods.toggle(option)">\n        <i class="material-icons text-primary" data-ng-if="methods.inModel(option)">check_box</i>\n        <i class="material-icons text-muted" data-ng-if="!methods.inModel(option)">check_box_outline_blank</i>\n        <div class="ml-1">\n            {{display != null ? option[display] : option}}\n        </div>\n    </div>\n</div>');
$templateCache.put('templates/akk-checkbox.html','<div class="form-group form-checkbox" data-ng-class="elementclass" data-ng-click="methods.change()">\n    <span class="d-flex">\n        <i class="material-icons text-primary" data-ng-if="model[property]">check_box</i>\n        <i class="material-icons text-muted" data-ng-if="!model[property]">check_box_outline_blank</i>\n        <div class="ml-1">\n            {{label | translate}}\n        </div>\n    </span>\n</div>');
$templateCache.put('templates/akk-colorpicker.html','<div class="form-group form-colorpicker" ng-class="!view.isValid ? \'has-error\' : \'\'">\n    <label class="control-label">\n        <i ng-if="!view.isValid" class="material-icons md-14">warning</i> {{label}} <sup ng-if="req">*</sup>\n    </label>\n    <div class="form-container">\n        <div class="icon">\n            <i class="material-icons md-18">color_lens</i>\n        </div>\n        <color-picker\n            ng-model="model"\n            options="view.options"\n            event-api="events"\n            ></color-picker>\n    </div>\n</div>');
$templateCache.put('templates/akk-datagrid.html','<div class="table-responsive table-datagrid">\n    <table class="table table-vertical-center" data-ng-if="items.length">\n        <caption data-ng-if="!caption">{{caption}}</caption>\n        <thead>\n            <tr>\n                <th data-ng-if="selector" class="selector">\n                    <span data-ng-click="methods.toggleAll()">\n                        <i class="material-icons text-primary" data-ng-if="selected.length == items.length">check_box</i>\n                        <i class="material-icons text-primary" data-ng-if="selected.length > 0 && selected.length < items.length">indeterminate_check_box</i>\n                        <i class="material-icons text-muted" data-ng-if="selected.length == 0">check_box_outline_blank</i>\n                    </span>\n                </th>\n                <th ng-repeat="column in columns" data-ng-click="methods.sortBy(column, methods.inverseWay(column))">\n                    <div class="d-flex align-items-center">\n                        <span>{{column| translate}}</span>\n                        <i data-ng-if="view.dimension == column && view.way == \'desc\'" class="material-icons">arrow_downward</i>\n                        <i data-ng-if="view.dimension == column && view.way == \'asc\'" class="material-icons">arrow_upward</i>\n                        <i data-ng-if="view.dimension != column" class="material-icons text-muted">arrow_drop_down</i>\n                    </div>\n                </th>\n                <th data-ng-if="options.length" class="options"></th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr data-ng-repeat="item in items| orderBy: methods.order() track by $index">\n                <td data-ng-if="selector" class="selector">\n                    <span data-ng-click="methods.toggle(item)">\n                        <i class="material-icons text-primary" data-ng-if="item.isChecked">check_box</i>\n                        <i class="material-icons text-muted" data-ng-if="!item.isChecked">check_box_outline_blank</i>\n                    </span>\n                </td>\n                <td data-ng-repeat="column in columns" data-ng-click="methods.eventClick(item)" data-ng-mouseover="methods.eventHover(item)">{{item[column]}}</td>\n                <td data-ng-if="options.length" class="options">\n                    <span class="btn-group" uib-dropdown dropdown-append-to-body>\n                        <a href data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\n                            <i class="material-icons">more_vert</i>\n                        </a>\n                        <ul class="dropdown-menu dropdown-menu-right">\n                            <a class="dropdown-item" data-ng-repeat="option in options" href="javascript:;" data-ng-click="methods.optionClick(item, option)">{{option.label}}</a>\n                        </ul>\n                    </span>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n\n    <akk-alert title="{{\'Aucun r\xE9sultat trouv\xE9 !\'| translate}}" data-ng-if="!items.length"></akk-alert>\n</div>\n');
$templateCache.put('templates/akk-datepicker.html','<div class="form-group {{!view.isValid ? \'has-error\' : \'\'}}">\n    <label class="control-label" ng-if="label">\n        <i ng-if="!view.isValid" class="material-icons md-14">warning</i>\n        {{label}}\n        <sup ng-if="req">*</sup>\n    </label>\n    <div class="form-control d-flex align-items-center justify-content-between">\n        <span class="input-search" ng-if="model != null" ng-click="methods.datepicker()">\n            {{model | dateShortFormat}}\n        </span>\n        <em ng-if="model == null" class="text-secondary" ng-click="methods.datepicker()">{{\'Ind\xE9fini\' | translate}}</em>\n        <i class="material-icons md-24 ml-auto" ng-click="methods.datepicker()">event</i>\n        <i class="material-icons md-24 ml-1" ng-if="model != null" ng-click="methods.clear()">clear</i>\n    </div>\n</div>');
$templateCache.put('templates/akk-input-int.html','<div class="form-group well {{elementclass}}">\n    <div class="row">\n        <div class="col-md-6">\n            <p>{{label}}</p>\n        </div>\n        <div class="col-md-2">\n            <button type="button" class="btn btn-link" ng-click="substract()">\n                <i class="material-icons">remove</i>\n            </button>\n        </div>\n        <div class="col-md-2">  \n            <p>{{model}}/{{max}}</p>\n        </div>\n        <div class="col-md-2">\n            <button type="button" class="btn btn-link" ng-click="add()">\n                <i class="material-icons">add</i>\n            </button>\n        </div>\n    </div>\n</div>');
$templateCache.put('templates/akk-input.html','<div class="form-group form-input" ng-class="!isValid ? \'has-error\' : \'\'">\n    <label class="control-label"><i ng-if="!isValid" class="material-icons md-14">warning</i> {{label}} <sup ng-if="req">*</sup></label>\n    <input type="{{type}}" class="form-control" ng-class="elementclass" placeholder="{{placeholder}}" step="{{step}}" ng-model="model" ng-required="{{req}}" ng-blur="checkValidity()"/>\n</div>');
$templateCache.put('templates/akk-loader.html','<div class="loader">\n    <div data-ng-show="loading" class="loader-container">\n        <div class="loader-spinner"></div>\n        <div class="loader-info">{{\'Loading...\' | translate}}</div>\n    </div>\n    <div data-ng-show="!loading" data-ng-transclude></div>\n</div>');
$templateCache.put('templates/akk-multiselect.html','<div class="form-group">\n    <label class="control-label" ng-if="view.label">{{view.label}}</label>\n    <div class="form-control d-flex align-items-center justify-content-between" ng-click="methods.open()">\n        <span ng-if="view.selected.length">\n            {{view.selected.length}} <span>selected</span>\n        </span>\n        <span ng-if="!view.selected.length" class="text-secondary">{{view.placeholder}}</span>\n        <i class="material-icons md-18">arrow_drop_down</i>\n    </div>\n</div>\n');
$templateCache.put('templates/akk-radio.html','<div class="form-group form-radio {{!view.isValid ? \'has-error\' : \'\'}}">\n    <label class="control-label"><i data-ng-if="!view.isValid" class="material-icons md-14">warning</i> {{label}} <sup ng-if="req">*</sup></label>\n    <div class="d-flex align-items-center {{elementclass}}" data-ng-repeat="option in options track by $index" data-ng-click="methods.select(option)">\n        <div data-ng-if="(property && model == option[property]) || (!property && methods.checkEqualsModel(option) )"><i class="material-icons text-primary">radio_button_checked</i></div>\n        <div data-ng-if="(property && model != option[property]) || (!property && !methods.checkEqualsModel(option) )"><i class="material-icons text-muted">radio_button_unchecked</i></div>\n        <div class="ml-1">{{option.name}}</div>\n    </div>\n</div>\n');
$templateCache.put('templates/akk-select.html','<div class="form-group form-select {{!view.isValid ? \'has-error\' : \'\'}}">\n    <label class="control-label d-flex">\n        <i ng-if="!view.isValid" class="material-icons md-14">warning</i>\n        <div class="ml-1">{{label}}</div>\n        <sup ng-if="req">*</sup>\n    </label>\n    <select class="form-control {{elementclass}}" ng-options="option{{value != null ? \'[value]\' : \'\'}} as option{{display != null ? \'[display]\' : \'\'}} for option in options{{value == null && display != null ? \' track by option.id\' : \'\'}}" ng-model="model" ng-required="{{req}}" ng-blur="methods.checkValidity()" ng-change="methods.change()">\n        <option value="" ng-if="defaultDisplayEnabled" selected>{{defaultDisplay}}</option>\n    </select>\n</div>\n');
$templateCache.put('templates/akk-selectandsearch.html','<div class="form-group {{!view.isValid ? \'has-error\' : \'\'}}">\n    <label class="control-label" ng-if="label">\n        <i ng-if="!view.isValid" class="material-icons md-14">warning</i>\n        {{label}}\n        <sup ng-if="req">*</sup>\n    </label>\n    <div class="form-control d-flex align-items-center justify-content-between">\n        <input type="hidden" ng-model="view.item.id" ng-required="{{req}}" />\n        <span class="input-search" ng-if="view.item != null" ng-click="methods.wizard()">\n            <span ng-repeat="field in fields"><span ng-if="!view.item[field]">{{field}}</span><span ng-if="view.item[field]">{{view.item[field]}}</span></span>\n        </span>\n        <em ng-if="view.item == null" class="text-secondary" ng-click="methods.wizard()">{{placeholder}}</em>\n        <i class="material-icons md-24 ml-auto" ng-click="methods.wizard()" role="button">more_horiz</i>\n        <i class="material-icons md-24 ml-1" ng-if="add != null" ng-click="methods.add()">add</i>\n    </div>\n</div>');
$templateCache.put('templates/akk-selector.html','<div class="form-group {{!view.isValid ? \'has-error\' : \'\'}}">\n    <label class="control-label" ng-if="label">\n        <i ng-if="!view.isValid" class="material-icons md-14">warning</i>\n        <sup ng-if="req">*</sup>\n    </label>\n    <div class="form-control d-flex align-items-center justify-content-between">\n        <input type="hidden" ng-model="view.item.id" ng-required="{{req}}" />\n        <span class="input-search" ng-if="view.item != null" ng-click="methods.wizard()">\n            {{model[property]}}\n        </span>\n        <em ng-if="view.item == null" class="text-secondary" ng-click="methods.wizard()">{{placeholder}}</em>\n        <i class="material-icons md-24 ml-auto" ng-click="methods.wizard()" role="button">keyboard_arrow_right</i>\n    </div>\n</div>');
$templateCache.put('templates/akk-switch.html','<div class="form-group form-switch {{elementclass}}" data-ng-click="methods.toggle()">\n    <div class="d-flex align-items-center" data-ng-class="alignment == \'center\' ? \'justify-content-center\' : \'justify-content-between\'">\n        <div data-ng-if="alignment == \'left\' || alignment == \'center\'" data-ng-class="size != null ? \'switch-\' + size : \'\'">\n            <div class="d-flex switch-box" data-ng-class="model[property] ? \'switch-active justify-content-end\' : \'justify-content-start\'">\n                <div class="switch-handle">\n                    <i class="material-icons text-primary" data-ng-if="model[property] && size != null">check</i>\n                </div>\n            </div>\n        </div>\n        <div data-ng-if="alignment != \'center\'" data-ng-class="alignment == \'left\' ? \'text-right\' : \'\';">\n            {{label}}\n        </div>\n        <div data-ng-if="alignment == \'right\'" data-ng-class="size != null ? \'switch-\' + size : \'\'">\n            <div class="d-flex switch-box" data-ng-class="model[property] ? \'switch-active justify-content-end\' : \'justify-content-start\'">\n                <div class="switch-handle">\n                    <i class="material-icons text-primary" data-ng-if="model[property] && size != null">check</i>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n');
$templateCache.put('templates/akk-textarea.html','<div class="form-group form-textarea" ng-class="!isValid ? \'has-error\' : \'\'">\n    <label class="control-label"><i ng-if="!isValid" class="material-icons md-14">warning</i> {{label}} <sup ng-if="req">*</sup></label>\n    <textarea class="form-control" ng-class="elementclass" placeholder="{{placeholder}}" ng-model="model" rows="{{size}}" ng-required="{{req}}" ng-blur="checkValidity()"></textarea>\n</div>');
$templateCache.put('templates/akk-tree-item.html','<li ng-class="view.item.childs != undefined ? \'has-child\' : \'\'" class="tree-item d-flex flex-column">\n    <div class="d-flex align-items-center">\n        <i ng-if="view.item.childs && view.item.childs.length > 0 && view.item.isShown" ng-click="methods.toggle(view.item)" class="material-icons">expand_more</i>\n        <i ng-if="view.item.childs && view.item.childs.length > 0 && !view.item.isShown" ng-click="methods.toggle(view.item)" class="material-icons">chevron_right</i>\n        <i ng-if="!view.item.childs || view.item.childs.length == 0" ng-click="methods.toggle(view.item)" class="material-icons text-muted">bookmark</i>\n        \n        <i ng-if="view.item.isChecked" ng-click="methods.check(view.item)" class="material-icons text-primary">check_box</i>\n        <i ng-if="view.item.isPartialyChecked && !view.item.isChecked" ng-click="methods.check(view.item)" class="material-icons text-muted">indeterminate_check_box</i>\n        <i ng-if="!view.item.isChecked  && !view.item.isPartialyChecked" ng-click="methods.check(view.item)" class="material-icons text-muted">check_box_outline_blank</i>\n        \n        <a href="javascript:;" ng-if="view.item.childs && view.item.childs.length > 0" ng-click="methods.toggle(view.item)">\n            {{view.item.label}}\n        </a>\n        \n        <span ng-if="view.item.childs && view.item.childs.length > 0">\n            ({{view.item.childs.length}})\n        </span>\n        \n        <span ng-if="!view.item.childs || view.item.childs.length == 0">\n            {{view.item.label}}\n        </span>\n    </diV>\n\n    <ul ng-if="view.item.childs && view.item.childs.length > 0" ng-show="view.item.isShown">\n        <akk-tree-item item="child" ng-repeat="child in view.item.childs"></akk-tree-item>\n    </ul>\n</li>');
$templateCache.put('templates/akk-tree.html','<div class="form-group form-tree">\n    <div class="pull-right">\n        <a href="javascript:;" ng-click="methods.expandAll()" translate>Tout ouvrir</a>\n        <span> | \n            <a href="javascript:;" ng-click="methods.inpandAll()" translate>Tout fermer</a>\n        </span>\n        <span> |\n            <a href="javascript:;" ng-click="methods.selectAll()" translate>Tout s\xE9lectionner</a>\n        </span>\n        <span> |\n            <a href="javascript:;" ng-click="methods.unselectAll()" translate>Tout d\xE9s\xE9lectionner</a>\n        </span>\n\n        <span ng-if="options.debug && options.debug == true"> |\n            <a href="javascript:;" ng-click="methods.debug()" translate>Debug</a>\n        </span>\n    </div>\n    <div class="h4" ng-if="view.title">\n        {{view.title}}\n    </div>\n    <ul>\n        <akk-tree-item item="item" ng-repeat="item in view.items"></akk-tree-item>\n    </ul>\n    <div ng-if="options.debug && options.debug == true">\n        Model debug\n        <div class="row">\n            <div class="col">\n                <pre>{{view.items| json}}</pre>\n            </div>\n            <div class="col">\n                <pre>{{model| json}}</pre>\n            </div>\n        </div>\n    </div>\n</div>');
$templateCache.put('templates/modals/akk-datepicker-modal-month.html','<div ng-switch="datepickerMode">\n    <div uib-daypicker ng-switch-when="day" tabindex="0" class="uib-daypicker" template-url="templates/overload/datepicker/day.html"></div>\n    <div uib-monthpicker ng-switch-when="month" tabindex="0" class="uib-monthpicker" template-url="templates/overload/datepicker/month.html"></div>\n    <div uib-yearpicker ng-switch-when="year" tabindex="0" class="uib-yearpicker" template-url="templates/overload/datepicker/year.html"></div>\n</div>');
$templateCache.put('templates/modals/akk-datepicker-modal.html','<div class="modal-header">\n    <h5 class="modal-title" id="datetimePickerModalLabel">{{view.title}}</h5>\n    <button type="button" class="close" ng-click="methods.cancel()">\n        <span aria-hidden="true">\n            <i class="material-icons md-24">clear</i>\n        </span>\n    </button>\n</div>\n<div class="modal-body">\n    <div uib-datepicker\n         ng-model="view.datetime"\n         datepicker-options="view.datepickerOptions"\n         template-url="templates/modals/akk-datepicker-modal-month.html">\n    </div>\n</div>\n<div class="modal-footer">\n    <button type="button" ng-click="methods.cancel()" class="btn btn-link" data-dismiss="modal" translate>Close</button>\n    <button type="button" ng-click="methods.valid()" class="btn btn-primary" translate>Select</button>\n</div>\n');
$templateCache.put('templates/modals/akk-multiselect-modal.html','<div class="modal-header">\n    <h4 class="modal-title">{{view.placeholder}}</h4>\n    <button type="button" class="close" data-ng-click="methods.close()" aria-label="Close">\n        <span aria-hidden="true">\n            <i class="material-icons md-24">clear</i>\n        </span>\n    </button>\n</div>\n<div class="modal-body">\n    <div class="row">\n        <div class="col-6">\n            <h5 translate>Selectable items ({{view.items.length}})</h5>\n            <div data-ng-if="view.items.length">\n                <div data-ng-repeat="item in view.items | orderBy:view.field" class="d-flex align-items-center text-secondary" data-ng-click="methods.select(item)">\n                    <i class="material-icons">keyboard_arrow_right</i>\n                    <div class="ml-1">{{item[view.field]}}</div>\n                </div>\n            </div>\n        </div>\n        <div class="col-6">\n            <h5 translate>Selected items ({{view.selected.length}})</h5>\n            <div data-ng-if="view.selected.length">\n                <div data-ng-repeat="item in view.selected | orderBy:view.field" class="d-flex align-items-center text-primary" data-ng-click="methods.unselect(item)">\n                    <i class="material-icons">clear</i>\n                    <div class="ml-1">{{item[view.field]}}</div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n<div class="modal-footer">\n    <button type="button" class="btn btn-default" data-ng-click="methods.cancel()" translate>Cancel</button>\n    <button type="button" class="btn btn-primary" data-ng-click="methods.save()" translate>Save</button>\n</div>\n');
$templateCache.put('templates/modals/akk-selectandsearch-modal-default.html','<span ng-repeat="field in view.fields">\n    <span ng-if="!option[field]">{{field}}</span><span ng-if="option[field]">{{option[field]}}</span>\n</span>');
$templateCache.put('templates/modals/akk-selectandsearch-modal.html','<div class="modal-header">\n    <h4 class="modal-title">{{view.placeholder}}</h4>\n    <button type="button" class="close" ng-click="methods.close()" aria-label="Close">\n        <span aria-hidden="true">\n            <i class="material-icons md-24">clear</i>\n        </span>\n    </button>\n</div>\n<div class="modal-body">\n    <div class="form-group" ng-show="view.options.length > 10">\n        <input type="text" placeholder="{{\'Recherchez...\'| translate}}" ng-model="keywords" akk-auto-focus class="form-control" />\n    </div>\n    <div class="form-options">\n        <ul class="list-group list-group-flush">\n            <li class="list-group-item" ng-repeat="option in view.options| filter: keywords | orderBy:(view.orderBy) ? orderBy : view.fields[0]" ng-click="methods.select(option)" ng-class="view.item.id == option.id ? \'active\':\'\'">\n                <span ng-include="methods.template.get()"></span>\n            </li>\n        </ul>\n    </div>\n</div>\n<div class="modal-footer">\n    <button type="button" class="btn btn-primary" ng-click="methods.valid()" ng-disabled="view.item.id == null" translate>S\xE9lectionner</button>\n</div>');
$templateCache.put('templates/overload/datepicker/datepicker.html','<div ng-switch="datepickerMode">\n    <div uib-daypicker ng-switch-when="day" tabindex="0" class="uib-daypicker" template-url="/apps/brain/templates/components/datepicker/day.html"></div>\n    <div uib-monthpicker ng-switch-when="month" tabindex="0" class="uib-monthpicker" template-url="/apps/brain/templates/components/datepicker/month.html"></div>\n    <div uib-yearpicker ng-switch-when="year" tabindex="0" class="uib-yearpicker" template-url="/apps/brain/templates/components/datepicker/year.html"></div>\n</div>');
$templateCache.put('templates/overload/datepicker/day.html','<div class="d-flex align-items-center justify-content-between">\n    <div>\n        <button type="button" class="btn btn-link" ng-click="move(-1)" tabindex="-1">\n            <i class="material-icons md-18">keyboard_arrow_left</i>\n        </button>\n    </div>\n    <div id="{{::uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" class="h3" ng-click="toggleMode()" ng-disabled="datepickerMode === maxMode" tabindex="-1">\n        {{title}}\n    </div>\n    <div>\n        <button type="button" class="btn btn-link" ng-click="move(1)" tabindex="-1">\n            <i class="material-icons md-18">keyboard_arrow_right</i>\n        </button>\n    </div>\n</div>\n<table class="table table-days" role="grid" aria-labelledby="{{::uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n    <thead>\n        <!--        <tr>\n                    <th>\n                        <button type="button" class="btn btn-link btn-sm pull-left uib-left" ng-click="move(-1)" tabindex="-1">\n                            <i class="material-icons md-18">keyboard_arrow_left</i>\n                        </button>\n                    </th>\n                    <th colspan="{{::5 + showWeeks}}" class="text-center">\n                        <button id="{{::uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-md uib-title" ng-click="toggleMode()" ng-disabled="datepickerMode === maxMode" tabindex="-1">\n                            <strong>{{title}}</strong>\n                            <span class="caret"></span>\n                        </button>\n                    </th>\n                    <th>\n                        <button type="button" class="btn btn-link btn-sm pull-right uib-right" ng-click="move(1)" tabindex="-1">\n                            <i class="material-icons md-18">keyboard_arrow_right</i>\n                        </button>\n                    </th>\n                </tr>-->\n        <tr>\n            <th ng-if="showWeeks" class="text-center"></th>\n            <th ng-repeat="label in ::labels track by $index" class="text-center">\n                <small aria-label="{{::label.full}}">{{::label.abbr}}</small>\n            </th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr class="uib-weeks" ng-repeat="row in rows track by $index">\n            <td ng-if="showWeeks" class="text-center h6">\n                <em>{{ weekNumbers[$index]}}</em>\n            </td>\n            <td ng-repeat="dt in row" class="uib-day text-center" role="gridcell" id="{{::dt.uid}}" ng-class="::dt.customClass">\n                <button type="button" class="btn btn-light"\n                        uib-is-class="\n                        \'btn-primary\' for selectedDt,\n                        \'active\' for activeDt\n                        on dt"\n                        ng-click="select(dt.date)"\n                        ng-disabled="::dt.disabled"\n                        tabindex="-1">\n                    <span ng-class="::{\'text-muted\': dt.secondary}">{{::dt.label}}</span>\n                </button>\n            </td>\n        </tr>\n    </tbody>\n</table>');
$templateCache.put('templates/overload/datepicker/month.html','<table class="table table-condensed" role="grid" aria-labelledby="{{::uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n    <thead>\n        <tr>\n            <th>\n                <button type="button" class="btn btn-link btn-sm pull-left uib-left" ng-click="move( - 1)" tabindex="-1">\n                    <i class="material-icons">keyboard_arrow_left</i>\n                </button>\n            </th>\n            <th colspan="{{::yearHeaderColspan}}" class="text-center">\n                <button id="{{::uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-md uib-title" ng-click="toggleMode()" ng-disabled="datepickerMode === maxMode" tabindex="-1">\n                    <strong>{{title}}</strong>\n                    <span class="caret"></span>\n                </button>\n            </th>\n            <th>\n                <button type="button" class="btn btn-link btn-sm pull-right uib-right" ng-click="move(1)" tabindex="-1">\n                    <i class="material-icons">keyboard_arrow_right</i>\n                </button>\n            </th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr class="uib-months" ng-repeat="row in rows track by $index">\n            <td ng-repeat="dt in row" class="uib-month text-center" role="gridcell"\n                id="{{::dt.uid}}"\n                ng-class="::dt.customClass">\n                <button type="button" class="btn btn-link"\n                        uib-is-class="\n                        \'btn-info\' for selectedDt,\n                        \'active\' for activeDt\n                        on dt"\n                        ng-click="select(dt.date)"\n                        ng-disabled="::dt.disabled"\n                        tabindex="-1"><span>{{::dt.label}}</span></button>\n            </td>\n        </tr>\n    </tbody>\n</table>');
$templateCache.put('templates/overload/datepicker/year.html','<table class="table table-condensed" role="grid" aria-labelledby="{{::uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n    <thead>\n        <tr>\n            <th>\n                <button type="button" class="btn btn-link btn-sm pull-left uib-left" ng-click="move( - 1)" tabindex="-1">\n                    <i class="material-icons">keyboard_arrow_left</i>\n                </button>\n            </th>\n            <th colspan="{{::columns - 2}}" class="text-center">\n                <strong>{{title}}</strong>\n<!--                <button id="{{::uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm uib-title" ng-click="toggleMode()" ng-disabled="datepickerMode === maxMode" tabindex="-1">\n                </button>-->\n            </th>\n            <th>\n                <button type="button" class="btn btn-link btn-sm pull-right uib-right" ng-click="move(1)" tabindex="-1">\n                    <i class="material-icons">keyboard_arrow_right</i>\n                </button>\n            </th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr class="uib-years" ng-repeat="row in rows track by $index">\n            <td ng-repeat="dt in row" class="uib-year text-center" role="gridcell"\n                id="{{::dt.uid}}"\n                ng-class="::dt.customClass">\n                <button type="button" class="btn btn-link"\n                        uib-is-class="\n                        \'btn-info\' for selectedDt,\n                        \'active\' for activeDt\n                        on dt"\n                        ng-click="select(dt.date)"\n                        ng-disabled="::dt.disabled"\n                        tabindex="-1"><span>{{::dt.label}}</span></button>\n            </td>\n        </tr>\n    </tbody>\n</table>');}]);