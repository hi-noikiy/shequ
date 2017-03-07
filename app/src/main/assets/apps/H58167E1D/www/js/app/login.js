document.addEventListener('plusready',function(){
	ws = plus.webview.currentWebview();
	var id = plus.storage.getItem('uid');//用户id
	var first = plus.storage.getItem('first');
//	plus.storage.clear();
	if (!first){
		setTimeout(function(){
			ws.close;
		}, 1000); 
		plus.webview.create('../splash.html','splash.html').show('pop-in');
		return;
	}
	if(id){
		setTimeout(function(){
			ws.close;
		}, 1000);   
		plus.webview.create('../index.html','index.html').show('pop-in');
	}
	$('#sq_login').on('tap',function(){
		var phon = $('#phone').val();
		var pass= $('#password').val();
		if(!phon.trim() || !pass.trim()){
			toast('账号或密码不能为空');
			return; 
		}
		if(!phon.match(p1) || !pass.match(passReg)){
			toast('请检查信息格式是否正确');
			return;
		} 
		plus.nativeUI.showWaiting('登录中...');  

		$.ajax({
   			type:"post",
			url:apiRoot,   
			data : {
				action : 'User.login', 
				mobile : phon,
				password : pass,
			},
			dataType:'json',
			success:function(data){ 
				console.log(JSON.stringify(data));  
				plus.nativeUI.closeWaiting();
				if(data.error == 0){  
					plus.nativeUI.toast('登录成功'); 
					plus.storage.setItem('uid',data.data.id+'');//用户id
					plus.storage.setItem('mobile',data.data.mobile+'');//登录手机号
					plus.storage.setItem('nick',data.data.nick+'');//昵称
					plus.storage.setItem('icon',data.data.icon+'');//icon 
					plus.storage.setItem('gender',data.data.gender);//性别
					plus.storage.setItem('sign',data.data.sign);//签约字段
					plus.storage.setItem('merchant',data.data.merchant);//商户识别 
					plus.storage.setItem('personalized',data.data.personalized);//个性签名
					plus.storage.setItem('address',data.data.location);//地址 
					console.log(plus.storage.getItem('merchant'));
					setTimeout(function(){
						ws.close;
					}, 1000);   
					plus.webview.create('../index.html','index.html').show('pop-in');
					 ws.close();

                                       var arr = [data.data.id,
                                                  data.data.mobile,
                                                  data.data.nick,
                                                  data.data.icon];
                                       window.plus.bridge.execSync("community","login",arr);
				}else{
					plus.nativeUI.toast(data.desc);
					return; 
				}  
			}, 
			error : function(e){
				console.log(JSON.stringify(e));
//				errortoast();
			}
		});
	})
})