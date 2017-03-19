/****
 * zbx
 * 2016.3.23
 * 全局js
 */

function logoff(){
window.plus.bridge.execSync("community", "exit", "退出登录");
plus.storage.removeItem('uid');
plus.runtime.restart();
logoutAuth();

//nwaiting();
//plus.storage.removeItem('uid');
//mui.currentWebview.close();
//plus.runtime.restart();
//alert(plus.storage.getItem('uid'));
}
function logoutAuth(){
for(var i in auths) {
	var s = auths[i];
	if(s.authResult) {
	s.logout(function(e) {
						//						alert("注销登录认证成功！");
						}, function(e) {
						//						alert("注销登录认证失败！");
					　　　});
	}
}}

//页面跳转
function openNewPage(id) {
	mui.openWindow({
		id: id,
		url: id,
		styles:{
			popGesture:'hide'
		},
		show: {
			//			aniShow: 'fade-in-left',
			duration: '300'
		},
		waiting: {
			autoShow: false
		}
	});
}

function openPage(html, id) {
	plus.nativeUI.showWaiting();
	var new_view = plus.webview.create('./' + html, html, {popGesture:'hide'}, id);
	new_view.addEventListener('loaded', function() {
		setTimeout(function() {
			plus.nativeUI.closeWaiting();
		}, 300);
		new_view.show('pop-in', 300);
	})

}

function openPublish(id){
    mui.openWindow({
       id: id,
       url: id,
       show: {
       //      aniShow: 'fade-in-left',
       duration: '300'
       },
       waiting: {
       autoShow: false
       }
    });
}
//使用方法直接在所需要跳转的地方加上 onclick="openNewPage('ticket.html')"

/**input清除模块**/
//点击清楚input 内容方法
function clearInput(id, event) {
	var clearNum = id.parentNode.children[1];
	var inputNum = id.parentNode.children[0]; //返回的是数组
	var btn = document.getElementsByClassName("zbx-moneycharge-btn")[0];
	//console.log(btn)
	if(event == 0) {
		//key
		if(id.value != "") {
			clearNum.style.display = "block";
			btn.style.background = "#FF5252";
		} else {
			clearNum.style.display = "none";
			btn.style.background = "#FDA6A6";
		}
	} else {
		//mouse
		inputNum.value = "";
		clearNum.style.display = "none";
		btn.style.background = "#FDA6A6";
	}
}
//点击跳转按钮
function btnMoney(id) {
	var btn = document.getElementsByClassName("zbx-moneycharge-input")[0];
	if(btn.value != "") {
		mui.openWindow({
			id: id,
			url: id,
			show: {
				aniShow: 'fade-in-left',
				duration: '300'
			},
			waiting: {
				autoShow: false
			}
		});
	} else {
		return false;
	}
}