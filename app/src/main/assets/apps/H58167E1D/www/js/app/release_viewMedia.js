var newpath,files=[],uid;
var app = angular.module("releaseViewMediaApp",[]);
var tags, groupid, goodsid;
app.controller("releaseViewMediaController",function($scope,$http,$sce){
	$http({
		method: 'post',
		url: apiRoot,
		data: {
			action: 'Community.getAllCate',
		}
	}).then(function success(response) {
		$scope.cates = response.data.data;
	})
	$scope.releasesub=function()
	{
		 tags = plus.storage.getItem('releaseTags');//console.log(decodeURI(tags));return;
		 groupid = plus.storage.getItem('repleaseGroup');
		 goodsid = plus.storage.getItem('repleaseGoods');
		$scope.cate_id = $('.category_list input:checked').attr("cate_id");
		console.log(tags+'--'+groupid+'----'+goodsid);
		if($('#a1').attr('src').length==0)
		{
			toast('请添加封面图');
			return;
		}
		if(!$("#releaseTitle").val())
		{
			toast('请输入标题内容');
			return;
		}
		if(!$("#releaseContent").val())
		{
			toast('请输入图文内容');
			return;
		}
        if(!$scope.cate_id)
        {
        	toast('请添加分类');
			return;
        }
        
        var server = apiRoot;  
		var task = plus.uploader.createUpload(server,
			    {method:"post"},
				function(t,status){
					plus.nativeUI.showWaiting("上传中...");//上传完成
					if(status == 200){ 
						var infopics = $.parseJSON(t.responseText);
						console.log(JSON.stringify(infopics));
						if(t.responseText.data!='')
						{
							plus.nativeUI.toast('发布成功');
							plus.storage.removeItem('releaseTags');
							plus.storage.removeItem('repleaseGroup');
							plus.storage.removeItem('repleaseGoods');
							plus.nativeUI.closeWaiting();
							plus.webview.currentWebview().close();
						}
					}else{
						toast('上传失败：' + status);
						plus.nativeUI.closeWaiting();
					}
					
				},function () {
					plus.nativeUI.closeWaiting();
				}
				
			);
			for(var i = 0; i < files.length; i++) {
			var f = files[i];
				switch(f.type) {
					case 1: //封面
						task.addFile(f.patn, { key: "cover" });
						break;
					case 2: //展示
						task.addFile(f.patn, { key: "show"+i});
						break;
				}
			}
			task.addData('action','Community.communityRelease');
			task.addData('cid',$scope.cate_id); 
			task.addData('uid',uid);
			task.addData('title',$("#releaseTitle").val());
			task.addData('content',$("#releaseContent").val());
			task.addData('tags',decodeURI(tags));
			task.addData('groupid',groupid); 
			task.addData('goodsid',goodsid);
			task.addData('file_type','0');
			task.start();
		        
	}
	
	
	
	
	$scope.add_tag = function()
	{
		plus.nativeUI.showWaiting('加载中......');
		plus.webview.create('add_tag.html', 'add_tag.html',{},{'add_tag':'add_tag'}).show('pop-in');
		
	}
	$scope.add_group = function()
	{
		uid=plus.storage.getItem('uid');
		plus.nativeUI.showWaiting('加载中......');
		console.log(uid);
		plus.webview.create('add_correlation_group.html', 'add_correlation_group.html',{},{'group_id':uid}).show('pop-in');
	}
	$scope.add_goods = function()
	{
		uid=plus.storage.getItem('uid');
		plus.nativeUI.showWaiting('加载中......');
		console.log(uid);
		plus.webview.create('add_correlation_goods.html', 'add_correlation_goods.html',{},{'goods_id':uid}).show('pop-in');
	}

	$scope.viedo_upload =function()
     {
     	plus.nativeUI.actionSheet({cancel:"取消",buttons:[{title:"添加视频"}]},function(e){
			if(e.index == 1){
				plus.gallery.pick(function(path){
					 console.log(JSON.stringify(path))
					 files.push({'patn':path,'name':'name','type':1}); 
					$scope.url=path;
					$scope.viedoUrl= $sce.trustAsResourceUrl($scope.url);
                 },function(err){},{filter:"video"});//{filter:"video"}
			}
		})
     }


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
					appendpic(path,2)
					
				 $('.img_show').append('<img src="'+path+'">');				
				},function(err){});
				
			}else if(e.index == 2){
				plus.gallery.pick(function(path){
					for(var i = 0;i<path.files.length;i++){
						appendpic(path.files[i],2)
						$('.img_show').append('<img src="'+path.files[i]+'">');  
//						console.log(path.files[i]);
			    	}
					 console.log(JSON.stringify(path));    
					
				},function ( e ) {
    					console.log( "取消选择图片" );
    			},{multiple:true,maximum:5,system:false,onmaxed:function(){
					plus.nativeUI.alert('最多只能选择5张图片');
			    }});// 最多选择3张图片
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
					appendpic(path,1)  
					
				$('#a1').attr('src',path);			
				},function(err){});
				
			}else if(e.index == 2){
				plus.gallery.pick(function(path){
					 console.log(JSON.stringify(path))
					appendpic(path,1)  
					$('#a1').attr('src',path);
                 },function(err){});
			}
		})
	})

function appendpic(p,type){
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
			files.push({'patn':newpath,'name':'name','type':type}); 
			console.log(JSON.stringify(files))
		},
		function(error){
		alert('压缩图片失败');
		plus.nativeUI.closeWaiting();
	})
}
document.addEventListener("plusready",function(){
	appElement=document.querySelector('[ng-controller=releaseViewMediaController]');
	$scope= angular.element(appElement).scope();
    uid = plus.storage.getItem('uid');
	$scope.$apply();
})
