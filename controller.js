const app = angular.module("firstModule", [])

app.controller("firstController", ["$scope", "$rootScope", "ToDoService", ($scope, $rootScope, ToDoService) => {

    $scope.name = "x64"
    $scope.quantity = 0
    $scope.commentaryArray = []
    $scope.task = {}
    $scope.imageUrl = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.MhSMHNdaMICv--Ztu3hhvgHaHa%26pid%3DApi&f=1&ipt=da2a7f69dcb18074b50bd3509d28fa3f780f1b6ec7046c9f56d2c2a3dc0d3e99&ipo=images"
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

app.directive('backImg', function(){
    return function (scope, element, attrs) {
        attrs.$observe('backImg', (value) => {
            element.css({
                "background" : `url(${value})`,
                "background—size": "cover",
                "background-repeat": "no-repeat",
                "background—position": "center",
                "height": "100px",
                "width": "100px",
                "border-radius": "50%"
            })
        })
        eval("console.log('evaluame esta')")
    } 
})