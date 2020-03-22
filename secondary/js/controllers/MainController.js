app.controller('MainController', ['$scope', 'seriesListing', function($scope, seriesListing) {
    seriesListing.getData().then(function (response) {
        $scope.episodes = response;
    });
}]);