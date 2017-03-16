var id;
var app = angular.module("goodsApp",[]);
app.controller("goodsController",function($scope,$http){
	$scope.initView = function(){
	plus.nativeUI.closeWaiting();
	$http({
		method:'post',
		url:apiRoot,
		data:{
			action:'Trade.goodInfo',
			id:type_id,
			uid:uid,
		}
	}).then(function successCallback(response){
		plus.nativeUI.closeWaiting();
		console.log(JSON.stringify(response.data.data));
		$scope.goodsData = response.data.data//标题下的数据
		
	},function errorfunction(e){ 
		console.log(JSON.stringify(e));
	})
	
	//判断是否是关注的状态	
	$http({
		method:'post',
		url:apiRoot,
		data:{
			action:'Community.checkFollowStatus',
			uid:uid,
			type:type,
			type_id:type_id
		}
	}).then(function successCallback(response){
		plus.nativeUI.closeWaiting();
		console.log(JSON.stringify(response));
		if(response.data.error == 121){
			$scope.attention = 121;
		}else{
			$scope.attention = 115;/*显示取消关注*/
		}		
	},function errorfunction(e){ 
		console.log(JSON.stringify(e));
	})	
	
}  

	
		/*关注/取消关注*/
	var is_clickAttention = true;
	$scope.isattention = function(way)
	{
		if(is_clickAttention){
		plus.nativeUI.showWaiting('');
		console.log(uid+' '+type+' '+type_id);
		$http({
			method:'post',
			url:apiRoot,
			data:{
				action:'Community.follow',
				uid:uid,
				type:type,
				type_id:type_id
			}
		}).then(function successCallback(response){
			plus.nativeUI.closeWaiting();
			console.log(JSON.stringify(response));
			if(response.data.error == 115){
				/*操作成功*/
				if(way == 2){
					$scope.attention = 121;/*显示关注*/
					tost("已取消关注");
				}else{
					$scope.attention = 115;/*显示取消关注*/
					tost("已关注");
				}				
			}
		},function errorfunction(e){ 
			errortoast();
			console.log(JSON.stringify(e));
		})	
		is_clickAttention = false;
		setTimeout(function(){
			is_clickAttention = true;
		},2000)
		}
	}
	
	
	
	$scope.shopping=function(goodid)//confirm_order.html
	{
		mui.toast(goodid);
		plus.nativeUI.showWaiting('加载中...');
		plus.webview.create('confirm_order.html', 'confirm_order.html',{},{goodId:goodid+''}).show('pop-in');

	}
	$scope.info = function(id)
	{
		plus.nativeUI.showWaiting('加载中......');
		plus.storage.setItem('goodsId',id+'');
		plus.webview.create('goods_detail.html','goods_detail.html').show('pop-in');
	}
	$scope.icon_sub =function(id,img,nick){
//		plus.nativeUI.showWaiting('加载中......');
		console.log(id+'--'+img+'--'+nick);
		plus.webview.create('honer_page.html', 'honer_page.html',{},{icon_id:id,icon_img:img,icon_name:nick}).show('pop-in');
	}
	
	
	/*关注/取消关注*/
	$scope.isattention = function(way)
	{
		plus.nativeUI.showWaiting('');
		console.log(uid+' '+type+' '+type_id);
		$http({
			method:'post',
			url:apiRoot,
			data:{
				action:'Community.follow',
				uid:uid,
				type:type,
				type_id:type_id
			}
		}).then(function successCallback(response){
			plus.nativeUI.closeWaiting();
			console.log(JSON.stringify(response));
			if(response.data.error == 115){
				/*操作成功*/
				if(way == 2){
					$scope.attention = 121;/*显示关注*/
					toast("已取消关注");
				}else{
					$scope.attention = 115;/*显示取消关注*/
					toast("已关注");
				}
//			}else{
//				/*操作失败*/
//				if(way == 2){
//					$scope.attention = 1;/*显示取消关注*/
//				}else{
//					$scope.attention = 121;/*显示关注*/
//				}				
			}
		},function errorfunction(e){ 
			errortoast();
			console.log(JSON.stringify(e));
		})			
	}	
	
})

var ws,type_id,type;
document.addEventListener("plusready",function(){
	plus.nativeUI.showWaiting();
	appElement=document.querySelector('[ng-controller=goodsController]');
	$scope= angular.element(appElement).scope();
	ws = plus.webview.currentWebview();
	type_id = ws.gid;/*对象id，商品、人、图文、视频*/
	type = ws.type;/*类型*/
	uid = plus.storage.getItem('uid');
	var my = ws.my;
	if(my == 'my'){
		$('#shopping').css('display','none');
	} 
	$scope.initView();
	$scope.$apply();
})
