(function(){
    angular.module('myApp')
    .filter('fromNow',function(){
        //moment js filter to format date
        return function(input){
            return moment(input).fromNow()
        }
    })
})();
