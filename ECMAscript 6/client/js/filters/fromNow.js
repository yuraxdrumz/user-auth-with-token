(()=>{
    angular.module('myApp')
    .filter('fromNow',()=>{
        //moment js filter to format date
        return (input)=>{
            return moment(input).fromNow()
        }
    })
})();
