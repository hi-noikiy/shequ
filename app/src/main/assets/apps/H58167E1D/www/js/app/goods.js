var id;
var app = angular.module("goodsApp",[]);
app.controller("goodsController",function($scope,$http){
	$scope.initView = function($id,$uid){
		console.log($id);
		console.log($uid);
		plus.nativeUI.closeWaiting();
	$http({
		method:'post',
		url:apiRoot,
		data:{
			action:'Trade.goodInfo',
			id:$id,
			uid:$uid,
		}
	}).then(function successCallback(response){
		console.log(JSON.stringify(response));  
		console.log(response.data.data);
		$scope.goodsData = response.data.data//标题下的数据
		
	},function errorfunction(e){ 
		console.log(JSON.stringify(e));
	})	 
}  
	
//	$scope.is_attention=function(state){
//		if(state){
//			$('.attention_btn').html('&#xe669;关注');
//			state = 0;
//		} else {
//			state = 1;
//			$('.attention_btn').html('&#xe6aa;已关注');
//		}
//	}
	
	
	$scope.shopping=function(goodid)//confirm_order.html
	{
		plus.storage.setItem('goodId',goodid+'');
		plus.nativeUI.showWaiting('加载中...');
		plus.webview.create('confirm_order.html', 'confirm_order.html').show('pop-in');

	}
	$scope.info = function(id)
	{
		plus.nativeUI.showWaiting('加载中......');
		plus.storage.setItem('goodsId',id+'');
		plus.webview.create('goods_detail.html','goods_detail.html').show('pop-in');
	}
})


document.addEventListener("plusready",function(){
	appElement=document.querySelector('[ng-controller=goodsController]');
	$scope= angular.element(appElement).scope();
	id = plus.webview.currentWebview().gid;
	if (!id){
		id = plus.storage.getItem('goodsId');
	}
	uid = plus.storage.getItem('uid');
	my = plus.webview.currentWebview().my;
	if(my == 'my'){
		$('#shopping').css('display','none');
	} 
	$scope.initView(id,uid);
	$scope.$apply();
})
