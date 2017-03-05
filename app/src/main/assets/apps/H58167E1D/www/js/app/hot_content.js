var app = angular.module("hotApp",[]);
app.controller("contentController",function($scope,$http){
	$scope.initView = function($id){
		console.log($id);
	$http({
		method:'post',
		url:apiRoot,
		data:{
			action:'Community.more',
			cid:$id,
			hot:1,
		}
	}).then(function successCallback(response){
		console.log(JSON.stringify(response.data));         
		$scope.notes = response.data.data.note//最新内容数据 
	},function errorfunction(e){
		console.log(e);
	})	
   }
	$scope.shequ=function(id)
	{ 
		plus.nativeUI.showWaiting('加载中...');
		console.log(id);
		plus.storage.setItem('noteId',id+'');
		$.ajax({
		type: "post",
		url: apiRoot,
		data: {
			action: 'Community.fileType',
			id: id,
		},
		dataType: 'json',
		success: function(data) {
			console.log(JSON.stringify(data));
			if(data.error == 0) {
				//	console.log(noteId);
				plus.nativeUI.closeWaiting();
				if(data.data == 'F') {
					console.log(plus.storage.getItem('noteId'));
					plus.webview.create('view_detail.html', 'view_detail.html').show('pop-in');
				} else if(data.data == 'M') {
					plus.webview.create('video_detail.html', 'video_detail.html').show('pop-in');
				}
			} else {
				plus.nativeUI.toast(data.desc);
				return;
				}

			}
		})
//			plus.webview.create('goods_detail.html', 'goods_detail.html').show('pop-in');  
		plus.nativeUI.closeWaiting();
	}
})


document.addEventListener("plusready",function(){
	appElement=document.querySelector('[ng-controller=contentController]');
	$scope= angular.element(appElement).scope();
	id = plus.storage.getItem('new_cid');
	$scope.initView(id);
	$scope.$apply();
})
