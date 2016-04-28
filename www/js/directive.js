angular.module('ionicApp.directive', ['ngSanitize'])
    .directive('drawerToggle', function ($ionicHistory) {
        return {
            restrict: 'AC',
            controller: "drawerCtrl",
            link: function ($scope, $element, $attr, ctrl) {
                console.log("ctrl", ctrl)
                $element.bind('click', function () {
                    $scope.toggleDrawer();
                    //ctrl.open();
                });
            }
        };
    })
    .directive('drawerClose', function ($ionicHistory) {
        return {
            restrict: 'AC',
            controller: "drawerCtrl",
            link: function ($scope, $element, $attr, ctr) {
                $element.bind('click', function () {
                    $ionicHistory.nextViewOptions({
                        historyRoot: true,
                        disableAnimate: true,
                        expire: 300
                    });

                    $scope.closeDrawer();
                    //ctrl.close();
                });
            }
        };
    })
  .directive("tinyBarMenu", function() {
        return {
            restrict: "E",
            replace: true,
            transclude: true,
            templateUrl: "templates/tinyMenuBar.html",
            compile: function(element, attrs) {
            }
        }});
