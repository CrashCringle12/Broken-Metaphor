app.factory('submissions', ['$http', function ($http) {
    return
    $http.ge('')
        .success(function (data) {
            return data;
        })
        .error(function (err) {
            return err;
        });
}]);