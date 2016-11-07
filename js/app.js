(function (angular) {
	//创建模块
	var myApp=angular.module('myTodo',['app.controller.main','ngRoute']);
	myApp.config(['$routeProvider',function ($routeProvider) {
		$routeProvider
			.when('/:status?',{
				controller:'todoController',
				templateUrl:'todo_tmpl'
			});
			/*.otherwise({
				redirectTo:'/'
			});*/
	}]);
})(angular);
