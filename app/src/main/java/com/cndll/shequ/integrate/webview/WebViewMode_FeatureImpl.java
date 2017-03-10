package com.cndll.shequ.integrate.webview;

import android.content.Intent;

import com.cndll.shequ.RXbus.RxBus;
import com.cndll.shequ.activity.ChatActivity;
import com.cndll.shequ.eventtype.JSEvent;
import com.cndll.shequ.eventtype.LoginIM;
import com.cndll.shequ.eventtype.PushWebView;
import com.cndll.shequ.util.ObjectSaveUtils;
import com.hyphenate.chat.EMClient;
import com.hyphenate.easeui.EaseConstant;
import com.hyphenate.easeui.model.UserInfo;
import com.hyphenate.easeui.model.UserLodingInFo;

import io.dcloud.common.DHInterface.AbsMgr;
import io.dcloud.common.DHInterface.IFeature;
import io.dcloud.common.DHInterface.IWebview;

/**
 * 通过代码注册5+扩展插件示例类
 **/
public class WebViewMode_FeatureImpl implements IFeature {

    @Override
    public String execute(final IWebview pWebViewImpl, String pActionName,
                          String[] pJsArgs)
    {
        switch (pActionName) {
            case "sendMessage":
                Intent intent = new Intent(pWebViewImpl.getActivity(), ChatActivity.class);
                intent.putExtra(EaseConstant.EXTRA_USER_ID, pJsArgs[0]).putExtra(EaseConstant.EXTRA_CHAT_TYPE, EaseConstant.CHATTYPE_SINGLE);
                if (UserInfo.getInstance().getInfo().get(pJsArgs[0]) == null) {
                    UserInfo.getInstance().addInfo(new UserInfo.User().setUid(pJsArgs[0]).setNick(pJsArgs[2]).setIcon(pJsArgs[1]));
                } else{
                    UserInfo.getInstance().getInfo().get(pJsArgs[0]).setUid(pJsArgs[0]).setNick(pJsArgs[2]).setIcon(pJsArgs[1]);
                }
                pWebViewImpl.getActivity().startActivity(intent);
                break;
            case "exit":
                if (EMClient.getInstance().isLoggedInBefore())
                    EMClient.getInstance().logout(true);
                break;
            case "login":
                UserLodingInFo.getInstance().setIcon(pJsArgs[3]).setId(pJsArgs[0]).setNick(pJsArgs[2]).setMobile(pJsArgs[1]);
                ObjectSaveUtils.saveObject(pWebViewImpl.getContext(), "USERINFO", UserLodingInFo.getInstance());
                RxBus.getDefault().post(new LoginIM().setIcon(pJsArgs[3]).setId(pJsArgs[0]).setNick(pJsArgs[2]).setMobile(pJsArgs[1]));
                break;
            case "hideNativeView":
                RxBus.getDefault().post(new JSEvent().setEventType("hideNativeView"));
                break;
            case "showNativeView":
                RxBus.getDefault().post(new JSEvent().setEventType("showNativeView"));
                break;
            case "pushWebView":
                RxBus.getDefault().post(new PushWebView().setTYPE(PushWebView.PUSH));
                break;
            case "backNews":
                RxBus.getDefault().post(new PushWebView().setTYPE(PushWebView.BACK));
                break;
        }

        return null;
    }

    @Override
    public void init(AbsMgr pFeatureMgr, String pFeatureName) {
        //初始化Feature
    }

    @Override
    public void dispose(String pAppid) {

    }

}
