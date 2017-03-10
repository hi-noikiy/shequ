var openid, oauthtype, oauth_arr={};
function ready_ThirdPartyLogin(){
	var auths = [];
	var first = null;
	//获取登录权限列表
	plus.oauth.getServices(function(data){
//		alert(JSON.stringify(data))
		for(var i in data){
			var service = data[i];    
			auths[service.id] = service;
		}
	} , function(e){
		toast('获取第三方登录失败!');
	})	
	
	uid = plus.storage.getItem('uid');
	

	//第三方登录
	$('#weixin').on('tap' , function(){
        plus.nativeUI.toast('登入中...');
		oauthLogin('weixin');
	})   
	
	$('#qq').on('tap' , function(){
//                alert("qq登录");
        plus.nativeUI.toast('登入中...');
        oauthLogin('qq');
	})
	
	$('#sinaweibo').on('tap' , function(){
//                       alert('微博登录中');
       plus.nativeUI.toast('登入中...');
       oauthLogin('sinaweibo');
	})
	
	
	/**
	 * 权限认证
	 * @param {Object} id
	 */
	function oauthLogin(id){ 
		var s = auths[id];
		
		if(!s.authResult){
//          console.log(s.authResult)
            s.login(function(success){
//                  ('登录认证success');
                    getAuthsInfo(id);
				return; 
			} , function(e){
				plus.nativeUI.closeWaiting();
//				toast('登录认证失败');
                    alert('登录认证失败'+JSON.stringify(e));
				return;
			})       
		}
//		else{
//			getAuthsInfo(id);
//			return; 
//		}
	}
	
	
	/**
	 * 获取用户信息
	 */
	function getAuthsInfo(id){
		var s = auths[id] , userinfo = null , user = null , avatar = null , openid = null , oauthtype = s.id , name = null , openid = null;
		s.getUserInfo(function(data){
			userinfo = data.target.userInfo;
			switch(oauthtype){  
				case 'weixin' :  
					avatar = userinfo.headimgurl;//头像 
					name = userinfo.nickname;  
					openid = data.target.authResult.openid;
					break;
				case 'qq' : 
					avatar = userinfo.figureurl_qq_2;//头像 
					name = userinfo.nickname;
					openid = data.target.authResult.openid;
					break;
				case 'sinaweibo' : 
					avatar = userinfo.profile_image_url;//头像 
					name = userinfo.name;
					openid = data.target.authResult.uid;
					break;  
			}
//			console.log(JSON.stringify(userinfo));
//			console.log(apiRoot + '?m=Home&c=Member&a=oAuthLogin&openid='+openid +"&avatar="+avatar+"&name="+name+"&oauthtype="+oauthtype); 
//			console.log(apiRoot);//return;
			$.ajax({     
				url : apiRoot, 
				type : 'post',    
				data : {
					action : 'User.oAuthLogin', 
					openid : openid, 
					avatar : avatar, 
					name : name,      
					oauthtype : oauthtype
				},  
				dataType:'json',
				success : function(data){
					console.log(JSON.stringify(data));
					if(data.error == 0){
						plus.storage.setItem('uid',data.data.id + '');
						plus.storage.setItem('mobile',data.data.mobile + '');
						plus.storage.setItem('nick',data.data.nick + '');/*昵称*/
						plus.storage.setItem('icon',data.data.icon + '');
						plus.storage.setItem('gender',data.data.gender);//性别
						plus.storage.setItem('sign',data.data.sign);//签约字段
						plus.storage.setItem('merchant',data.data.merchant);//商户识别 
						plus.storage.setItem('personalized',data.data.personalized);//个性签名
						plus.storage.setItem('address',data.data.location);//地址 
						setTimeout(function(){
							ws.close;
						}, 1000);    
						plus.webview.create('../index.html','index.html').show('pop-in');
					   //记录第三方的登录信息，此处需要调用一下服务器接口判断此用户是否已经存在，账号为 id，密码也是123456；
                       var arr = [data.data.id,
                                  data.data.mobile,
                                  data.data.nick,
                                  data.data.icon];
                       window.plus.bridge.execSync("community","login",arr);
						plus.nativeUI.closeWaiting();
					}else{
						toast('登陆失败！');
					}
				},
				error:function(e){
					console.log(JSON.stringify(e));   
//					errortoast();
				}
			})  
			
		} , function(){
			toast('获取用户信息失败');
			return;
		})  
	}	
	
}
if(window.plus){
	ready_ThirdPartyLogin();
}else{
	document.addEventListener('plusready',ready_ThirdPartyLogin,false);
}
