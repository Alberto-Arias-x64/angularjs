const app = angular.module("firstModule", [])
app.controller("firstController", ["$scope", ($scope) => {

    $scope.name = "x64"
    $scope.quantity = 0
    $scope.commentaryArray = []
    $scope.task = {}

    if (localStorage.getItem('TODO')) $scope.todoList = JSON.parse(localStorage.getItem('TODO'))
    else $scope.todoList = []

    $scope.repeat = async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts')
        const parsedRes = await res.json()
        $scope.commentaryArray = parsedRes
    }

    $scope.addTask = () => {
        $scope.todoList.push($scope.task)
        const clearList = $scope.todoList.map(element => {
            return {
                description: element.description,
                time: element.time
            }
        })
        localStorage.setItem('TODO', JSON.stringify(clearList))
        $scope.task = {}
    }
}])