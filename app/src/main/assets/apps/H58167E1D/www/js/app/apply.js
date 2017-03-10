var files = [];
var uid;
var name;
var mobile;
var card;
var channel;
var number;
var summary;
var app = angular.module("applyApp",[]);
app.controller("applyController",function($scope,$http){
	
	$scope.apply_sub = function()
	{
		uid = plus.storage.getItem('uid');
		name=$('#merchant_name').val();
		mobile=$('#merchant_mobile').val();
		card=$('#merchant_card').val();
		channel=$("input[type='radio']:checked").val();
		number=$('#merchant_number').val();
	    summary=$('#merchant_summary').val();
		console.log(name+'1='+uid+'=='+mobile+'2=='+card+'3==='+channel+'4==='+number+'5==='+summary); 
		console.log(files);
		
		upload();
	}
})  
	$('.upfile_box').on('click',function(){ 
		var id=$(this).attr('id');
		console.log(id)
		plus.nativeUI.actionSheet({cancel:"取消",buttons:[{title:"拍照添加"},{title:"相册添加"}]},function(e){
			if(e.index == 1){
				var car =plus.camera.getCamera();
				car.captureImage(function(path){
					//展示图片
//					alert(plus.io.convertLocalFileSystemURL(path));
                   console.log(JSON.stringify(path))
                   path="file://"+plus.io.convertLocalFileSystemURL(path);
					appendpic(path,id)
					
				 $('.a'+id).html('<img src="'+path+'">');				
				},function(err){});
				
			}else if(e.index == 2){
				plus.gallery.pick(function(path){
					 console.log(JSON.stringify(path))
					appendpic(path,id)
					$('.a'+id).html('<img src="'+path+'">');
				});
			}
		})
	})	 	
//添加图片
var index = 1;
var files = [];
function appendpic(p,id){
	plus.nativeUI.showWaiting('图片处理中...');
//		console.log(p); 
	//创建新的路径
//				var newpath = p.replace(/\./g , new Date().gettime() + '.');
	var newpath = p.replace(/\./g , new Date().getTime()+'.');
	
	plus.zip.compressImage({
			src : p,
			dst : newpath,
			quality : 20
		},
		function(){//毁掉成功
			plus.nativeUI.closeWaiting();
			files.push({'patn':newpath,'name':'name'+id}); 
			console.log(newpath)
		},
		function(error){
		alert('压缩图片失败');
		plus.nativeUI.closeWaiting();
	})
}

function upload(){
//		if(files.length <= 0){
//			toast("请上传头像！");
//		}
//var img1=$('#a1').attr('src');
//		var img2=$('#a2').attr('src');
//		var img3=$('#a3').attr('src');
//		var img4=$('#a4').attr('src');
		if(!name)
		{
			toast('请输入名字');
			return;
		}
		if(!mobile)
		{
			toast('请输入手机号码');
			return;
		}
		if(!mobile.match(p1))
		{
			toast('手机号码格式联对');
			return;
		}
		if(!card)
		{
			toast('请输入身份证号码');
			return;
		}
		if(!channel)
		{
			toast('请选择收款方式');
			return;
		}
		if(!number)
		{
			toast('请选择收款账号');
			return;
		}
//		if(img1.length==0)
//		{
//			toast('请添加本人照片');
//			return;
//		}
//		if(img2.length==0)
//		{
//			toast('请添加本人身份证正面照片');
//			return;
//		}
//		if(img3.length==0)
//		{
//			toast('请添加本人身份证反面照片');
//			return;
//		}
//		if(img4.length==0)
//		{
//			toast('请添加上传照片');
//			return;
//		}
//		if(!summary)
//		{
//			toast('请输入资质说明');
//			return;
//		}
	var img=plus.storage.getItem('icon');

	var server = apiRoot;  
	var task = plus.uploader.createUpload(server,
		    {method:"post"},
			function(t,status){ //上传完成
//				alert(JSON.stringify(t))
				if(status == 200){ 
//					plus.nativeUI.closeWaiting();
//					console.log(JSON.stringify(t))
////					console.log(123);
					var infopics = $.parseJSON(t.responseText);
					console.log(JSON.stringify(infopics));
					if(t.responseText.data!='')
					{
						plus.nativeUI.toast('提交成功');
						plus.webview.create('personal_center.html','personal_center.html').show('pop-in');
					}
				}else{
					toast('上传失败：' + status);
					plus.nativeUI.closeWaiting();
				}
				
			},function () {
				plus.nativeUI.closeWaiting();
			}
			
		); 
	 for (var i=0 ;i<files.length;i++)
	 {  var f=files[i];
		task.addFile(f.patn,{key:f.name});
	}
	task.addData('action','Merchant.apply');
	task.addData('uid',uid); 
	task.addData('name',name);
	task.addData('mobile',mobile);
	task.addData('card',card);
	task.addData('channel',channel);
	task.addData('number',number); 
	task.addData('summary',summary);
	task.start();
	 
}		
document.addEventListener("plusready",function(){
	appElement=document.querySelector('[ng-controller=applyController]');
	$scope= angular.element(appElement).scope();
	$scope.$apply();
})
	

