var app = angular.module("addtagApp",[]);

app.controller("addtag",function($scope,$http){
      $scope.intview = function(){
      	$http({
      		method:"post",
      		url: apiRoot,
      		data:{
      			action:"Community.tags"      			
      		}      		
      	}).then(function(result){      		
      		if(result.data.error == 0){
      			$scope.tags = result.data.data;
      		}
      	},function errorfunction(){
      		console.log(JSON.stringify(e))
      	})
      }
})


document.addEventListener("plusready",function(){
	uid = plus.storage.getItem('uid');
	appElement = document.querySelector('[ng-controller=addtag]');
	$scope = angular.element(appElement).scope();  
	$scope.intview();
	$scope.$apply();	
})
