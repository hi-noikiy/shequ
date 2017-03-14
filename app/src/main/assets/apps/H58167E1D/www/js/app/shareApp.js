var shares=null,bhref=false;
var Intent=null,File=null,Uri=null,main=null;

//if(window.plus){
//	shareReady();
//}else{
//	document.addEventListener("plusready",shareReady,false);
//}
document.addEventListener("plusready",function () {
	$('.alert_window>.share_list>li').unbind('click');
	$('.alert_window>.share_list>li').on('click',function () {
		switch($(this).index()){
			case 0:
				shareChange(2);/*微信好友*/
			break;
			case 1:
				shareChange(1);/*朋友圈*/
			break;
			case 2:
				shareChange(0);/*QQ好友*/
			break;			
			case 3:
				shareChange(0);/*QQ空间*/
			break;			
			default:
				shareChange(3);/*微博*/
			break;
		}
		return false;
	})
	

	updateSerivces();
	if(plus.os.name=="Android"){
		Intent = plus.android.importClass("android.content.Intent");
		File = plus.android.importClass("java.io.File");
		Uri = plus.android.importClass("android.net.Uri");
		main = plus.android.runtimeMainActivity();
	}

/**
 * 更新分享服务
 */
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
/**
 * 弹出分享平台选择
 */
function shareChange(i){
	setTimeout(function () {
		$('.alert_window').hide();
	},300);
	var ids=[{id:"qq"},{id:"weixin",ex:"WXSceneTimeline"},{id:"weixin",ex:"WXSceneSession"},{id:"sinaweibo"}];
//	if(plus.os.name=="iOS"){
//		ids.push({id:"qq"});
//		bts.push({title:"分享到QQ"});
//	}    
console.log(ids[i].id);
 	var s = shares[ids[i].id];
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
	/**
   * 发送分享消息
   * @param {plus.share.ShareService} s
   */
function shareMessage(s,ex){
	//var aid = $('.shareCommunity').attr('data-aid');
	var msg={title : '去卖艺' , extra : {scene:ex}  , content:shareContent,href:(webRoot + webPage + id),thumbs:['http://qmy.51edn.com/static/images/icon.png']};
	s.send( msg, function(){
		plus.nativeUI.toast( "分享成功");
	}, function(e){
		if(s.id == 'weixin' && ex == 'WXSceneSession'){
			plus.nativeUI.toast('分享到微信好友失败');
			return;
		}else if(s.id == 'weixin' && ex == 'WXSceneTimeline'){
			plus.nativeUI.toast('分享到微信朋友圈失败');
			return;
		}
		plus.nativeUI.toast( s.description+"分享失败" );
	});
}
},false);