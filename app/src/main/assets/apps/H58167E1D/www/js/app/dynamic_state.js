
var app = angular.module("dynamicApp", []);
app.controller("dynamicController", function($scope, $http) {
	$scope.initView = function($id) {
		plus.nativeUI.showWaiting('加载中...');
		$http({
			method: 'post',
			url: apiRoot,
			data: {
				action: 'Dynamic.index',
			}
		}).then(function successCallback(response) {
			plus.nativeUI.closeWaiting();
			console.log(JSON.stringify(response.data));
			$scope.dynamic = response.data.data //最新内容数据 	
			plus.nativeUI.closeWaiting();
		}, function errorfunction(e) {
			plus.nativeUI.closeWaiting();
			console.log(JSON.stringify(e));
		})
	}

	$scope.dynamicData = function(from_id, status) {
		//		plus.nativeUI.showWaiting('加载中...');
		console.log(from_id + '========' + status);
		if(status == 0) {
			plus.storage.setItem('noteId', from_id + '');
			plus.nativeUI.showWaiting('正在加载....');
			openPage("view_detail.html", { noteId: from_id });
		} else if(status == 1) {
			plus.storage.setItem('goodsId', from_id + '');
			openPage("goods_detail.html", { goodsId: from_id });
			plus.nativeUI.closeWaiting();
		}
	}
})

document.addEventListener("plusready", function() {
	appElement = document.querySelector('[ng-controller=dynamicController]');
	$scope = angular.element(appElement).scope();
	$scope.initView();
	$scope.$apply();
	plus.nativeUI.closeWaiting();
})

