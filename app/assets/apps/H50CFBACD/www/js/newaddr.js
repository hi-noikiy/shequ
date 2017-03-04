var ws;
document.addEventListener('plusready',function(){
   ws = plus.webview.currentWebview();
   var userid = plus.storage.getItem('userid');
   var spage = ws.spage;
   
   $('#bthh').on('click',function(){
	   	var name = $('#name').val();
	   	var phone = $('#phone').val();
	   	var diqu = $('#cityResult3').val();
	   	var textaddr = $('#textaddr').val();
	   	addr = diqu+""+textaddr;
	   	
	   	if(!name || !phone || !diqu || !textaddr){
	   		alert('请填写完整的地址') 
	   	}
	   	console.log(apiRoot+"/Home/Order/newaddr/userid/"+userid+"/phone/"+phone+"/username/"+name+"/useraddr/"+addr)
	   	$.ajax({
	   		type:"get", 
	   		url:apiRoot+"/Home/Order/newaddr",
	   		data : {
	   			userid : userid,
	   			phone : phone,
	   			username : name,
	   			useraddr : addr
	   		},
	   		dataType:'json',
	   		success:function(data){
	   			if(data){
	   				plus.nativeUI.toast('操作成功');
	   				plus.webview.getWebviewById(spage).reload();
	   				setTimeout(function(){ 
						ws.close();
					} , 1500); 
	   			}
	   			
	   		},error:function(e){
	   			console.log(JSON.stringify(e));
	   		}
	   		
	   	});
   	
   })
   
})

//function cell(id,name, phone, diqu, address){
//	//console.log(name+" "+phone+" "+diqu+" "+address);
//	mui.fire(plus.webview.getWebviewById(spage), 'cAddress', {id:id,name:name,phone:phone,diqu:diqu,address:address});
//	ws.close();
//}
