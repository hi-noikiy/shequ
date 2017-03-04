document.addEventListener('plusready',function(){
	var userid = plus.storage.getItem('userid');
	var html="";
	$.ajax({
		type:"get",
		url:apiRoot+"/home/user/carlist",
		data : {
			aid  : userid
		},
		dataType:'json',
		success:function(data){
			$.each(data, function(k,v) {
				//console.log(JSON.stringify(v));
				html += '<ul class="mui-table-view"><li class="mui-table-view-cell">'+
					    '<span>'+v.usercar+'</span></li></ul>';
			
			});
			$('.carlist').append(html);
		},error:function(e){
			console.log(JSON.stringify(e));
		}
	});
	
	$('#subtn').on('click',function(){
		var serialnumber = $('#serialnumber').val();
		if(!serialnumber){
			alert('没有车辆相关信息')
			return;
		}
		$.ajax({
			type:"get",
			url:apiRoot+"/home/user/caradd",
			data : {
				aid : userid,
				usercar : serialnumber
			},
			dataType:'json',
			success:function(data){
				if(data > 0){
					plus.webview.create('./car-ok.html','car-ok.html',{},{}).show('pop-in',200); 
				}
			},error:function(e){
				
			}
		});
	})
})