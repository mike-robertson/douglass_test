'use strict';

angular.module('douglassTestApp')
  .controller('MainCtrl', ['$http', function ($http) {

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
          ctrl.ads = data;
          console.log(ctrl.ads);
          ctrl.searchTerm = ctrl.searchInput;
          ctrl.searchInput = '';
          ctrl.loading = false;
          ctrl.loaded = true;
        })
        .error(function(data) {
          console.log(data);
          ctrl.loaded = true;
          ctrl.loading = false;
          ctrl.searchInput = '';
          alert('ERROR! Something went wrong!');
        });
      }
    }

  }]);
