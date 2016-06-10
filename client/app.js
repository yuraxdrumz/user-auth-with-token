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

    function run($rootScope, $location,$state, auth) {
        $rootScope.$on('$stateChangeStart', function(event, nextRoute, currentRoute) {
            if ($location.path() === '/profile' && !auth.isLoggedIn()){
                $state.go('main');
                event.preventDefault()

            }
            if($location.path() === '/chat' && !auth.isLoggedIn()){
                $state.go('main');
                event.preventDefault()
            }
        });
    }

      angular
    .module('myApp')
    .config(['$stateProvider', '$urlRouterProvider', config])
    .run(['$rootScope', '$location','$state', 'auth', run]);

})()
