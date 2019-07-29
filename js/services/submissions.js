app.factory('submissions', ['$http', function ($http) {
    return
    $http.get('https://crashcringle12.github.io/js/services/submissions.json')
        .success(function (data) {
            return data;
        })
        .error(function (err) {
            return err;
        });
}]);