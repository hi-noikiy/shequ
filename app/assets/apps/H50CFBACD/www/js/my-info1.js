var ws ,sex ,userid ,userpic;
document.addEventListener('plusready',function(){
//	var userid = plus.storage.getItem('userid');//用户id
    ws = plus.webview.currentWebview();
    var wsid = ws.wsid;//地址详情页
    userid = ws.usersid;
   var html = "";
  	$.ajax({
    	type:"get",
    	url:apiRoot+"/home/user/usersdata/",
    	data : {
    		userid : userid
    	},
    	dataType:'json',
    	success:function(data){
    		console.log(JSON.stringify(data));
    		if(!data.userspic){
    			html +='<img class="mui-media-object mui-pull-left" src="../public/img/4.jpeg" />';
    		}else{
    			html +='<img class="mui-media-object mui-pull-left" src="'+getAvatar(data.userspic)+'" />';
    		}
    		$('#userlogo').html(html);
    		plus.storage.setItem('userimg',data.userspic);
//  		$('.usersni').attr('placeholder',data.usersni); 
//  		if(data.sex == 0){
//  			sex = '女';
//  		}else{
//  			sex = '男';
//  		}
//  		$('.sex').attr('placeholder',sex); 
//  		$('.namez').attr('placeholder',data.namez); 
//  		$('.birthday').attr('placeholder',data.birthday); 
//  		$('.usersaddr').attr('placeholder',data.usersaddr); 
////  		$('.usersphone').attr('placeholder',data.usersphone); 
//  		$('.zhiye').attr('placeholder',data.occupation); 
//  		$('.usersemail').attr('placeholder',data.usersemil); 
    		$('.usersni').val(data.usersni); 
    		$('.sex').val(data.sex);  
    		$('.namez').val(data.namez); 
    		$('.birthday').val(data.birthday); 
    		$('.usersaddr').val(data.usersaddr); 
    		$('.usersphone').val(data.usersphone); 
    		$('.zhiye').val(data.occupation); 
    		$('.usersemail').val(data.usersemil); 
    	},error:function(e){
    		console.log(JSON.stringify(e)); 
    	}
    	  
    });
    
    $('.userimg').on('click',function(){ 
		type = $(this).attr('cname');//区分照片
		plus.nativeUI.actionSheet({cancel:"取消",buttons:[{title:"拍照添加"},{title:"相册添加"}]},function(e){
			if(e.index == 1){
				var car =plus.camera.getCamera();
				car.captureImage(function(path){
					//展示图片
				console.log(plus.io.convertLocalFileSystemURL(path));
					$("img[cname='"+type+"']").attr('src','file://' + plus.io.convertLocalFileSystemURL(path));
					appendpic(path,type);
				},function(err){});
				
			}else if(e.index == 2){
				plus.gallery.pick(function(path){
					$("img[cname='"+type+"']").attr('src',path);
					appendpic(path,type);
				});
			}
		});
	})
    
    $('#bth').on('click',function(){
    	
    	var userpic = plus.storage.getItem('userpic');
    	if(!userpic){
    		var userpic = plus.storage.getItem('userimg');
    	} 
    	var usersni = $('.usersni').val(); 
    	var sex = $('.sex').val(); 
		var namez = $('.namez').val(); 
		var birthday = $('.birthday').val();
		var useraddr = $('.usersaddr').val(); 
		var zhiye = $('.zhiye').val(); 
		var useremail = $('.usersemail').val(); 
		
		$.ajax({
			type:"get",
			url:apiRoot+"/home/user/userdatadel",
			data : {
				aid :　userid,
				usersni :　usersni,
				sex　:　sex,
				namez　:　namez,
				userspic　:　userpic,
				Birthday : birthday,
				usersaddr : useraddr,
				occupation : zhiye,
				usersemil : useremail
			},
			dataType:'json',
			success:function(data){
				console.log(JSON.stringify(data));
				if(data > 0){
					plus.nativeUI.toast('修改成功!')
					plus.webview.getWebviewById(wsid).reload();
					plus.webview.getWebviewById("my.html").reload();
					setTimeout(function(){ 
						ws.close();
					} , 1500); 
				}
			},error:function(e){
				console.log(JSON.stringify(e));
			}
		});
    	
    })


})
