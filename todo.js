// angular.module('app', ['ngCookies']);
// var todoApp = angular.module('todoApp', []);
var todoApp = angular.module('todoApp', ['ngCookies']);

todoApp.controller('todoController', function($scope, $cookies){
          $scope.tasks = [];
          $scope.info = '';
          $scope.doing = [];
          $scope.count = 0;
          $scope.uniqID = 0; 
          //меняем дефолт
          // $cookiesProvider.defaults.expires = $scope.createDelDate();
          // $scope.uniqID = $scope.maxTaskID() + 1; 

          $scope.mode = 'all'; // all, doing, notDoing;
          $scope.cookies = '';
          //$cookies.put( "ToDo",$scope.writeCookies());
          // $scope.deleteDate = scope.createDelDate();
          $scope.add = function() {
            // alert('HeLLO');
            if ($scope.tasks.length < 30){
              if($scope.title.length !== 0 && $scope.title.length < 51){
                var obj ={
                    title: $scope.title,
                    done: false,
                    id: $scope.uniqID
                };
                $scope.uniqID +=1;
                $scope.tasks.push(obj);
                $scope.count += 1;
                $scope.title = '';
                $scope.createDelDate();
              }else {
                alert("Error: incorrect length");
              }
            } else {
              alert("Error: maximum task count reached");
            }
          };
          $scope.delete = function( index ) {
            if ($scope.tasks.length > 0) {
              $scope.tasks.splice( index, 1 );
              $scope.count -= 1;
            }
          };
          $scope.deleteTwo = function( task ) {
            // console.log('таск йд равно '+task.id);
            if ($scope.tasks.length > 0) {
              for(let i = 0; i < $scope.tasks.length; i++){
               // console.log('@@@@'+$scope.tasks[i].id);
                if (task.id === $scope.tasks[i].id){ 
                  $scope.tasks.splice( i, 1);
                  $scope.count -= 1;
                }
              }
            }
          };
          $scope.createDelDate = function(){
            var date = new Date();
            date.setMonth(date.getMonth()+1);
            console.log(date);
            return date; 
          };
          $scope.delDoing = function () {
            $scope.doing = $scope.tasks.filter(elem => ( !elem.done));
            $scope.tasks = $scope.doing;
            $scope.count = $scope.tasks.length; 
          };
          //
          $scope.maxTaskID = function() {
            alert("SWEET HOME ALABAMA");
            var max = 0;
             for(var i = 0; i < $scope.tasks.length; i++ ){
               if( max < $scope.tasks[i].id ){
                 max = $scope.tasks[i].id;
              }
              }
             console.log('MAX TASK ID = '+max);
             return max;
          }
          
          //

          // function makeCookie(){
          //   var str = JSON.stringify($scope.tasks);
          //   return str;
          // }
            // var a = makeCookie();
            // console.log(a);
            // $scope.info='Hello';
          $scope.writeCookies = function () {
            // формируем куки.
            var str = angular.toJson($scope.tasks);
            // записываем куки в тег textarea.
             $scope.cookies = str
             var date = new Date(2018, 6, 12);
            $cookies.put('ToDo',str,{expires: $scope.createDelDate()});
          };
          $scope.loadFromCookie = function(){
            var obj;
            var str = $cookies.get('ToDo');
            console.log('   LOAD COOKIE   ')
            console.log(str);
            $scope.cookies = str;
            // распарсиваем JSON
            obj = angular.fromJson(str);
            // записываем объект полученный из кукис в массив tasks.
            $scope.tasks = obj;
            if (obj === null && obj === undefined){
                $scope.tasks = [];
            }
            $scope.count = $scope.tasks.length; 
            // значение uniqID.
            $scope.uniqID = $scope.maxTaskID() +1;
          };
 
});

var myCallback = function(elem){
    if (elem.done === true){
      return false;
    } else return true;
}


todoApp.filter('makeUppercase', function () {
  return function (item) {
      return item.toUpperCase();
  };
});

todoApp.filter('startsWithA', function () {
  return function (items) {
    var filtered = [];
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (/a/i.test(item.title.substring(0, 1))) {
        filtered.push(item);
      }
    }
    return filtered;
  };
});

todoApp.filter('startsWithLetter', function () {
  return function (items, letter) {
    var filtered = [];
    var letterMatch = new RegExp(letter, 'i');
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (letterMatch.test(item.title.substring(0, 1))) {
        filtered.push(item);
      }
    }
    return filtered;
  };
});

todoApp.filter('filterByMode', function () {
  return function (items, mode) {
    var filtered = [];
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if ( mode === "all") {
        filtered.push(item);
      } else if(mode === 'doing'){
          if (item.done === true) {
            filtered.push(item);
          }
      }
      else if(mode === 'notDoing'){
          if (item.done === false){
            filtered.push(item);
          }
      }
    }
    return filtered;
  };
});

var setColor = function (){
  // var clrName ;
  // document.getElementsByClassName('header').style.color = "red"; 
  return document.getElementsByTagName("h1").style.color = "yellow";
  // h1.style.color = "yellow";
}
  






