var app = angular.module("addtagApp",[]);

app.controller("addtagController",function($scope,$http){
       
})


document.addEventListener("plusready",function(){
	appElement=document.querySelector('[ng-controller=addtagController]');
	$scope= angular.element(appElement).scope();
	plus.nativeUI.closeWaiting();
	ws=plus.webview.currentWebview();
	if(ws.add_tag=='add_tag')
	{
		var tag_str=plus.storage.getItem('releaseTags');
		if(tag_str)
		{   
			tag_arr=tag_str.split(","); 
			for(var i=0;i<tag_arr.length;i++)
			{
				$('.newTag_list').append("<span class='mui-badge mui-btn-blue color_white tag_val'><span>"+tag_arr[i]+"</span><i class='iconfont mui-icon'>&#xe603;</i></span>")
			}
			plus.storage.removeItem('releaseTags');
		}
	}
	
	$scope.$apply();
})
