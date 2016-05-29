(function(){
    angular.module('myApp')
    .factory('users',['$http',function($http){
        return{
            addUser:function(user){
                return $http.post('api/users/login',user).then(function(res){
                    return res.data
                },function(err){
                    throw err.status + err.data
                })
            },
            registerUser:function(user){
                return $http.post('/api/users/register',user).then(function(res){
                    return res.data.userId
                },function(err){
                    throw err.status + err.data
                })
            },
            updateUser:function(user){
                return $http.post('api/users/update',user).then(function(res){
                    return res.data
                },function(err){
                    throw err.status + err.data
                })
            }
        }
    }])
})()
