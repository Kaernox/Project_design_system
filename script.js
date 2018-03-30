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
//        $urlRouterProvider.otherwise('/home');
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

designsystem
        .component('home',
                {
                    templateUrl: 'docs/home.html',
                    controller: [
                        '$scope',
                        function ($scope) {
                        }
                    ]
                }
        )

        .component('components',
                {
                    templateUrl: 'docs/components.html',
                    controller: [
                        '$scope',
                        function ($scope) {

                            $scope.view = {
                                alert: {
                                    model: 'primary',
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
                                checkboxValue: false,
                                checkboxListValue: {
                                    options: ["test1", "test2", "test3", "test4"],
                                    list: [
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
                                    ]
                                },
                                multiselectValue: {
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
                                selectValue: {
                                    model: "",
                                    options: ["one", "two", "three", "four"]
                                },
                                date_created: new Date(),
                                name: "Bob",
                                description: "<p>Youpi pour le HTML</p>",
                                color: "#CC0000",
                                id_type: null,
                                is_nlt: true,
                                switchStatus: true,
                                text: '',
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
                                ],
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
                                        "job": "Président",
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
                                        "job": "Développeur Fullstack",
                                        "location": "Montpellier",
                                        "picture": "9092ecb1086db196daba740f45b3b9ce.jpeg",
                                        "rate_occupation": 0,
                                        "rate_hour": 0,
                                        "id_manager": null,
                                        "date_created": "2017-02-21 14:34:15",
                                        "date_updated": "2018-01-24 15:41:11",
                                        "people_contact": []
                                    }
                                ]
                            };
                            $scope.date = new Date();
                            $scope.color = null;
                            // $scope.options = [{
                            //   id : 1,
                            //   title : 'Title#1',
                            //   label : 'Label#1'
                            // },
                            // {
                            //   id : 2,
                            //   title : 'Title#2',
                            //   label : 'Label#2'
                            // }];

                            $scope.options = null;
                            $scope.color = '#FF0000';
                        }
                    ]
                }
        );

designsystem.run(function($uiRouter) {
});
