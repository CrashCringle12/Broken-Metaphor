app.factory('submissions', ['$http', function ($http) {
    var all, odds = [];
    var getData = function () {
        return $http.get("https://crashcringle12.github.io/js/services/submissions.json")
            .then(function (response) {
                all = response.records;
                angular.forEach(all, function (c, i) {
                    if (i % 2 == 1) {
                        odds.push(c);
                    }
                });
                return odds
            });
    }
    return {
        getData: getData
    };
}]);