(()=>{
    angular.module('myApp')
    .factory('MessageCreator',['$http',($http)=>{
    return {
        postMessage: (message, callback)=> {
            $http.post('/message', message)
            .success((data, status)=>{
                callback(data, false);
            }).
            error((data, status)=> {
                callback(data, true);
            })
        }
    }
}])
})()
