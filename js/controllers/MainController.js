app.controller('MainController', ['$scope', 'submissions', function($scope, submissions) {
    submissions.getData().then(function (response) {
        $scope.actualListing = response;
        $scope.listing = [{
            title: "Born To Be Yours",
            title_img: "img/BornToBeYours.png",
            genre: "Pop",
            level: 10,
            length: 3.5,
            pack: "Cringle Haven",
            details: "Easy song, nothing to worry about here",
            artist: "Imagine Dragons"
        },
        {
            title: "Bubble Pop",
            title_img: "img/BubblePop.png",
            genre: "K-Pop",
            level: 10,
            length: 2.4,
            pack: "AJAX's Magical Project Adventure",
            details: "Just a test here boys",
            artist: "No Idea"
        }];
    });
}]);