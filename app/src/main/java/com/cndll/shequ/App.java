package com.cndll.shequ;

import android.app.Application;

import com.facebook.drawee.backends.pipeline.Fresco;
import com.hyphenate.chat.EMClient;
import com.hyphenate.easeui.controller.EaseUI;

/**
 * Created by kongqing on 17-3-1.
 */

public class App extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        Fresco.initialize(this);
        EaseUI.getInstance().init(this, null);
        EMClient.getInstance().setDebugMode(true);
    }
}
