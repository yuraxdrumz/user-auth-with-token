(function(){
    angular.module('myApp')
    .service('auth',['$http','$window','Upload',function($http,$window,Upload){
        //set token
        var saveToken = function(token){
            $window.localStorage['mean-token'] = token;
        };
        //get token
        var getToken = function(){
            return $window.localStorage['mean-token'];
        };
        // check if token expired or not
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
        };
        //check if user exists
        var currentUser = function(){
            if(isLoggedIn()){
                var token = getToken();
                var payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);
                return{
                    email:payload.email,
                    name:payload.name,
                    _id:payload._id,
                    image:payload.image
                }
            }
        };
        //upload photo
        var uploadPhoto = function(file,userId){
            return Upload.upload({
                url:'/api/profile/editPhoto',
                method:"POST",
                data:{userId:userId},
                file:file
                }).then(function(res){
                    return saveToken(res.data.token)
                }).catch(function(err){
                    throw err.data
                })
        };
        //update user info
        var updateUser = function(user){
            return $http.post('api/users/update',user).then(function(res){
                return saveToken(res.data.token)
            }).catch(function(err){
                throw err.data
            })
        };
        //register user
        var register = function(user){
            return $http.post('/api/users/register',user).then(function(res){
                return saveToken(res.data.token)
            }).catch(function(err){
                throw err.data
            })
        };
        //login user
        var login = function(user){
            return $http.post('api/users/login',user).then(function(res){
                return saveToken(res.data.token)

            }).catch(function(err){
                throw(err.data.message);
            })
        };
        //logout
        var logout = function() {
            $window.localStorage.removeItem('mean-token');
        };
        return {
            currentUser : currentUser,
            saveToken : saveToken,
            getToken : getToken,
            isLoggedIn : isLoggedIn,
            register : register,
            login : login,
            logout : logout,
            uploadPhoto:uploadPhoto,
            updateUser:updateUser
        };
    }])
})();
