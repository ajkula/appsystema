var header = {'Content-Type': 'application/json'};
var postUrl = 'https://api-rest-1.herokuapp.com/api/cercle/'
console.log(Date.now())

angular.module('TestApp', []);

angular.module('TestApp')
    .controller('MainController', function($scope, $http) {
    $scope.students = students;
    $scope.obj = {};
    $scope.pass = function(data) {
        console.log(data);
        $scope.obj = data;
    }

    $scope.new = function(data) {
        data.isDeleted = data.isDeleted == ( "true" || "True" || "oui" || "Oui" || "yes" || "Yes" )
        data.yearSubscription = data.yearSubscription == ( "true" || "True" || "oui" || "Oui" || "yes" || "Yes" )
        data.trimesterSubscription = data.trimesterSubscription == ( "true" || "True" || "oui" || "Oui" || "yes" || "Yes" )

        $http.post(postUrl, data, header)
        .then(function(response){
            console.log(response);
        }).catch(function(err){
            alert(JSON.stringify(err));
        })
    }
 
    $scope.update = function(data) {
        data.isDeleted = data.isDeleted == ( "true" || "True" || "oui" || "Oui" || "yes" || "Yes" )
        data.yearSubscription = data.yearSubscription == ( "true" || "True" || "oui" || "Oui" || "yes" || "Yes" )
        data.trimesterSubscription = data.trimesterSubscription == ( "true" || "True" || "oui" || "Oui" || "yes" || "Yes" )

        $http.put(postUrl+data._id, data, header)
        .then(function(response){
            console.log(response);
        }).catch(function(err){
            alert(JSON.stringify(err));
        });
    }
});




//  res.header("Access-Control-Allow-Origin", "*");
//    res.header("Access-Control-Allow-Headers",
//   "Origin, X-Requested-With, Content-Type, Accept");s

/*
obj.fullName
obj.birthdate
obj.phone
obj.personne
obj.club
obj.lessons
obj.email
obj.notes
obj.subscriptionDate
obj.trimesterSubscription
obj.yearSubscription
obj.isDeleted
*/