var app = angular.module("dynamicApp",[]);
app.controller("dynamicController",function($scope,$http){
	$scope.initView = function($id){;
	$http({
		method:'post',
		url:apiRoot,
		data:{
			action:'Dynamic.index',
		}
	}).then(function successCallback(response){
		console.log(JSON.stringify(response.data));         
		$scope.dynamic = response.data.data//最新内容数据 
	},function errorfunction(e){
		console.log(e);
	})	
   }
	$scope.dynamicData = function(from_id,status)
	{
//		plus.nativeUI.showWaiting('加载中...');
		console.log(from_id+'========'+status);
		if(status==0)
		{
			$http({
			method:'post',
			url:apiRoot,
			data:{
				action:'Community.fileType',
				id:from_id,
			}
			}).then(function successCallback(response){
				plus.storage.setItem('noteId',from_id+'');
				console.log(JSON.stringify(response.data.data));
				if(response.data.data == 'F'){
					plus.webview.create('view_detail.html', 'view_detail.html').show('pop-in');
				} else if(response.data.data == 'M'){
					plus.webview.create('video_detail.html', 'video_detail.html').show('pop-in');
				}
				plus.nativeUI.closeWaiting();
			},function errorfunction(e){
				console.log(e);
			})
		}else if(status==1)
		 {
			plus.storage.setItem('goodsId',from_id+'');
			plus.webview.create('goods_detail.html', 'goods_detail.html').show('pop-in');
			plus.nativeUI.closeWaiting();
		 }
	}
})


document.addEventListener("plusready",function(){
	appElement=document.querySelector('[ng-controller=dynamicController]');
	$scope= angular.element(appElement).scope();
	$scope.initView();
	$scope.$apply();
})

