app.directive('programListing', function() {
  return {
    restrict: 'E',
    scope: {
      program: '='
    },
    templateUrl:'js/directives/programListing.html'
  }
})