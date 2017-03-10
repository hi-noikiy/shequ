var app = angular.module("amemdpwdApp",[]);

app.controller("amemdpwdController",function($scope,$http){
   $scope.updatePassword = function()
   {
     var passone=$('#password').val();
     var passtwo=$('#passwordtwo').val();
	if(!passone.match(passReg)){
			toast('密码只能为数字和字母');
			return;
	}
     $http({
		method:'post',
		url:apiRoot,
		data:{
			action:'User.updatePassword',
			mobile:$("#mobile").val(),
			password:$("#password").val(),
			passwordtwo:$("#passwordtwo").val(),
		}
		}).then(function successCallback(response){
			console.log(JSON.stringify(response));
			if(response.data.error==0)
			{
				toast('密码修改成功,请重新登录');
				plus.storage.clear();
				plus.webview.create('login.html', 'login.html').show('pop-in');
			}else
			 {
			 	alert(JSON.stringify(response.data.desc));
			 }
			
		},function errorfunction(e){
			console.log(JSON.stringify(e));
		})
     
   }
	

    
})


document.addEventListener("plusready",function(){
	appElement=document.querySelector('[ng-controller=amemdpwdController]');
	$scope= angular.element(appElement).scope();
	$scope.$apply();
})
