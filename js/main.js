// cerating an angularjs module
var myApp = angular.module('myApp', ['ngRoute']);

// configuration includes whitelist of uor resourses, and routes, which act as redirection mechanism
myApp.config(function($sceDelegateProvider, $routeProvider){  
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        '*://www.youtube.com/**'
    ]);

    $routeProvider.
    when('/',{
        templateUrl: 'pages/main.html',
        controller : 'mainController'
    }).   
    when('/details',{
        templateUrl : 'pages/details.html',
        controller : 'detailsController'
    }).
    otherwise({
        redirectTo : '/' 
    });
    
});

// This service is used to grab data from the json file
myApp.service('rides', ['$http',function($http){
    var rides = [];
    var self = this;
    var selectedCoaster = {};
    
    this.getCoasters = function(){
        // our ajax call to the json file
        $http.get('data/coasters.json').then(function(response){
            self.rides = response.data; 
        });
        return self.rides;
    };  
}]);

// this controller is responsible for scripts on the main page
myApp.controller('mainController',['$scope', '$location', 'rides', function($scope, $location, rides){
    $scope.coasters = rides.getCoasters(); 
    
    $scope.showInfo = function(coaster){
        rides.selectedCoaster = coaster;
        $location.path("/details");
    }
}]);

// this controller is responsible for scripts on the details page
myApp.controller('detailsController',['$scope','$location', 'rides', function($scope,$location,rides){
    $scope.coaster = rides.selectedCoaster;
    $scope.povUrl = $scope.coaster.pov;
    $scope.offRideUrl = $scope.coaster.off_ride;
    
    $scope.goBack = function(){
        $location.path("/");
    };
}]);
