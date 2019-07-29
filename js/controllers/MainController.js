app.controller('MainController', ['$scope', 'submissions', function($scope, submissions) {
    submissions.getData().then(function (response) {
        $scope.listing = response;
    });
}]);