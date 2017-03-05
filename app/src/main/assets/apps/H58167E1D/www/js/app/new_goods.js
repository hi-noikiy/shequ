var app = angular.module("newsApp",[]);
app.controller("newsController",function($scope,$http){
	$scope.initView = function(){
	$http({
		method:'post',
		url:apiRoot,
		data:{
			action:'Trade.category',
			type:2,
		}
	}).then(function successCallback(response){
		console.log(JSON.stringify(response.data));         
		$scope.news = response.data.data//最新内容数据 
	},function errorfunction(e){
		console.log(JSON.stringify(e));
	})	
   }
	$scope.Tradenews=function(id)
	{
		plus.nativeUI.showWaiting('加载中...');
		console.log(id);
		plus.storage.setItem('goodsId',id+'');
		plus.webview.create('goods_detail.html', 'goods_detail.html').show('pop-in');
		plus.nativeUI.closeWaiting();
      
	}
	
})


document.addEventListener("plusready",function(){
	appElement=document.querySelector('[ng-controller=newsController]');
	$scope= angular.element(appElement).scope();
	$scope.initView();
	$scope.$apply();
})
