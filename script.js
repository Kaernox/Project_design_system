var designsystem = angular.module('AkkurateDesignSystem', ['akkurate-design-system', 'ui.router']);

designsystem.config([
    '$provide',
    '$stateProvider',
    '$urlRouterProvider',
    'NotificationProvider',
    function ($provide, $stateProvider, $urlRouterProvider, NotificationProvider) {

        /**
         * Colorpicker configuration
         */
        $provide.decorator('ColorPickerOptions', function ($delegate) {
            var options = angular.copy($delegate);
            options.round = true;
            options.alpha = false;
            options.format = 'hex';
            return options;
        });

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

//        /**
//         * Routes configuration
//         */
        $urlRouterProvider.otherwise('/home');
//
//        /**
//         *  ROOT DEFAULT STATES
//         */
//        $stateProvider.state('root', {
//            url: '',
//            abstract: true,
//            views: {
//                main: {
//                    templateUrl: 'docs/main.html',
//                    controller: 'mainCtrl'
//                },
//                navbar: {
//                    templateUrl: 'docs/navbar.html',
//                    controller: 'navbarCtrl'
//                }
//            }
//        });

        $stateProvider.state({
            name: 'home',
            url: '',
            component: 'home'
        });

        $stateProvider.state({
            name: 'components',
            url: '/components',
            component: 'components'
        });

    }
]);

designsystem.component('home', {
    templateUrl: 'docs/home.html',
    controller: [
        '$scope',
        function ($scope) {
        }
    ]
})
        .component('components', {
            templateUrl: 'docs/components.html',
            controller: [
                '$scope',
                function ($scope) {
                    $scope.methods = {
                        toggleValueDisplay: function () {
                            angular.element(".show-value").toggleClass("d-none");
                        }
                    };

                    $scope.view = {
                        // Data for the akk-acceptance directive, it will contain either true or false
                        acceptanceValue: true,
                        // Data for costumizing the akk-alert directive,  changing the alert type is doable by  select a value in the akk-select directive above
                        alert: {
                            model: 'primary',
                            isDisplayed: true,
                            isClosable: false,
                            types: [
                                {
                                    key: 'primary',
                                    label: 'Primary'
                                },
                                {
                                    key: 'secondary',
                                    label: 'Secondary'
                                },
                                {
                                    key: 'success',
                                    label: 'Success'
                                },
                                {
                                    key: 'warning',
                                    label: 'Warning'
                                },
                                {
                                    key: 'danger',
                                    label: 'Danger'
                                },
                                {
                                    key: 'info',
                                    label: 'Info'
                                },
                                {
                                    key: 'light',
                                    label: 'Light'
                                },
                                {
                                    key: 'dark',
                                    label: 'Dark'
                                }
                            ]
                        },
                        // Data for the akk-checkbox directive, it will contain either true or false
                        checkboxValue: false,
                        // Data for the akk-checkbox-list directive
                        checkboxList: {
                            options: ["test1", "test2", "test3", "test4"],
                            selectedItems: []
                        },
                        // The selected color in the akk-colorpicker directive
                        color: "#CC0000",
                        // The date selected in the akk-datepicker directive will be stored here
                        date_created: new Date(),
                        // The text entered in the akk-input directive will be stored here
                        inputValue: "Bob",
                        // Data for the akk-multiselect directive
                        loading: {
                            isDisplayed: false
                        },
                        // Data for the akk-multiselect directive
                        multiselect: {
                            placeholder: "My placeholder",
                            list: [],
                            items: [
                                {
                                    id: 1,
                                    name: 'test 1',
                                    value: true
                                },
                                {
                                    id: 2,
                                    name: 'test 2',
                                    value: false
                                },
                                {
                                    id: 3,
                                    name: 'test 3',
                                    value: false
                                },
                                {
                                    id: 4,
                                    name: 'test 4',
                                    value: false
                                }
                            ],
                            selected: [],
                            field: "name"
                        },
                        // Data for the akk-radio directive
                        radio: {
                            label: 'radio',
                            value: null,
                            list: [],
                            items: [
                                {
                                    id: 1,
                                    name: 'test 1',
                                    value: true
                                },
                                {
                                    id: 2,
                                    name: 'test 2',
                                    value: false
                                },
                                {
                                    id: 3,
                                    name: 'test 3',
                                    value: false
                                },
                                {
                                    id: 4,
                                    name: 'test 4',
                                    value: false
                                }
                            ],
                        },
                        // Data for the akk-select directive, the selected value will be stored in the model property
                        select: {
                            model: "",
                            options: ["one", "two", "three", "four"]
                        },
                        // The akk-selectandsearch values
                        selectAndSearch: {
                            selectedId: null,
                            // These items are used in akk-selectandsearch directive and in akk-datagrid directive
                            items: [
                                {
                                    "id": 2,
                                    "firstname": "Julien",
                                    "lastname": "Herrera",
                                    "job": "Lead developer",
                                    "location": "Lunel",
                                    "picture": "498c5eed6c4437be7f7b1a54e5169a1d.jpeg",
                                    "rate_occupation": 0,
                                    "rate_hour": 0,
                                    "id_manager": null,
                                    "date_created": "2017-02-21 15:53:21",
                                    "date_updated": "2018-02-01 10:08:44",
                                    "people_contact": []
                                },
                                {
                                    "id": 4,
                                    "firstname": "Lacombe",
                                    "lastname": "Olivier",
                                    "job": "President",
                                    "location": "Montpellier",
                                    "picture": null,
                                    "rate_occupation": 0,
                                    "rate_hour": 0,
                                    "id_manager": null,
                                    "date_created": "2017-07-06 22:59:07",
                                    "date_updated": "2018-01-23 13:56:38",
                                    "people_contact": []
                                },
                                {
                                    "id": 1,
                                    "firstname": "Mehdi",
                                    "lastname": "Salmi",
                                    "job": "Fullstack developer",
                                    "location": "Montpellier",
                                    "picture": "9092ecb1086db196daba740f45b3b9ce.jpeg",
                                    "rate_occupation": 0,
                                    "rate_hour": 0,
                                    "id_manager": null,
                                    "date_created": "2017-02-21 14:34:15",
                                    "date_updated": "2018-01-24 15:41:11",
                                    "people_contact": []
                                },
                                {
                                    "id": 3,
                                    "firstname": "Alexandra",
                                    "lastname": "Colomer",
                                    "job": "Administrative assistant",
                                    "location": "Montpellier",
                                    "picture": "9092ecb108d56df6daba749f45b3b9ce.jpeg",
                                    "rate_occupation": 0,
                                    "rate_hour": 0,
                                    "id_manager": null,
                                    "date_created": "2018-02-21 14:34:15",
                                    "date_updated": "2018-03-24 15:41:11",
                                    "people_contact": []
                                },
                                {
                                    "id": 5,
                                    "firstname": "Benjamin",
                                    "lastname": "Benjamin",
                                    "job": "Fullstack intern",
                                    "location": "Montpellier",
                                    "picture": "adfhncb108d56df6daba740f45b3b9ce.jpeg",
                                    "rate_occupation": 0,
                                    "rate_hour": 0,
                                    "id_manager": null,
                                    "date_created": "2018-01-11 14:34:15",
                                    "date_updated": "2018-02-16 15:41:11",
                                    "people_contact": []
                                },
                                {
                                    "id": 6,
                                    "firstname": "Moatez",
                                    "lastname": "Mkhinini",
                                    "job": "Backend intern",
                                    "location": "Paris",
                                    "picture": "9092ecb108d56df6daba740f45b3b9ce.jpeg",
                                    "rate_occupation": 0,
                                    "rate_hour": 0,
                                    "id_manager": null,
                                    "date_created": "2018-02-21 14:34:15",
                                    "date_updated": "2018-03-24 15:41:11",
                                    "people_contact": []
                                },
                                {
                                    "id": 7,
                                    "firstname": "Dummy1",
                                    "lastname": "Intern1",
                                    "job": "Dummy intern",
                                    "location": "Nice",
                                    "picture": "9092ecb108d56df6dqsa740f45b3b9ce.jpeg",
                                    "rate_occupation": 0,
                                    "rate_hour": 0,
                                    "id_manager": null,
                                    "date_created": "2018-02-21 14:34:15",
                                    "date_updated": "2018-03-24 15:41:11",
                                    "people_contact": []
                                },
                                {
                                    "id": 8,
                                    "firstname": "Dummy2",
                                    "lastname": "Intern2",
                                    "job": "Dummy intern",
                                    "location": "Nice",
                                    "picture": "9092ecb108d56df6dqsa740f45b3b9ce.jpeg",
                                    "rate_occupation": 0,
                                    "rate_hour": 0,
                                    "id_manager": null,
                                    "date_created": "2018-02-21 14:34:15",
                                    "date_updated": "2018-03-24 15:41:11",
                                    "people_contact": []
                                },
                                {
                                    "id": 9,
                                    "firstname": "Dummy3",
                                    "lastname": "Intern3",
                                    "job": "Dummy intern",
                                    "location": "Marseille",
                                    "picture": "9092ecb108d56df6dqsa740f45b3b9ce.jpeg",
                                    "rate_occupation": 0,
                                    "rate_hour": 0,
                                    "id_manager": null,
                                    "date_created": "2018-02-21 14:34:15",
                                    "date_updated": "2018-03-24 15:41:11",
                                    "people_contact": []
                                },
                                {
                                    "id": 10,
                                    "firstname": "Dummy4",
                                    "lastname": "Intern4",
                                    "job": "Dummy intern",
                                    "location": "Paris",
                                    "picture": "9092ecb108d56df6dqsa740f45b3b9ce.jpeg",
                                    "rate_occupation": 0,
                                    "rate_hour": 0,
                                    "id_manager": null,
                                    "date_created": "2018-02-21 14:34:15",
                                    "date_updated": "2018-03-24 15:41:11",
                                    "people_contact": []
                                },
                                {
                                    "id": 11,
                                    "firstname": "Dummy5",
                                    "lastname": "Intern5",
                                    "job": "Dummy intern",
                                    "location": "Marseille",
                                    "picture": "9092ecb108d56df6daba740f45b3b9ce.jpeg",
                                    "rate_occupation": 0,
                                    "rate_hour": 0,
                                    "id_manager": null,
                                    "date_created": "2018-02-21 14:34:15",
                                    "date_updated": "2018-03-24 15:41:11",
                                    "people_contact": []
                                }
                            ]
                        },
                        // Data for the akk-switch directive, it will contain either true or false
                        switchValue: true,
                        // The text entered in the akk-textarea directive will be stored here
                        textareaValue: '',
                        // This is an example representation of what the akk-tree directive is expecting, alll levels of nesting are allowed
                        tree: [
                            {
                                label: 'label 1',
                                value: 'label 1',
                                childs: [
                                    {
                                        label: 'child 1',
                                        value: 'child 1',
                                        childs: [
                                            {
                                                label: 'granchild1',
                                                value: 'granchild1'
                                            }
                                        ]
                                    },
                                    {
                                        label: 'child 2',
                                        value: 'child 2'
                                    }
                                ]
                            },
                            {
                                label: 'label 2',
                                value: 'label 2',
                                childs: [
                                    {
                                        label: 'child 3',
                                        value: 'child 3',
                                        childs: [
                                            {
                                                label: 'granchild2',
                                                value: 'granchild2'
                                            },
                                            {
                                                label: 'granchild3',
                                                value: 'granchild3'
                                            }
                                        ]
                                    },
                                    {
                                        label: 'child 4',
                                        value: 'child 4'
                                    }
                                ]
                            },
                            {
                                label: 'label 3',
                                value: 'label 3',
                                childs: []
                            },
                            {
                                label: 'label 4',
                                value: 'label 4'
                            }
                        ]
                    };

                    $scope.$on('updateAlert', function (event) {
                        console.log('updateAlert', $scope.view.alert.isDisplayed);
                        $scope.view.alert.isDisplayed = true;
                        console.log('updateAlert', $scope.view.alert.isDisplayed);
                    });
                }
            ]
        });

designsystem.run(function ($uiRouter) {
});
