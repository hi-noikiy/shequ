
	//活得图片地址方法
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
	//发布视频
	$('#uploadimg7').change(function() {
		 var imgURL = getObjectURL(this.files[0]);
		 var eImg = $('#show_pic7 img');
		 $('#show_pic7>i').remove();
		 eImg.attr('src', getObjectURL($(this)[0].files[0]));

	//点击按钮所触发的事件
	var clickNum = 0;   //按钮点击次数
	var progress_range = 0; //进度条其实位置
	var timer;  //计时器
	
	$('.progress_bar_box button').click(function(){
		clickNum ++;
		clearInterval(timer);
		$('.progress_bar p').css('width','0');
		switch(clickNum){
			case 1:  //上传
				$(this).html('取消上传');
				$('#uploadimg7').attr('disabled',true);
				$('.progress_bar').css('visibility','visible');
				//计时器开始计时
				timer = setInterval(function(){
					progress_range += 20;					
					$('.progress_bar p').css({'width': progress_range});
					var currnt_range = parseInt((progress_range/$('.progress_bar').width())*100);
					if(currnt_range >= 100){
						$('.current_range i').html('100');
						$('.progress_bar p').css({'width': '0px'});
					}
					$('.current_range i').html(currnt_range);
					//上传完成时的状态
					if(progress_range >= $('.progress_bar').width()){
						clearInterval(timer); //清除计时器
						$('.progress_bar').css('visibility','hidden'); //精度条隐藏
						$('.progress_bar p').css({'width': '0'});						
						$('.progress_bar_box button').html('删除'); //按钮显示删除
					}
				},200)
			break;
			case 2:  //取消上传
				$('#uploadimg7').attr('disabled',false);
				$('.progress_bar').css('visibility','hidden'); //精度条隐藏
				$('.progress_bar p').css({'width': '0'});
				eImg.attr('src', "");
				$('.progress_bar_box button').html('上传'); //按钮显示删除
				clickNum = 0;
			break;
			case 3:  //上传完成   》》》  删除
				alert('3');
				clickNum = 0;
			break;
		}
	})
});