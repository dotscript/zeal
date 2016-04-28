angular.module('ionicApp', ['ionic', 'ionicApp.routes', 'ionicApp.controllers', 'ionicApp.services', 'ionicApp.directive', 'ionic.contrib.drawer'])
    .run(function ($rootScope, $ionicSideMenuDelegate, $ionicLoading, $category) {
        // $rootScope.$ionicSideMenuDelegate = $ionicSideMenuDelegate;
        $rootScope.$on('loading:show', function () {
            $ionicLoading.show({ template: 'Loading..' })
        });

        $rootScope.$on('loading:hide', function () {
            $ionicLoading.hide()
        });
        var firstAttempt = true;
        $rootScope.$on('loading:failed', function () {

            $ionicLoading.hide();
            if (firstAttempt) {
                firstAttempt = false;
                $ionicLoading.show({ template: 'Sorry can not connect to server, please connect to the internet..' });
                //load from file goes here
                //$settings.set_api('http://222.154.255.80:210');
                setTimeout(function () {
                   
                    //$rootScope.refresh();
                }, 3000)
                
            } else $ionicLoading.show({ template: 'Sorry can not connect, please connect to the internet and try again..'});

        });

        $rootScope.loggedOut = true;
        $rootScope.categories = [];

        $category.getList().then(function (response) {
            console.log("response", response);
            $rootScope.categories = response;
        });
    })
    .config(function ($httpProvider, $stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        $httpProvider.interceptors.push(function ($rootScope,$q) {
            return {
                request: function (config) {
                    $rootScope.$broadcast('loading:show');
                    return config
                },
                response: function (response) {
                    $rootScope.$broadcast('loading:hide');
                    return response
                },
                responseError: function (rejection) {
                    // do something on error
                    /*
                     if (canRecover(rejection)) {
                     return responseOrNewPromise
                     }*/

                    $rootScope.$broadcast('loading:failed');

                    //return $q.reject(rejection);
                    console.log("rejection", rejection);
                    return $q.reject(rejection);
                }
            }
        })


    });
