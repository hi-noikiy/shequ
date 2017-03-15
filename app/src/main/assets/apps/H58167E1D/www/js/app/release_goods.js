var newpath, files = [];
var app = angular.module("releaseGoodsApp", []);
app.controller("releaseGoodsController", function($scope, $http) {
	$http({
		method: 'post',
		url: apiRoot,
		data: {
			action: 'Trade.getAllCate',
		}
	}).then(function success(response) {
		$scope.cates = response.data.data;
	})
	$scope.confirm_btn = function($event) {
		$scope.cate_id = $('.category_list input:checked').attr("cate_id");
		var val = $('.category_list input:checked').prev().html();
		$('.current_type').html(val);
		$('.alert_window').hide();
		$event.stopPropagation(); //阻止冒泡
	}

	$scope.releasesub = function() {
		
		var uid = plus.storage.getItem('uid');
//		console.log($('#info').text());
		console.log($scope.cate_id);
		
		if($('#a1').attr('src').length==0)
		{
			mui.toast('请添加封面图');
			return;
		}
		
		if(!$scope.cate_id)
		{
			mui.toast('请添加分类');
			return;
		}
		
		if($('#a2').attr('src').length !=0 || $('#a3').attr('src').length !=0 || $('#a4').attr('src').length !=0 || $('#a5').attr('src').length !=0 ||$('#a6').attr('src').length !=0){
			toast('请至少添加一张图片');
			return;
		}

		if($('#a7').attr('src').length==0)
		{
			toast('请添加图文详情图片');
			return;
		}
		var server = apiRoot;
		var task = plus.uploader.createUpload(server, { method: "post" },
			function(t, status) { //上传完成
				plus.nativeUI.showWaiting("处理中...");
				if(status == 200) {
					rs = JSON.parse(t.responseText);
					if(rs.error == 0) {
						var infopics = $.parseJSON(t.responseText);
						console.log(JSON.stringify(infopics));
						if(t.responseText.data != '') {
							plus.nativeUI.toast('发布成功');
							plus.nativeUI.closeWaiting();
							plus.webview.currentWebview().close();
						}
					}else{
						mui.toast(t.desc);
					}
				} else {
					toast('上传失败：' + status);
					plus.nativeUI.closeWaiting();
				}
			},
			function() {
				plus.nativeUI.closeWaiting();
			}
		);
		//???
		for(var i = 0; i < files.length; i++) {   
			var f = files[i];
			switch(f.type) {
				case 1: //封面
					task.addFile(f.patn, { key: "cover" });
					break;
				case 2: //展示
					task.addFile(f.patn, { key: "show"+i});
					break;
				case 3: //详情
					task.addFile(f.patn, { key: "info"+i});
					break;
			}
		}
		task.addData('action', 'Trade.tradeRelease');
		task.addData('cid', $scope.cate_id);
		task.addData('uid', uid);
		task.addData('good_name', $("#good_name").val());
		task.addData('good_intro', $("#good_intro").val());
		task.addData('price', $("#good_price").val());
		task.addData('ship', $("#good_ship").val());
		task.addData('maf_time', $("#maf_time").val());
		task.addData('description', $("#description").val());
		task.start();
	}
})

//展示图片
$('#note_subject>div').on('tap', function() {
	var id = $(this).attr('id');
	plus.nativeUI.actionSheet({ cancel: "取消", buttons: [{ title: "拍照添加" }, { title: "相册添加" }] }, function(e) {
		if(e.index == 1) {
			var car = plus.camera.getCamera();
			car.captureImage(function(path) {
				//展示图片
				console.log(JSON.stringify(path))
				path = "file://" + plus.io.convertLocalFileSystemURL(path);
				appendpic(path, 2)
				$('#a' + id).attr('src', path);
			}, function(err) {});

		} else if(e.index == 2) {
			plus.gallery.pick(function(path) {
				console.log(JSON.stringify(path))
				appendpic(path, 2)
				$('#a' + id).attr('src', path);
			});
		}
	})
})

//封面图片   如果封面图被更换  要把files里的封面图删掉  避免重复上传
$('.good_subject').on('tap', function() {
	plus.nativeUI.actionSheet({ cancel: "取消", buttons: [{ title: "拍照添加" }, { title: "相册添加" }] }, function(e) {
		if(e.index == 1) {
			var car = plus.camera.getCamera();
			car.captureImage(function(path) {
				//展示图片
				console.log(JSON.stringify(path))
				path = "file://" + plus.io.convertLocalFileSystemURL(path);
				appendpic(path, 1)

				$('#a1').attr('src', path);
			}, function(err) {});

		} else if(e.index == 2) {
			plus.gallery.pick(function(path) {
				console.log(JSON.stringify(path))
				appendpic(path, 1)
				$('#a1').attr('src', path);
			}, function(err) {});
		}
	})
})

//图片详情
$('#good_subject').on('tap', function() {
	plus.nativeUI.actionSheet({ cancel: "取消", buttons: [{ title: "拍照添加" }, { title: "相册添加" }] }, function(e) {
		if(e.index == 1) {
			var car = plus.camera.getCamera();
			car.captureImage(function(path) {
				//展示图片
				console.log(JSON.stringify(path))
				path = "file://" + plus.io.convertLocalFileSystemURL(path);
				appendpic(path, 3)
				$('#a7').attr('src', path);
			}, function(err) {});

		} else if(e.index == 2) {
			plus.gallery.pick(function(path) {
				console.log(JSON.stringify(path))
				appendpic(path, 3)
				$('#a7').attr('src', path);
			}, function(err) {});
		}
	})
})

function appendpic(p, type) {
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
			console.log(JSON.stringify(files));
		},
		function(error) {
			alert('压缩图片失败');
			plus.nativeUI.closeWaiting();
		})
}
document.addEventListener("plusready", function() {
	appElement = document.querySelector('[ng-controller=releaseGoodsController]');
	$scope = angular.element(appElement).scope();
	$scope.$apply();
})