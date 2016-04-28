angular.module('ionicApp.routes', [])

    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('eventmenu', {
                url: "/event",
                abstract: true,
                templateUrl: "templates/event-menu.html"
            })
            .state('eventmenu.home', {
                url: "/home",
                views: {
                    'menuContent': {
                        templateUrl: "templates/home.html",
                        controller: "home"
                    }
                }
            })
            .state('eventmenu.login', {
                url: "/login",
                views: {
                    'menuContent': {
                        templateUrl: "templates/login.html",
                        controller: "login"
                    }
                }
            });

        $urlRouterProvider.otherwise("/event/home");

        // if none of the above states are matched, use this as the fallback


    });