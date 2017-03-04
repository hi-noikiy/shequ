
document.addEventListener('plusready',function(){
   var ws = plus.webview.currentWebview();
   var html = "";
   var xhtml = "";
//  console.log(apiRoot+"/Home/Active/active");
//plus.nativeUI.showWaiting();
   $.ajax({  
   	type:"get",
   	url:apiRoot+"/Home/Active/active",   
   	dataType:'json',   
	success:function(data){        
		$.each(data, function(k1,v1) { 
//			console.log(JSON.stringify(v1))    
          
	        if(v1.qufen == 0){ 
	        	html+='<ul class="mui-table-view"><div class="mui-card kong">'+ 
					'<div class="mui-card-header mui-card-media"><div class="mui-card-media-object mui-pull-left mui-col-xs-2">'+
					'<img src="'+adminimg+'">'+
					'</div><div class="mui-card-media-body">'+
					'<span>'+adminname+'</span><i class="mui-icon iconfont mui-yellow" style="margin-left: 6px;font-size: 14px;">&#xe605;</i>'+
					'<p class="font-12">'+v1.addtime+'</p></div>'+
					'</div><div class="mui-card-content" onclick="newactivedetails(\''+v1.id+'\',\''+v1.addtime+'\')">'+
					'<div class="mui-card-content-inner"><p style="color: #000000;">'+v1.body+'</p></div>'+
					'<div class="mui-card-media">';
				if(v1.imagess != ""){ 
					$.each(v1.imagess,function(k2,v2){
//						console.log(JSON.stringify(v2));
						html+='<img src="'+webRoot+v2+'"/>';
					})
				}
				
				html+=	'</div></div><div class="mui-card-footer">'+
					'<button type="button" class="mui-btn" onclick=clicklike("'+v1.id+'")><i class="mui-icon iconfont">&#xe664;</i>赞</button>'+
					'<button type="button" class="mui-btn" onclick="newactivedetails(\''+v1.id+'\',\''+v1.addtime+'\')"><i class="mui-icon iconfont">&#xe665;</i>评论</button>'+
					'<button type="button" class="mui-btn mui-pull-right"><a href="#room-share" style="color: black;"><i class="mui-icon iconfont">&#xe666;</i><span>转发</span></a></button>'+
					'</div></div></ul>';
					  
	        }
	     if(v1.qufen == 1){	  
	        xhtml += '<ul class="mui-table-view"><div class="mui-card ko  ng">'+
						'<div class="mui-card-header mui-card-media">'+
						'<div class="mui-card-media-object mui-pull-left mui-col-xs-2">'+
						'<img src="'+getAvatar(v1.user.userspic)+'" /">'+ 
						'</div><div class="mui-card-media-body">'+
						'<span>'+v1.user.usersni+'</span><i class="mui-icon iconfont mui-yellow" style="margin-left: 6px;font-size: 14px;">&#xe605;</i>'+
						'<p class="font-12">'+v1.addtime+'</p></div></div>'+
						'<div class="mui-card-content" onclick="newactivedetails(\''+v1.id+'\',\''+v1.addtime+'\')">'+
						'<div class="mui-card-content-inner" >'+
						'<p style="color: #000000;">'+v1.body+'</p>'+
						'</div><div class="mui-card-media">';
				if(v1.imagess != ""){
					$.each(v1.imagess, function(k3,V3) {
						xhtml +='<img src="'+webRoot+V3+'"/>';
					});
				} 
			xhtml +='</div></div><div class="mui-card-footer">'+
					'<button type="button" class="mui-btn" onclick=clicklike("'+v1.id+'") ><i class="mui-icon iconfont">&#xe664;</i>赞</button>'+
					'<button type="button" class="mui-btn" onclick="newactivedetails(\''+v1.id+'\',\''+v1.addtime+'\')"><i class="mui-icon iconfont">&#xe665;</i>评论</button>'+
					'<button type="button" class="mui-btn mui-pull-right"><a href="#room-share" style="color: black;"><i class="mui-icon iconfont">&#xe666;</i><span>转发</span></a></button>'+
					'</div></div></ul>'; 
	        }
		});  
		$('.activelist').append(html);  
		$('#mylist').append(xhtml); 
//		 plus.nativeUI.closeWaiting();
	},error:function(e){
		console.log(JSON.stringify(e));
	} 
   });
   
   
})


function newactivedetails(id ,adtime){ 
//	alert(id);alert(adtime); 
	plus.webview.create('./active-details.html','active-details.html',{},{did : id , adtime : adtime}).show('pop-in',200);
}
function clicklike(id){ 
	var userid = plus.storage.getItem('userid');
	$.ajax({
		type:"get",
		url:apiRoot+"/Home/Active/clicklike",
		data : {
			actid  : id ,
			userid : userid
		},
		dataType:'json',
		success:function(data){
			if(data > 0){
//				plus.webview.getWebviewById('active-details.html').reload();
				plus.nativeUI.toast('+1');
			}else{
				alert('已经赞过了');
			}
		},error:function(e){
			
		}
		
	});
	
}
