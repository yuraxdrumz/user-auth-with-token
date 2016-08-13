(()=>{
    angular.module('myApp')
    .service('auth',['$http','$window','Upload',($http,$window,Upload)=>{
        return {
            currentUser : ()=>{
                if(isLoggedIn()){
                    let token = getToken();
                    let payload = token.split('.')[1];
                    payload = $window.atob(payload);
                    payload = JSON.parse(payload);
                    return{
                        email:payload.email,
                        name:payload.name,
                        _id:payload._id,
                        image:payload.image
                    }
                }
            },
            saveToken : (token)=>{
                $window.localStorage['mean-token'] = token
            },
            getToken : ()=>{
                return $window.localStorage['mean-token']
            },
            isLoggedIn : ()=>{
                let token = getToken();
                let payload;

                if(token){
                    payload = token.split('.')[1];
                    payload = $window.atob(payload);
                    payload = JSON.parse(payload);
                    return payload.exp > Date.now()/1000;
                }else
                    return false
            },
            register : (user)=>{
                return $http.post('/api/users/register',user).then((res)=>{
                    return saveToken(res.data.token)
                }).catch((err)=>{
                    throw err.data
                })
            },
            login : (user)=>{
                return $http.post('api/users/login',user).then((res)=>{
                    return saveToken(res.data.token)

                }).catch((err)=>{
                    throw(err.data.message);
                })
            },
            logout : ()=> $window.localStorage.removeItem('mean-token'),
            uploadPhoto:(file,userId)=>{
                return Upload.upload({
                    url:'/api/profile/editPhoto',
                    method:"POST",
                    data:{userId:userId},
                    file:file
                }).then((res)=>{
                    return saveToken(res.data.token)
                }).catch((err)=>{
                    throw err.data
                })
            },
            updateUser:(user)=>{
                return $http.post('api/users/update',user).then((res)=>{
                    return saveToken(res.data.token)
                }).catch((err)=>{
                    throw err.data
                })
            }
        }
    }])
})()
