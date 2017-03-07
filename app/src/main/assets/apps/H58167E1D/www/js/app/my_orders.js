var app = angular.module("myorders",[]);
app.controller("myorderscontroller",function($scope,$http){
	
	$scope.initView = function($uid,$state,$i){
console.log(apiRoot)
		$http({ 
			method:'post',
			url:apiRoot,
			data:{
				action:"Orderid.orderidQuery",
				id:$uid,
				state:$state,
			}
		}).then(function successCallback(orders_list){
			 if($i==2){
			 	$scope.orders2=orders_list.data.data;
			 }else if($i==3){
			 	$scope.orders3=orders_list.data.data;
			 }else if($i==4){
			 	$scope.orders4=orders_list.data.data;
			 }else if($i==5){
			 	$scope.orders5=orders_list.data.data;
			 }else if($i=1){
			 	$scope.orders=orders_list.data.data;
			 }
			
			console.log(JSON.stringify(orders_list));
		},function errorfunction(e){
			
		})
 
	    
	}
	
	$scope.ordershen = function($id,$state){
		      console.log($id)
		   $http({ 
			method:'post',
			url:apiRoot,
			data:{
				action:"Orderid.orderidstate",
				id:$id,
				state:$state,
			}
		  }).then(function successCallback(data){
			  if(data.data.error==0){
			  	uid = plus.storage.getItem('uid');
			  	plus.nativeUI.toast('提交成功');
			  		$scope.initView(uid,'all','all');
					$scope.initView(uid,'6',2);
					$scope.initView(uid,'0',3);
					$scope.initView(uid,'1',4);
					$scope.initView(uid,'2',5);
			  }else{
			  	plus.nativeUI.toast('提交失败');
			  }
		  },function errorfunction(e){
			
		})
	}
	$scope.initView1=function($id){
		console.log($id)
		uid = plus.storage.getItem('uid');
		$scope.initView(uid,$id);
	}
	$scope.pinglun=function($id){
		openPage('evaluate_for_goods.html',{ddid:$id})
	}
	$scope.pay=function($id){
		plus.storage.setItem('goodsId',$id);
		openPage('confirm_order.html',{})
	}
})


document.addEventListener("plusready",function(){
	var ws=plus.webview.currentWebview();

	appElement=document.querySelector('[ng-controller=myorderscontroller]');
	$scope= angular.element(appElement).scope();
	uid = plus.storage.getItem('uid');	console.log(uid)
	$scope.initView(uid,'all',1);
	$scope.initView(uid,'6',2);
	$scope.initView(uid,'0',3);
	$scope.initView(uid,'1',4);
	$scope.initView(uid,'2',5);
	$scope.s=uid;
	$scope.$apply();
})