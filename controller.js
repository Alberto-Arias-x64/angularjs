const app = angular.module("firstModule", [])

app.controller("firstController", ["$scope", "$rootScope", "ToDoService", ($scope, $rootScope, ToDoService) => {

    $scope.name = "x64"
    $scope.quantity = 0
    $scope.commentaryArray = []
    $scope.task = {}
    $rootScope.global = 'nepe'

    if (localStorage.getItem('TODO')) $scope.todoList = JSON.parse(localStorage.getItem('TODO'))
    else $scope.todoList = []

    $scope.repeat = async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts')
        const parsedRes = await res.json()
        $scope.commentaryArray = parsedRes
        $scope.$apply()
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

    $scope.delete = () => {
        $scope.todoList = []
        ToDoService.clean()
    }

    // $scope.$watch(() => $scope.task,(element) => {
    //     console.log(element)
    // })
    $scope.$watchCollection('task', (element) => {
        console.log(element)
    })
    /* mejor evitar watchers */
}])

app.filter('customFilter', () => {
    return (text) => {
        return text.toUpperCase()
    }
})

/* app.factory('ToDoService', () => {
    const TODOService = {}
    TODOService.clean = () => {
        localStorage.clear()
    }
    return TODOService
}) */

app.service('ToDoService', function () {
    this.clean = () => {
        localStorage.clear()
    }
})