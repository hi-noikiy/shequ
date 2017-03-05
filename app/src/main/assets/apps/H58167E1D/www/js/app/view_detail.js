var app = angular.module("detailsApp",[]);//goods_detail
var uid ,id;
app.controller("detailsController",function($scope,$http){
	$scope.initView = function($id,$uid){
		console.log($id,$uid);
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
	$scope.view_follow = function()
	{
		$('#follow').html('&#xe6aa;已关注').css({'color':'#999','border':'1px solid #999'});
		$http({
		method:'post',
		url:apiRoot,
		data:{
			action:'Community.follow',
			type_id:id,
			uid:uid,
			type:0, 
		}
	}).then(function successCallback(response){
		console.log(JSON.stringify(response)); 
        
//		console.log(JSON.stringify(response.data.data.note));
	},function errorfunction(e){
		console.log(e);
	})
		
	}
	$scope.view_follow = function()
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
	$scope.viewCollection =function()
	{
		$('#viewcollection').html('<i class="iconfont mui-icon colorP">&#xe622;</i>  <i class="font12">已收藏</i>');
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
	$scope.viewContent = function()
	{
      viewval=plus.storage.getItem('conmentval');
		$http({   
		method:'post',
		url:apiRoot,
		data:{
			action:'Community.content',  
			id:id,
			uid:uid,
			content:viewval,
			parent:0, 
		}
		}).then(function successCallback(response){
			console.log(JSON.stringify(response)); 
	           toast('发表成功');
	//		console.log(JSON.stringify(response.data.data.note));
		},function errorfunction(e){
			console.log(JSON.stringify(e));
		})
	}
	$scope.huiContent=function(id)
	{
		console.log(id);
		huifu=plus.storage.getItem('conmentval');
		$('.input_box').animate({
				left:'0px'
			},300)
		$http({   
		method:'post',
		url:apiRoot,
		data:{
			action:'Community.content',  
			id:id,
			uid:uid,
			content:huifu,
			parent:0, 
		}
		}).then(function successCallback(response){
			console.log(JSON.stringify(response)); 
	           toast('发表成功');
	//		console.log(JSON.stringify(response.data.data.note));
		},function errorfunction(e){
			console.log(JSON.stringify(e));
		})
	}
})


document.addEventListener("plusready",function(){
	appElement=document.querySelector('[ng-controller=detailsController]');
	$scope= angular.element(appElement).scope();
	id = plus.storage.getItem('noteId');
	uid = plus.storage.getItem('uid');
	$scope.initView(id,uid);
	$scope.$apply();
})
