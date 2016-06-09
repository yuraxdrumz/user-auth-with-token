(function(){
    angular.module('myApp',['ui.router','ngFileUpload','ngMessages'])

    function config ($stateProvider,$urlRouterProvider){

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

    }

    function run($rootScope, $location, auth) {
        $rootScope.$on('$locationChangeStart', function(event, nextRoute, currentRoute) {
            if ($location.path() === '/profile' && !auth.isLoggedIn()){
                $location.path('/');
            }
            if($location.path() === '/chat' && !auth.isLoggedIn()){
                $location.path('/')
            }
        });
    }

      angular
    .module('myApp')
    .config(['$stateProvider', '$urlRouterProvider', config])
    .run(['$rootScope', '$location', 'auth', run]);

})()
