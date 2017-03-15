var app = angular.module("forgotApp",[]);
var is_getCode = 0;
app.controller("forgotController",function($scope,$http){
   $scope.forgot = function()
   {
     var passone=$('#password').val();
     var passtwo=$('#passwordtwo').val();
     var code = $('#code').val();
     //判断密码格式和值是否为空
	if(!passone.match(passReg) || passone ==""){
			toast('密码只能为6~18位数字和字母组合');
			return;
		}
	//判断两次输入的密码是否一致
     if(passone!=passtwo){
     	toast('两次密码不一致');
			return;
     }
     //判断手机号码格式和值是否为空
     if(!$("#mobile").val().match(p1) || $("#mobile").val() ==""){
     	toast('请填写正确在手机号码');
			return;
     }
     //判断是否获取验证码
     if(is_getCode == 0){
     	toast('请获取验证码');
     		return;
     }
     //判断验证码是否为空并且长度不能
     if($('#code').val().match(p3) =="" || $('#code').val().length != 4){
     	toast('请填写四位数字的验证码');
     	return;
     }
     $http({
		method:'post',
		url:apiRoot,
		data:{
			action:'User.forgotPassword',
			mobile:$("#mobile").val(),
			password:$("#password").val(),
			code:$("#code").val(),
		}
		}).then(function successCallback(response){
			console.log(JSON.stringify(response));
			if(response.data.error==0)
			{
				toast('密码修改成功');
				plus.webview.create('login.html', 'login.html').show('pop-in');
			}else
			 {
			 	alert(JSON.stringify(response.data.desc));
			 }
			
		},function errorfunction(e){
			console.log(JSON.stringify(e));
		})
     
   }
	
	$scope.forgotCode = function()
    {
    	if($('#mobile').val()=='')
    	{
    		toast('请输入手机号码');
    		return;
    	}
    	is_getCode = 1;
    	var curTime = new Date();
	  	var EndTime = parseInt((curTime.getTime()/1000)+60);//截止时间
	    var NowTime = parseInt(new Date().getTime()/1000);
    	var timer = setInterval(function(){
	    EndTime--;
	    var t =EndTime - NowTime;
	    console.log();
	    $(".second_box").html((t < 10 ? '0'+ t : t)+'秒后重新获取').attr('disabled','disabled');
	    if(t <= 0){
	    	clearInterval(timer);
	    	$(".second_box").html('获取验证码').attr('disabled',false);
	    }
		},1000)
		$http({
		method:'post',
		url:apiRoot,
		data:{
			action:'User.sendCode',
			mobile:$('#mobile').val(),
		}
		}).then(function successCallback(response){
			console.log(JSON.stringify(response.data));
			if(response.data.error==0){
				toast('发送成功');
				return;  
			}
		},function errorfunction(e){
			console.log(JSON.stringify(e));
			toast(JSON.stringify(e.desc));
		})	
   }
    
})


document.addEventListener("plusready",function(){
	appElement=document.querySelector('[ng-controller=forgotController]');
	$scope= angular.element(appElement).scope();
	$scope.$apply();
})
