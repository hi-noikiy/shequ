var app = angular.module("chose_groupApp",[]);
app.controller("chose_groupController",function($scope,$http){
	$scope.initView = function($id){
	$http({
		method:'post',
		url:apiRoot,
		data:{
			action:'Group.groupData',
			uid:$id,
		}
		}).then(function successCallback(response){
			console.log(JSON.stringify(response));         
			$scope.choseGroup = response.data.data//标题下的数据
		},function errorfunction(e){
			console.log(e);
		})
	}
	$scope.addGroup=function(){
		var groupId=[];
		$("input[type=checkbox]:checked").each(function () {
   	 		groupId.push($(this).val());
   	 	})
		openPage("apply_for_explain.html",{group_id:groupId});
	}	

})


document.addEventListener("plusready",function(){
	appElement=document.querySelector('[ng-controller=chose_groupController]');
	$scope= angular.element(appElement).scope();
	id = plus.webview.currentWebview().master_id;
	$scope.initView(id);
	$scope.$apply();
})
