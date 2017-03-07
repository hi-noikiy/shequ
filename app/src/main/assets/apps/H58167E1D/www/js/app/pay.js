var app = angular.module("payApp",[]);
var uid,id,money,shid,trade_name;
var paytype = 1, ptype = '', pays={}, url = '',w = null, orderid;
app.controller("payController",function($scope,$http){
	
	$scope.initView = function($id,$uid){
		console.log($id);
		console.log($uid);
		uid=$uid;
		id=$id;
	$http({ 
		method:'post',
		url:apiRoot,
		data:{
			action:'Orderid.initial',
			id:$id,
			uid:$uid		
		}
	}).then(function successCallback(response){
		plus.nativeUI.showWaiting('加载中...');
		console.log(JSON.stringify(response));         
		$scope.goods = response.data.data.goods//商品的数据
		$scope.addr = response.data.data.addr//地址数据
		shid=response.data.data.goods.uid;
		money=response.data.data.goods.price;
		trade_name=response.data.data.goods.good_name;
		plus.nativeUI.closeWaiting();
	},function errorfunction(e){
		console.log(e);
	})	
}
	$scope.payInitial=function()
	{
		var channel=$("input[type=radio]:checked").val();
	    $http({ 
		method:'post',
		url:apiRoot,
		data:{
			action:'Orderid.payChannel',
			uid:uid,
			channel:channel,
			money:money,
			num:$('#num').val(),
			trade_name:trade_name,
			goodsid:id,
			shid:shid,	
		}
	}).then(function successCallback(response){
		plus.nativeUI.showWaiting('加载中...');
		console.log(JSON.stringify(response));         
		plus.nativeUI.closeWaiting();
//		orderid=response.data.data.ddid;console.log(orderid);
//		money=response.data.data.money;
//		payment(); 
	},function errorfunction(e){
		console.log(e);
	})
	}

})

//	$('#pay').on('tap', payment);/*检测数据*/
	
	//支付类型
	$("input[name='paytype']").on('click',function() {
		paytype = $(this).val();
		console.log(paytype+' '+ orderid+' ');
	});	
	
	


/*调起支付*/
function canpay() {
	if (w) {
		return;
	} //检查是否请求订单中
	if (paytype == 0) {
		ptype = 'alipay';
		url = payRoot + '/pay/Alipay.php?orderid=' + orderid + '&price=' + money;
	} else if(paytype == 1) {
		ptype = 'wxpay';
		console.log('http://qmy.51edn.com/pay/index.php?orderid=' + orderid + '&price=' + money);
//		url = 'http://qmy.51edn.com/app?action=Money.paymoney&money=0.01&orderid='+ orderid;
		url = 'http://qmy.51edn.com/pay/index.php?price='+money+'&orderid='+ orderid;
	}

	w = plus.nativeUI.showWaiting('支付中...', {
		width: '80px',
		height: '80px',
		background: 'rgba(0,0,0,0.3)'
	});
	// 请求支付订单
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		switch (xhr.readyState) {
			case 4:
				w.close();
				w = null;
				if (xhr.status == 200) {
					var order = xhr.responseText;
//				toast(order);
					plus.payment.request(pays[ptype],order, function(result) {
						alert('成功');
						//setSmallchange();/*保存记录，余额不变*/
						console.log(result);
					}, function(e) {
//			
						console.log("[" + e.code + "]：" + e.message);
					});
				} else {
					plus.nativeUI.toast("获取订单信息失败！");
				}
				break;
			default:
				break;
		}
	}
	xhr.open('get', url);
	xhr.send();
}


/*检测*/
function payment () {
	if(!paytype){
		toast('请选择支付类型');
		return false;
	}
	
	if(!money){
		toast('支付金额不正确');
		return false;
	}			
	if(!orderid){
		toast('获取交易单号失败，请刷新页面再试');
		return false;
	}
	canpay();/*调起第三方支付*/

}
document.addEventListener("plusready",function(){  
	appElement=document.querySelector('[ng-controller=payController]');
	$scope= angular.element(appElement).scope();
	id = plus.storage.getItem('goodsId');
	uid = plus.storage.getItem('uid');
	$scope.initView(id,uid);
	$scope.$apply();
	
// 获取支付通道
	plus.payment.getChannels(function(channels){
	for(var i in channels){
		var channel=channels[i];
		pays[channel.id]=channel;
		checkServices(channel);
	}
	},function(e){
		toast("获取支付通道失败："+e.message);
		outLine("获取支付通道失败："+e.message);
	});

	// 检测是否安装支付服务 
	function checkServices(pc) {
		if (!pc.serviceReady) {
			var txt = null;
			switch (pc.id) {
				case "alipay":
					txt = "检测到系统未安装“支付宝快捷支付服务”，无法完成支付操作，是否立即安装？";
					break;
				default:
					txt = "系统未安装“" + pc.description + "”服务，无法完成支付，是否立即安装？";
					break;
			}
			plus.nativeUI.confirm(txt, function(e) {
				if (e.index == 0) {
					pc.installService();
				}
			}, pc.description);
		}
	}
},false)