(()=> {
    angular.module('myApp', ['ui.router', 'ngFileUpload', 'ngMessages'])
        .config(['$stateProvider','$urlRouterProvider',($stateProvider, $urlRouterProvider)=> {
            
            //if url does not exits, redirect to main
            $urlRouterProvider.otherwise('/');
            
            $stateProvider
                .state('main', {
                    url: '/',
                    controller: 'mainController',
                    templateUrl: 'client/main/main.html'
                })
                .state('register', {
                    url: '/register',
                    templateUrl: 'client/register/register.html',
                    controller: 'regController'
                })
                .state('profile', {
                    url: '/profile',
                    templateUrl: 'client/profile/profile.html',
                    controller: 'profileController'
                })
                .state('chat', {
                    url: '/chat',
                    templateUrl: 'client/chat/chat.html',
                    controller: 'chatController'
                })
        }])
})()

