app.directive('songListing', function() {
  return {
    restrict: 'E',
    scope: {
      song: '='
    },
    templateUrl:'js/directives/songListing.html'
  }
})