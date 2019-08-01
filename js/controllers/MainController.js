app.controller('MainController', ['$scope', 'submissions', function($scope, submissions) {
    submissions.getData().then(function (response) {
        $scope.listing = response;
        $scope.color = 'Blue';
        $scope.num = 0;
        $scope.myFunction = function() {
            $scope.num++;
            if ($scope.num > 2) {
                $scope.num = 0;
                $scope.color = 'Blue';
            }
            else {
                $scope.color = $scope.num == 1 ? 'Red' : 'Purple';
            }
        }
    });
}]);