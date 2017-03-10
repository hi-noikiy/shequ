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
		plus.nativeUI.closeWaiting();
		console.log(JSON.stringify(response.data.data));         
		$scope.register = response.data.data//最新内容数据 
	},function errorfunction(e){
		console.log(JSON.stringify(e));
	})	
   }
   $scope.registerStart = function()
   {
     var passone=$('#password').val();
     var passtwo=$('#passwordtwo').val();
	if(!passone.match(passReg)){
			toast('密码只能为数字和字母');
			return;
		}
     if(passone!=passtwo)
     {
     	toast('两次密码不一致');
			return;
     }
     if(!$("#mobile").val().match(p1))
     {
     	toast('请填写正确在手机号码');
			return;
     }
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
				toast('注册成功');
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
    	if($('#mobile').val()=='')
    	{
    		toast('请输入手机号码');
    		return;
    	}
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
				//倒计时
				return;  
			}
		},function errorfunction(e){
			console.log(JSON.stringify(e));
			toast(JSON.stringify(e.desc));
		})	
   }
    
})


document.addEventListener("plusready",function(){
	appElement=document.querySelector('[ng-controller=registerController]');
	$scope= angular.element(appElement).scope();
	$scope.register();
	$scope.$apply();
})
