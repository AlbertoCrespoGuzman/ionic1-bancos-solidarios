// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('conFusion', ['jtt_youtube', 'ionic', 'pascalprecht.translate', 'ionic-datepicker', 'ngCordova', 'conFusion.controllers','conFusion.services'])

.run(function($state, $ionicPlatform, $rootScope, $ionicLoading, $cordovaSplashscreen, $timeout, $filter) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
  //  if (window.cordova && window.cordova.plugins.Keyboard) {
  //    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
  //    cordova.plugins.Keyboard.disableScroll(true);
//
  //  }

    window.open = cordova.InAppBrowser.open;

    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  //  window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
    var notificationOpenedCallback = function(jsonData) {
      console.log('notificationOpenedCallback: ' + jsonData.notification.payload.title);
      var view = jsonData.notification.payload.additionalData.view;
      var tabToFocus = 0;
      if(jsonData.notification.payload.additionalData.day){
        tabToFocus = jsonData.notification.payload.additionalData.day;
      }
      $state.go('app.' + view, {'tabToFocus' : tabToFocus});
    };

    window.plugins.OneSignal
      .startInit("5f454736-158b-4006-bc08-3370dcecc49e")
   //   .enableNotificationsWhenActive(false)
      .handleNotificationOpened(notificationOpenedCallback)
      .endInit();


  });

    $rootScope.$on('loading:show', function () {
        $ionicLoading.show({
            template: '<ion-spinner></ion-spinner>' +  $filter('translate')('DIALOG_LOADING')
        })
    });

    $rootScope.$on('loading:hide', function () {
        $ionicLoading.hide();
    });

    $rootScope.$on('$stateChangeStart', function () {
        $rootScope.$broadcast('loading:show');
    });

    $rootScope.$on('$stateChangeSuccess', function () {
        $rootScope.$broadcast('loading:hide');
    });
})

.config(function($translateProvider, $sceProvider, $stateProvider, $urlRouterProvider) {


  $translateProvider
    .useStaticFilesLoader({
      prefix: 'translations/locale',
      suffix: '.json'
    }).preferredLanguage('_pt').useMissingTranslationHandlerLog().useSanitizeValueStrategy('escapeParameters');

  $sceProvider.enabled(false);

  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/sidebar.html',
    controller: 'AppCtrl'
  })

  .state('app.home', {
    cache: false,
    url: '/home',
    views: {
      'mainContent': {
        templateUrl: 'templates/home.html',
        controller: 'IntroController'
      }
    }
  })

    .state('app.calendar', {
      cache: false,
      url: '/calendar/:tabToFocus',
      views: {
        'mainContent': {
          templateUrl: 'templates/calendar.html',
          controller: 'CalendarController'
        }
      }
    })
    .state('app.venue', {
      cache: false,
      url: '/venue',
      views: {
        'mainContent': {
          templateUrl: 'templates/venue.html',
          controller: 'VenueController'
        }
      }
    })
    .state('app.sponsors', {
      cache: false,
      url: '/sponsors',
      views: {
        'mainContent': {
          templateUrl: 'templates/sponsors.html',
          controller: 'SponsorsController'
        }
      }
    })
    .state('app.live', {
      cache: false,
      url: '/live',
      views: {
        'mainContent': {
          templateUrl: 'templates/live.html',
          controller: 'LiveController'
        }
      }
    })
    .state('app.blog', {
      cache: false,
      url: '/blog',
      views: {
        'mainContent': {
          templateUrl: 'templates/blog.html',
          controller: 'BlogController'
        }
      }
    })
    .state('app.post', {
      cache: false,
      url: '/post/:postId',
      views: {
        'mainContent': {
          templateUrl: 'templates/post.html',
          controller: 'PostController'
        }
      }
    })
  .state('app.meeting', {
    cache: false,
    url: '/meeting',
    views: {
      'mainContent': {
        templateUrl: 'templates/meeting.html',
        controller: 'MeetingController'
      }
    }
  })
    .state('app.themes', {
      cache: false,
      url: '/themes',
      views: {
        'mainContent': {
          templateUrl: 'templates/themes.html',
          controller: 'ThemesController'
        }
      }
    })
    .state('app.speakers', {
      cache: false,
      url: '/speakers',
      views: {
        'mainContent': {
          templateUrl: 'templates/speakers.html',
          controller: 'SpeakersController'
        }
      }
    })
    .state('app.speaker', {
      cache: false,
      url: '/speaker/:speakerId',
      views: {
        'mainContent': {
          templateUrl: 'templates/speaker.html',
          controller: 'SpeakerController'
        }
      }
    })
    .state('app.gallery', {
      cache: false,
      url: '/gallery',
      views: {
        'mainContent': {
          templateUrl: 'templates/gallery.html',
          controller: 'GalleryController'
        }
      }
    })


  .state('app.aboutus', {
      url: '/aboutus',
      views: {
        'mainContent': {
          templateUrl: 'templates/aboutus.html',
            controller: 'AboutController'
        }
      }
    })

   .state('app.contactus', {
      url: '/contactus',
      views: {
        'mainContent': {
          templateUrl: 'templates/contactus.html',
            controller:'ContactController'
        }
      }
    })
    .state('app.menu', {
      url: '/menu',
      views: {
        'mainContent': {
          templateUrl: 'templates/menu.html',
          controller: 'MenuController'
        }
      }
    })
;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
})


;
