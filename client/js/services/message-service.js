(function(){
    angular.module('myApp')
    .factory('MessageCreator',['$http',function($http){
    return {
        postMessage: function (message, callback) {
            $http.post('/message', message)
            .success(function(data, status){
                callback(data, false);
            }).
            error(function(data, status) {
                callback(data, true);
            });
        }
    }
}])
})()
