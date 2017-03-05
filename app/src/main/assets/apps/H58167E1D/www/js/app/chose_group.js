var app = angular.module("chose_groupApp",[]);
app.controller("chose_groupController",function($scope,$http){
	$scope.initView = function($id){
		console.log($id);
	$http({
		method:'post',
		url:apiRoot,
		data:{
			action:'Group.groupData',
			uid:$id;
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
		console.log(groupId);
		plus.storage.setItem('group_id',groupId);
		plus.webview.create('apply_for_explain.html', 'apply_for_explain.html').show('pop-in');
	}	

})


document.addEventListener("plusready",function(){
	appElement=document.querySelector('[ng-controller=chose_groupController]');
	$scope= angular.element(appElement).scope();
	id = plus.storage.getItem('MerchantId');
	$scope.initView(id);
	$scope.$apply();
})
