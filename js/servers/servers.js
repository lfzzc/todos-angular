/**
 * Created by Administrator on 2016/11/6.
 */
(function (angular) {
	var serves=angular.module('app.model.main',[]);
	serves.service('todoServes',['$window',function ($window) {
		var storage=$window.localStorage;
		var lists=storage['todo_lists']?JSON.parse(storage['todo_lists']):[];
		/*var lists=[
			{id:0.1,text:'学习',completed:false},
			{id:0.2,text:'吃饭',completed:false},
			{id:0.3,text:'睡觉',completed:true}
		];*/

		//获取数据
		this.getLists=function () {
			return lists;
		};

		//增加
		this.add= function (text) {
			lists.push({
				id:Math.random(),
				text:text,
				completed:false
			});
			this.save();
		};

		//删除
		this.remove= function (i) {
			lists.splice(i,1);
			this.save();
		};

		//清空已完成任务
		this.clear= function () {
			lists=lists.filter(function (val) {
				return !val.completed;
			});
			this.save();
		};

		//更新
		this.save=function() {
			storage['todo_lists']=JSON.stringify(lists);
		};

		//全部完成或者全部未完成
		var now=true;
		this.toggleAll= function () {
			lists.forEach(function (val) {
				val.completed=now;
			});
			now=!now;
			this.save();
		};
	}]);
})(angular);
