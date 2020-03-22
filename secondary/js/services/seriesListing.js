app.factory('seriesListing', ['$http', function ($http) {
    var episodes, subs = [];
    var getData = function () {
        return $http.get("https://crashcringle12.github.io/js/services/seriesListing.json")
            .then(function (response) {
                console.log(response);
                episodes = response.data.people.episodes;
                angular.forEach(episodes, function (c, i) {
                    subs.push(c);
                });
                return subs
            });
    }
    return {
        getData: getData
    };
}]);