
$().ready(function() {
	function getObjectURL(file) {
				 var url = null ;
				 if (window.createObjectURL!=undefined) { // basic
				  url = window.createObjectURL(file) ;
				 } else if (window.URL!=undefined) { // mozilla(firefox)
				  url = window.URL.createObjectURL(file) ;
				 } else if (window.webkitURL!=undefined) { // webkit or chrome
				  url = window.webkitURL.createObjectURL(file) ;
				 }
				 return url ;
				}
		
				//图片上传展示
				$('#uploadimg1').change(function() {
					 var imgURL = getObjectURL(this.files[0]);
					 var eImg = $('.upfile_box>#show_pic1 img');
					 $('.upfile_box>#show_pic1>i').remove();
					 eImg.attr('src', getObjectURL($(this)[0].files[0]));
					
				});
				$('#uploadimg2').change(function() {
					 var imgURL = getObjectURL(this.files[0]);
					 var eImg = $('.upfile_box>#show_pic2 img');
					 $('.upfile_box>#show_pic2>i').remove();
					 eImg.attr('src', getObjectURL($(this)[0].files[0]));
				});
				$('#uploadimg3').change(function() {
					 var imgURL = getObjectURL(this.files[0]);
					 var eImg = $('.upfile_box>#show_pic3 img');
					 $('.upfile_box>#show_pic3>i').remove();
					 eImg.attr('src', getObjectURL($(this)[0].files[0]));
				});
				$('#uploadimg4').change(function() {
					 var imgURL = getObjectURL(this.files[0]);
					 var eImg = $('.upfile_box>#show_pic4 img');
					 $('.upfile_box>#show_pic4>i').remove();
					 eImg.attr('src', getObjectURL($(this)[0].files[0]));
				});
				$('#uploadimg5').change(function() {
					 var imgURL = getObjectURL(this.files[0]);
					 var eImg = $('.upfile_box>#show_pic5 img');
					 $('.upfile_box>#show_pic5>i').remove();
					 eImg.attr('src', getObjectURL($(this)[0].files[0]));
				});
				$('#uploadimg6').change(function() {
					 var imgURL = getObjectURL(this.files[0]);
					 var eImg = $('.upfile_box>#show_pic6 img');
					 $('.upfile_box>#show_pic6>i').remove();
					 eImg.attr('src', getObjectURL($(this)[0].files[0]));
					 
				});
				
				//发布图文
				$('#uploadimg7').change(function() {
					 var imgURL = getObjectURL(this.files[0]);
					 var eImg = $('#show_pic7 img');
					 eImg.attr('src', getObjectURL($(this)[0].files[0]));
				});
				
				//个人资料
				$('#uploadimg8').change(function() {
					 var eImg = $('#show_pic8');
					 eImg.attr('src', getObjectURL($(this)[0].files[0]));
				});
				
				//申请退款
				$('#uploadimg9').change(function() {
					 var imgURL = getObjectURL(this.files[0]);
					 plus.storage.setItem('imgs',this.files[0])
					 var eImg = $('#show_pic9');
					 console.log(JSON.stringify(this.files[0]))
					 eImg.append(('<img src="'+imgURL+'"/>'));
				});
				
				
				//申请卖主
				$('#uploadimg10').change(function() {
					 var imgURL = getObjectURL(this.files[0]);
					 var eImg = $('#show_pic10');
					 $('#show_pic10>i').remove();
					 eImg.append(('<img src="'+imgURL+'"/>'));
				});
				$('#uploadimg11').change(function() {
					 var imgURL = getObjectURL(this.files[0]);
					 var eImg = $('#show_pic11');
					 $('#show_pic11>i').remove();
					 eImg.append(('<img src="'+imgURL+'"/>'));
				});
				$('#uploadimg12').change(function() {
					 var imgURL = getObjectURL(this.files[0]);
					 var eImg = $('#show_pic12');
					 $('#show_pic12>i').remove();
					 eImg.append(('<img src="'+imgURL+'"/>'));
				});
				$('#uploadimg13').change(function() {
					 var imgURL = getObjectURL(this.files[0]);
					 var eImg = $('#show_pic13');
					 $('#show_pic13>i').remove();
					 eImg.append(('<img src="'+imgURL+'"/>'));
				});
				
				$('#upload_pic').change(function(){
					var imgURL = getObjectURL(this.files[0]);
					var eImg = $('.img_show');
					eImg.append(('<img src="' + imgURL+ '"/>'))
				})
				
			});


				