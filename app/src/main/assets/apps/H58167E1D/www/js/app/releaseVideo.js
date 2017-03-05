var newpath,files=[];
var app = angular.module("releaseVideoApp",[]);
var cid;
app.controller("releaseVideoController",function($scope,$http){
	$scope.releasesviedo=function()
	{
		var tags = plus.storage.getItem('releaseTags');
		var uid = plus.storage.getItem('uid');
//		var groupid = plus.storage.getItem('repleaseGroup');
//		var goodsid = plus.storage.getItem('repleaseGoods');
        var server = apiRoot;  
		var task = plus.uploader.createUpload(server,
			    {method:"post"},
				function(t,status){ //上传完成
					if(status == 200){ 

						var infopics = $.parseJSON(t.responseText);
						console.log(JSON.stringify(infopics));
						if(t.responseText.data!='')
						{
							plus.nativeUI.toast('发布成功');
							plus.webview.create('home.html','home.html').show('pop-in');
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
				task.addFile(f.patn,{key:f.name+i});
			}
			task.addData('action','Community.communityRelease');
			task.addData('cid',cid); 
			task.addData('uid',uid);
			task.addData('title',$("#releaseTitle").val());
			task.addData('content',$("#releaseContent").val());
			task.addData('tags',tags);
			task.addData('groupid','1'); 
			task.addData('goodsid','1');
			task.addData('file_type','M');
			task.start();
		        
			}
	

})

$("#releaseClass").on('tap',function(){
	 cid=$('input[type="radio"]:checked').val();
})

/*
 *图片上传
 */
$('#note_subject').on('tap',function(){ 
		plus.nativeUI.actionSheet({cancel:"取消",buttons:[{title:"拍照添加"},{title:"相册添加"}]},function(e){
			if(e.index == 1){
				var car =plus.camera.getCamera();
				car.captureImage(function(path){
					//展示图片
//					alert(plus.io.convertLocalFileSystemURL(path));
                   console.log(JSON.stringify(path))
                   path="file://"+plus.io.convertLocalFileSystemURL(path);
					files.push({'patn':path,'name':'name'});
					
				 $('.img_show').append('<img src="'+path+'">');				
				},function(err){});
				
			}else if(e.index == 2){
				plus.gallery.pick(function(path){
					 console.log(JSON.stringify(path))
					files.push({'patn':path,'name':'name'});
					$('.img_show').append('<img src="'+path+'">');
				});
			}
		})
	})
$('.note_subject').on('tap',function(){ 
		plus.nativeUI.actionSheet({cancel:"取消",buttons:[{title:"拍照添加"},{title:"相册添加"}]},function(e){
			if(e.index == 1){
				var car =plus.camera.getCamera();
				car.captureImage(function(path){
					//展示图片
//					alert(plus.io.convertLocalFileSystemURL(path));
                   console.log(JSON.stringify(path))
                   path="file://"+plus.io.convertLocalFileSystemURL(path);
					files.push({'patn':path,'name':'name'});
					
				$('#a1').attr('src',path);			
				},function(err){});
				
			}else if(e.index == 2){
				plus.gallery.pick(function(path){
					 console.log(JSON.stringify(path))
					files.push({'patn':path,'name':'name'});
					$('#a1').attr('src',path);
                 },function(err){});
			}
		})
	})


document.addEventListener("plusready",function(){
	appElement=document.querySelector('[ng-controller=releaseVideoController]');
	$scope= angular.element(appElement).scope();
	$scope.$apply();
})
    