var defaultIndex = 1;
var uid;/*用户id*/
var iteam = '#itemA';
var notes = [], carousel=[];
var app = angular.module("homeApp",[]);
app.controller("homeController",function($scope,$http){
		$scope.start = function(){
			plus.nativeUI.showWaiting();
		}
		/**社区首页数据*/
		$scope.initNote = function(){
			$http({
				method:'post',
				url:apiRoot,
				data:{action:'Community.index'} 
			}).then(function successCallback(response){		    
				$scope.notes = response.data.data.notes;//标题下的数据
				$scope.photos = response.data.data.photo;//轮播图
				$scope.cates = response.data.data.cates;
				setTimeout(function(){
					plus.nativeUI.closeWaiting();		
				},300);  
			},function errorfunction(e){
				plus.nativeUI.closeWaiting();		
			})  
		}
		
		/**交易首页数据*/
		$scope.initTrade = function(){
			$http({
				method:'post',
				url:apiRoot,
				data:{action:'Trade.getGoods'}
			}).then(function successCallback(response){  
				$scope.carousels = response.data.data.carousel;  
				$scope.hots = response.data.data.hot;
				$scope.news = response.data.data.new;
				$scope.recommends = response.data.data.recommend;
			},function errorfunction(e){
				plus.nativeUI.closeWaiting();		
				console.log(e);
			})
		}
		
		$scope.obtainId=function(id,type)
		{
			plus.nativeUI.showWaiting('加载中...');
			plus.webview.create('goods_detail.html', 'goods_detail.html',{},{gid:id,type:type}).show('pop-in');
			plus.nativeUI.closeWaiting();          
		}
		$scope.shequ=function(id,type)
		{
			plus.nativeUI.showWaiting('加载中...');
			plus.webview.create('view_detail.html', 'view_detail.html',{},{noteId:id,type:type}).show('pop-in');   
			plus.nativeUI.closeWaiting();
		}
		$scope.shequNote =function(cid)
		{
			plus.nativeUI.showWaiting('加载中.....');
			plus.storage.setItem('cid',cid+'');
			plus.webview.create('new_content.html', 'new_content.html').show('pop-in');  
			plus.nativeUI.closeWaiting();
		}
		
	    $scope.shequNews = function(new_cid)
	    {
	    	plus.nativeUI.showWaiting('加载中.....');
	    	plus.storage.setItem('new_cid',new_cid+'');
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
	    
	    $scope.refresh = function(){
	    	$scope.initTrade();
			$scope.initNote();
	    }
})

function read_home() {
	$('#head>div>a').on('tap',function () {
		if($(this).index() == 0){
			iteam = '#itemA';
		}else{
			iteam = '#itemB';
		}
	})
	$('#nav>div>a').on('tap',function () {
		if(defaultIndex == $(this).index() +1){
			return false;/*相同，不操作*/
		}
		defaultIndex = $(this).index() +1;
		$(iteam+' #item'+defaultIndex).show();
		$(iteam+' #item'+defaultIndex).show().siblings().hide();
	})			
	plus.nativeUI.closeWaiting();
}

document.addEventListener("plusready", function() {
	uid = plus.storage.getItem('uid');
	appElement = document.querySelector('[ng-controller=homeController]');
	$scope = angular.element(appElement).scope();  
	$scope.initTrade();
	$scope.initNote();
	$scope.start();
	$scope.$apply();
})
       