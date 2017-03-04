var clubs;
document.addEventListener('plusready',function(){
   var ws = plus.webview.currentWebview();
   var userid = plus.storage.getItem('userid');
  
   
   $('#sousuo').on('click',function(){
   	  clubs = $('#clubs').val();
   	 
   	 if(!clubs){
   	 	plus.nativeUI.toast('请输入要搜索的俱乐部名称');
   	 	return;
   	 }
   	 workList();
   	 
   })
   	$.ajax({
		   	 type:'get',
		   	 url:apiRoot+"/home/club/clublista",
			 data : {
			   	userid : userid,
			 },
		   	 dataType:'json',
		   	 success:function(data){
		   	 	datalist = data;
				workList();
		   	},error:function(e){
		   	 	
		   	}
	   });
})
function workList(){
	if(datalist.length > 0){ 
		 var html = "";
		 $.each(datalist, function(k,v) { 
		 		console.log(JSON.stringify(v))
		 		
		
			if(v.name.indexOf(clubs) == -1){
				return true;
			};  
		
		
		  		html += '<ul class="mui-table-view">'+
						'<li class="mui-table-view-cell mui-media" onclick=clubchat("'+v.id+'","'+v.name+'","'+v.userid+'")>'+
						'<img class="mui-media-object mui-pull-left" src="'+webRoot+v.avatar+'" />'+
						'<div class="mui-media-body">'+
						'<span>'+v.name+'</span><span class="mui-pull-right font-12 gray"><i class="mui-icon iconfont" style="font-size: 11px;margin-right: 5px;">&#xe617;</i>'+v.info+'</span>'+
						'<p class="font-12">'+v.address+'</p><p>成员:00</p>'+
						'</div></li></ul>';
		   	 	});
		   	 	$('#clublist').html(html);
		
	}else{
		toast('没有查到俱乐部');
	}
	
 }
function clubchat(id,name,userid){
//	toast(id);
	//plus.webview.create('./club-chat.html','club-chat.html',{},{cludid :id}).show('pop-in',200);
	plus.webview.create('./club-chat.html','club-chat.html',{},{fid:id,ftype:1,fname:name,cludid :id , cuseid : userid}).show('pop-in',200);
}
