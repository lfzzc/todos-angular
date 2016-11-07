/**
 * Created by Administrator on 2016/11/6.
 */
(function (angular) {
	var controllers=angular.module('app.controller.main',['app.model.main']);
	controllers.controller('todoController',
		['$scope','$routeParams','$route', 'todoServes',function ($scope,$routeParams,$route,todoServes) {
			//初始化input输入框，和input输入框双向绑定
			$scope.text='';
			//初始化列表，一般视图中的列表在js中都是通过数组遍历出来
			$scope.lists=todoServes.getLists();
			//添加todo
			$scope.add= function () {
				if(!$scope.text){
					return;
				}
				todoServes.add($scope.text);
				$scope.lists=todoServes.getLists();
				//清空文本框
				$scope.text='';
			};
			//处理删除
			$scope.remove= function (i) {
				todoServes.remove(i);
				$scope.lists=todoServes.getLists();
			};
			//清空已完成任务
			$scope.clear=function () {
				todoServes.clear();
				$scope.lists=todoServes.getLists();
			};

			//展示clear,界面逻辑
			$scope.hide= function () {
				return $scope.lists.every(function (val) {
					return !val.completed;
				});
			};
			//编辑当前元素
			$scope.currentId=-1;
			$scope.editing=function(id){
				$scope.currentId=id;
			};
			$scope.save=function () {
				$scope.currentId=-1;
			};

			//全部选择完成或不完成
			$scope.toggleAll=function () {
				todoServes.toggleAll();
				$scope.lists=todoServes.getLists();
			};

			$scope.toggle=function () {
				todoServes.save();
			};

			//active和completed
			var status=$routeParams.status;
			switch (status){
				case 'active':
					$scope.selector={completed:false};
					break;
				case 'completed':
					$scope.selector={completed:true};
					break;
				default :
					$route.updateParams({status:''});
					$scope.selector={};
					break;
			}

		}]);
})(angular);
