(()=> {
  angular
    .module('myApp')
    .service('meanData',['$http','auth',($http,auth)=>{
        return {
            getProfile : ()=>{
                return $http.get('/api/profile',{
                    headers:{
                        Authorization: 'Bearer ' + auth.getToken()
                    }
                })
            }
        }
    }])
})()
