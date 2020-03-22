app.directive('episodeListing', function() {
  return {
    restrict: 'E',
    scope: {
      episode: '='
    },
    templateUrl:'js/directives/episodeListing.html'
  }
})