angular.module('todoApp', ['akkurate-design-system'])
        .controller('TodoListController', function ($scope) {

            $scope.view = {
                date_created: new Date(),
                name: "Bob",
                description: "<p>Youpi pour le HTML</p>",
                color: "#CC0000",
                id_type: null,
                is_nlt: true,
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
                    },
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
                    },
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
                    },
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




        });

