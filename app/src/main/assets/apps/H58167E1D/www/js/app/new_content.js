var cur_page = 1;
var app = angular.module("newApp",[]);
app.controller("contentController",function($scope,$http){
	$scope.initView = function($id){
		console.log($id);
	$http({
		method:'post',
		url:apiRoot,
		data:{
			action:'Community.more',
			cid:$id,
			hot:0,
			page:cur_page
		}
	}).then(function successCallback(response){
		console.log(JSON.stringify(response.data));         
		$scope.notes = response.data.data.note//最新内容数据 
//		if(response.data.error == 0){
//			if(response.data.data){
//				cur_page++;
//				mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
//				$scope.dynamic = response.data.data//最新内容数据 
//			}else{
//				mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
//			}
//		}
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



mui.init({		
    pullRefresh : {
       container:"#pullrefresh",//下拉刷新容器标识
       	up : {
			contentrefresh: '正在加载...',
			callback: pullupRefresh
       	},
       	down: {
			callback: pulldownRefresh
		}
    }
 }); 

//下拉刷新
function pulldownRefresh() {
	setTimeout(function() {
//			appElement=document.querySelector('[ng-controller=dynamicController]');
//			$scope= angular.element(appElement).scope();
//			$scope.initView();
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
//			$scope.$apply();
	}, 1500);
}
/**
 * 上拉加载具体业务实现
 */
function pullupRefresh() {
	setTimeout(function() {
//			mui('#pullrefresh').pullRefresh().endPullupToRefresh(); //参数为true代表没有更多数据了。
		appElement=document.querySelector('[ng-controller=contentController]');
		$scope= angular.element(appElement).scope();
		$scope.initView();
		$scope.$apply();
	}, 1500);
}

document.addEventListener("plusready",function(){
	appElement=document.querySelector('[ng-controller=contentController]');
	$scope= angular.element(appElement).scope();
	id = plus.storage.getItem('cid');
	$scope.initView(id);
	$scope.$apply();
})
