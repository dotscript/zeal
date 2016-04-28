angular.module('ionicApp.controllers', [])
    .controller('home', function ($scope, $state, $ionicSideMenuDelegate, $ionicHistory, $items, $user,$rootScope) {

        $scope.items = [];
        //load list of items
        $items.getList().then(function (theList) {
            $scope.items = theList;
        });

        $scope.viewItem = function (itemId) {

            if ($user.loggedin()) {
                $items.seen(itemId).then(function(response){
                    console.log("seen response",response);
                    if (response.success == true) return alert("Nice... have added!")
                })
            } else
                return alert("Need to login")
        }
    })
    .controller('login', function ($scope, $user, $state) {
        console.log("login form");
        $scope.signIn = function () {
            //faking logged in
            $user.auth();

        }


    }); 




