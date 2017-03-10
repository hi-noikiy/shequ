var ws,id,icon,nick;
//var app = angular.module("goodsApp",[]);
//app.controller("goodsController",function($scope,$http){
//	$scope.
//})
var app = angular.module('honerApp',[]);
app.controller('honerController',function($scope,$http){
	$scope.honerChat = function(){
		console.log(id+'--'+icon+'--'+nick);
		window.plus.bridge.exec("community", "sendMessage", [id,icon,nick]);
	}
})

document.addEventListener("plusready", function() {
	appElement = document.querySelector('[ng-controller=honerController]');
	$scope = angular.element(appElement).scope();
	ws = plus.webview.currentWebview();
	id = ws.icon_id;
	icon = ws.icon_img;
	nick = ws.icon_name;
	console.log(id+'--'+icon+'--'+nick);
	$scope.$apply(); 
})