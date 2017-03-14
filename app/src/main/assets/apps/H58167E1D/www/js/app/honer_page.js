var ws,uid,icon,nick, type_id, myuid;
var app = angular.module('app',[]);
app.controller('myController',function ($scope,$http) {
	$scope.honerChat = function(){
		console.log(uid+'--'+icon+'--'+nick);
		window.plus.bridge.exec("community", "sendMessage", [uid,icon,nick]);
	} 
	$scope.initView = function () {
		$http({
			method: 'post',
			url: apiRoot,
			data: {
				action: 'User.getUserInfoByTelOrOpenID',
				uid:uid,
			}
		}).then(function (result) {
			if(result.data.error == 0){
				var info = result.data.data;
//				console.log(JSON.stringify(info));
				
				var user = info['user'];/*个人信息*/
				var gen = ['男','女'];
				$scope.nick = user.nick;
				$scope.gender = gen[user.gender];
				$scope.location = (user.location !=0 ? user.location : ' ');
				$scope.icon = getAvatar(user.icon);

				$scope.dynamic = info['dynamic'];/*动态*/
				if(info['dynamic'].length>=3){
					$scope.dynamicMore = 1;
				}else{
					$scope.dynamicMore = 0;
				}
				//console.log(JSON.stringify(info['dynamic'])); 
				
				$.each(info['goods'], function(key,vo) {
					info['goods'][key]['good_image'] = getPic(vo['good_image']);
				});
				$scope.goods = info['goods'];/*商品*/
				if(info['goods'].length>=3){
					$scope.goodsMore = 1;
				}else{
					$scope.goodsMore = 0;
				}				
//				console.log(JSON.stringify(info['goods'])); 		

//				$scope.follow = info['follow'];/*关注*/
//				console.log(JSON.stringify(info['follow']));
//				if(info['follow']['str'] && info['follow']['str'].indexOf(','+myuid+',') >-1){
//					$('#follow1,#follow2').html('&#xe62b;  已关注');
//					$('#follow1,#follow2').parent().css('border','1px solid #999');
//				}

			}else{
				toast(data.desc || '沒有数据');
			}
		},function () {
			errortoast();
		})
	};	
	
	$scope.comein = function (id,status) {
		plus.webview.create('view_detail.html','view_detail.html',{},{noteId:id,status:status,my:'my'}).show('pop-in');
//		goNewPage('view_detail.html',{noteId:id,my:'my'});/*查看动态*/
	}	
	
	$scope.lookGood = function (id) {
		goNewPage('goods_detail.html',{gid:id});/*查看商品*/
	}
	
	$scope.dynamicList = function () {
		goNewPage('somebody_dynamic_state.html',{uid:uid});/*更多动态*/
	}	
	
	$scope.GoodsList = function () {
		plus.webview.create('somebody_goods.html','somebody_goods.html',{},{uid:uid}).show('pop-in');/*更多商品*/
//		goNewPage('somebody_goods.html',{uid:uid});
	}	
	
	
	$scope.view_follow = function() {
		console.log(uid);
		$http({
			method: 'post',
			url: apiRoot,
			data: {
				action: 'Community.follow',
				type_id: uid,
				uid: myuid,
				type: 2
			}
		}).then(function(response) {
//			console.log(JSON.stringify(response));
//			$('#follow1,#follow2').html('&#xe62b;  已关注');
//			$('#follow1,#follow2').parent().css('border','1px solid #999');
			//$scope.user.follow = 1;/*已关注*/
		}, function(e) {
			console.log(e);
		})
	}	
	
})
//app.controller('honerController',function($scope,$http){
//	$scope.honerChat = function(){
//		console.log(id+'--'+icon+'--'+nick);
//		window.plus.bridge.exec("community", "sendMessage", [id,icon,nick]);
//	} 
//	
//	$scope.initView = function () {
//		$http({
//			method: 'post',
//			url: apiRoot,
//			data: {
//				action: 'User.getUserInfoByTelOrOpenID',
//				tel_or_openid:17800000000,
//			}
//		}).then(function (data) {
//			console.log(JSON.stringify(data));
//			if(data.data.error == 0){
//				var info = data.data.data;
//				console.log(JSON.stringify(info));
//				console.log(info.nick);
//				$scope.nick = info.nick;
//				$scope.gender = info.gender;
//				$scope.location = info.location;
//				$scope.icon = getAvatar(info.icon);
//				
//			}else{
//				toast(data.desc || '沒有数据');
//			}
//		},function () {
//			errortoast();alert(33);
//		})
//	};
//})


//var ws, userid;
function ready_honer(){
	ws = plus.webview.currentWebview();
	myuid = plus.storage.getItem('uid');
	uid = ws.icon_id;/*用户id*/
	type_id = ws.type_id;
	uid = 16;
	var allocation = document.querySelector('[ng-controller=myController]');
	$scope = angular.element(allocation).scope();
	$scope.initView();
	$scope.$apply();
	
}

if(window.plus){
	ready_honer();
}else{
	document.addEventListener('plusready',ready_honer,false);
}












//document.addEventListener("plusready", function() {
//	appElement = document.querySelector('[ng-controller=honerController]');
//	$scope = angular.element(appElement).scope();
//	ws = plus.webview.currentWebview();
//	id = ws.icon_id;
//	icon = ws.icon_img;
//	nick = ws.icon_name;
//	console.log(id+'--'+icon+'--'+nick);
//	$scope.$apply(); 
//})


//app.config(function($http){
//	
//})