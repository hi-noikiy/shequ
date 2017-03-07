var app = angular.module("detailsApp",[]);//goods_detail
var uid ,id;
app.controller("detailsController",function($scope,$http){
	$scope.initView = function($uid){
		console.log($uid);
	$http({
		method:'post',
		url:apiRoot,
		data:{
			action:'Community.myCollection',
			uid:$uid,
		}  
	}).then(function successCallback(response){
		console.log(JSON.stringify(response)); 
//      console.log(JSON.stringify(response.data.data.comment)); 
//      console.log(123); 
		$scope.notes = response.data.data;//标题下的数据  
//		$scope.goods = response.data.data.goods;
//		$scope.comments = response.data.data.comment;
//		$scope.user = response.data.data.user;
		
//		console.log(JSON.stringify(response.data.data.note));
	},function errorfunction(e){
		console.log(JSON.stringify(e)); 
	})
}
	$scope.goodsInfo = function(id)
	{
		plus.nativeUI.showWaiting('加载中......');
		plus.storage.setItem('goodsId',id+'');
		plus.webview.create('view_detail.html','view_detail.html').show('pop-in');
		plus.nativeUI.closeWaiting();
	}
//	$scope.view_follow = function()
//	{
//		console.log(uid);
//		$('#follow').html('&#xe6aa;已关注').css({'color':'#999','border':'1px solid #999'});
//		$http({
//		method:'post',
//		url:apiRoot,
//		data:{
//			action:'Community.follow',
//			type_id:id,
//			uid:uid,
//			type:0, 
//		}
//		}).then(function successCallback(response){
//			console.log(JSON.stringify(response)); 
//	        
//	//		console.log(JSON.stringify(response.data.data.note));
//		},function errorfunction(e){
//			console.log(e);
//		})
//		
//	} 

})


document.addEventListener("plusready",function(){
	appElement=document.querySelector('[ng-controller=detailsController]');
	$scope= angular.element(appElement).scope();
	uid = plus.storage.getItem('uid');
	$scope.initView(uid);
	$scope.$apply();
})
