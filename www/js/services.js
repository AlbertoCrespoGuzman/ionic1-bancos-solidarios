'use strict';

angular.module('conFusion.services', ['ngResource'])
//.constant("baseURL", "http://bancossolidarios.global/api/")
  .constant("baseURL", "http://bancossolidarios.global/api/")
  
.factory('facebookDataFactory', ['$http','$resource', 'baseURL', function ($http,$resource, baseURL) {
    $http.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Content-Type';
    $http.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST,PUT, OPTIONS';
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8100';

    return $resource(baseURL + "facebook.php", {}, {
      'update': {
        method: 'PUT'
      },
      'query': {
        method: 'GET',
        isArray: true }
    });

  }])
  .factory('youtubeDataFactory', ['$http','$resource', 'baseURL', function ($http,$resource, baseURL) {
    $http.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Content-Type';
    $http.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST,PUT, OPTIONS';
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8100';

    return $resource(baseURL + "youtube.php", {}, {
      'update': {
        method: 'PUT'
      },
      'query': {
        method: 'GET',
        isArray: true }
    });

  }])
  .factory('categorieseventFactory', ['$http','$resource', 'baseURL', function ($http,$resource, baseURL) {
    $http.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Content-Type';
    $http.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST,PUT, OPTIONS';
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8100';

    return $resource(baseURL + "categoriesevent.php", {}, {
      'update': {
        method: 'PUT'
      },
      'query': {
        method: 'GET',
        isArray: true }
    });

  }])
  .factory('calendarFactory', ['$http','$resource', 'baseURL', function ($http,$resource, baseURL) {
    $http.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Content-Type';
    $http.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST,PUT, OPTIONS';
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8100';

    return $resource(baseURL + "calendar.php", {}, {
      'update': {
        method: 'PUT'
      },
      'query': {
        method: 'GET',
        isArray: true }
    });

  }])
  .factory('sponsorcategoriesFactory', ['$http','$resource', 'baseURL', function ($http,$resource, baseURL) {
    $http.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Content-Type';
    $http.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST,PUT, OPTIONS';
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8100';

    return $resource(baseURL + "sponsors_categories.php", {}, {
      'update': {
        method: 'PUT'
      },
      'query': {
        method: 'GET',
        isArray: true }
    });

  }])
  .factory('societyFactory', ['$http','$resource', 'baseURL', function ($http,$resource, baseURL) {
    $http.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Content-Type';
    $http.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST,PUT, OPTIONS';
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8100';

    return $resource(baseURL + "sponsors_society.php", {}, {
      'update': {
        method: 'PUT'
      },
      'query': {
        method: 'GET',
        isArray: true }
    });

  }])
  .factory('institutionalFactory', ['$http','$resource', 'baseURL', function ($http,$resource, baseURL) {
    $http.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Content-Type';
    $http.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST,PUT, OPTIONS';
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8100';

    return $resource(baseURL + "sponsors_institutional.php", {}, {
      'update': {
        method: 'PUT'
      },
      'query': {
        method: 'GET',
        isArray: true }
    });

  }])
  .factory('sponsorsFactory', ['$http','$resource', 'baseURL', function ($http,$resource, baseURL) {
    $http.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Content-Type';
    $http.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST,PUT, OPTIONS';
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8100';

    return $resource(baseURL + "sponsors_sponsors.php", {}, {
      'update': {
        method: 'PUT'
      },
      'query': {
        method: 'GET',
        isArray: true }
    });

  }])

  .factory('venueFactory', ['$http','$resource', 'baseURL', function ($http,$resource, baseURL) {
    $http.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Content-Type';
    $http.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST,PUT, OPTIONS';
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8100';

    return $resource(baseURL + "venue.php", {}, {
      'update': {
        method: 'PUT'
      },
      'query': {
        method: 'GET',
        isArray: false }
    });

  }])
  .factory('registerFactory', ['$http','$resource', 'baseURL', function ($http,$resource, baseURL) {
    $http.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Content-Type';
    $http.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST,PUT, OPTIONS';
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8100';
    $http.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded;";

    return $resource(baseURL + "registration_post_app.php", {}, {
      'update': {
        method: 'PUT'
      },
      'query': {
        method: 'GET',
        isArray: true }
    });

  }])
  .factory('galleryFactory', ['$http','$resource', 'baseURL', function ($http,$resource, baseURL) {
    $http.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Content-Type';
    $http.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST,PUT, OPTIONS';
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8100';

    return $resource(baseURL + "gallery.php", {}, {
      'update': {
        method: 'PUT'
      },
      'query': {
        method: 'GET',
        isArray: true }
    });

  }])
  .factory('speakerFactory', ['$http','$resource', 'baseURL', function ($http,$resource, baseURL) {
    $http.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Content-Type';
    $http.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST,PUT, OPTIONS';
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8100';

    return $resource(baseURL + "speaker.php?id=:speakerId", {speakerId : "@speakerId"}, {
      'update': {
        method: 'PUT'
      },
      'query': {
        method: 'GET',
        isArray: false }
    });

  }])
  .factory('speakersFactory', ['$http','$resource', 'baseURL', function ($http,$resource, baseURL) {
    $http.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Content-Type';
    $http.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST,PUT, OPTIONS';
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8100';

    return $resource(baseURL + "speakers.php", {}, {
      'update': {
        method: 'PUT'
      }
    });

  }])

  .factory('themesFactory', ['$http','$resource', 'baseURL', function ($http,$resource, baseURL) {
    $http.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Content-Type';
    $http.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST,PUT, OPTIONS';
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8100';

    return $resource(baseURL + "themes.php", {}, {
      'update': {
        method: 'PUT'
      }
    });

  }])
  .factory('postFactory', ['$http','$resource', 'baseURL', function ($http,$resource, baseURL) {
    $http.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Content-Type';
    $http.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST,PUT, OPTIONS';
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8100';

    return $resource(baseURL + "post.php?id=:postId", {postId : "@postId"}, {
      'update': {
        method: 'PUT'
      },
      'query': {
        method: 'GET',
        isArray: false }
    });

  }])
  .factory('lastestPostFactory', ['$http','$resource', 'baseURL', function ($http,$resource, baseURL) {
    $http.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Content-Type';
    $http.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST,PUT, OPTIONS';
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8100';

    return $resource(baseURL + "lastest_posts.php?id=:postId", {postId : "@postId"}, {
      'update': {
        method: 'PUT'
      }
    });

  }])
  .factory('blogFactory', ['$http','$resource', 'baseURL', function ($http,$resource, baseURL) {
    $http.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Content-Type';
    $http.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST,PUT, OPTIONS';
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8100';

    return $resource(baseURL + "blog.php", {}, {
      'update': {
        method: 'PUT'
      },
      'query': {
        method: 'GET',
        isArray: true }
    });

  }])
  .factory('coverFactory', ['$http','$resource', 'baseURL', function ($http,$resource, baseURL) {
    $http.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Content-Type';
    $http.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST,PUT, OPTIONS';
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8100';

    return $resource(baseURL + "cover.php", {}, {
      'update': {
        method: 'PUT'
      },
      'query': {
        method: 'GET',
        isArray: false }
    });

  }])
.factory('meetingFactory', ['$http','$resource', 'baseURL', function ($http,$resource, baseURL) {
     $http.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Content-Type';
      $http.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST,PUT, OPTIONS';
      $http.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8100';

      return $resource(baseURL + "meeting.php", {}, {
            'update': {
                method: 'PUT'
            },
            'query': {
              method: 'GET',
              isArray: false }
        });

}])
.factory('meeting_imagesFactory', ['$http','$resource', 'baseURL', function ($http,$resource, baseURL) {
     $http.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Content-Type';
      $http.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST,PUT, OPTIONS';
      $http.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8100';

      return $resource(baseURL + "meeting_images.php", {}, {
            'update': {
                method: 'PUT'
            }
        });

}])
.factory('task_phoneFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

      return $resource(baseURL + "task_phone/:task_phoneId", {task_phoneId:"@task_phoneId"}, {
            'update': {
                method: 'PUT'
            }
        });

}])
.factory('menuFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        return $resource(baseURL + "dishes/:id", null, {
            'update': {
                method: 'PUT'
            }
        });

}])
.factory('taskgroupFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

      return $resource(baseURL + "taskgroup/users/:userId", {userId:"@userId"}, {
            'update': {
                method: 'PUT'
            }
        });

}])
.factory('updatetaskgroupFactory', ['$http','$resource', 'baseURL', function ($http,$resource, baseURL) {

      $http.defaults.headers.common['Access-Control-Allow-Headers'] = 'Content-Type';
      $http.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST,PUT, OPTIONS';
      $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

      return $resource(baseURL + "taskgroup/:taskgroupId", {taskgroupId:"@taskgroupId"}, {
            'update': {
                method: 'PUT'
            }
        });




}])
.factory('taskFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

      return $resource(baseURL + "tasks/taskgroup/:taskgroupId", {taskgroupId:"@taskgroupId"}, {
            'update': {
                method: 'PUT'
            }
        });

}])
.factory('searchPhoneFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

      return $resource(baseURL + "phones/search/:name/:taskgrouId", {name:"@name",taskgroupId:"@taskgroupId"}, {
            'update': {
                method: 'PUT'
            }
        });

}])
.factory('phoneFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

      return $resource(baseURL + "phones/:phoneId", {phoneId:"@phoneId"}, {
            'update': {
                method: 'PUT'
            }
        });

}])
.factory('updateTaskFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

      return $resource(baseURL + "tasks/:taskId", {taskId:"@taskId"}, {
            'update': {
                method: 'PUT'
            }
        });

}])

.factory('newtaskFactory', ['$resource', 'baseURL','$http', function ($resource, baseURL, $http) {

        $http.defaults.headers.common['Access-Control-Allow-Headers'] = 'Content-Type';
        $http.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
        $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


        var taskFac = {};

        taskFac.newtask = function(newtaskData) {

        $resource(baseURL + "tasks")
        .save(newtaskData,
           function(response) {
              task_phoneFactory.create(buildTask_phoneObjects(response, $rootScope.Taskgroup.phones));
           },
           function(response){

              var message = '\
                <div class="ngdialog-message">\
                <div><h3>Login Unsuccessful</h3></div>' +
                  '<div><p>' +  response.data.err.message + '</p><p>' +
                    response.data.err.name + '</p></div>' +
                '<div class="ngdialog-buttons">\
                    <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click=confirm("OK")>OK</button>\
                </div>'

                ngDialog.openConfirm({ template: message, plain: 'true'});
           }

        );

    };
    var buildTask_phoneObjects = function (task, phones){
            var task_phone = [];
            for(var i=0; i< phones.length; i++){
                var t_p = {
                        task : task._id,
                        phone: phones[i]._id,
                        status: 1,
                        message: 'Preparado para enviar'
                    };
                task_phone.push(t_p);
            }
            return task_phone;
     }

        return taskFac;

}])
.factory('newphoneFactory', ['$resource', 'baseURL','$http', function ($resource, baseURL, $http) {


        return $resource(baseURL + "phones/taskgroup/:taskgroupId", {taskgroupId:"@taskgroupId"}, {
            'update': {
                method: 'PUT'
            }
        });



}])
.factory('phonesByTaskFactory', ['$resource', 'baseURL','$http', function ($resource, baseURL, $http) {


        return $resource(baseURL + "phones/task/:taskId", {taskId:"@taskId"}, {
            'update': {
                method: 'PUT'
            }
        });



}])

.factory('newtaskgroupFactory', ['$resource', 'baseURL','$http', function ($resource, baseURL, $http) {


        $http.defaults.headers.common['Access-Control-Allow-Headers'] = 'Content-Type';
        $http.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
        $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


        var taskgroupFac = {};

        taskgroupFac.newtaskgroup = function(newtaskgroupData) {
        console.log("newtaskgroupData");
        console.log(newtaskgroupData);
        $resource(baseURL + "taskgroup")
        .save(newtaskgroupData,
           function(response) {

           //   $rootScope.$broadcast('newtaskgroup:Successful');

              console.log(" ; id new taskgroup = " +  response);
           },
           function(response){

              var message = '\
                <div class="ngdialog-message">\
                <div><h3>Login Unsuccessful</h3></div>' +
                  '<div><p>' +  response.data.err.message + '</p><p>' +
                    response.data.err.name + '</p></div>' +
                '<div class="ngdialog-buttons">\
                    <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click=confirm("OK")>OK</button>\
                </div>'

                ngDialog.openConfirm({ template: message, plain: 'true'});
           }

        );

    };


        return taskgroupFac;

}])

.factory('commentFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        return $resource(baseURL + "dishes/:id/comments/:commentId", {id:"@Id", commentId: "@CommentId"}, {
            'update': {
                method: 'PUT'
            }
        });

}])

.factory('promotionFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

    return $resource(baseURL + "promotions/:id", null, {
            'update': {
                method: 'PUT'
            }
        });

}])

.factory('corporateFactory', ['$resource', 'baseURL', function ($resource, baseURL) {


    return $resource(baseURL + "leadership/:id", null, {
            'update': {
                method: 'PUT'
            }
        });

}])


.factory('favoriteFactory', ['$resource', 'baseURL', function ($resource, baseURL) {


    return $resource(baseURL + "favorites/:id", null, {
            'update': {
                method: 'PUT'
            },
            'query':  {method:'GET', isArray:false}
        });

}])

.factory('feedbackFactory', ['$resource', 'baseURL', function ($resource, baseURL) {


    return $resource(baseURL + "feedback/:id", null, {
            'update': {
                method: 'PUT'
            }
        });

}])

.factory('$localStorage', ['$window', function($window) {
  return {
    store: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    remove: function (key) {
      $window.localStorage.removeItem(key);
    },
    storeObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key,defaultValue) {
      return JSON.parse($window.localStorage[key] || defaultValue);
    }
  }
}])

.factory('AuthFactory', ['$resource', '$http', '$localStorage', '$rootScope', 'baseURL', '$ionicPopup', function($resource, $http, $localStorage, $rootScope, baseURL, $ionicPopup){

    var authFac = {};
    var TOKEN_KEY = 'Token';
    var isAuthenticated = false;
    var username = '';
    var iduser = 0;
    var authToken = undefined;


  function loadUserCredentials() {
    var credentials = $localStorage.getObject(TOKEN_KEY,'{}');
    if (credentials.username != undefined) {
      useCredentials(credentials);
    }
  }

  function storeUserCredentials(credentials) {
    $localStorage.storeObject(TOKEN_KEY, credentials);
    useCredentials(credentials);
  }

  function useCredentials(credentials) {
    isAuthenticated = true;
    username = credentials.username;
    iduser = credentials.iduser;
    authToken = credentials.token;

    // Set the token as header for your requests!
    $http.defaults.headers.common['x-access-token'] = authToken;
  }

  function destroyUserCredentials() {
    authToken = undefined;
    username = '';
    iduser = '';
    isAuthenticated = false;
    $http.defaults.headers.common['x-access-token'] = authToken;
    $localStorage.remove(TOKEN_KEY);
  }

    authFac.login = function(loginData) {

        $resource(baseURL + "users/login")
        .save(loginData,
           function(response) {
              storeUserCredentials({username:loginData.username, token: response.token,iduser: response.iduser});
              $rootScope.$broadcast('login:Successful');
              $rootScope.iduser = response.iduser;
           },
           function(response){
              isAuthenticated = false;

              var message = '<div><p>' +  response.data.err.message +
                  '</p><p>' + response.data.err.name + '</p></div>';

               var alertPopup = $ionicPopup.alert({
                    title: '<h4>Login Failed!</h4>',
                    template: message
                });

                alertPopup.then(function(res) {
                    console.log('Login Failed!');
                });
           }

        );

    };

    authFac.logout = function() {
        $resource(baseURL + "users/logout").get(function(response){
        });
        destroyUserCredentials();
    };

    authFac.register = function(registerData) {

        $resource(baseURL + "users/register")
        .save(registerData,
           function(response) {
              authFac.login({username:registerData.username, password:registerData.password});

              $rootScope.$broadcast('registration:Successful');
           },
           function(response){

              var message = '<div><p>' +  response.data.err.message +
                  '</p><p>' + response.data.err.name + '</p></div>';

               var alertPopup = $ionicPopup.alert({
                    title: '<h4>Registration Failed!</h4>',
                    template: message
                });

                alertPopup.then(function(res) {
                    console.log('Registration Failed!');
                });
           }

        );
    };

    authFac.isAuthenticated = function() {
        return isAuthenticated;
    };

    authFac.getUsername = function() {
        return username;
    };

    authFac.facebook = function() {

    };
    authFac.getIduser = function() {
        return iduser;
    };

    loadUserCredentials();

    return authFac;

}])
;
