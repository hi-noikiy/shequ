document.addEventListener('plusready',function(){
   var ws = plus.webview.currentWebview();
   var roadid = ws.roadid;
   var html="";
   var xhtml="";
    var chtml="";
    $.ajax({
    	type:"get",
    	url:apiRoot+"/home/Road/roadcz", 
    	data : {
    		roadid : roadid
    	},   
    	dataType:'json',
    	success:function(data){
	 	 console.log(JSON.stringify(data));

	    		$('#title').text(data.res.title);
	    		$('#username').text(data.userxin.usersni);
	    		$('#userspic').attr('src',getAvatar(data.userxin.userspic));
	    	    $('#userlike').text(data.numb);
	    	   switch(data.res.fengjing){ 
					case '1':
					html +=	'&#xe610;';
					break;
					case '2':
					html +=	'&#xe610; &#xe610;';
					break;
					case '3':
					html +=	'&#xe610; &#xe610; &#xe610;';
					break;
					case '4':
					html +=	'&#xe610; &#xe610; &#xe610; &#xe610;';
					break;
					default:
					html +=	'&#xe610; &#xe610; &#xe610; &#xe610; &#xe610;';
					break;
				}
	    	   $('#fengjin').html(html);
	    	   switch(data.res.nandu){ 
					case '1':
					xhtml +=	'&#xe610;';
					break;
					case '2':
					xhtml +=	'&#xe610; &#xe610;';
					break;
					case '3':
					xhtml +=	'&#xe610; &#xe610; &#xe610;';
					break;
					case '4':
					xhtml +=	'&#xe610; &#xe610; &#xe610; &#xe610;';
					break;
					default:
					xhtml +=	'&#xe610; &#xe610; &#xe610; &#xe610; &#xe610;';
					break;
				}
	    	   $('#nandu').html(xhtml);
	    	   $('#mileage').text(data.res.mileage);
	    	   $('#xuhang').text(data.res.xuhang);
	    	   $('#body').text(data.res.body)
	    	   $('#roadpic > img').attr('src',webRoot+data.res.roadpic);
	    	   $('#origin').val(data.res.origin);
	    	   $('#end').val(data.res.end);
	    	   $.each(data.rew, function(k,v) {
	    	   	 chtml +='<img src="'+webRoot+v+'" />';
	    	   	
	    	   });
	    	     $('#beipic').attr('src',webRoot+data.rew[0]);
	    	   $('#roadimgs').html(chtml);
      },error:function(e){
      	console.log(JSON.stringify(e)); 
      }
     });
})