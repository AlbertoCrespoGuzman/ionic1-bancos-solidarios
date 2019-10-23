angular.module('conFusion.controllers', ['pascalprecht.translate'])

.constant('TASK_STATUS', ['Sem enviar', 'Enviando', 'Enviado OK', 'Erro'])

  .filter('cropCustomFilter', function(){
    return function(input, number) {
      var output;
      if(input.length > number){
        output = input.substring(0, number);
      }

      return output;

    }
  })

.controller('AppCtrl', function ($filter, $translate, phonesByTaskFactory, TASK_STATUS,task_phoneFactory,$cordovaSms,$location,$window, $state,$scope, $rootScope, $ionicModal, $timeout, $localStorage, $ionicPlatform, AuthFactory, newtaskgroupFactory,newtaskFactory,updateTaskFactory, phoneFactory,newphoneFactory,updatetaskgroupFactory,searchPhoneFactory) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
   // $rootScope.url_base = "http://bancossolidarios.global/";
  $rootScope.url_base = "http://bancossolidarios.global/";
    $rootScope.lang = "_pt";
    console.log('$window.navigator.language', $window.navigator.language);

  if ($window.navigator.language.indexOf('en') >= 0) {
    $rootScope.lang = "_en";
  }else if ($window.navigator.language.indexOf('es') >= 0) {
    $rootScope.lang = "_es";
  }
  $translate.use($rootScope.lang);



    $scope.loginData = $localStorage.getObject('userinfo','{}');
    $scope.reservation = {};
    $scope.registration = {};
    $scope.loggedIn = false;
    $rootScope.iduser = '';
    $rootScope.task = {};
    $scope.newtaskgroupData = {};
    $scope.taskData = {};
    $scope.newtaskData = {};
    $scope.phoneData = {};
    $scope.inittime = null;
    $scope.finishtime = null;
    $rootScope.searchPhonesData = {};

    $scope.options = [{ name: "Nao Enviado", status: 0 }, { name: "Enviar", status: 1 }];

    $rootScope.language_selected = false;
    $rootScope.toogleLanguage = function(){
      $rootScope.language_selected = ! $rootScope.language_selected;
    }
  $rootScope.changeLanguage = function(languageCode){
      if(languageCode == 0){
        $rootScope.lang = "_pt";
      }else if(languageCode == 1) {
        $rootScope.lang = "_es";
      }else if(languageCode == 2){
        $rootScope.lang = "_en";
      }
      console.log($rootScope.lang);
      $translate.use($rootScope.lang);

      if(now > 1535857200000){
        $scope.videos_or_live =  $filter('translate')('LIVE_SIDEBAR');
      }else{
        $scope.videos_or_live =  $filter('translate')('VIDEOS_SIDEBAR');
      }
  }




    if(AuthFactory.isAuthenticated()) {
        $scope.loggedIn = true;
        $scope.username = AuthFactory.getUsername();
    }



    $rootScope.sending_sms = false;
    $rootScope.TASK_STATUS = TASK_STATUS;
    $rootScope.showTak_phone = false;

    $rootScope.index = 0;

    $rootScope.valid_phones = 0;
    $rootScope.sent_correctly = 0;

    
  $scope.videos_or_live = "";

  var now = new Date().getTime();


  if(now > 1535857200000){
    $scope.videos_or_live =  $filter('translate')('LIVE_SIDEBAR');
  }else{
    $scope.videos_or_live =  $filter('translate')('VIDEOS_SIDEBAR');
  }
  

})
  .filter('trustHtml',function($sce){
    return function(html){
      return $sce.trustAsHtml(html)
    }
  })
.filter('breakInMiddleFilter', function(){
    return function(input, max, optional2) {

    if(typeof input != "undefined"){

    var found = input.indexOf(" ", Math.floor(input.length / 2) );

      if(!found){
        found = input.indexOf(" ", Math.floor(input.length / 4));
      }
      if(found){
        input = input.substring(0, found) + " \n " + input.substring(found + 1, input.length);
      }

      return input;
    }else{
        return "";
    }
  }
})
.filter('firstLetterFilter', function(){
    return function(input, max, optional2) {
          var output = "";

          if(typeof input != "undefined" && input.length > 0){
                output = input.substring(0,1);
          }
      return output;

  }
})
  .filter('youtubeUrlFilter', function(){
    return function(input, max, optional2) {
      var output = "";
      if(typeof input != "undefined") {
        output = input.split("watch?v=")[1];
        output = "https://www.youtube.com/embed/" + output;
      }
      return output;

    }
  })
.filter('withoutFirstLetterFilter', function(){
    return function(input, max, optional2) {
          var output = "";

          if(typeof input != "undefined" && input.length > 0){
                output = input.substring(1,input.length);
          }
      return output;

  }
})
  .controller('IntroController', ['$ionicModal','coverFactory','$state','$scope', '$rootScope', 'taskgroupFactory',  'AuthFactory','baseURL',
    function ($ionicModal, coverFactory, $state,$scope, $rootScope, taskgroupFactory,AuthFactory, baseURL) {
      $rootScope.$broadcast('loading:show');
      $scope.baseURL = baseURL;
      $scope.coverR = [];

      coverFactory.query({
      })
        .$promise.then(
        function (response) {

          $scope.coverR.push(response);
          $rootScope.$broadcast('loading:hide');
        },
        function (response) {
          $scope.message = "Error: " + response.status + " " + response.statusText;
          $rootScope.$broadcast('loading:hide');
        }
      );

      $ionicModal.fromTemplateUrl('templates/cover_dialog.html', {
        scope: $scope
      }).then(function (modal) {
        $scope.coverDialog = modal;
      });


      $scope.closeCoverDialog = function () {
        $scope.coverDialog.hide();
      };


      $scope.openCoverDialog = function () {
        $scope.coverDialog.show();
      };
    }])
  .controller('BlogController', ['blogFactory','$state','$scope', '$rootScope',
    function (blogFactory, $state,$scope, $rootScope) {
      $rootScope.$broadcast('loading:show');

      $rootScope.blog = [];

      blogFactory.query({
      })
        .$promise.then(
        function (response) {
          $rootScope.blog = response;
          $rootScope.$broadcast('loading:hide');
        },
        function (response) {
          $rootScope.$broadcast('loading:hide');
          $scope.message = "Error: " + response.status + " " + response.statusText;
        }
      );


    }])
  .controller('PostController', ['$ionicSlideBoxDelegate','postFactory','lastestPostFactory','$stateParams','$state','$scope',
    function ( $ionicSlideBoxDelegate, postFactory, lastestPostFactory, $stateParams, $state,$scope) {
      $rootScope.$broadcast('loading:show');
      $scope.post = null;
      $scope.lastestPosts = [];
      $scope.inverted_images = [];
      $scope.slideIndex = 1;
      lastestPostFactory.query({postId : $stateParams.postId
      })
        .$promise.then(
        function (response) {
          $scope.lastestPosts = response;
        },
        function (response) {
          $scope.message = "Error: " + response.status + " " + response.statusText;
        }
      );

      postFactory.query({postId : $stateParams.postId
      })
        .$promise.then(
        function (response) {
          $rootScope.$broadcast('loading:hide');
          $scope.post = response;
          if($scope.post.images != null && $scope.post.images.length > 1){
            var first_image = $scope.post.images[0];

            for(var i=1; i< $scope.post.images.length; i++){
              $scope.inverted_images.push($scope.post.images[i]);
            }
            $scope.inverted_images.push(first_image);

          }
        },
        function (response) {
          $rootScope.$broadcast('loading:hide');
          $scope.message = "Error: " + response.status + " " + response.statusText;
        }
      );
      $scope.nextSlide = function() {
        $ionicSlideBoxDelegate.next();
      }
    }])

  .controller('GalleryController', ['$ionicSlideBoxDelegate','$ionicModal','$sce','galleryFactory','$state','$scope', '$rootScope','baseURL',
    function ($ionicSlideBoxDelegate,$ionicModal,$sce,galleryFactory, $state,$scope, $rootScope, baseURL) {
      $rootScope.$broadcast('loading:show');

      $scope.ordened_images = [];

      $ionicModal.fromTemplateUrl('templates/gallery_dialog.html', {
        scope: $scope
      }).then(function (modal) {
        $scope.galleryDialog = modal;
      });


      $scope.closeGalleryDialog = function () {
        $scope.galleryDialog.hide();
      };


      $scope.openGalleryDialog = function (id) {
        //if($scope.ordened_images.length == 0) {
        orderImages(id);
        //}
        $scope.galleryDialog.show();
      };
      $scope.nextSlide = function() {
        $ionicSlideBoxDelegate.next();
      }
      function orderImages(id){
        $scope.ordened_images = [];

        var init =0;

        for(var i=0; i< $scope.gallery.length; i++){
          if(id == $scope.gallery[i].id){
            init = i;
            break;
          }
        }
        if(init == 0){
          for(var i=0; i< $scope.gallery.length; i++){
            $scope.ordened_images.push($scope.gallery[i]);
          }
        }else{
          for(var i=init; i< $scope.gallery.length; i++){
            $scope.ordened_images.push($scope.gallery[i]);
          }
          for(var i=0; i< init; i++){
            $scope.ordened_images.push($scope.gallery[i]);
          }
        }
      }



      $scope.closed3 = true;
      $scope.closed4 = true;

      $scope.baseURL = baseURL;
      galleryFactory.query({    })
        .$promise.then(
        function (response) {
          $scope.gallery = response;
          $rootScope.$broadcast('loading:hide');

          console.log("gallery", response);
          loadImagesLayout();
        },
        function (response) {
          $rootScope.$broadcast('loading:hide');
          $scope.message = "Error: " + response.status + " " + response.statusText;
        }
      );

      $scope.Close3False = function(){
        $scope.closed3 = false;
        return '';
      };
      $scope.Close4False = function(){
        $scope.closed4 = false;
        return '';
      };
      $scope.Close3True = function(){
        $scope.closed3 = true;
        return '';
      };
      $scope.Close4True = function(){
        $scope.closed4 = true;
        return '';
      };

      $scope.code ='pero q pasa compadres';
      $scope.gallery_index = 1;
      function loadImagesLayout() {
        var code ='';
        for(var i=0; i< $scope.gallery.length; i++) {
          if($scope.gallery_index % 8 == 1) {
            $scope.closed3 = false;
            code += '<div class="gallery-row">';
            code += '<div class="row w-row">';
            code += '<div class="w-col w-col-8 w-col-small-8" >';
            code += '<a href="#" ng-click="$event.preventDefault();openGalleryDialog(' + $scope.gallery[i].id + ')"  data-ix="show-see-more-icon-on-hover" imageonload="images/gallery/' + $scope.gallery[i].id + '.' + $scope.gallery[i].image_format + '" class="gallery-image-'+ $scope.gallery_index % 8 + ' w-inline-block w-lightbox">';
            code += '<div data-ix="display-none-on-load-see-more-icon" class="see-more-icon"></div>';


            code += '</a>';
            code += '</div>';
          }if($scope.gallery_index % 8 == 2) {
            $scope.closed3 = true;

            code += '<div class="w-col w-col-4 w-col-small-4"><a href="#" ng-click="$event.preventDefault();openGalleryDialog(' + $scope.gallery[i].id + ')" imageonload="images/gallery/' + $scope.gallery[i].id + '.' + $scope.gallery[i].image_format + '" data-ix="show-see-more-icon-on-hover" class="gallery-image-'+ $scope.gallery_index % 8 + ' w-inline-block w-lightbox"><div data-ix="display-none-on-load-see-more-icon" class="see-more-icon"></div>';

            code +='</a></div>';
            code += '</div>';
            code += '</div>';
          }if($scope.gallery_index % 8 == 3) {
            $scope.closed3 = false;

            code += '<div class="gallery-row">';
            code += '<div class="row w-row">';
            code += '<div class="w-col w-col-6 w-col-small-6"><a href="#" ng-click="$event.preventDefault();openGalleryDialog(' + $scope.gallery[i].id + ')" imageonload="images/gallery/' + $scope.gallery[i].id + '.' + $scope.gallery[i].image_format + '" data-ix="show-see-more-icon-on-hover" class="gallery-image-'+ $scope.gallery_index % 8 + ' w-inline-block w-lightbox"><div data-ix="display-none-on-load-see-more-icon" class="see-more-icon"></div>';

            code += '</a>';
            code += '</div>';
          }if($scope.gallery_index % 8 == 4) {
            $scope.closed4 = false;
            $scope.closed3 = true;

            code += '<div class="w-col w-col-6 w-col-small-6">';
            code += '<div class="gallery-column">';
            code += '<a href="#" ng-click="$event.preventDefault();openGalleryDialog(' + $scope.gallery[i].id + ')" imageonload="images/gallery/' + $scope.gallery[i].id + '.' + $scope.gallery[i].image_format + '" data-ix="show-see-more-icon-on-hover" class="gallery-image-'+ $scope.gallery_index % 8 + ' w-inline-block w-lightbox"><div data-ix="display-none-on-load-see-more-icon" class="see-more-icon"></div>';

            code += '</a>';
          }if($scope.gallery_index % 8 == 5) {
            $scope.closed4 = true;

            code += '<a href="#" ng-click="$event.preventDefault();openGalleryDialog(' + $scope.gallery[i].id + ')" imageonload="images/gallery/' + $scope.gallery[i].id + '.' + $scope.gallery[i].image_format + '" data-ix="show-see-more-icon-on-hover" class="gallery-image-'+ $scope.gallery_index % 8 + ' w-inline-block w-lightbox"><div data-ix="display-none-on-load-see-more-icon" class="see-more-icon"></div>';

            code += '</a>';
            code += '</div>';
            code += '</div>';
            code += '</div>';
            code += '</div>';
          }if($scope.gallery_index % 8 == 6) {
            $scope.closed3 = false;

            code += '<div class="gallery-row">';
            code += '<div class="row w-row">';
            code += '<div class="w-col w-col-4 w-col-small-4">';
            code += '<a href="#" ng-click="$event.preventDefault();openGalleryDialog(' + $scope.gallery[i].id + ')" imageonload="images/gallery/' + $scope.gallery[i].id + '.' + $scope.gallery[i].image_format + '" data-ix="show-see-more-icon-on-hover" class="gallery-image-'+ $scope.gallery_index % 8 + ' w-inline-block w-lightbox"><div data-ix="display-none-on-load-see-more-icon" class="see-more-icon"></div>';

            code += '</a>';
            code += '</div>';
          }if($scope.gallery_index % 8 == 7) {
            $scope.closed3 = false;

            code += '<div class="w-col w-col-4 w-col-small-4">';
            code += '<a href="#" ng-click="$event.preventDefault();openGalleryDialog(' + $scope.gallery[i].id + ')" imageonload="images/gallery/' + $scope.gallery[i].id + '.' + $scope.gallery[i].image_format + '" data-ix="show-see-more-icon-on-hover" class="gallery-image-'+ $scope.gallery_index % 8 + ' w-inline-block w-lightbox"><div data-ix="display-none-on-load-see-more-icon" class="see-more-icon"></div>';

            code += '</a>';
            code += '</div>';
          }if($scope.gallery_index % 8 == 0) {
            $scope.closed3 = true;

            code += '<div class="w-col w-col-4 w-col-small-4">';
            code += '<a href="#" ng-click="$event.preventDefault();openGalleryDialog(' + $scope.gallery[i].id + ')" imageonload="images/gallery/' + $scope.gallery[i].id + '.' + $scope.gallery[i].image_format + '" data-ix="show-see-more-icon-on-hover" class="gallery-image-8 w-inline-block w-lightbox"><div data-ix="display-none-on-load-see-more-icon" class="see-more-icon"></div>';

            code += '</a>';
            code += '</div>';
            code += '</div>';
            code += '</div>';
          }
          $scope.gallery_index ++;


        }
        if(!$scope.closed3) {
          code += '</div></div>';
        }
        if(!$scope.closed4) {
          code += '</div></div></div>';
        }

        $scope.code = code;
        console.log('$scope.code', $scope.code);
      }



    }])
  .controller('CalendarController', ['$stateParams','$ionicModal','categorieseventFactory','calendarFactory','$state','$scope', '$rootScope','baseURL',
    function ($stateParams, $ionicModal,categorieseventFactory, calendarFactory, $state,$scope, $rootScope, baseURL) {
      $rootScope.$broadcast('loading:show');

      $ionicModal.fromTemplateUrl('templates/dialog_event.html', {
        scope: $scope
      }).then(function (modal) {
        $scope.eventDialog = modal;
      });

      if($stateParams.tabToFocus){
        console.log('tab to focus ', $stateParams.tabToFocus);
        $scope.currentTab = $stateParams.tabToFocus;
      }else{
        $scope.currentTab = 0;
      }

      $scope.checkbox = [];
      $scope.tabDays = [];
      $scope.tabsChange = function(day_index){
        for(var j=0; j< $scope.days.length; j++){
          if(j == day_index){
            $scope.tabDays[day_index] = !$scope.tabDays[day_index];
          }else{
            $scope.tabDays[j] = false;
          }


        }

      }
      $scope.closeEventDialog = function () {
        $scope.eventDialog.hide();
      };


      $scope.openEventDialog = function (event_id) {
        for(var i=0; i< $scope.days.length; i++){
          for(var j=0; j< $scope.days[i].timetable.length; j++){
            for(var k=0; k< $scope.days[i].timetable[j].event.length; k++){
              if($scope.days[i].timetable[j].event[k].id == event_id){
                $scope.myEvent =$scope.days[i].timetable[j].event[k];
                break;
              }
            }
          }
        }
        for(var i=0; i< $scope.days.length; i++) {
          for (var j = 0; j < $scope.days[i].timetable.length; j++) {
            if($scope.days[i].timetable[j].id == $scope.myEvent.timetable_id){
              $scope.myTimetable =$scope.days[i].timetable[j];
              break;
            }
          }
        }
        $scope.eventDialog.show();
      };
      $scope.baseURL = baseURL;

      calendarFactory.query({
      })
        .$promise.then(
        function (response) {
          $scope.days = response;
          console.log('days',$scope.days[0].timetable[0].event[0].category[0].color);
          $rootScope.$broadcast('loading:hide');

          initializeCheckboxes();
        },
        function (response) {
          $rootScope.$broadcast('loading:hide');
          $scope.message = "Error: " + response.status + " " + response.statusText;
        }
      );

      categorieseventFactory.query({
      })
        .$promise.then(
        function (response) {
          $scope.categories = response;
          initializeCheckboxes();
        },
        function (response) {
          $scope.message = "Error: " + response.status + " " + response.statusText;
        }
      );

      function initializeCheckboxes(){
        if(typeof $scope.days != "undefined" && $scope.days.length > 0
          && typeof $scope.categories != "undefined" && $scope.categories.length) {
          for (var i = 0; i < $scope.categories.length; i++) {
            $scope.checkbox[$scope.categories[i].id] = [];
            for (var j = 0; j < $scope.days.length; j++) {
              $scope.checkbox[$scope.categories[i].id][$scope.days[j].id] = true;
              $('#checkbox_' + $scope.categories[i].id + "__" + $scope.days[j].id).attr('checked', true);
            }
          }
          for (var j = 0; j < $scope.days.length; j++) {
            if(j == $scope.currentTab){
              $scope.tabDays[$scope.currentTab] = true;
            }else{
              $scope.tabDays[j] = false;
            }
          }
        }
      }
      $scope.checkboxChange = function(category_id, day_id){

        if(!$scope.checkbox[category_id][day_id]){
          $('.category_id_' + category_id).each(function(i, obj) {
            $(this).css('display','block');
          });
        }else{
          $('.category_id_' + category_id).each(function(i, obj) {
            $(this).css('display','none');
          });
        }
        $scope.checkbox[category_id][day_id] = !$scope.checkbox[category_id][day_id];
        return $scope.checkbox[category_id][day_id];
      }



    }])
  .controller('SpeakerController', ['$window','$stateParams','speakerFactory','$state','$scope', '$rootScope','baseURL',
    function ($window,$stateParams,speakerFactory, $state,$scope, $rootScope, baseURL) {

      $rootScope.$broadcast('loading:show');

      $scope.openBrowser = function (url){
        console.log(url);
        $window.open(url, '_system', 'location=yes'); return false;
      }
      $scope.speakerR = [];

      $scope.baseURL = baseURL;
      $scope.showButton = false;


      $scope.toggleButton = function(){
        $scope.showButton = !$scope.showButton;
      }

      speakerFactory.query({speakerId : $stateParams.speakerId
      })
        .$promise.then(
        function (response) {
          $scope.speakerR.push(response);
          $rootScope.$broadcast('loading:hide');

        },
        function (response) {
          $rootScope.$broadcast('loading:hide');
          $scope.message = "Error: " + response.status + " " + response.statusText;
        }
      );

    }])
  .controller('SpeakersController', ['speakersFactory','$state','$scope', '$rootScope','baseURL', function (speakersFactory, $state,$scope, $rootScope, baseURL) {

    $rootScope.$broadcast('loading:show');
    $scope.baseURL = baseURL;
    speakersFactory.query({
    })
      .$promise.then(
      function (response) {
        $scope.speakers = response;
        console.log('speakers', $scope.speakers);
        $rootScope.$broadcast('loading:hide');
      },
      function (response) {
        $rootScope.$broadcast('loading:hide');
        $scope.message = "Error: " + response.status + " " + response.statusText;
      }
    );

  }])
  .controller('ThemesController', ['themesFactory','$state','$scope', '$rootScope','baseURL',
    function (themesFactory, $state,$scope, $rootScope, baseURL) {
      $rootScope.$broadcast('loading:show');

      $scope.themes_index = 1;
      $scope.baseURL = baseURL;
      themesFactory.query({
      })
        .$promise.then(
        function (response) {
          $scope.themes = response;
          console.log('themes', $scope.themes);
          $rootScope.$broadcast('loading:hide');

        },
        function (response) {
          $rootScope.$broadcast('loading:hide');
          $scope.message = "Error: " + response.status + " " + response.statusText;
        }
      );

    }])
  .controller('MeetingController', ['meeting_imagesFactory','meetingFactory','$state','$scope', '$rootScope', 'taskgroupFactory',  'AuthFactory','baseURL',
    function (meeting_imagesFactory, meetingFactory, $state,$scope, $rootScope, taskgroupFactory,AuthFactory, baseURL) {
      $rootScope.$broadcast('loading:show');

      $scope.baseURL = baseURL;
      meetingFactory.query({
      })
        .$promise.then(
        function (response) {
          $scope.introduction = response;
        },
        function (response) {
          $scope.message = "Error: " + response.status + " " + response.statusText;
        }
      );
      meeting_imagesFactory.query({
      })
        .$promise.then(
        function (response) {
          console.log(response);
          $rootScope.$broadcast('loading:hide');

          $scope.introduction_images = response;
        },
        function (response) {
          $rootScope.$broadcast('loading:hide');
          $scope.message = "Error: " + response.status + " " + response.statusText;
        }
      );

    }])
  .controller('VenueController', ['$filter','$window','venueFactory','$state','$scope', '$rootScope','baseURL',
    function ($filter,$window,venueFactory, $state,$scope, $rootScope, baseURL) {

      $rootScope.$broadcast('loading:show');

      $scope.openBrowser = function (url){
        console.log(url);
        $window.open(url, '_system', 'location=yes'); return false;
      };

      //  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
      function loadMap() {
        var latLng = new google.maps.LatLng($scope.venue.latitude, $scope.venue.longitude);

        var mapOptions = {
          center: latLng,
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        var marker = new google.maps.Marker({
          position: latLng,
          map: $scope.map,
          title: 'Centro de Eventos'
        });
        google.maps.event.addListener(marker, 'click', function() {
          var infoWindow = new google.maps.InfoWindow();
          infoWindow.setContent('<h4 style="color:black">' + $scope.venue.name + '</h4><a directions target="_system" ' +
            'href="#" onclick="window.open(\'https://www.google.com/maps/search/?api=1&query=' + $scope.venue.address.split(' ').join('+')+'+brazil\', \'_system\', \'location=yes\')">' + $filter('translate')('VENUE_DIRECTIONS') + '</>');
          infoWindow.open(map, marker);
        });

      }

      //   }, function(error){
      //    console.log("Could not get location");
      //  });
      $scope.baseURL = baseURL;
      venueFactory.query({ })
        .$promise.then(
        function (response) {
          $scope.venue = response;
          $rootScope.$broadcast('loading:hide');

          loadMap();
        },
        function (response) {
          $rootScope.$broadcast('loading:hide');
          $scope.message = "Error: " + response.status + " " + response.statusText;
        }
      );

    }])
  .controller('LiveController', ['facebookDataFactory','youtubeDataFactory','$http', 'youtubeFactory','$state','$scope', '$rootScope','baseURL',
    function (facebookDataFactory,youtubeDataFactory, $http,youtubeFactory, $state,$scope, $rootScope, baseURL) {

      $rootScope.$broadcast('loading:show');

      $scope.themes_index = 1;
    $scope.baseURL = baseURL;
    $scope.videos = [];
    $scope.youtubeData = [];
    var tempVideos = [];
    // channel palmaslab UCHQPZZsoLzaAWCc2Deal2tg | key youtube API: AIzaSyCqpZz74kZByqK5_YCTovl99lBOnIF8qOo
    // channel elidia UCR4zZ0Sm013c1Q5eCYnsSHA | key: AIzaSyDGr5wbj25RzaFcd8y_9X9sZxyToBjeuTo  | usuario: comunicasolidarios@gmail.com senha: solidarios2018*

    $scope.getIframeSrcFacebook = function (url) {
      var videoId = '';

      try{
        videoId = url.split('/videos/')[1];
      }catch(ee){

      }

      return 'https://www.facebook.com/video/embed?video_id=' + videoId;
    };
    $scope.getIframeSrc = function (videoId,autoplay) {
      return 'https://www.youtube.com/embed/' + videoId +(autoplay == true ? '?autoplay=1' : '');
    };

    facebookDataFactory.query({ })
      .$promise.then(
      function (response) {
        $scope.facebook_videos = response;
        console.log($scope.facebook_videos);
       // $rootScope.$broadcast('loading:hide');
      },
      function (response) {
        $rootScope.$broadcast('loading:hide');
        $scope.message = "Error: " + response.status + " " + response.statusText;
      }
    );

    youtubeDataFactory.query({ })
      .$promise.then(
      function (response) {
        $scope.youtubeData = response;
        console.log($scope.youtubeData);
        $rootScope.$broadcast('loading:hide');

        if($scope.youtubeData.length > 0){
          addVideos();
        }


      },
      function (response) {
        $rootScope.$broadcast('loading:hide');
        $scope.message = "Error: " + response.status + " " + response.statusText;
      }
    );
    function addVideos(){
      console.log(' $scope.youtubeData[0].channel ' +  $scope.youtubeData[0].channel);
      $http({
        method: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/search?key=' + $scope.youtubeData[0].key + '&channelId=' + $scope.youtubeData[0].channel + '&part=snippet,id&order=date&maxResults=20&type=video'
      }).then(function successCallback(response) {

        for(var j=0; j < response.data.items.length; j++){
          tempVideos.push(response.data.items[j]);
        }
        $scope.youtubeData.shift();
        if($scope.youtubeData.length > 0){
          addVideos();
        }else{
          tempVideos.sort(function(a,b){

            return new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt);
          });
          $scope.videos = tempVideos;
        }



      }, function errorCallback(response) {
        console.log('error youtube api' + response);
      });
    }


/*
    youtubeFactory.getVideosFromChannelById({
      type: 'video',
      eventType: 'live',
      maxResults: 10,
      part: 'snippet',
      channelId: 'UCHQPZZsoLzaAWCc2Deal2tg',
      key: 'AIzaSyCqpZz74kZByqK5_YCTovl99lBOnIF8qOo'
    }).then(function (data) {
      $scope.videos = data.data.items;
      console.info('videos from search by query', data);
    });
*/
  }])
  .controller('SponsorsController', ['$window','sponsorcategoriesFactory','societyFactory','institutionalFactory','sponsorsFactory', '$state','$scope', '$rootScope','baseURL',
    function ($window,sponsorcategoriesFactory,societyFactory, institutionalFactory,sponsorsFactory,  $state,$scope, $rootScope, baseURL) {
      $rootScope.$broadcast('loading:show');

      $scope.baseURL = baseURL;

      $scope.openBrowser = function (url){
        $window.open(url, '_system', 'location=yes'); return false;
      }

      sponsorcategoriesFactory.query({ })
        .$promise.then(
        function (response) {
          $scope.sponsorcategories = response;
          console.log($scope.sponsorcategories);
        },
        function (response) {
          $scope.message = "Error: " + response.status + " " + response.statusText;
        }
      );
      societyFactory.query({ })
        .$promise.then(
        function (response) {
          $scope.society = response;
          console.log($scope.society);
        },
        function (response) {
          $scope.message = "Error: " + response.status + " " + response.statusText;
        }
      );
      institutionalFactory.query({ })
        .$promise.then(
        function (response) {
          $scope.institutional = response;
          console.log($scope.institutional);
        },
        function (response) {
          $scope.message = "Error: " + response.status + " " + response.statusText;
        }
      );
      sponsorsFactory.query({ })
        .$promise.then(
        function (response) {
          $scope.sponsors = response;
          $rootScope.$broadcast('loading:hide');

          console.log($scope.sponsors);
        },
        function (response) {
          $rootScope.$broadcast('loading:hide');
          $scope.message = "Error: " + response.status + " " + response.statusText;
        }
      );

    }])
.controller('MenuController', ['$scope', 'menuFactory', 'favoriteFactory', 'baseURL', '$ionicListDelegate', '$ionicPlatform', '$cordovaLocalNotification', '$cordovaToast', function ($scope, menuFactory, favoriteFactory, baseURL, $ionicListDelegate, $ionicPlatform, $cordovaLocalNotification, $cordovaToast) {

    $scope.baseURL = baseURL;
    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;


    menuFactory.query(
        function (response) {
            $scope.dishes = response;
        },
        function (response) {
        });

    $scope.select = function (setTab) {
        $scope.tab = setTab;

        if (setTab === 2) {
            $scope.filtText = "appetizer";
        } else if (setTab === 3) {
            $scope.filtText = "mains";
        } else if (setTab === 4) {
            $scope.filtText = "dessert";
        } else {
            $scope.filtText = "";
        }
    };

    $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function () {
        $scope.showDetails = !$scope.showDetails;
    };

    $scope.addFavorite = function (dishid) {
        console.log("dishid is " + dishid);

        favoriteFactory.save({_id: dishid});
        $ionicListDelegate.closeOptionButtons();

        $ionicPlatform.ready(function () {

                $cordovaLocalNotification.schedule({
                    id: 1,
                    title: "Added Favorite",
                    text: $scope.dishes[dishid].name
                }).then(function () {
                    console.log('Added Favorite '+$scope.dishes[dishid].name);
                },
                function () {
                    console.log('Failed to add Favorite ');
                });

              $cordovaToast
                  .show('Added Favorite '+$scope.dishes[dishid].name, 'long', 'center')
                  .then(function (success) {
                      // success
                  }, function (error) {
                      // error
                  });


        });
    }
}])

.controller('IndexController', ['$scope', 'menuFactory', 'promotionFactory', 'corporateFactory', 'baseURL', function ($scope, menuFactory, promotionFactory, corporateFactory, baseURL) {

    $scope.baseURL = baseURL;
    corporateFactory.query({
            featured: "true"
        },
            function (response) {
                var leaders = response;
                $scope.leader = leaders[0];
                $scope.showLeader = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );
    menuFactory.query({
            featured: "true"
        },
            function (response) {
                var dishes = response;
                $scope.dish = dishes[0];
                $scope.showDish = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );
    promotionFactory.query({
        featured: "true"
    },
            function (response) {
                var promotions = response;
                $scope.promotion = promotions[0];
                $scope.showPromotion = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

}])
  .directive('compile', ['$compile', function ($compile) {
    return function(scope, element, attrs) {
      scope.$watch(
        function(scope) {
          return scope.$eval(attrs.compile);
        },
        function(value) {
          element.html(value);
          $compile(element.contents())(scope);
        }
      );
    };
  }])
  .directive('imageonload', function($rootScope) {
    return {
      restrict: 'A',
      scope: {
      },
      link: function(scope, element, $attrs) {
        console.log('entrei',$attrs.imageonload);
        $('<img/>').attr('src', $attrs.imageonload).on('load', function() {
          $(this).remove();
          element.attr("style",'background-image:url(' +  $attrs.imageonload + ')');
        });
        $('<img/>').attr('src', $attrs.imageonload).on('error', function() {
          $(this).remove();
          element.attr("style",'background-image:url(' + $rootScope.url_base + $attrs.imageonload + ')');
        });
      }
    };
  })
  .directive('imageonloadsrc', function($rootScope) {
    return {
      restrict: 'A',
      scope: {
      },
      link: function(scope, element, attrs) {
        element.bind('load', function() {
        });
        element.bind('error', function(){
          console.log('eror');
          element[0].src = $rootScope.url_base + attrs.imageonloadsrc;
        });
      }
    };
  })
   .directive("directions", function($compile){
   return{
    link: function(scope, element){
      scope.$watch('directions', function() {
        console.log('eeeeeipa');
        element.html(statusStoredIn);
        $compile(element.contents())(scope);
      });
    }
  }
})



;
