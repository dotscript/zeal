"use strict";
/**
 * Created by luke on 2/26/16.
 */
angular.module('ionicApp.services', [])

    .factory('$Utils', function () {
        var self = this;

        self.urlEncode = function (items) {

            var str = "";

            for (var key in items) {
                if (str != "") {
                    str += "&";
                }
                str += key + "=" + encodeURIComponent(items[key]);
            }

            return str;
        };

        return self;
    })
    /**
     * Handler for if we are logged in will use http and defer but for now will set flag manually if submitted
     */
    .factory('$user', function ($q, $http, $rootScope, $state) {
        var self = this,
            _loggedin = false,
            _api_key = null,
            _user_id = 0;
        self.auth = function () {
            //@todo pesudo code for http request check with server ang get key

            _loggedin = true;
            _api_key = 'API_KEY';

            if (_loggedin) {
                $rootScope.loggedOut = false;
                _user_id = 0;
                $state.go('eventmenu.home', true);

            }
        };
        self.loggedin = function () {
            return _loggedin;
        };
        self.apiKey = function () {
            return _api_key;
        };
        self.getUserID = function () {
            return _user_id;
        };
        return self;
    })

    .factory('$category', function ($q, $items) {
        var self = this;
        self.itemCategories = [];

        self.getList = function () {
            var defer = $q.defer();
            if (self.itemCategories.length <= 0) {
                //need to pull cats from $Items
                $items.getList().then(function (items) {

                    var tmpCat = [];
                    //save our list & cat
                    items.forEach(function (item, index) {
                        //tmp storage of the cat
                        if (typeof tmpCat[item.item_category] == "undefined") {
                            tmpCat[item.item_category] = '';
                            self.itemCategories.push(item.item_category);
                        }
                        if (index >= items.length - 1)
                            defer.resolve(self.itemCategories);

                    });

                })

            } else
                defer.resolve(self.itemCategories);

            return defer.promise;
        };

        return self;
    })
    /**
     * Factory for storing/retrieving/containing our items from API call
     */

    /**
     *
     * @returns {*} ItemList
     */
    .factory('$items', function ($q, $http, $user, $Utils) {
        var self = this;
        self.itemList = [];  //@todo move to localstorage for longer caching/offline mode
        /**
         * @returns {*} ItemList
         */

        self.getList = function () {
            var defer = $q.defer();
            console.log("self.itemList.length", self.itemList.length)
            if (self.itemList.length <= 0) {
                $http.get('http://zooapi.nzhost.me/items/active').success(function (items) {
                    self.itemList = items.data;
                    //save our list
                    console.log("items response", items)
                    defer.resolve(self.itemList);
                });
            } else {
                console.log("loaded itemList from memory");
                defer.resolve(self.itemList);
            }
            return defer.promise;
        };
        self.seen = function (item_id) {
            var defer = $q.defer();


            $http.get('http://zooapi.nzhost.me/activity/seen/' + item_id + '/?user_id=' + $user.getUserID()).success(function (response) {
                //self.itemList = items.data;
                //save our list
                console.log("seen response", response);
                //pausing response just to test the api headers
                setTimeout(function () {
                    defer.resolve(response);
                }, 1000);

            });

            return defer.promise;
        };
        return self;
    });
