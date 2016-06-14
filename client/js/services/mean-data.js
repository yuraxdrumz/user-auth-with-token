(function() {

  angular
    .module('myApp')
    .service('meanData',['$http','auth',function($http,auth){
        var getProfile = function(){
            return $http.get('/api/profile',{
                headers:{
                    Authorization: 'Bearer ' + auth.getToken()
                }
            })
        };
        return {
            getProfile : getProfile
        };
    }]);


})();
