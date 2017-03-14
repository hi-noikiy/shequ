var self,goodsid,title;
var shares=null,bhref=false;
var Intent=null,File=null,Uri=null,main=null;

if(window.plus){
	plusReady();
	
}else{
	document.addEventListener("plusready",plusReady,false);
}
function plusReady(){ 
	$('#weixin').on('tap',function(){shareChange(1);})     //微信
	$('#wxsline').on('tap',function(){shareChange(2);})		//朋友圈
	$('#qq').on('tap',function(){shareChange(0);})			//qq
	$('#kone').on('tap',function(){shareChange(0);})        //qq空间
	$('#weibo').on('tap',function(){shareChange(1);})        //qq空间
	updateSerivces();
	if(plus.os.name=="Android"){
		Intent = plus.android.importClass("android.content.Intent");
		File = plus.android.importClass("java.io.File");
		Uri = plus.android.importClass("android.net.Uri");
		main = plus.android.runtimeMainActivity();
	}
}
function updateSerivces(){
	plus.share.getServices( function(s){
		shares={};
		for(var i in s){
			var t=s[i];
			shares[t.id]=t;
		}
	}, function(e){
		plus.nativeUI.toast( "获取分享服务列表失败："+e.message );
	} );
}
function shareChange(i){

	var ids=[{id:"qq"},{id:"weixin",ex:"WXSceneSession"},{id:"weixin",ex:"WXSceneTimeline"},{id:"sinaweibo"}];
 	var s = shares[ids[i].id];
 	console.log(JSON.stringify(s))
	if ( s.authenticated ) {
		shareMessage(shares[ids[i].id],ids[i].ex); 
	} else {
		s.authorize( function(){
				shareMessage(shares[ids[i].id],ids[i].ex);
			},function(e){
			plus.nativeUI.alert( "认证授权失败"+e.message,null,'提示' );
		});
	}
}  
function shareMessage(s,ex){
//	console.log(goodsid + "," + title);
$('.mui-backdrop').remove();
	var sid = plus.storage.getItem('sid'); 
	alert(webRoot+webPage+id);console.log(webRoot+webPage+id);
//	alert(uid);
	var msg={title : '去卖艺' ,extra : {scene:ex},content:shareContent,href:webRoot+webPage+id,thumbs:['http://qmy.51edn.com/static/images/icon.png']};
	s.send( msg, function(){
		plus.nativeUI.toast( "分享成功");
		$('#Popover_0').hide();
	}, function(e){ 

	});
}
