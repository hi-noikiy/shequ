var ws,page = 1,uid;
var app = angular.module('app',[]);
app.controller('myController',function ($scope,$http) {
	$scope.initView = function () {
		$http({
			method: 'post',
			url: apiRoot,
			data: {
				action: 'Dynamic.getAllDynamic',
				uid:uid,
				page:page
			}
		}).then(function (result) {
				console.log(JSON.stringify(result));  
			if(result.data.error == 0){
				var info = result.data.data;
				var user = info['user'];/*个人信息*/
				$scope.nick = user.nick;
				$scope.icon = getAvatar(user.icon);

				$scope.info = info['dynamic'];/*动态*/
				//console.log(JSON.stringify(info['dynamic'])); 
				page ++;
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
	
})


function readys(){
	ws = plus.webview.currentWebview();
	uid = ws.uid;console.log(uid);
	var allocation = document.querySelector('[ng-controller=myController]');
	$scope = angular.element(allocation).scope();
	$scope.initView();
	$scope.$apply();
	
}

//function getValue () {
//	$scope.initView();
//}
//
//
//function loadNews () {
//	page = 1;
//	$scope.initView();
//}

if(window.plus){
	readys();
}else{
	document.addEventListener('plusready',readys,false);
}