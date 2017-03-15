
function readys () {
	ws = plus.webview.currentWebview();
	uid = plus.storage.getItem('uid');
	$('#save').on('tap',function () {
		var content = $('#content').val();
		if(!content.trim()){
			toast('请填写内容');
			return false;
		}
		showWating('正在提交...',5000);
//		console.log(uid+ ' '+ content);
		$.ajax({
   			type:"post",
			url:apiRoot,   
			data : {
				action : 'Feedback.putFeedback', 
				uid : uid,
				content : content,
			},
			dataType:'json',
			success:function(data){
				plus.nativeUI.closeWaiting();
				//console.log(JSON.stringify(data));  
				plus.nativeUI.closeWaiting();
				if(data.error == 0){ 
					toast('已提交');
					$('#save').remove();
					setTimeout(function () {
						ws.close();
					},1000);
				}else{
					toast('提交失败，请稍后再试');
				}
			},
			error:function(){
				errortoast();
			}
		})
	})
}

if(window.plus){
	readys();
}else{
	document.addEventListener('plusready',readys,false);
}