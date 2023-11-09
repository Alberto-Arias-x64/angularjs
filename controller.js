const app = angular.module("firstModule", ['ngAnimate']) //declaracion
//const app = angular.module("firstModule") //llamado

app.controller("firstController", ["$scope", "$rootScope", "ToDoService", ($scope, $rootScope, ToDoService) => {

    $scope.name = "Ropas de invierno y verano"
    $scope.quantity = 0
    $scope.commentaryArray = []
    $scope.task = {}
    $scope.imageUrl = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.MhSMHNdaMICv--Ztu3hhvgHaHa%26pid%3DApi&f=1&ipt=da2a7f69dcb18074b50bd3509d28fa3f780f1b6ec7046c9f56d2c2a3dc0d3e99&ipo=images"
    $rootScope.global = 'nepe'

    $scope.data = {
        carteras: {
            cartera1: {
                visible: false,
                data1: "sisa",
                data2: "nokas"
            },
            cartera2: {
                visible: false,
                data1: "sisa",
                data2: "nokas"
            },
            cartera3: {
                visible: false,
                data1: "sisa",
                data2: "nokas"
            },
            cartera4: {
                visible: false,
                data1: "sisa",
                data2: "nokas"
            },
            cartera5: {
                visible: false,
                data1: "sisa",
                data2: "nokas"
            }
        }
    }

    $scope.limpiarElemento = function (cartera) {
        const index = Object.keys($scope.data.carteras).indexOf(cartera);

        for (let i = index; i > 0; i--) {
            const carteraActual = `cartera${i}`;
            const carteraAnterior = `cartera${i - 1}`;

            $scope.data.carteras[carteraActual] = $scope.data.carteras[carteraAnterior];
            if (i === index) $scope.data.carteras[carteraActual].visible = false
        }
    }

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

app.directive('backImg', function () {
    return function (scope, element, attrs) {
        attrs.$observe('backImg', (value) => {
            element.css({
                "background": `url(${value})`,
                "background—size": "cover",
                "background-repeat": "no-repeat",
                "background—position": "center",
                "height": "100px",
                "width": "100px",
                "border-radius": "50%"
            })
        })
        eval("console.log('evaluame esta')")
        eval("console.log('evaluame esta')")
    }
})

app.filter('numeroTexto', function () {
    var unidades = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
    var especiales = ['', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
    var decenas = ['', 'diez', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
    var centenas = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

    return function (numero) {
        if (numero === 0) {
            return 'cero';
        } else {
            return convertir(numero);
        }

        function convertir(numero) {
            if (numero < 10) {
                return unidades[numero];
            } else if (numero < 20) {
                return especiales[numero - 10];
            } else if (numero < 100) {
                var decena = Math.floor(numero / 10);
                var unidad = numero % 10;
                if (unidad !== 0) {
                    return decenas[decena] + ' y ' + unidades[unidad];
                } else {
                    return decenas[decena];
                }
            } else if (numero < 1000) {
                var centena = Math.floor(numero / 100);
                var resto = numero % 100;
                if (resto !== 0) {
                    return centenas[centena] + ' ' + convertir(resto);
                } else {
                    return centenas[centena];
                }
            }
        }
    };
});