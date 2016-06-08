(function(){
    angular.module('myApp')
    .service('auth',['$http','$window','Upload',function($http,$window,Upload){
        var saveToken = function(token){
            $window.localStorage['mean-token'] = token;
        }
        var getToken = function(){
            return $window.localStorage['mean-token'];
        }

        var isLoggedIn = function(){
            var token = getToken();
            var payload;

            if(token){
                payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);
                return payload.exp > Date.now()/1000;
            }else{
                return false
            }
        }

        var currentUser = function(){
            if(isLoggedIn()){
                var token = getToken();
                var payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);
                return{
                    email:payload.email,
                    name:payload.name,
                    userId:payload._id,
                    image:payload.image
                }
            }
        }
        var uploadPhoto = function(file,userId){
            return Upload.upload({
                url:'/api/profile/editPhoto',
                method:"POST",
                data:{userId:userId},
                file:file
                }).then(function(res){
                    return res.data
                },function(err){
                    throw err.status + err.data
                })
        }
        var register = function(user){
            return $http.post('/api/users/register',user).then(function(res){
                return saveToken(res.data.token)
            }).catch(function(err){
                console.log(err.message)
            })
        }
        var login = function(user){
            return $http.post('api/users/login',user).then(function(res){
                return saveToken(res.data.token)

            }).catch(function(err){
                throw err
            })
        }
        var logout = function() {
            $window.localStorage.removeItem('mean-token');
        }
        return {
            currentUser : currentUser,
            saveToken : saveToken,
            getToken : getToken,
            isLoggedIn : isLoggedIn,
            register : register,
            login : login,
            logout : logout,
            uploadPhoto:uploadPhoto
        };
    }])
})()
