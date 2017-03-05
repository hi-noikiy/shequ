var newpath,files=[];
var app = angular.module("releaseGoodsApp",[]);
var cid;
app.controller("releaseGoodsController",function($scope,$http){
	$scope.releasesub=function()
	{
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
			task.addData('action','Trade.tradeRelease');
			task.addData('cid','7'); 
			task.addData('uid',uid);
			task.addData('good_name',$("#good_name").val());
			task.addData('good_intro',$("#good_intro").val());
			task.addData('price',$("#good_price").val());
			task.addData('ship',$("#good_ship").val()); 
			task.addData('maf_time',$("#maf_time").val());
			task.addData('description',$("#description").val());
			task.start();
		        
			}
	

})

//$("#releaseClass").on('tap',function(){
//	 cid=$('input[type="radio"]:checked').val();
//})

/*
 *图片上传
 */
$('#note_subject>div').on('tap',function(){
	var id=$(this).attr('id');
		plus.nativeUI.actionSheet({cancel:"取消",buttons:[{title:"拍照添加"},{title:"相册添加"}]},function(e){
			if(e.index == 1){
				var car =plus.camera.getCamera();
				car.captureImage(function(path){
					//展示图片
//					alert(plus.io.convertLocalFileSystemURL(path));
                   console.log(JSON.stringify(path))
                   path="file://"+plus.io.convertLocalFileSystemURL(path);
					appendpic(path)
					
				 $('#a'+id).attr('src',path);				
				},function(err){});
				
			}else if(e.index == 2){
				plus.gallery.pick(function(path){
					 console.log(JSON.stringify(path))
					appendpic(path)
					$('#a'+id).attr('src',path);
				});
			}
		})
	})


$('.good_subject').on('tap',function(){
		plus.nativeUI.actionSheet({cancel:"取消",buttons:[{title:"拍照添加"},{title:"相册添加"}]},function(e){
			if(e.index == 1){
				var car =plus.camera.getCamera();
				car.captureImage(function(path){
					//展示图片
//					alert(plus.io.convertLocalFileSystemURL(path));
                   console.log(JSON.stringify(path))
                   path="file://"+plus.io.convertLocalFileSystemURL(path);
					appendpic(path)
					
				$('#a1').attr('src',path);			
				},function(err){});
				
			}else if(e.index == 2){
				plus.gallery.pick(function(path){
					 console.log(JSON.stringify(path))
					appendpic(path)
					$('#a1').attr('src',path);
                 },function(err){});
			}
		})
	})
$('#good_subject').on('tap',function(){
		plus.nativeUI.actionSheet({cancel:"取消",buttons:[{title:"拍照添加"},{title:"相册添加"}]},function(e){
			if(e.index == 1){
				var car =plus.camera.getCamera();
				car.captureImage(function(path){
					//展示图片
//					alert(plus.io.convertLocalFileSystemURL(path));
                   console.log(JSON.stringify(path))
                   path="file://"+plus.io.convertLocalFileSystemURL(path);
					appendpic(path)
					
				$('#a7').attr('src',path);			
				},function(err){});
				
			}else if(e.index == 2){
				plus.gallery.pick(function(path){
					 console.log(JSON.stringify(path))
					appendpic(path)
					$('#a7').attr('src',path);
                 },function(err){});
			}
		})
	})
function appendpic(p){
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
			files.push({'patn':newpath,'name':'name'}); 
			console.log(newpath)
		},
		function(error){
		alert('压缩图片失败');
		plus.nativeUI.closeWaiting();
	})
}
document.addEventListener("plusready",function(){
	appElement=document.querySelector('[ng-controller=releaseGoodsController]');
	$scope= angular.element(appElement).scope();
	$scope.$apply();
})
