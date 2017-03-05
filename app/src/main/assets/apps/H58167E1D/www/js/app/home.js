var defaultIndex = 1;
var iteam = '#itemA';
var notes = [], carousel=[];
var app = angular.module("homeApp",[]);
app.controller("homeController",function($scope,$http){
		initTrade($scope,$http);
		initNote($scope,$http);
		$scope.obtainId=function(id)
		{
			plus.nativeUI.showWaiting('加载中...');
			console.log(id);
			plus.storage.setItem('goodsId',id+'');
			plus.webview.create('goods_detail.html', 'goods_detail.html').show('pop-in');
			plus.nativeUI.closeWaiting();
          
		}
		$scope.shequ=function(id)
		{
			plus.nativeUI.showWaiting('加载中...');
			console.log(id);
			plus.storage.setItem('noteId',id+'');
			$.ajax({
			type: "post",
			url: apiRoot,
			data: {
				action: 'Community.fileType',
				id: id,
			},
			dataType: 'json',
			success: function(data) {
				console.log(JSON.stringify(data));
				if(data.error == 0) {
					//	console.log(noteId);
					plus.nativeUI.closeWaiting();
					if(data.data == 'F') {
						console.log(plus.storage.getItem('noteId'));
						plus.webview.create('view_detail.html', 'view_detail.html').show('pop-in');
					} else if(data.data == 'M') {
						plus.webview.create('video_detail.html', 'video_detail.html').show('pop-in');
					}
				} else {
					plus.nativeUI.toast(data.desc);
					return;
				}

			}
		})
//			plus.webview.create('goods_detail.html', 'goods_detail.html').show('pop-in');  
			plus.nativeUI.closeWaiting();
		}
		$scope.shequNote =function(cid)
		{
			plus.nativeUI.showWaiting('加载中.....');
			plus.storage.setItem('cid',cid+'');
			console.log(cid);
			plus.webview.create('new_content.html', 'new_content.html').show('pop-in');  
			plus.nativeUI.closeWaiting();
		}
	    $scope.shequNews = function(new_cid)
	    {
	    	plus.nativeUI.showWaiting('加载中.....');
	    	plus.storage.setItem('new_cid',new_cid+'');
	    	console.log(new_cid);
	    	plus.webview.create('hot_content.html', 'hot_content.html').show('pop-in'); 
			plus.nativeUI.closeWaiting();
	    }
	    $scope.tradePush = function()
	    {
	    	plus.nativeUI.showWaiting('加载中.....');
	    	plus.webview.create('recommend_goods.html', 'recommend_goods.html').show('pop-in'); 
			plus.nativeUI.closeWaiting();
	    }
	    $scope.tradeNew = function()
	    {
	    	plus.nativeUI.showWaiting('加载中.....');
	    	plus.webview.create('new_goods.html', 'new_goods.html').show('pop-in'); 
			plus.nativeUI.closeWaiting();
	    }
	    $scope.tradeHot = function()
	    {
	    	plus.nativeUI.showWaiting('加载中.....');
	    	plus.webview.create('hot_goods.html', 'hot_goods.html').show('pop-in'); 
			plus.nativeUI.closeWaiting();
	    }
})

function read_home() {
plus.nativeUI.showWaiting('加载中...');
	$('#head>div>a').on('tap',function () {

		if($(this).index() == 0){
			iteam = '#itemA';
		}else{
			iteam = '#itemB';
//			$(iteam+' #news'+defaultIndex).empty();
//			$(iteam+' #notes'+defaultIndex).empty();
//			$(iteam+' #slider'+defaultIndex).empty();
		}
	})
	$('#nav>div>a').on('tap',function () {
		console.log(1)
		if(defaultIndex == $(this).index() +1){
			return false;/*相同，不操作*/
		}
		defaultIndex = $(this).index() +1;

		$(iteam+' #item'+defaultIndex).show();
		$(iteam+' #item'+defaultIndex).show().siblings().hide();
	})			
	plus.nativeUI.closeWaiting();
}
/*
 *交易首页数据
 */
function initTrade($scope,$http){
	$http({
		method:'post',
		url:apiRoot,
		data:{action:'Trade.getGoods'}
	}).then(function successCallback(response){
//		console.log(JSON.stringify(response.data.data));   
		$scope.carousels = response.data.data.carousel;
		$scope.hots = response.data.data.hot;
		$scope.news = response.data.data.new;
		$scope.recommends = response.data.data.recommend;
	},function errorfunction(e){
		console.log(e);
	})
}
 /*
  *社区首页数据
  */
function initNote($scope,$http){
	$http({
		method:'post',
		url:apiRoot,
		data:{action:'Community.index'} 
	}).then(function successCallback(response){
		console.log(JSON.stringify(response.data.data.cates));
		$scope.notes = response.data.data.notes;//标题下的数据
		$scope.photos = response.data.data.photo;//轮播图
		$scope.cates = response.data.data.cates;
//		$scope.cates = response.data.data.cates;
//		$scope.recommends = response.data.data.recommend;
	},function errorfunction(e){
		console.log(e);
	})
}

if(window.plus) {
	read_home();
} else {
	document.addEventListener('plusready', read_home, false);
}
