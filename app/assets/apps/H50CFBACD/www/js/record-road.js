var a = 0, b = 0, c = 0;//秒分时
var km = 0.0, qk = 0.0;//公里,千卡
var tt, gl, lul, uid, weight, coord, map, startcoord;//时间，公里，千卡，坐标
var _that,_prev = [], marker, polyline;
document.addEventListener('plusready',function(){
	var ws = plus.webview.currentWebview();
	var userid = plus.storage.getItem('userid');
	if(!userid){
		toast('您还未登录，请登录后再进行此操作');return;
	}
	
	// 百度地图API功能
	map = new BMap.Map("allmap"); 
	map.clearOverlays();   //清除标注，划线
	var geolocation = new BMap.Geolocation();
	geolocation.getCurrentPosition(function(r){
		if(this.getStatus() == BMAP_STATUS_SUCCESS){
			console.log('您的位置：'+r.point.lng+','+r.point.lat);
			var jingdu = r.point.lng;
			var weidu = r.point.lat;
			var zuob = jingdu+','+weidu;
			plus.storage.setItem('coord', zuob);
			//显示地图
			var point = new BMap.Point(jingdu,weidu);
			_prev = [jingdu,weidu];
			map.centerAndZoom(point, 14);
			map.enableScrollWheelZoom(true);
			// 用经纬度设置地图中心点
			map.clearOverlays(); 
			marker = new BMap.Marker(point);  // 创建标注
			marker.setLabel('当前位置');
			var label = new BMap.Label('当前位置',{"offset":new BMap.Size(9,-15)}); 
			marker.setLabel(label);
			map.addOverlay(marker);  // 将标注添加到地图中
			map.panTo(point);
		}else {
			console.log('failed'+this.getStatus());  
		}        
	},{enableHighAccuracy: true})
	
	//当点击开始的时候
$('.btn1').click(function(){
		map.removeOverlay(polyline);
		startcoord = plus.storage.getItem('coord');//获取点击时的坐标
		_prev = startcoord.split(',');
		map.centerAndZoom(new BMap.Point(_prev[0],_prev[1]), 14);
		console.log(startcoord);
		$('.kaishi').hide();
		$('.jieshu').show();
		$('.zongli').text('00:00:00');
		$('.gongli').text('0.0');
		$('.sudu').text('0.0');
		a = 0; b = 0; c = 0;km = 0.0; 
		tt=setInterval(setTime,1000);
//		gl=setInterval(getDistance,88000);//1.8分钟
		gl=setInterval(getDistance,3000);//1.8分钟
	})	
	//点击结束的时候
	$('.btn3').click(function(){
		$('.btn3').hide();
		clearInterval(tt);
		clearInterval(gl);
		wc = plus.webview.currentWebview();
		bitmap = new plus.nativeObj.Bitmap("test"); 
		// 将webview内容绘制到Bitmap对象中
		setTimeout(function () {
			wc.draw(bitmap,function(){
				console.log('绘制图片成功');
			},function(e){
				console.log('绘制图片失败：'+JSON.stringify(e)); 
			});	
		},200);
		
			setTimeout(function(){ 
				var name = (new Date()).valueOf();
				bitmap.save( "_doc/"+name+".jpg"
				,{}
				,function(i){
					console.log(i.target);
					//console.log('保存图片成功：'+JSON.stringify(i));
					clipImage(i.target);
					plus.storage.setItem('saveimg1',i.target);
					
				}
				,function(e){
					console.log('保存图片失败：'+JSON.stringify(e));
				});
				//var n = "_doc/"+name+".jpg";
				//	 var newImg = document.createElement("img");
				//	 newImg.src = bitmap.toBase64Data();
				//	 document.body.appendChild(newImg);
				
				
			},500); 
		})	
		//裁剪图片
		function clipImage(name){ 
			plus.zip.compressImage({
			src:name,
			dst:name,
			overwrite:true,
			clip:{top:"1%",left:"0.5%",width:"67%",height:"75%"}	 // 裁剪图片中心区域
			},
			function() {
				console.log("保存成功!");
				var jietu = plus.storage.getItem('saveimg1');
				appendpic(jietu);
				//setView2 (5);
			},function(error) {
				alert(name); 
			
			});
		}
		
		$('.btn5').on('click',function(){
			console.log(picc);
//			plus.webview.create('./record-road2.html','record-road2.html',{},{roadpic : picc}).show('pop-in',200);
			plus.webview.create('./perfect-infor.html','perfect-infor.html',{},{roadpic : picc}).show('pop-in',200);
       })
		
	
})	
	
//时间	a:秒，b:分，c:时
//var xs;//过了多少小时
function setTime(){
	a += 1;
	if(a == 60){
		a = 0;
		b = b+1;
	}
	if(b == 60)c = c+1;
	if(c == 24){
		clearInterval(tt);
		clearInterval(gl);
	}
	$('.zongli').text((c < 10 ? '0' + c : c)+":"+(b < 10 ? '0' + b :b)+":"+(a < 10 ? '0' + a :a));
}

//获取当前坐标
function getcoord(){
	var geolocation = new BMap.Geolocation();
	geolocation.getCurrentPosition(function(r){
		if(this.getStatus() == BMAP_STATUS_SUCCESS){
			// 用经纬度设置地图中心点
			map.panTo(r.point); 
			console.log('您的位置：'+r.point.lng+','+r.point.lat);
			var jingdu = r.point.lng;
			var weidu = r.point.lat;
			coord = jingdu+','+weidu;
			
			line(coord);
			//显示地图
			var point = new BMap.Point(jingdu,weidu);
			map.centerAndZoom(point, 14);
			map.enableScrollWheelZoom(true); 
		}else {
			console.log('failed'+this.getStatus()); 
		}        
	},{enableHighAccuracy: true})
}

//定时获取当前位置
function getDistance(){
	coord = plus.storage.getItem('coord');//本地储存的坐标
//	console.log(coord+" "+startcoord);
	if(!coord){
		getcoord();
	}else{
		line(coord);
	}
}

var per = 0.01,per2 = 0.001;
function line(coord){
	if(coord){
		var dcoord = coord.split(',');
	}
	// 百度地图API功能
	per +=0.001; 
	per2 +=0.0005; 
	var aa = 113.847129 + per;var bb = 22.745325 + per2;
	dcoord = [aa,bb];
	map.removeOverlay(marker);
	marker = new BMap.Marker(dcoord[0],dcoord[1]);  // 创建标注
	map.addOverlay(marker);  // 将标注添加到地图中
	map.centerAndZoom(new BMap.Point(dcoord[0],dcoord[1]), 14);
	polyline = new BMap.Polyline([
		new BMap.Point(_prev[0], _prev[1]),
		new BMap.Point(dcoord[0], dcoord[1])
	], {strokeColor:"blue", strokeWeight:3, strokeOpacity:0.5});
 	map.addOverlay(polyline);   //增加折线
 	_prev = dcoord;
   	var scoord = startcoord.split(',');
	var pointA = new BMap.Point(scoord[0],scoord[1]);  // 创建点坐标A--起始所在位置
	var pointB = new BMap.Point(dcoord[0],dcoord[1]);  // 创建点坐标B--现在所在位置
	var distance = parseInt((map.getDistance(pointA,pointB)));//返回单位m米
	var gldistance = (distance / 1000).toFixed(1);
	$('.gongli').text(gldistance); 
	var xs = ((c * 60 * 60) + (b * 60) + a) / (60*60);//过了多少小时
	//console.log(gldistance+" "+xs);
	var sd = parseFloat(gldistance) / parseFloat(xs);
	$('.sudu').text(parseFloat(sd).toFixed(1));
	
}


	
