(function(){
    angular.module('myApp')
    .filter('fromNow',function(){
        return function(input){
            return moment(input).fromNow()
        }
    })
})()
