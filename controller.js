const app = angular.module("firstModule", [])
app.controller("firstController", ["$scope", ($scope) => {
    $scope.name = "Simio"
    $scope.quantity
    $scope.commentaryArray

    $scope.repeat = () => {
        $scope.commentaryArray = new Array(Number($scope.quantity))
    }
}])
/* https://www.youtube.com/watch?v=AB56yuhXg1w&list=PLpOqH6AE0tNhdnOl1mOBthj4C7OHdwQB2&index=7 */