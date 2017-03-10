var app = angular.module("detailsApp", []); //goods_detail
var uid, id;
app.controller("detailsController", function($scope, $http) {
	$scope.huiContent_id = 0;
	$scope.master = 0;//发布人的iD
	$scope.initView = function($id, $uid) {
		console.log($id + '--' + $uid);
		$http({
			method: 'post',
			url: apiRoot,
			data: {
				action: 'Community.details',
				id: $id,
				uid: $uid,
			}
		}).then(function successCallback(response) {
//			console.log(JSON.stringify(response));
			console.log(JSON.stringify(response.data.data.note[0]));
			//      console.log(123); 
			$scope.master = response.data.data.note[0].uid;
			$scope.huanxinId = response.data.data.note[0].mobile;
			$scope.huanxinIcon = response.data.data.note[0].icon;
			$scope.huanxinNick= response.data.data.note[0].nick;
			$scope.notes = response.data.data.note; //标题下的数据  
			$scope.goods = response.data.data.goods;
			$scope.comments = response.data.data.comment;
			$scope.user = response.data.data.user;
			//		console.log(JSON.stringify(response.data.data.note));
		}, function errorfunction(e) {
			console.log(JSON.stringify(e));
		})
	}
	//groupList
	$scope.groupList = function(){
		openPage("chose_group.html",{master_id:$scope.master});
	}
	//私聊
	$scope.openChat = function(){
		window.plus.bridge.exec("community", "sendMessage", [$scope.huanxinId+'',$scope.huanxinIcon,$scope.huanxinNick]);
	}
	$scope.goodsInfo = function(id) {
		plus.nativeUI.showWaiting('加载中......');
		plus.storage.setItem('goodsId', id + '');
		plus.webview.create('goods_detail.html', 'goods_detail.html').show('pop-in');
	}
	$scope.view_follow = function() {
		console.log(uid);
		//$('#follow').html('&#xe6aa;已关注').css({ 'color': '#999', 'border': '1px solid #999' });
		$http({
			method: 'post',
			url: apiRoot,
			data: {
				action: 'Community.follow',
				type_id: id,
				uid: uid,
				type: 0,
			}
		}).then(function successCallback(response) {
			console.log(JSON.stringify(response));
			$scope.user.follow = 1;/*已关注*/
			//		console.log(JSON.stringify(response.data.data.note));
		}, function errorfunction(e) {
			console.log(e);
		})

	}

	$scope.viewCollection = function() {
		console.log(id + '--' + uid);
		$('#viewcollection').html('<i class="iconfont mui-icon colorP">&#xe622;</i>  <i class="font12">已收藏</i>');
		$http({
			method: 'post',
			url: apiRoot,
			data: {
				action: 'Community.collection',
				type_id: id,
				uid: uid,
				type: 0,
			}
		}).then(function successCallback(response) {
			console.log(JSON.stringify(response));
			toast('收藏成功');
			//		console.log(JSON.stringify(response.data.data.note));
		}, function errorfunction(e) {
			console.log(JSON.stringify(e));
		})
	}
	$scope.viewContent = function() {
		//parent 
		viewval = $('.conmentval').val();
		$http({
			method: 'post',
			url: apiRoot,
			data: {
				action: 'Community.content',
				id: id,
				uid: uid,
				content: viewval,
				parent: $scope.huiContent_id,
			}
		}).then(function successCallback(response) {
			console.log(JSON.stringify(response));
			$scope.initView(id,uid);
			toast('发表评论成功');

			//		console.log(JSON.stringify(response.data.data.note));
		}, function errorfunction(e) {
			console.log(JSON.stringify(e));
		})
	}
	$scope.huiContent = function(pid) {
		$scope.huiContent_id = pid;
		//		console.log(id);
		$('.input_box').animate({
			left: '0px'
		}, 300);
	}
	$scope.icon_sub =function(id,img,nick)
	{
//		plus.nativeUI.showWaiting('加载中......');
console.log(id+'--'+img+'--'+nick);
		plus.webview.create('honer_page.html', 'honer_page.html',{},{icon_id:id,icon_img:img,icon_name:nick}).show('pop-in');
	}
})

document.addEventListener("plusready", function() {
	appElement = document.querySelector('[ng-controller=detailsController]');
	$scope = angular.element(appElement).scope();
	uid = plus.storage.getItem('uid');
	id = plus.webview.currentWebview().gid;
	if (!id){
		id = plus.storage.getItem('noteId');
	}
//	id = plus.storage.getItem('noteId');
	my = plus.webview.currentWebview().my;
//	console.log(my);
	if(my == 'my'){
		$('.borderNone').css('display','none');
	}
	plus.nativeUI.closeWaiting();
	$scope.initView(id, uid);
	$scope.$apply();
})