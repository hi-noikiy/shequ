var app = angular.module("addgoodsApp",[]);

app.controller("addgoodsController",function($scope,$http){
	$scope.initView = function($uid) {
		$http({
			method: 'post',
			url: apiRoot,
			data: {
				action: 'Trade.goodsInfo',
				uid: $uid,
			}
		}).then(function successCallback(response) {
			console.log(JSON.stringify(response));
			$scope.goods=response.data.data;
			var goods_idStr=plus.storage.getItem('repleaseGoods');
			console.log(goods_idStr);
			setTimeout(function () {
		      if(goods_idStr)
		      {
		      	goods_idArray=goods_idStr.split(",");
		      	for(var i in goods_idArray)
		      	{
		      		console.log(goods_idArray[i]); 
		      		$('#goods input[value="'+goods_idArray[i]+'"]').attr('checked',true);
		      	}
		      		plus.storage.removeItem('repleaseGoods');
		      }
			},50);
		}, function errorfunction(e) {
			console.log(JSON.stringify(e));
		})
	}
    $scope.my_goods = function()
    {
    	var goods_arr=[];
    	$('#goods input[type=checkbox]:checked').each(function(){
    		goods_arr.push($(this).val()+'');
    	})
    	$goods_str=goods_arr.join(',');
    	console.log($goods_str);
    	plus.storage.setItem('repleaseGoods',$goods_str);
    	console.log(plus.storage.getItem('repleaseGoods'));
    	plus.webview.currentWebview().close();
    }
})


document.addEventListener("plusready",function(){
	appElement=document.querySelector('[ng-controller=addgoodsController]');
	$scope= angular.element(appElement).scope();
	plus.nativeUI.closeWaiting();
	ws=plus.webview.currentWebview();
	if(ws.goods_id)
	{
	  console.log(ws.goods_id);	
      $scope.initView(ws.goods_id);
	}
	$scope.$apply();
})
