var app = angular.module("viedodetailsApp",[]);//goods_detail
var uid ,id;
app.controller("vieodetailsController",function($scope,$http){
	$scope.initView = function($id,$uid){
	$http({
		method:'post',
		url:apiRoot,
		data:{
			action:'Community.details',
			id:$id,
			uid:$uid,
		}
	}).then(function successCallback(response){
		console.log(JSON.stringify(response)); 
        
		$scope.notes = response.data.data.note;//标题下的数据
		$scope.goods = response.data.data.goods;
		$scope.comments = response.data.data.comment;
		$scope.user = response.data.data.user;
		
//		console.log(JSON.stringify(response.data.data.note));
	},function errorfunction(e){
		console.log(e);
	})
}
	$scope.goodsInfo = function(id)
	{
		plus.nativeUI.showWaiting('加载中......');
		plus.storage.setItem('goodsId',id+'');
		plus.webview.create('goods_detail.html','goods_detail.html').show('pop-in');
		plus.nativeUI.closeWaiting();
	}
	$scope.viedo_follow = function()
	{
		$('#follow').html('&#xe6aa;已关注').css({'color':'#999','border':'1px solid #999'});
		$http({
		method:'post',
		url:apiRoot,
		data:{
			action:'Community.follow',
			type_id:id,
			uid,uid,
			type:0, 
		}
	}).then(function successCallback(response){
		console.log(JSON.stringify(response)); 
        
//		console.log(JSON.stringify(response.data.data.note));
	},function errorfunction(e){
		console.log(e);
	})
		
	}
	$scope.viedo_follow = function()
	{
		$('#follow').html('&#xe6aa;已关注').css({'color':'#999','border':'1px solid #999'});
		$http({
		method:'post',
		url:apiRoot,
		data:{
			action:'Community.follow',
			type_id:id,
			uid,uid,
			type:0, 
		}
		}).then(function successCallback(response){
			console.log(JSON.stringify(response)); 
	        
	//		console.log(JSON.stringify(response.data.data.note));
		},function errorfunction(e){
			console.log(e);
		})
		
	}
	$scope.viedoCollection =function()
	{
		$('#viedocollection').html('<i class="iconfont mui-icon colorP">&#xe622;</i>  <i class="font12">已收藏</i>')
		$http({
		method:'post',
		url:apiRoot,
		data:{
			action:'Community.collection',  
			type_id:id,
			uid,uid,
			type:0, 
		}
		}).then(function successCallback(response){
			console.log(JSON.stringify(response)); 
	        
	//		console.log(JSON.stringify(response.data.data.note));
		},function errorfunction(e){
			console.log(e);
		})
	}
})


document.addEventListener("plusready",function(){
	appElement=document.querySelector('[ng-controller=vieodetailsController]');
	$scope= angular.element(appElement).scope();
//	id = plus.storage.getItem('noteId');
	uid = plus.storage.getItem('uid');
	id = plus.webview.currentWebview().gid;
	if (!id){
		id = plus.storage.getItem('noteId');
	}
	my = plus.webview.currentWebview().my;
	if(my == 'my'){
		$('.borderNone').css('display','none');
	} 
	$scope.initView(id,uid);
	$scope.$apply();
})
