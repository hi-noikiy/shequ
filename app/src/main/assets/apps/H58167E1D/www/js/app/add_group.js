var app = angular.module("addgroupApp",[]);

app.controller("addgroupController",function($scope,$http){
	$scope.initView = function($uid) {
		$http({
			method: 'post',
			url: apiRoot,
			data: {
				action: 'Group.groupQuery',
				uid: $uid,
			}
		}).then(function successCallback(response) {
			console.log(JSON.stringify(response));
			$scope.group=response.data.data;
			var group_idStr=plus.storage.getItem('repleaseGroup');
			console.log(group_idStr);
			setTimeout(function () {
		      if(group_idStr)
		      {
		      	group_idArray=group_idStr.split(",");
		      	for(var i=0;i<group_idArray.length;i++)
		      	{
		      		$('#groups #'+group_idArray[i]).attr('checked',true);
		      		plus.storage.removeItem('repleaseGroup');
		      	}
		      }
			},50);
		}, function errorfunction(e) {
			console.log(JSON.stringify(e));
		})
	}
    $scope.group_array = function()
    {
    	var groups_arr=[];
    	$('#groups input[type=checkbox]:checked').each(function(){
    		groups_arr.push($(this).val()+'');
    	})
    	$group_str=groups_arr.join(',');
    	console.log($group_str);
    	plus.storage.setItem('repleaseGroup',$group_str);
    	console.log(plus.storage.getItem('repleaseGroup'));
    	plus.webview.currentWebview().close();
    }
})


document.addEventListener("plusready",function(){
	appElement=document.querySelector('[ng-controller=addgroupController]');
	$scope= angular.element(appElement).scope();
	plus.nativeUI.closeWaiting();
	ws=plus.webview.currentWebview();
	if(ws.group_id)
	{
	  console.log(ws.group_id);	
      $scope.initView(ws.group_id);
	}
	$scope.$apply();
})
