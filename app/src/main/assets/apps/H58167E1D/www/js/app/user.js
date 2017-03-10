var uid,icon,nick,gender,personalized,address;
document.addEventListener('plusready',function(){
		 uid = plus.storage.getItem('uid');
		 console.log(uid);
		 icon = plus.storage.getItem('icon');
		 nick = plus.storage.getItem('nick');
         gender = plus.storage.getItem('gender');
         personalized = plus.storage.getItem('personalized');
         address = plus.storage.getItem('address');
         if(gender==0)
         {
         	$('#userResult').text('男');
         }else
          {
          	$('#userResult').text('女');
          }
          $('#cityResult').text(address);
          $('#personalized').text(personalized);
		 
/* 
 *图片上传 
 * */
	 	$('.upfile_box').on('click',function(){ 
		plus.nativeUI.actionSheet({cancel:"取消",buttons:[{title:"拍照添加"},{title:"相册添加"}]},function(e){
			if(e.index == 1){
				var car =plus.camera.getCamera();
				car.captureImage(function(path){
					//展示图片
//					alert(plus.io.convertLocalFileSystemURL(path));
                   console.log(JSON.stringify(path))
                   path="file://"+plus.io.convertLocalFileSystemURL(path);
					appendpic(path)
					
				 $('#show_pic8').html('<img src="'+path+'">');				
				},function(err){});
				
			}else if(e.index == 2){
				plus.gallery.pick(function(path){
					 console.log(JSON.stringify(path))
					appendpic(path)
					$('#show_pic8').html('<img src="'+path+'">');			
				});
			}
		})
	})	 
var newpath;
//添加图片
function appendpic(p){
	plus.nativeUI.showWaiting('图片处理中...');
//		console.log(p); 
	//创建新的路径
//				var newpath = p.replace(/\./g , new Date().gettime() + '.');
    newpath = p.replace(/\./g , new Date().getTime()+'.');
	plus.zip.compressImage({
			src : p,
			dst : newpath,
			quality : 20
		},
		function(){//毁掉成功
			plus.nativeUI.closeWaiting();
			console.log(newpath);
			upload();
		},
		function(error){
		alert('压缩图片失败');
		plus.nativeUI.closeWaiting();
	})
}

function upload(){
	plus.nativeUI.showWaiting('上传中');
	var server = apiRoot;  
	console.log(newpath); 
	var task = plus.uploader.createUpload(server,
		    {method:"post"},
			function(t,status){ //上传完成
//				alert(JSON.stringify(t))
				if(status == 200){ 
//					plus.nativeUI.closeWaiting();
//					console.log(JSON.stringify(t))
					console.log(uid); 
					var infopics = $.parseJSON(t.responseText);
//					var user_icon= $.parseJSON(t.responseText.data); 
					console.log(JSON.stringify(infopics));
					if(t.responseText!='')
					{
						plus.nativeUI.toast('上传成功');
						console.log(JSON.stringify(infopics.data)); 
						plus.storage.setItem('icon',webRoot+infopics.data);
						icon=plus.storage.getItem('icon');
						console.log(JSON.stringify(icon)); 
						$('#show_pic8').attr('src',getAvatar(icon));
						parentid = plus.webview.getWebviewById('view/personal_center.html');
						mui.fire(parentid,'changeVal',{icon:icon});/*更新用户头像*/
						plus.nativeUI.closeWaiting();
						
					}
				}else{
					toast('上传失败：' + status);
					plus.nativeUI.closeWaiting();
				}
				
			},function () {
				plus.nativeUI.closeWaiting();
			}
			
		); 

		task.addFile(newpath,{key:'icon'});	
		task.addData('action','User.update');
		task.addData('uid',uid);
		task.addData('name','icon');
		task.start();
	 
}

$('#show_pic8').attr('src',getAvatar(icon));	console.log(getAvatar(icon));	
$('#nick').text(nick);
})
window.addEventListener('changeVal',function(event){
  var nick2 = event.detail.nick;
  console.log(nick2);
  if(nick2){
    nick = nick2;
    $('#nick').text(nick);
  }  
  var icon2 = event.detail.icon;
  if(icon2){
    icon = icon2;
    $('#user_icon').attr('src',getAvatar(icon));
  }  
});
window.addEventListener('personalizedVal',function(event){
  var personalized = event.detail.personalized;
  console.log(personalized);
  if(personalized){
    personalized = personalized;
    $('#personalized').text(personalized);
  }  
    
});