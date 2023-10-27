const app = angular.module("firstModule", [])
app.controller("firstController", ["$scope", ($scope) => {
    $scope.name = "Simio"
    $scope.quantity
    $scope.commentaryArray

    $scope.repeat = () => {
        $scope.commentaryArray = new Array(Number($scope.quantity))
    }
}])