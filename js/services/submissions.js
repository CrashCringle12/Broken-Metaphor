app.factory('submissions', ['$http', function ($http) {
    var songs, subs = [];
    var getData = function () {
        return $http.get("https://crashcringle12.github.io/js/services/submissions.json")
            .then(function (response) {
                console.log(response);
                songs = response.data.submissions;
                angular.forEach(songs, function (c, i) {
                    subs.push(c);
                });
                return subs
            });
    }
    return {
        getData: getData
    };
}]);