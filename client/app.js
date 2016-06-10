(function(){
    angular.module('myApp',['ui.router','ngFileUpload','ngMessages'])

    function config ($stateProvider,$urlRouterProvider){

        $urlRouterProvider.otherwise('/');
        $stateProvider
        .state('main',{
            url:'/',
            controller:'mainController',
            templateUrl:'client/main/main.html'

        })
        .state('register',{
            url:'/register',
            templateUrl:'client/register/register.html',
            controller:'regController'
        })
        .state('profile',{
            url:'/profile',
            templateUrl:'client/profile/profile.html',
            controller:'profileController'
        })

        .state('chat',{
            url:'/chat',
            templateUrl:'client/chat/chat.html',
            controller:'chatController'
        })

    }
      angular
    .module('myApp')
    .config(['$stateProvider', '$urlRouterProvider', config])

})()
