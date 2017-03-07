package com.cndll.shequ.activity;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.content.res.Configuration;
import android.os.Bundle;
import android.os.Parcelable;
import android.support.v7.app.AppCompatActivity;
import android.view.KeyEvent;
import android.view.Menu;
import android.view.View;
import android.view.ViewGroup;
import android.view.animation.Animation;
import android.view.animation.AnimationSet;
import android.view.animation.TranslateAnimation;
import android.widget.FrameLayout;
import android.widget.Toast;

import com.cndll.shequ.R;
import com.cndll.shequ.RXbus.RxBus;
import com.cndll.shequ.eventtype.JSEvent;
import com.cndll.shequ.eventtype.LoginIM;
import com.cndll.shequ.eventtype.PushWebView;
import com.cndll.shequ.util.ObjectSaveUtils;
import com.hyphenate.EMCallBack;
import com.hyphenate.EMMessageListener;
import com.hyphenate.chat.EMClient;
import com.hyphenate.chat.EMConversation;
import com.hyphenate.chat.EMGroup;
import com.hyphenate.chat.EMMessage;
import com.hyphenate.easeui.EaseConstant;
import com.hyphenate.easeui.model.UserLodingInFo;
import com.hyphenate.easeui.ui.EaseConversationListFragment;
import com.hyphenate.exceptions.HyphenateException;

import java.util.ArrayList;
import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;
import io.dcloud.EntryProxy;
import io.dcloud.RInformation;
import io.dcloud.common.DHInterface.IApp;
import io.dcloud.common.DHInterface.ICore;
import io.dcloud.common.DHInterface.IOnCreateSplashView;
import io.dcloud.common.DHInterface.ISysEventListener;
import io.dcloud.common.DHInterface.IWebview;
import io.dcloud.common.DHInterface.IWebviewStateListener;
import io.dcloud.feature.internal.sdk.SDK;
import rx.Observer;
import rx.Subscription;
import rx.android.schedulers.AndroidSchedulers;

public class MainActivity extends AppCompatActivity {
    @BindView(R.id.frame)
    FrameLayout frame;
    @BindView(R.id.activity_main)
    FrameLayout activityMain;
    EaseConversationListFragment fragment;
    @BindView(R.id.webview)
    FrameLayout webview;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        ButterKnife.bind(this);
        initH5(savedInstanceState);
        init();
        initJsEvent();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        return mEntryProxy.onActivityExecute(this, ISysEventListener.SysEventType.onCreateOptionMenu, menu);
    }

    @Override
    public void onPause() {
        super.onPause();
        mEntryProxy.onPause(this);
    }

    @Override
    public void onResume() {
        super.onResume();
        EMClient.getInstance().chatManager().loadAllConversations();
        EMClient.getInstance().groupManager().loadAllGroups();
        mEntryProxy.onResume(this);
    }

    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        if (intent.getFlags() != 0x10600000) {// 非点击icon调用activity时才调用newintent事件
            mEntryProxy.onNewIntent(this, intent);
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        mEntryProxy.onStop(this);
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        boolean _ret = mEntryProxy.onActivityExecute(this, ISysEventListener.SysEventType.onKeyDown, new Object[]{keyCode, event});
        return _ret ? _ret : super.onKeyDown(keyCode, event);
    }

    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        boolean _ret = mEntryProxy.onActivityExecute(this, ISysEventListener.SysEventType.onKeyUp, new Object[]{keyCode, event});
        return _ret ? _ret : super.onKeyUp(keyCode, event);
    }

    @Override
    public boolean onKeyLongPress(int keyCode, KeyEvent event) {
        boolean _ret = mEntryProxy.onActivityExecute(this, ISysEventListener.SysEventType.onKeyLongPress, new Object[]{keyCode, event});
        return _ret ? _ret : super.onKeyLongPress(keyCode, event);
    }

    public void onConfigurationChanged(Configuration newConfig) {
        try {
            int temp = this.getResources().getConfiguration().orientation;
            if (mEntryProxy != null) {
                mEntryProxy.onConfigurationChanged(this, temp);
            }
            super.onConfigurationChanged(newConfig);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        mEntryProxy.onActivityExecute(this, ISysEventListener.SysEventType.onActivityResult, new Object[]{requestCode, resultCode, data});
    }

    private Subscription jsevent;
    private Subscription loginIM;
    private Subscription pushWebView;

    private void initJsEvent() {
        if (pushWebView == null) {
            pushWebView = RxBus.getDefault().toObservable(PushWebView.class).subscribe(new Observer<PushWebView>() {
                @Override
                public void onCompleted() {

                }

                @Override
                public void onError(Throwable e) {

                }

                @Override
                public void onNext(PushWebView pushWebView) {
                    switch (pushWebView.getTYPE()) {
                        case PushWebView.PUSH:
                            translateFrame(0, -1, 0, 0, new Animation.AnimationListener() {
                                @Override
                                public void onAnimationStart(Animation animation) {

                                }

                                @Override
                                public void onAnimationEnd(Animation animation) {
                                    FrameLayout.LayoutParams params = new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT);
                                    params.setMargins(-frame.getWidth(), 0, 0, 0);
                                    frame.setLayoutParams(params);
                                    frame.clearAnimation();
                                }

                                @Override
                                public void onAnimationRepeat(Animation animation) {

                                }
                            });
                            break;
                        case PushWebView.BACK:
                            translateFrame(-1, 0, 0, 0, new Animation.AnimationListener() {
                                @Override
                                public void onAnimationStart(Animation animation) {

                                }

                                @Override
                                public void onAnimationEnd(Animation animation) {
                                    FrameLayout.LayoutParams params = new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT);
                                    params.setMargins(0, -frame.getWidth(), 0, 0);
                                    frame.setLayoutParams(params);
                                    frame.clearAnimation();
                                }

                                @Override
                                public void onAnimationRepeat(Animation animation) {

                                }
                            });
                            break;
                    }
                }
            });
        }
        if (loginIM == null) {
            loginIM = RxBus.getDefault().toObservable(LoginIM.class).subscribe(new Observer<LoginIM>() {
                @Override
                public void onCompleted() {

                }

                @Override
                public void onError(Throwable e) {

                }

                @Override
                public void onNext(LoginIM loginIM) {
                    loginIM(loginIM.getMobile());
                    //loginIM("jiangruicheng");
                }
            });
        }
        if (jsevent == null) {
            jsevent = RxBus.getDefault().toObservable(JSEvent.class).observeOn(AndroidSchedulers.mainThread()).subscribe(new Observer<JSEvent>() {
                @Override
                public void onCompleted() {

                }

                @Override
                public void onError(Throwable e) {

                }

                @Override
                public void onNext(JSEvent jsEvent) {

                    try {
                        switch (jsEvent.getEventType()) {
                            case "hideNativeView":
                                frame.setVisibility(View.GONE);
                                break;
                            case "showNativeView":
                                frame.setVisibility(View.VISIBLE);
                                break;
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            });
        }
    }

    private void translateFrame(float xfrom, float xto, float yfrom, float yto, final Animation.AnimationListener animationListener) {
        TranslateAnimation translateAnimation = new TranslateAnimation(Animation.RELATIVE_TO_SELF, xfrom, Animation.RELATIVE_TO_SELF, xto, Animation.RELATIVE_TO_SELF, yfrom, Animation.RELATIVE_TO_SELF, yto);
        final AnimationSet animationSet       = new AnimationSet(true);
        translateAnimation.setFillAfter(true);
        animationSet.setFillAfter(true);

        animationSet.addAnimation(translateAnimation);
        animationSet.setDuration(500);
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
              //  animationSet.setAnimationListener(animationListener);
                frame.startAnimation(animationSet);

            }
        });
    }

    EntryProxy mEntryProxy = null;

    private void initH5(Bundle savedInstanceState) {
        if (mEntryProxy == null) {
            //FrameLayout f = new FrameLayout(this);
            // 创建5+内核运行事件监听
            WebappModeListener wm = new WebappModeListener(this, webview);
            // 初始化5+内核
            mEntryProxy = EntryProxy.init(this, wm);
            // 启动5+内核
            mEntryProxy.onCreate(this, savedInstanceState, SDK.IntegratedMode.WEBAPP, null);
            //setContentView(f);
        }
    }

    private void init() {
        try {
            UserLodingInFo.setInstance((UserLodingInFo) ObjectSaveUtils.getObject(MainActivity.this, "USERINFO"));
            UserLodingInFo.isLoading = true;
            //toast(UserLodingInFo.getInstance().getId() + UserLodingInFo.getInstance().getIcon());
        } catch (Exception e) {
            e.printStackTrace();
            toast(e.getMessage() + e.toString());
        }
        frame.setVisibility(View.GONE);
        EMClient.getInstance().chatManager().addMessageListener(new EMMessageListener() {
            @Override
            public void onMessageReceived(final List<EMMessage> list) {
                final StringBuffer s = new StringBuffer();

                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                for (EMMessage e : list) {
                                    fragment.refresh();
                                }
                            }
                        });
                    }
                });
            }

            @Override
            public void onCmdMessageReceived(List<EMMessage> list) {

            }

            @Override
            public void onMessageRead(List<EMMessage> list) {

            }

            @Override
            public void onMessageDelivered(List<EMMessage> list) {

            }

            @Override
            public void onMessageChanged(EMMessage emMessage, Object o) {

            }
        });
        fragment = new EaseConversationListFragment();
        fragment.setLeftClick(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(MainActivity.this, CreateGroupActivity.class));
            }
        });
        fragment.setRightClick(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(MainActivity.this, GroupListActivity.class));
            }
        });
        fragment.setConversationListItemClickListener(new EaseConversationListFragment.EaseConversationListItemClickListener() {
            @Override
            public void onListItemClicked(EMConversation conversation) {
                if (conversation.conversationId().equals("admin")) {
                    Intent          intent   = new Intent(MainActivity.this, AdminActivity.class);
                    Bundle          messages = new Bundle();
                    List<EMMessage> listmesg = conversation.loadMoreMsgFromDB(conversation.getLastMessage().getMsgId(), conversation.getAllMsgCount());
                    listmesg.add(conversation.getLastMessage());
                    messages.putParcelableArrayList("MESG", (ArrayList<? extends Parcelable>) listmesg);
                    intent.putExtra("MESG", messages);
                    startActivity(intent);
                    return;
                }
                int type = 0;
                switch (conversation.getType()) {
                    case Chat:
                        type = EaseConstant.CHATTYPE_SINGLE;
                        break;
                    case ChatRoom:
                        type = EaseConstant.CHATTYPE_CHATROOM;
                        break;
                    case GroupChat:
                        type = EaseConstant.CHATTYPE_GROUP;
                        break;

                }
                startActivity(new Intent(MainActivity.this, ChatActivity.class).putExtra(EaseConstant.EXTRA_USER_ID, conversation.conversationId()).putExtra(EaseConstant.EXTRA_CHAT_TYPE, type));
            }
        });
        getSupportFragmentManager().beginTransaction().add(R.id.frame, fragment).commit();
    }

    private void loginIM(final String username) {

        if (EMClient.getInstance().isLoggedInBefore()) {
            /*EMClient.getInstance().logout(true, new EMCallBack() {
                @Override
                public void onSuccess() {
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            login(username);
                        }
                    });
                }

                @Override
                public void onError(int i, String s) {

                }

                @Override
                public void onProgress(int i, String s) {

                }
            });*/
        } else {
            login(username);
        }
    }

    private void login(String username) {
        EMClient.getInstance().login(UserLodingInFo.getInstance().getMobile(), "123456", new EMCallBack() {
            @Override
            public void onSuccess() {
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        EMClient.getInstance().chatManager().loadAllConversations();
                        EMClient.getInstance().groupManager().loadAllGroups();
                        if (EMClient.getInstance().groupManager().getAllGroups() != null) {
                            for (EMGroup group : EMClient.getInstance().groupManager().getAllGroups()) {
                                try {
                                    EMClient.getInstance().groupManager().destroyGroup(group.getGroupId());
                                } catch (HyphenateException e) {
                                    e.printStackTrace();
                                }
                            }
                        }
                        fragment.refresh();
                    }
                });
            }

            @Override
            public void onError(int i, final String s) {
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        toast(s);
                    }
                });
            }

            @Override
            public void onProgress(int i, String s) {

            }
        });
    }


    private void sendMesg() {
    /*button.setVisibility(View.GONE);
    button.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            EMMessage emMessage = EMMessage.createTxtSendMessage("我爱你", "zangziye");
            emMessage.setMessageStatusCallback(new EMCallBack() {
                @Override
                public void onSuccess() {
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            // toast("success" + "send");
                        }
                    });
                }

                @Override
                public void onError(int i, String s) {
                    toast(s);
                }

                @Override
                public void onProgress(int i, String s) {

                }
            });
            EMClient.getInstance().chatManager().sendMessage(emMessage);
        }
    });*/
    }

    private void toast(final String s) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Toast.makeText(MainActivity.this, "" + s, Toast.LENGTH_SHORT).show();
            }
        });
    }

}

class WebappModeListener implements ICore.ICoreStatusListener, IOnCreateSplashView {
    Activity activity;
    View splashView = null;
    ViewGroup rootView;
    IApp           app = null;
    ProgressDialog pd  = null;

    public WebappModeListener(Activity activity, ViewGroup rootView) {
        this.activity = activity;
        this.rootView = rootView;
    }

    /**
     * 5+内核初始化完成时触发
     */
    @Override
    public void onCoreInitEnd(ICore coreHandler) {

        // 表示Webapp的路径在 file:///android_asset/apps/HelloH5
        String appBasePath = "/apps/H58167E1D";

        // 设置启动参数,可在页面中通过plus.runtime.arguments;方法获取到传入的参数
        String args = "{url:'http://www.baidu.com'}";

        // 启动启动独立应用的5+ Webapp
        app = SDK.startWebApp(activity, appBasePath, args, new IWebviewStateListener() {
            // 设置Webview事件监听，可在监监听内获取WebIvew加载内容的进度
            @Override
            public Object onCallBack(int pType, Object pArgs) {
                switch (pType) {
                    case IWebviewStateListener.ON_WEBVIEW_READY:
                        // WebApp准备加载事件
                        // 准备完毕之后添加webview到显示父View中，
                        // 设置排版不显示状态，避免显示webview时html内容排版错乱问题
                        View view = ((IWebview) pArgs).obtainApp().obtainWebAppRootView().obtainMainView();
                        view.setVisibility(View.INVISIBLE);

                        if (view.getParent() != null) {
                            ((ViewGroup) view.getParent()).removeView(view);
                        }
                        rootView.addView(view, 0);
                        break;
                    case IWebviewStateListener.ON_PAGE_STARTED:
                        // 首页面开始加载事件
                        pd = ProgressDialog.show(activity, "加载中", "0/100");
                        break;
                    case IWebviewStateListener.ON_PROGRESS_CHANGED:
                        // WebApp首页面加载进度变化事件
                        if (pd != null) {
                            pd.setMessage(pArgs + "/100");
                        }
                        break;
                    case IWebviewStateListener.ON_PAGE_FINISHED:
                        // WebApp首页面加载完成事件
                        if (pd != null) {
                            pd.dismiss();
                            pd = null;
                        }
                        // 页面加载完毕，设置显示webview
                        // 如果不需要显示spalsh页面将此行代码移动至onCloseSplash事件内
                        app.obtainWebAppRootView().obtainMainView().setVisibility(View.VISIBLE);
                        break;
                }
                return null;
            }
        }, this);

        app.setIAppStatusListener(new IApp.IAppStatusListener() {
            // 设置APP运行事件监听
            @Override
            public boolean onStop() {
                // 应用运行停止时调用
                rootView.removeView(app.obtainWebAppRootView().obtainMainView());
                // TODO Auto-generated method stub
                return false;
            }

            @Override
            public void onStart() {
                // 独立应用启动时触发事件
            }

            @Override
            public void onPause(IApp arg0, IApp arg1) {
                // WebApp暂停运行时触发事件
            }

            @Override
            public String onStoped(boolean arg0, String arg1) {
                // TODO Auto-generated method stub
                return null;
            }
        });
    }

    @Override
    public void onCoreReady(ICore coreHandler) {
        // 初始化5+ SDK，
        // 5+SDK的其他接口需要在SDK初始化后才能調用
        SDK.initSDK(coreHandler);
        // 设置当前应用可使用的5+ API
        SDK.requestAllFeature();
    }

    @Override
    public boolean onCoreStop() {
        // 当返回false时候回关闭activity
        return false;
    }

    // 在Widget集成时如果不需要显示splash页面可按照如下步骤操作
    // 1 删除onCreateSplash方法内的代码
    // 2 将5+mainView添加到rootview时将页面设置为不可见
    // 3 在onCloseSplash方法中将5+mainView设置为可见
    // 4 修改androidmanifest.xml文件 将SDK_WebApp的主题设置为透明
    // 注意！
    // 如果不显示splash页面会造成用户点击后页面短时间内会没有变化，
    // 可能会给用户造成程序没响应的错觉，
    // 所以开发者需要对5+内核启动到5+应用页面显示之间的这段事件进行处理

    @Override
    public Object onCreateSplash(Context pContextWrapper) {
        splashView = new FrameLayout(activity);
        splashView.setBackgroundResource(RInformation.DRAWABLE_SPLASH);
        rootView.addView(splashView);
        return null;
    }

    @Override
    public void onCloseSplash() {
        rootView.removeView(splashView);
    }
}