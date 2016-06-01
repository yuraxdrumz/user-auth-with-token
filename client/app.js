(function(){
    angular.module('myApp',['ui.router','ngFileUpload','ngMessages'])
    .config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){

        $urlRouterProvider.otherwise('/');
        $stateProvider
        .state('main',{
            url:'/',
            templateUrl:'client/main/main.html',
            controller:'mainController'
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


    }])


})()
