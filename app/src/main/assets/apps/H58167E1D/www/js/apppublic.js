var payRoot = 'http://qmy.51edn.com/app';
var webRoot = 'http://qmy.51edn.com';
var apiRoot = webRoot + '/app';
//var payRoot = 'http://192.168.0.19/shequ/pay';
//var webRoot = 'http://192.168.0.19/shequ_server/public';
//var apiRoot = webRoot + '/index.php/app';
var p1 = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/; //手机号码格式验证
var passReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;//验证密码规范 
var card = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; //验证身份证号
var regx2 = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; //邮箱验证
var p3 = /^[0-9]*$/; //判断是否为数字
var m = /^(([1-9]\d*)|0)(\.\d*)?$/; //判断金钱
//获取头像
var getAvatar = function(avatar) {
	if(avatar == null || avatar == '') {
		return '../public/img/hy-person.png';
	}
	return avatar.indexOf('http') < 0 ? webRoot + avatar : avatar;
}
//获取房间头像
var getPic = function(pic) {
	if(pic == null || pic == '') {
		return '../public/img/1-2.jpg';
	}
	return pic.indexOf('http') < 0 ? webRoot + pic : pic;
}
//替换特殊字符
function replace_text(str) {
	str = str.replace(/&lt;br\/&gt;/g, '<br/>');
	return str;
}
/**
 * 判断用户是否登录
 */
var isLogin = function() {
	var isLogin = false;
	var userid = plus.storage.getItem('uid'); //获取登陆名
	if(!userid) {
		toast('您还未登录请先登录');
		goUrl('login.html');
	} else {
		isLogin = true;
	}
	return isLogin;
}
/**
 * 防止页面跳转时白频，页面传值
 * @param {String} url:页面
 * @param {Object} zhi:传的值
 */
function goNewPage(url, zhi) {
	var ws = plus.webview.getWebviewById(url);
	if(ws) { //避免多次打开同一个页面
		return false;
	} else {
		//		console.log(JSON.stringify(zhi))
		if(zhi) {
			var newPage = plus.webview.create(url, url, {}, zhi);
		} else {
			var newPage = plus.webview.create(url, url);
		}
		newPage.addEventListener('close', function() { //页面关闭后可再次打开
			newPage = null;
		}, false);
		showWating();
		newPage.addEventListener('loaded', function() {
			newPage.show('pop-in', 50);
			plus.nativeUI.closeWaiting();
		}, false)
	}
}
/**
 * 获取验证码
 * @param phone 手机号码
 * @return null
 */
function getverify(user) {
	var Num = "";
	for(var i = 0; i < 6; i++) {
		Num += Math.floor(Math.random() * 10);
	}
	$.ajax({
		url: 'http://v.juhe.cn/sms/send?mobile=' + user + '&tpl_id=18509&tpl_value=%23code%23%3d' + Num + '&key=a9d4d3dce982ad788f91218f7afe24db',
		type: 'get',
		success: function(data) {
			console.log(JSON.stringify(data.msg));
			toast('验证码发送成功');
			$.ajax({
				type: "get",
				url: apiRoot + "?m=home&c=member&a=setverify&ver=" + Num,
				success: function(data) {
					console.log('存储成功，验证码为：' + data);
				}
			});
			time_asc();
			return;
		},
		error: function(e) {
			console.log(JSON.stringify(e));
			toast('失去网络连接');
		}
	})
}
/**
 * 倒计时
 */
function time_asc() {
	$('#getcode').attr('disabled', true);
	var code = '';
	var second = 60;
	code = setInterval(function() {
		if(second <= 0) {
			clearInterval(code);
			reset_input(code);
		} else {
			$('#getcode').val(second-- + 's');
		}
	}, 1000);
}

/**
 * 重设状态
 */
function reset_input(code) {
	clearInterval(code);
	$('#getcode').removeAttr('disabled');
	$('#getcode').val('重发');
}
//页面跳转
var goUrl = function(url) {
	var idstr = url.substr(url.indexOf("/") + 1);
	if(idstr.indexOf('?') >= 0) {
		idstr = idstr.substr(0, idstr.indexOf('?'));
	} else {
		idstr = url;
	}
	var ws = plus.webview.getWebviewById(idstr);
	if(ws) { //避免多次打开同一个页面
		return false;
	} else {
		openw = plus.webview.create(url, idstr);
		openw.addEventListener('close', function() { //页面关闭后可再次打开
			openw = null;
		}, false);
		openw.addEventListener('loaded', function() {
			openw.show('slide-in-right');
		}, false);
	}
}
/*
 * 关闭当前页面显示新页面
 */
var curCloseAndShowNew = function(url) {
	var my = plus.webview.currentWebview();
	var idstr = url.substr(url.indexOf("/") + 1);
	idstr = idstr.substr(0, idstr.indexOf('?'));
	var ws = plus.webview.getWebviewById(idstr);
	if(my == ws) {
		my.reload();
		return;
	}
	if(ws) {
		ws.show();
		my.hide();
	} else {
		plus.webview.open(url, idstr, {}, "zoom-out");
		my.close();
	}
}
//弹窗
var toast = function(info) {
	plus.nativeUI.toast(info);
	plus.nativeUI.closeWaiting();
}
//网络连接失败提示
var errortoast = function(e) {
	plus.nativeUI.closeWaiting();
	toast('连接超时，请检查网络连接');
}
//下拉刷新
function PullToRefresh() {
	var ws = plus.webview.currentWebview();
	ws.setPullToRefresh({
		support: true,
		height: "50px",
		range: "200px",
		contentdown: {
			caption: "下拉可以刷新"
		},
		contentover: {
			caption: "释放立即刷新"
		},
		contentrefresh: {
			caption: "正在刷新..."
		}
	}, function() {
		setTimeout(function() {
			ws.reload('none');
			ws.endPullToRefresh();
		}, 1500);
	});
}
//等待窗口
var showWating = function(info, time) {
	if(info == null) {
		info = '加载中...';
	}
	if(!time || time == 0) {
		time = 5000;
	}
	var waiting = plus.nativeUI.showWaiting(info, { width: '80px', height: '80px', background: 'rgba(0,0,0,0.3)' });
	setTimeout(function() {
		if(waiting) {
			waiting.close();
		}
	}, time);
}
//关闭指定页面	
function closeWeb(_web) {
	var _this;
	if(typeof(_web) !== 'object') {
		_this = plus.webview.getWebviewById(_web);
		if(_this != null) {
			_this.close();
		}
	} else {
		for(var i in _web) {
			_this = plus.webview.getWebviewById(_web[i]);
			if(_this != null) {
				_this.close();
			}
		}
	}
}
//刷新指定页面
function reloadWeb(_web) {
	var _this;
	if(typeof(_web) !== 'object') {
		_this = plus.webview.getWebviewById(_web);
		if(_this != null) {
			_this.reload();
		}
	} else {
		for(var i in _web) {
			_this = plus.webview.getWebviewById(_web[i]);
			if(_this != null) {
				_this.reload();
			}
		}
	}
}
/**
 * 与当前时间比较
 * @param {int} time php时间戳，秒
 * @param {int} timestamp js时间戳，毫秒
 */
function turnTime(time) {
	time = parseInt(time) / 1000;
	var timestamp = Math.ceil(parseInt(new Date().getTime()) / 1000);
	var less = timestamp - time;
	var rst = '';
	if(less < 3600) {
		rst = Math.ceil(less / 60) + '分钟前';
	} else if(less < 86400) {
		rst = Math.ceil(less / 3600) + '小时前';
	} else if(less < 259200) {
		rst = Math.ceil(less / 86400) + '天前'; /*3天*/
	} else {
		var day = new Date(time * 1000);
		rst = day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate();
	}
	return rst;
}
/**
 * 转换时间
 * @return {String} 当前月日时分
 */
function zhuanTime() {
	var date = new Date();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	var hours = date.getHours();
	var minute = date.getMinutes();
	if(month >= 1 && month <= 9) month = "0" + month;
	if(strDate >= 0 && strDate <= 9) strDate = "0" + strDate;
	if(hours >= 0 && hours <= 9) hours = "0" + hours;
	if(minute >= 0 && minute <= 9) minute = "0" + minute;
	return nowtime = date.getFullYear() + "-" + month + "-" + strDate + " " + hours + ":" + minute;
}
//登录
function relogin(_self) {
	var all = plus.webview.all();
	for(var i in all) {
		if(all[i].id !== plus.runtime.appid && all[i].id !== _self) {
			all[i].close();
		}
		//		if(i == all.length -1){
		//			goNewPage('index.html');
		//		}
	}
}

/**
 * 与当前时间比较,0正进行,1未开始,2已结束
 * @param {String} time 日期字符串
 */
function checkTime(time) {
	//time = time.substring(0,19);    
	time = time.replace(/-/g, '/');
	var timestamp = new Date(time).getTime();
	var less = new Date().getTime() - timestamp;
	if(less > 0) {
		return 2;
	} else if(less < 0) {
		return 1;
	} else {
		return 0;
	}
}
//调整图片宽高	
function setWH() {
	var width1, height1, targetW = 70;
	$.each($('#showimg img'), function() {
		width1 = $(this).width();
		height1 = $(this).height();
		console.log(width1 + " " + height1);
		if(width1 > height1) {
			$(this).css('height', targetW);
			$(this).parent().css('width', targetW);
			$(this).parent().css('overflow', 'hidden');
		} else if(width1 < height1) {
			$(this).css('width', targetW);
			$(this).parent().css('height', targetW);
			$(this).parent().css('overflow', 'hidden');
		} else {
			$(this).css('width', targetW);
			$(this).css('height', targetW);
			$(this).parent().css('height', targetW);
			$(this).parent().css('width', targetW);
		}
		//		$(this).parent().css('margin-left','auto');
		//		$(this).parent().css('margin-right','auto');
	});
}

function share(alert_window, module_box, trigger_btn, cancel_btn) {
	trigger_btn.click(function() { alert_window.toggle(400); });
	alert_window.click(function() {
		alert_window.fadeOut(400);
		event.stopPropagation();
	});
	module_box.click(function(event) {
		alert_window.slideDown(400);
		event.stopPropagation();
	});
	cancel_btn.click(function(event) {
		alert_window.fadeOut(400);
		event.stopPropagation();
	})
}