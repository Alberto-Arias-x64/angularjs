const app = angular.module("firstModule", [])
app.controller("firstController", ["$scope", ($scope) => {
    $scope.name = "x64"
    $scope.quantity = 0
    $scope.commentaryArray = []

    $scope.repeat = () => {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(res => {
            $scope.commentaryArray = res
        })
    }
}])