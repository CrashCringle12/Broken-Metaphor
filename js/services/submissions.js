app.factory('submissions', ['$http', function ($http) {
    var songs, subs = [];
    var getData = function () {
        return $http.get("https://crashcringle12.github.io/js/services/submissions.json")
            .then(function (response) {
                songs = response.submissions;
                angular.forEach(songs, function (c, i) {
                    if (i % 2 == 1) {
                        subs.push(c);
                    }
                });
                return subs
            });
    }
    return {
        getData: getData
    };
}]);