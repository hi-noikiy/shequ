document.addEventListener('plusready',function(){
			var uid = plus.storage.getItem('uid');
			var merchant = plus.storage.getItem('merchant');
			var icon = plus.storage.getItem('icon');
			var nick = plus.storage.getItem('nick');
			if(merchant == '1'){
				$('.person').addClass('apply_for_success'); 
				$('.seller').removeClass('apply_for_success');
			}
			console.log(webRoot+icon);
			$('#user_nick').text(nick);
			$('#user_icon').attr('src',getAvatar(icon));
			var filter_height = parseInt($('.user_box').height()+80);
			$('.substrate').css({'height':filter_height,'margin-bottom':'10px','background-image':'url('+getAvatar(icon)+')'});
			$('.filterImg_box').css({'background-image':'url('+getAvatar(icon)+')','background-size':'100% 100%','height':filter_height}).addClass('filterImg');
		    $('#user_apply').on('tap',function(){
		    	$.ajax({
		    		type:"post",
		    		url:apiRoot,
		    		data:{
		    			action:'Merchant.apply',
		    			uid:uid,
		    		},
					dataType:'json',
		    		success:function(data){ 
							console.log(JSON.stringify(data));  
							plus.nativeUI.closeWaiting();
							if(data.error == 0){  							
								setTimeout(function(){
									ws.close;
								}, 1000);   
								plus.webview.create('apply_for_seller.html','apply_for_seller.html').show('pop-in');
							}else{
								plus.nativeUI.toast(data.desc);
								return; 
							}  
					}, 
					error : function(e){
						console.log(JSON.stringify(e));
		//				errortoast();
					}
		    	});
		    	
		    }) 

//			var showWin = event.detail.showWin;
//			if(showWin == 1){
//				//触发弹窗
//				plus.nativeUI.actionSheet({
//					cancel: "取消",
//					buttons: [{
//						title: "发布内容"
//					},{
//						title: "发布商品"
//					}]
//				}, function(e) {
//					var i = e.index;
//					if(i == 1) {
//						openNewPage('release_viewMedia.html')
//					}else if(i==2){
//						openNewPage('release_goods.html')
//					}
//				});
//			}
		})

window.addEventListener('changeVal',function(event){
  var nick2 = event.detail.nick;console.log(nick2);
  if(nick2){
    nick = nick2;
    $('#user_nick').text(nick);
  }    
  var icon2 = event.detail.icon;
  if(icon2){
    icon = icon2;
    $('#user_icon').attr('src',getAvatar(icon));
  }  
});