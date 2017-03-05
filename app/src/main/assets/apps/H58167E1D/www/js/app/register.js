var app = angular.module("registerApp",[]);
app.controller("registerController",function($scope,$http){
	$scope.register = function(){
	$http({
		method:'post',
		url:apiRoot,
		data:{
			action:'User.recommendInfo',
		}
	}).then(function successCallback(response){
		console.log(JSON.stringify(response.data.data));         
		$scope.register = response.data.data//最新内容数据 
	},function errorfunction(e){
		console.log(JSON.stringify(e));
	})	
   }
   $scope.registerStart = function()
   {
// 	 var a = $(".users:checked").val();
// 	 var b = $("input:checked").val();
   	 var perple = [];
   	 $("#perple input:checked").each(function () {
   	 	perple.push($(this).val());
   	 })
   	 
   	 perple = perple.join(',');
     console.log(perple);
   	 var thing = [];
   	 $("#thing input:checked").each(function () {
   	 	thing.push($(this).val());
   	 })
   	 
   	 thing = thing.join(',');
     console.log(thing);
     $http({
		method:'post',
		url:apiRoot,
		data:{
			action:'User.register',
			mobile:$("#mobile").val(),
			password:$("#password").val(),
			code:$("#code").val(),
			perple:perple,
			thing:thing,
		}
		}).then(function successCallback(response){
			console.log(JSON.stringify(response));
			if(response.data.error==0)
			{
				plus.webview.create('login.html', 'login.html').show('pop-in');
			}else
			 {
			 	alert(JSON.stringify(response.data.desc));
			 }
			
		},function errorfunction(e){
			console.log(JSON.stringify(e));
		})
     
   }
	
	$scope.mobileCode = function()
    {
		$http({
		method:'post',
		url:apiRoot,
		data:{
			action:'User.sendCode',
			mobile:$('#mobile').val(),
		}
		}).then(function successCallback(response){
			console.log(JSON.stringify(response.data));
			if(response.data.data.msg=='ok'){
				mui.toast('发送成功')
			}
		},function errorfunction(e){
			console.log(JSON.stringify(e));
		})	
   }
    
})


document.addEventListener("plusready",function(){
	appElement=document.querySelector('[ng-controller=registerController]');
	$scope= angular.element(appElement).scope();
	$scope.register();
	$scope.$apply();
})
