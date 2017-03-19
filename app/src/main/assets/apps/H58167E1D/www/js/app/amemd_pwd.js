var app = angular.module("amemdpwdApp",[]);

app.controller("amemdpwdController",function($scope,$http){
   $scope.updatePassword = function()
   {
   	var phone_number = $('#mobile').val();
     var passone=$('#password').val();
     var passtwo=$('#passwordtwo').val();
     if(phone_number == ""){
     	toast('请输入11位手机号码');
     	return;
     }else {
     	if(!phone_number.match(p1)){
     		toast('手机号码无效');
			return;
     	}
     }
     if(passone ==""){
     	toast('请输入原密码');
			return;
     } else {
     	if(!passone.match(passReg)){
			toast('与原密码不匹配');
			return;
		}
     }
	if(passtwo ==""){
		toast('请输入新密码');
		return;
	}else{
		if(!passtwo.match(passReg)){
			toast('新密码只能为6~18位数字和字母组合');
				return;
		}
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
