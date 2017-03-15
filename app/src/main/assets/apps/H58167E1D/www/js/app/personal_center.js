var app = angular.module("personalApp",[]);
var uid;
app.controller("personalController",function($scope,$http){
	$scope.initView = function($id){
	$http({
		method:'post',
		url:apiRoot,
		data:{
			action:'User.userInfo',
			id:$id,
		}
	}).then(function successCallback(response){
		console.log(JSON.stringify(response.data));          
		$scope.user= response.data.data;//最新内容数据 
		$scope.icon=response.data.data.icon;
		var filter_height = parseInt($('.user_box').height()+80);
		$('.substrate').css({'height':filter_height,'margin-bottom':'10px','background-image':'url('+$scope.icon+')'});
		$('.filterImg_box').css({'background-image':'url('+$scope.icon+')','background-size':'100% 100%','height':filter_height}).addClass('filterImg');
	},function errorfunction(e){
		console.log(JSON.stringify(e));
	})
  }
	$scope.user_info =function()
	{
	plus.webview.create('personal_data.html', 'personal_data.html',{},{personal_id:uid}).show('pop-in');
	}
	
})
document.addEventListener("plusready",function(){
	appElement=document.querySelector('[ng-controller=personalController]');
	$scope= angular.element(appElement).scope();
	uid=plus.storage.getItem('uid');
	$scope.initView(uid);
	$scope.$apply();
})