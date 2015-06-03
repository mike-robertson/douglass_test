'use strict';

angular.module('douglassTestApp')
  .controller('MainCtrl', ['$http', '$rootScope', '$timeout', function ($http, $rootScope, $timeout) {

    var ctrl = this;
    ctrl.ads = {};
    ctrl.searchInput = '';
    ctrl.searchTerm = '';
    ctrl.city = 'Houston';
    ctrl.loading = false;
    ctrl.loaded = false;

    ctrl.search = function() {
      if(ctrl.searchInput !== '') {
        ctrl.ads = {};
        ctrl.loading = true;
        $http.get('http://api.thegreensheet.com/Search/' + ctrl.city + '/' + ctrl.searchInput)
        .success(function(data) {
          ctrl.ads = data.Results;
          ctrl.searchTerm = ctrl.searchInput;
          ctrl.searchInput = '';
          ctrl.loading = false;
          ctrl.loaded = true;
          angular.forEach(ctrl.ads, function(ad, index) {
            ad.loading = true;
            ctrl.getFirstPhoto(ad);
          });
        })
        .error(function(data) {
          console.log(data);
          ctrl.loaded = true;
          ctrl.loading = false;
          ctrl.searchInput = '';
          alert('ERROR! Something went wrong!');
        });
      }
    };

    ctrl.getFirstPhoto = function(ad) {
      $http.get('http://api.thegreensheet.com/Photos/GetImageForAd/' + ad.AdId)
       .success(function(response) {
          if(response.length !== 0) {
            ad.PhotoURL = 'http://api.thegreensheet.com/Photos/GetImageForAd/' + ad.AdId;
            $timeout(function () {
              $rootScope.$broadcast('masonry.reload');
              ad.loading = false;
            }, 5000);
          } else {
            return false;
          }
        })
        .error(function(response) {
          // console.log(response);
          alert('ERROR! Something went wrong!');
          return false;
        });
    };


  }]);
