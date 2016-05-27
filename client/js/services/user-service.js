(function(){
    angular.module('myApp')
    .factory('users',['$http',function($http){
        return{
            addUser:function(user){
                return $http.post('api/users/login',user).then(function(res){
                    return res.data
                })
            }
        }
    }])
})()
