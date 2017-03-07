var ws;
document.addEventListener('plusready',function(){
	ws = plus.webview.currentWebview();
	$('#sq_login').on('click',function(){
		alert(123456);
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
		showWating('登录中...');
		$.ajax({
			type:"get",
			url:apiRoot + '?m=home&c=User&a=login',
			data : {
				user : phon,
				pass : pass,
			},
			dataType:'json',
			success:function(data){
				console.log(JSON.stringify(data));
				plus.nativeUI.closeWaiting();
				if(data.aid){ 
					toast('登录成功'); 
					plus.storage.setItem('uid',data.aid+'');//用户id
					plus.storage.setItem('user',data.user+'');//登录手机号
					plus.storage.setItem('money',data.money+'');//用户余额
					plus.storage.setItem('zijin',data.zijin+'');//用户冻结金额
					plus.storage.setItem('userAvatar',data.avatar);//用户头像
					plus.storage.setItem('name',data.name+'');//用户名称
					plus.storage.setItem('origin',data.origin+'');//用户籍贯
					plus.storage.setItem('birth',data.birth+'');//用户生日
					plus.storage.setItem('sex',data.sex+'');//用户性别
					plus.storage.setItem('nation',data.nation+'');//用户民族
					plus.storage.setItem('skill',data.skill+'');//工作技能
					plus.storage.setItem('length',data.length+'');//工作年限
					plus.storage.setItem('phone',data.phone+'');//联系方式
					plus.storage.setItem('status',data.status+'');//超仁状态
					plus.storage.setItem('isshare',data.isshare+'');//超仁是否共享位置
					plus.storage.setItem('kernel',data.kernel+'');//仁币
					plus.storage.setItem('address',data.address+'');//地址
					console.log(plus.storage.getItem('uid'));
					setTimeout(function(){
						ws.close;
					}, 1000)
					goUrl('../index.html');
					var arr = [data.data.id,
                              data.data.mobile,
                              data.data.nick,
                              data.data.icon];
                              window.plus.bridge.execSync("community","login",arr);
				}else{
					toast(data.error);
					return; 
				}
			},
			error : function(e){
				console.log(JSON.stringify(e));
				errortoast();
			}
		});
	})
	$('#mui-btn').on('click',function(){
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
		showWating('登录中...');
		$.ajax({
			type:"get",
			url:apiRoot + '?m=home&c=User&a=login',
			data : {
				user : phon,
				pass : pass,
			},
			dataType:'json',
			success:function(data){
				console.log(JSON.stringify(data));
				plus.nativeUI.closeWaiting();
				if(data.aid){ 
					toast('登录成功'); 
					plus.storage.setItem('uid',data.aid+'');//用户id
					plus.storage.setItem('user',data.user+'');//登录手机号
					plus.storage.setItem('money',data.money+'');//用户余额
					plus.storage.setItem('zijin',data.zijin+'');//用户冻结金额
					plus.storage.setItem('userAvatar',data.avatar);//用户头像
					plus.storage.setItem('name',data.name+'');//用户名称
					plus.storage.setItem('origin',data.origin+'');//用户籍贯
					plus.storage.setItem('birth',data.birth+'');//用户生日
					plus.storage.setItem('sex',data.sex+'');//用户性别
					plus.storage.setItem('nation',data.nation+'');//用户民族
					plus.storage.setItem('skill',data.skill+'');//工作技能
					plus.storage.setItem('length',data.length+'');//工作年限
					plus.storage.setItem('phone',data.phone+'');//联系方式
					plus.storage.setItem('status',data.status+'');//超仁状态
					plus.storage.setItem('isshare',data.isshare+'');//超仁是否共享位置
					plus.storage.setItem('kernel',data.kernel+'');//仁币
					plus.storage.setItem('address',data.address+'');//地址
					console.log(plus.storage.getItem('uid'));
					setTimeout(function(){
						ws.close;
					}, 1000)
					goUrl('../index.html');
				}else{
					toast(data.error);
					return; 
				}
			},
			error : function(e){
				console.log(JSON.stringify(e));
				errortoast();
			}
		});
	})
})