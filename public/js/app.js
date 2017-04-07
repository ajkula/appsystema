var header = {'Content-Type': 'application/json'};
var postUrl = 'https://api-rest-1.herokuapp.com/api/cercle/'
// var postUrl = 'http://localhost:1337/api/cercle/'
console.log(Date.now())

angular.module('TestApp', []);

angular.module('TestApp')
    .controller('MainController', function($scope, $http) {
        $scope.loaded = false;
        
    $scope.obj = {};

    var getStudents = function(postUrl){
        $http.get(postUrl).then(function (response) {
                $scope.students = [];
                angular.forEach(response.data, function (student) {
                    $scope.students.push(student);
                });
                
                $scope.loaded = true;
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    getStudents(postUrl);

    $scope.pass = function(data) {
       // console.log(data);
        $scope.obj = data;

    }

    $scope.new = function(data) {
        isSet(data);

        $http.post(postUrl, data, header)
        .then(function(response){
            data._id = response.data._id
          //  console.log(data);
        })
        .then(getStudents(postUrl))
        .catch(function(err){
            alert(JSON.stringify(err));
        })
    }
 
    $scope.update = function(data) {
        isSet(data);

        $http.put(postUrl+data._id, data, header)
        .then(function(response){
         //   console.log(response);
        })
        .then(getStudents(postUrl))
        .catch(function(err){
            alert(JSON.stringify(err));
        });
    }

    function isSet(data) {
        data.isDeleted = data.isDeleted == ( "true" || "True" || "oui" || "Oui" || "yes" || "Yes" )
        data.yearSubscription = data.yearSubscription == ( "true" || "True" || "oui" || "Oui" || "yes" || "Yes" )
        data.trimesterSubscription = data.trimesterSubscription == ( "true" || "True" || "oui" || "Oui" || "yes" || "Yes" )
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