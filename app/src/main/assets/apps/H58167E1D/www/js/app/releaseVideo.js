var newpath, files = [],
	uid, groupid, goodsid,tag_value;
var app = angular.module("App", []);
app.controller("releaseController", function($scope, $http, $sce) {
	$scope.type = 0; //类型默认值为图文
	$scope.clearFiles = function() {
		files = []; //切换后删除之前选择的文件
		$scope.viedoUrl = '';
		$scope.subject_img = '';
	}
	$http({
		method: 'post',
		url: apiRoot,
		data: {
			action: 'Community.getAllCate',
		}
	}).then(function success(response) {
		$scope.cates = response.data.data;
	})
	$scope.releasesub = function() {
		plus.nativeUI.showWaiting("上传中...");
		console.log(tag_value);
//		var tags = plus.storage.getItem('releaseTags');
		$scope.cate_id = $('.category_list input:checked').attr("cate_id");
		var groupid = plus.storage.getItem('repleaseGroup');
		var goodsid = plus.storage.getItem('repleaseGoods');
		if(files.length == 0) {
			toast('请添加图片或视频文件');
			return;
		}
		if(!$("#releaseTitle").val()) {
			toast('请输入标题内容');
			return;
		}
		if(!$("#releaseContent").val()) {
			toast('请输入图文内容');
			return;
		}
		if(!$scope.cate_id) {
			toast('请添加分类');
			return;
		}
		var server = apiRoot;
		var task = plus.uploader.createUpload(server, { method: "post", blocksize: 102400, timeout: 0 },
			function(t, status) { //上传完成
				plus.nativeUI.closeWaiting();
				console.log(JSON.stringify(t));
				if(status == 200) {
					var infopics = $.parseJSON(t.responseText);
					console.log(JSON.stringify(infopics));
					if(t.responseText.data != '') {
						plus.nativeUI.toast('发布成功');
						plus.webview.currentWebview().close();
						tag_value='';
						groupid = plus.storage.removeItem('repleaseGroup');
						groupid = plus.storage.removeItem('repleaseGoods');
						plus.webview.getWebviewById('release_viewMedia.html').close();
					}
				} else {
					toast('上传失败：' + status);
					plus.nativeUI.closeWaiting();
				}

			},
			function() {
				plus.nativeUI.toast('上传出错!');
				plus.nativeUI.closeWaiting();
			}
		);
		for(var i = 0; i < files.length; i++) {
			var f = files[i];
			console.log("myfile:" + f.patn);
			switch(f.type) {
				case 1: //封面
					task.addFile(f.patn, { key: "cover" });
					break;
				case 2: //展示
					task.addFile(f.patn, { key: "show" + i });
					break;
			}
		}
		task.addData('action', 'Community.addNote');
		task.addData('cid', $scope.cate_id + '');
		task.addData('type', $scope.type + '');
		task.addData('uid', uid);
		task.addData('title', $("#releaseTitle").val());
		task.addData('content', $("#releaseContent").val());
		task.addData('tags', tag_value);
		task.addData('groupid', groupid);
		task.addData('goodsid', goodsid);
		task.start();

	}
	$scope.add_tag = function() {
		plus.nativeUI.showWaiting('加载中......');
//		plus.webview.create('add_tag.html', 'add_tag.html', {}, { 'add_tag': 'add_tag' }).show('pop-in');
		plus.webview.create('add_tag.html', 'add_tag.html', {}, { 'add_tag': tag_value, }).show('pop-in');
	}
	$scope.add_group = function() {
		uid = plus.storage.getItem('uid');
		plus.nativeUI.showWaiting('加载中......');
		console.log(uid);
//		plus.webview.create('add_correlation_group.html', 'add_correlation_group.html', {}, { 'group_id': uid }).show('pop-in');
		plus.webview.create('add_correlation_group.html', 'add_correlation_group.html', {}, { 'group_id': uid }).show('pop-in');	
	}
	$scope.add_goods = function() {
		uid = plus.storage.getItem('uid');
		plus.nativeUI.showWaiting('加载中......');
		console.log(uid);
//		plus.webview.create('add_correlation_goods.html', 'add_correlation_goods.html', {}, { 'goods_id': uid }).show('pop-in');
		plus.webview.create('add_correlation_goods.html', 'add_correlation_goods.html', {}, { 'goods_id': uid }).show('pop-in');
	}

	$scope.viedo_upload = function() {
		plus.nativeUI.actionSheet({ cancel: "取消", buttons: [{ title: "添加视频" }] }, function(e) {
			if(e.index == 1) {
				plus.gallery.pick(function(path) {
					console.log(JSON.stringify(path))
					for(x in files) {
						if(files[x].type == 1) {
							files.splice(x, 1);
						}
					}
					files.push({ 'patn': path, 'name': 'name', 'type': 1 });
					//					$scope.url = path;
					path = "file://" + plus.io.convertLocalFileSystemURL(path);
					$scope.viedoUrl = $sce.trustAsResourceUrl(path);
					$scope.$apply();
				}, function(err) {}, { filter: "video" }); //{filter:"video"}
			}
		})
	}

})

/*
 *图片上传
 */
$('#note_subject').on('tap', function() {
	plus.nativeUI.actionSheet({ cancel: "取消", buttons: [{ title: "拍照添加" }, { title: "相册添加" }] }, function(e) {
		if(e.index == 1) {
			var car = plus.camera.getCamera();
			car.captureImage(function(path) {
				//展示图片 
				console.log(JSON.stringify(path))
				path = "file://" + plus.io.convertLocalFileSystemURL(path);
				$('.img_show').append('<img src="' + path + '">');
				appendpic(path, 2);
			}, function(err) {});

		} else if(e.index == 2) {
			plus.gallery.pick(function(path) {
				for(var i = 0; i < path.files.length; i++) {
					$('.img_show').append('<li class="mui-pull-left"><img src="' + path.files[i] + '"><i class="iconfont mui-icon del_btn">&#xe603;</i></li>');
					appendpic(path.files[i], 2);
				}

				//				console.log(JSON.stringify(path));
			}, function(e) {
				console.log("取消选择图片");
			}, {
				multiple: true,
				maximum: 5,
				system: false,
				onmaxed: function() {
					plus.nativeUI.alert('最多只能选择5张图片');
				}
			}); // 最多选择3张图片
		}
	})
})
//顶部图片
$('.note_subject').on('tap', function() {
	plus.nativeUI.actionSheet({ cancel: "取消", buttons: [{ title: "拍照添加" }, { title: "相册添加" }] }, function(e) {
		if(e.index == 1) {
			var car = plus.camera.getCamera();
			car.captureImage(function(path) {
				//展示图片 
				console.log(JSON.stringify(path))
				path = "file://" + plus.io.convertLocalFileSystemURL(path);
				$scope.subject_img = path;
				$scope.$apply();
				appendpic(path, 1);
			}, function(err) {});
		} else if(e.index == 2) {
			plus.gallery.pick(function(path) {
				path = "file://" + plus.io.convertLocalFileSystemURL(path);
				$scope.subject_img = path;
				$scope.$apply();
				appendpic(path, 1);
			}, function(e) {
				console.log("取消选择图片");
			}, {});
		}
	})
})

function appendpic(p, type) {
	//如果选择的图片是主题图片或者顶部视频  删掉之前的内容  保证只有1个 type1
	if(type == 1) {	//只有在增加了视频或者封面图的时候才删掉第一个
		for(x in files) {
			if(files[x].type == 1) {
				files.splice(x, 1);
			}
		}
	}

	console.log("xxxxx:" + JSON.stringify(files));
	plus.nativeUI.showWaiting('图片处理中...');
	var newpath = p.replace(/\./g, new Date().getTime() + '.');
	plus.zip.compressImage({
			src: p,
			dst: newpath,
			quality: 20
		},
		function() { //毁掉成功
			plus.nativeUI.closeWaiting();
			files.push({ 'patn': newpath, 'name': 'name', 'type': type });
			console.log("xxxx:111:" + files);
		},
		function(error) {
			alert('压缩图片失败');
			plus.nativeUI.closeWaiting();
		})
}

document.addEventListener("plusready", function() {
	appElement = document.querySelector('[ng-controller=releaseController]');
	$scope = angular.element(appElement).scope();
	$(".file_btn").on('tap', function() {
		$scope.clearFiles();
		$scope.type = 0;
		$(".up_file").removeClass("mui-hidden")
		$(".up_video").addClass("mui-hidden");
		$scope.$apply();
		console.log(JSON.stringify(files));
	})
	$(".video_btn").on('tap', function() {
		$scope.clearFiles();
		$scope.type = 1;
		$(".up_file").addClass("mui-hidden")
		$(".up_video").removeClass("mui-hidden");
		$scope.$apply();
		console.log(JSON.stringify(files));
	})

	uid = plus.storage.getItem('uid');
	$scope.$apply();
})
window.addEventListener('changeVal',function(event){
   tag_value = event.detail.tags_value;
   console.log(tag_value);
  
});