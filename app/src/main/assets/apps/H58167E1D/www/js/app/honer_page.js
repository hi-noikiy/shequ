var ws,uid,icon,nick, type_id, myuid,group_name,isSame;
var app = angular.module('app',[]);
app.controller('myController',function ($scope,$http) {
	$scope.honerChat = function(){
    console.log(uid+'--'+icon+'--'+nick);
       if(isSame == '1'){       
            mui.back();
            window.plus.bridge.execSync("community","backNews","");
       }else{
            window.plus.bridge.exec("community", "sendMessage", [uid,icon,nick]);
       }
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
				console.log(JSON.stringify(info));
				
				var user = info['user'];/*个人信息*/
				var gen = ['男','女'];
				$scope.nick = user.nick;
				$scope.gender = gen[user.gender];
				$scope.location = (user.location !=0 ? user.location : ' ');
				$scope.icon = getAvatar(user.icon);-				
				
				$.each(info['group'], function(key,gro) {
					info['group'][key]['icon'] = getPic(gro['icon']);
				});
				$scope.group = info['group'];   //群组
				var group = info['group'];
				$scope.group_name = group.group_name;
				$scope.group_icon = group.icon;
				if(info['group'].length>0){
					$scope.groupPrompt = 0;  //该用户没有建群的时候显示“没有数据”
					if(info['group'].length>=3){
						$scope.groupMore = 1;//该用户群的数据大于三条的时候显示“查看更多”
					} else{
						$scope.dynamicMore = 0;//该用户群的数据小于三条的时候不显示“查看更多”
					}
				}else{
					$scope.groupPrompt = 1;  //该用户有群则不显示“没有数据”
					$scope.dynamicMore = 0;//该用户群的数据小于三条的时候不显示“查看更多”
				}
				
				$scope.dynamic = info['dynamic'];/*动态*/
				if(info['dynamic'].length>0){
					$scope.dynamicPrompt = 0;//该用户有动态的时候不显示“没有数据”
					if(info['dynamic'].length>=3){
						$scope.dynamicMore = 1;//该用户动态的数据大于三条的时候显示“查看更多”
					} else{
						$scope.dynamicMore = 0;//该用户动态的数据小于三条的时候不显示“查看更多”
					}
				}else{
					$scope.dynamicPrompt = 1;//该用户没有动态的时候显示“没有数据”
					$scope.dynamicMore = 0;//该用户动态的数据小于三条的时候不显示“查看更多”
				}
				
				$.each(info['goods'], function(key,vo) {
					info['goods'][key]['good_image'] = getPic(vo['good_image']);
				});
				
				$scope.goods = info['goods'];/*商品*/
				if(info['goods'].length > 0){
					$scope.goodsPrompt = 0; //不显示提示“没有数据”
					if(info['goods'].length>=3){
						$scope.goodsMore = 1; //当数据大于3时，显示“查看更多”
					} else{
						$scope.goodsMore = 0;//当数据小于3时，不显示“查看更多”
					}
				} else {
					$scope.goodsPrompt = 1;//显示提示“没有数据”
					$scope.goodsMore = 0;//当数据小于3时，不显示“查看更多”
				}
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
	
	
	$scope.groupList = function () {
		goNewPage('my_talk.html',{uid:uid});/*查看群群 列表*/		
	}
	
	$scope.dynamicList = function () {
		goNewPage('somebody_dynamic_state.html',{uid:uid});/*更多动态*/
	}	
	
	$scope.GoodsList = function ( ) {
		plus.webview.create('somebody_goods.html','somebody_goods.html',{},{uid:uid}).show('pop-in');/*更多商品*/
//		goNewPage('somebody_goods.html',{uid:uid});
	}	
	
	//获取用户id
//	$scope.icon_sub=function($uid,$ioc,$nick){
//		plus.webview.create('honer_page.html','honer_page.html',{},{uid:$uid,ico:$ioc,nick:$nick}).show('pop-in');/*更多商品*/
//	}
//	
	
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
			console.log(JSON.stringify(response));
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

//预加载个人页面
function showHoner(userid,img,nick){    
    var hornerP = plus.webview.create('view/honer_page.html', 'view/honer_page.html',{},{icon_id:userid,icon_img:img,icon_name:nick,isSame:'1'});
    hornerP.show();
}
 
//var ws, userid;
function ready_honer(){
	ws = plus.webview.currentWebview();
	myuid = plus.storage.getItem('uid');
	uid = ws.icon_id;/*用户id*/
	type_id = ws.type_id;
	isSame = ws.isSame;
	console.log(uid);
//	uid = 3;
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