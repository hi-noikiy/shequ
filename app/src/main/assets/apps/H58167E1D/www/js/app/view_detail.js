var app = angular.module("detailsApp", []); //goods_detail
var uid, id;
app.controller("detailsController", function($scope, $http,$sce) {
	$scope.huiContent_id = 0;
	$scope.master = 0;//发布人的iD
	$scope.initView = function($id,$type) {
		console.log($id+'--'+$type);
		$http({ 
			method: 'post',
			url: apiRoot,
			data: {
				action: 'Community.details',
				id:type_id,
				uid:uid,
			}
		}).then(function successCallback(response) {
			console.log(JSON.stringify(response.data.data.note));
			$scope.master = response.data.data.note.uid;
			$scope.huanxinId = response.data.data.note.mobile;
			$scope.huanxinIcon = response.data.data.note.icon;
			$scope.huanxinNick= response.data.data.note.nick;
			$scope.nid = response.data.data.note.id;
			$scope.note = response.data.data.note; //标题下的数据  
			$scope.goods = response.data.data.goods;
			$scope.comments = response.data.data.comment;
			console.log(JSON.stringify($scope.comments));
			$scope.user = response.data.data.user;
			$scope.videoUrl = $sce.trustAsResourceUrl($scope.note.subject);
			setTimeout(function(){
				plus.nativeUI.closeWaiting();
			},300);
		}, function errorfunction(e) {
			setTimeout(function(){
				plus.nativeUI.closeWaiting();
			},300);
			console.log(JSON.stringify(e));
		})
		
	//判断是否是关注的状态	
	$http({
		method:'post',
		url:apiRoot,
		data:{
			action:'Community.checkFollowStatus',
			uid:uid,
			type:type,
			type_id:type_id
		}
	}).then(function successCallback(response){
		plus.nativeUI.closeWaiting();
		console.log(JSON.stringify(response));
		if(response.data.error == 121){
			$scope.attention = 121;
		}else{
			$scope.attention = 115;/*显示取消关注*/
		}		
	},function errorfunction(e){ 
		console.log(JSON.stringify(e));
	})
	
	//判断是否是收藏的状态	
	$http({
		method:'post',
		url:apiRoot,
		data:{
			action:'Community.checkCollectStatus',
			uid:uid,
			type:type,
			type_id:type_id
		}
	}).then(function successCallback(response){
		plus.nativeUI.closeWaiting();
		console.log(JSON.stringify(response));
		if(response.data.error == 121){
			$scope.collection = 121;
		}else{
			$scope.collection = 115;/*显示取消收藏*/
		}		
	},function errorfunction(e){ 
		console.log(JSON.stringify(e));
	})
	}
	
	
	
	
		/*关注/取消关注*/
		var is_clickAttention = true;
	$scope.isattention = function(way)
	{	
		if(is_clickAttention){
		plus.nativeUI.showWaiting('');console.log(uid+' '+type+' '+type_id);
		$http({
			method:'post',
			url:apiRoot,
			data:{
				action:'Community.follow',
				uid:uid,
				type:type,
				type_id:type_id
			}
		}).then(function successCallback(response){
			plus.nativeUI.closeWaiting();
			console.log(JSON.stringify(response));
			if(response.data.error == 115){
				/*操作成功*/
				if(way == 2){
					$scope.attention = 121;/*显示关注*/
					toast("已取消关注");
				}else{
					$scope.attention = 115;/*显示取消关注*/
					toast("已关注");
				}				
			}
		},function errorfunction(e){ 
			errortoast();
			console.log(JSON.stringify(e));
		})	
		is_clickAttention = false;
		setTimeout(function(){
			is_clickAttention = true;
		},2000)
		}		
	}
	
	
	
	/*收藏/取消收藏*/
	var is_clickCollection = true;
	$scope.iscollection = function(way)
	{
		if(is_clickCollection){
		plus.nativeUI.showWaiting('');console.log(uid+' '+type+' '+type_id);
		$http({
			method:'post',
			url:apiRoot,
			data:{
				action:'Community.collection',
				uid:uid,
				type:type,
				type_id:type_id
			}
		}).then(function successCallback(response){
			plus.nativeUI.closeWaiting();
			console.log(JSON.stringify(response));
			if(response.data.error == 115){
				/*操作成功*/
				if(way == 1){
					$scope.collection = 121;/*显示关注*/
					toast("已取消收藏");
				}else{
					$scope.collection = 115;/*显示取消关注*/
					toast("已收藏");
				}				
			}
		},function errorfunction(e){ 
			errortoast();
			console.log(JSON.stringify(e));
		})
		is_clickCollection = false;
		setTimeout(function(){
			is_clickCollection = true;
		},2000)
		}
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
//	$scope.view_follow = function() {
//		console.log(uid);
//		$http({
//			method: 'post',
//			url: apiRoot,
//			data: {
//				action: 'Community.follow',
//				type_id: id,
//				uid: uid,
//				type: 0,
//			}
//		}).then(function successCallback(response) {
//			console.log(JSON.stringify(response));
//			$scope.user.follow = 0;/*已关注*/
//		}, function errorfunction(e) {
//			console.log(e);
//			$scope.user.follow = 1;/*已关注*/
//		})
//
//	}


//	$scope.viewCollection = function() {
//		console.log(id + '--' + uid);
//		$('#viewcollection').html('<i class="iconfont mui-icon colorP">&#xe622;</i>  <i class="font12">已收藏</i>');
//		$http({
//			method: 'post',
//			url: apiRoot,
//			data: {
//				action: 'Community.collection',
//				type_id: id,
//				uid: uid,
//				type: 0,
//			}
//		}).then(function successCallback(response) {
//			console.log(JSON.stringify(response));
//			toast('收藏成功');
//			//		console.log(JSON.stringify(response.data.data.note));
//		}, function errorfunction(e) {
//			console.log(JSON.stringify(e));
//		})
//	}
	$scope.viewContent = function() {
		//parent 
		console.log(1);
		viewval = $('.conmentval').val();
		if(viewval == ""){
			mui.toast('您发布的内容不能为空');
			return;
		}
		$http({
			method: 'post',
			url: apiRoot,
			data: {
				action: 'Community.content',
				id: $scope.nid,
				uid: uid,
				content: viewval,
				parent: $scope.huiContent_id,
			}
		}).then(function successCallback(response) {
			console.log(JSON.stringify(response));
			$scope.initView(id,uid);
			toast('发表评论成功');
			window.location.reload();
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


var ws,uid,type_id,type;
document.addEventListener("plusready", function() {
	plus.nativeUI.showWaiting();
	uid = plus.storage.getItem('uid');
	appElement = document.querySelector('[ng-controller=detailsController]');
	$scope = angular.element(appElement).scope();
	ws =plus.webview.currentWebview();
	my = plus.webview.currentWebview().my;
	if(my == 'my'){
		$('.borderNone').css('display','none');
	}
	uid = plus.storage.getItem('uid');
	type_id = ws.noteId;
	type = ws.type;/*类型*/
//	console.log(type_id +'++++'+type)
	$scope.initView(type_id,type);
	$scope.$apply();
})