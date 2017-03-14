var app = angular.module("myrelease",[]);//goods_detail
var uid ,id;
app.controller("myreleasecontroller",function($scope,$http){
	$scope.initView = function($uid){
//		console.log($uid);
	$http({
		method:'post',
		url:apiRoot,
		data:{
			action:'Trade.myGoods',
			uid:$uid,
		} 
	}).then(function successCallback(response){
		console.log(JSON.stringify(response)); 
        
		$scope.goods = response.data.data;
//		console.log(JSON.stringify(response.data.data.note));
	},function errorfunction(e){
		console.log(e);
	})
} 
	$scope.neirxiangq = function(uid)
	{ 
		$http({
		method:'post',
		url:apiRoot,
		data:{
			action:'Community.myNote',
			uid:uid, 
		}
		}).then(function successCallback(response){
			console.log(JSON.stringify(response)); 
	        $scope.mynote = response.data.data;
	//		console.log(JSON.stringify(response.data.data.note));
		},function errorfunction(e){
			console.log(e);
		})
		
	}
	$scope.detailes = function(spage,id)
	{ 
		//跳内容详情
		if (spage == 'view_detail.html'){
			openPage(spage,{my:'my',noteId:id});
		}
	}
	$scope.noteupdate = function(id)
	{                      
		// 删除动态   弹出提示信息对话框
		plus.nativeUI.confirm( "删除后将不可查看！你确定要删除吗?", function(e){
			if(e.index==0){
				$http({
					method:'post',
					url:apiRoot,
					data:{
						action:'Community.note_updeta',
						id:id,
						uid:uid, 
					}
					}).then(function successCallback(response){
						toast('删除成功！');
						$scope.neirxiangq(uid);
				//		console.log(JSON.stringify(response.data.data.note));
					},function errorfunction(e){
						console.log(e);
					})
			}else{
				
			} 
		}, "去卖艺", ["确定","取消"] );
//		openPage(spage,{my:'my'});
	}
	$scope.goodsupdate = function(type,id)
	{                      
		if(type == '0'){           //商品确认已售
			var title = "确定删除吗？";
		}else if(type == '2'){     //商品下架
			var title = "已售商品用户可查看但不可购买，确定已售？";
		}else if(type == '3'){		//商品删除
			var title = "下架后用户将无法查看商品，确定下架？";
		}
//		console.log(title+'--'+type+'--'+id+'--'+uid); 
		// 删除动态   弹出提示信息对话框
		plus.nativeUI.confirm( title, function(e){
			if(e.index==0){
				$http({
					method:'post',
					url:apiRoot,
					data:{
						action:'Trade.mygoodsupdate',
						id:id,
						uid:uid,
						status:type,
					}
					}).then(function successCallback(response){
						console.log(JSON.stringify(response));
						toast(response.data.data.data);
						$scope.initView(uid);
				//		console.log(JSON.stringify(response.data.data.note));
					},function errorfunction(e){
						toast(response.data.data.desc)
						console.log(e);
					})
			}else{
				
			} 
		}, "去卖艺", ["确定","取消"] );
//		openPage(spage,{my:'my'});
	}
	
})  


document.addEventListener("plusready",function(){
	appElement=document.querySelector('[ng-controller=myreleasecontroller]');
	$scope= angular.element(appElement).scope();
	uid = plus.storage.getItem('uid');
	$scope.initView(uid);
	$scope.neirxiangq(uid);
	$scope.$apply();
})
