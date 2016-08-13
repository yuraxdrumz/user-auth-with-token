(function() {

  angular
    .module('myApp')
    .factory('meanData',['$http','auth',function($http,auth){
        return {
            getProfile : function(){
            return $http.get('/api/profile',{
                headers:{
                    Authorization: 'Bearer ' + auth.getToken()
                }
            })};
        };
    }]);
})();
