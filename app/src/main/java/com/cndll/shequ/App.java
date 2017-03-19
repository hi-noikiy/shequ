package com.cndll.shequ;

import android.support.multidex.MultiDex;

import com.facebook.drawee.backends.pipeline.Fresco;
import com.hyphenate.chat.EMClient;
import com.hyphenate.easeui.controller.EaseUI;
import com.tencent.bugly.crashreport.CrashReport;

import io.dcloud.application.DCloudApplication;

/**
 * Created by kongqing on 17-3-1.
 */

public class App extends DCloudApplication {
    @Override
    public void onCreate() {
        super.onCreate();
        MultiDex.install(this);
        Fresco.initialize(this);
        EaseUI.getInstance().init(this, null);
        EMClient.getInstance().setDebugMode(true);
        CrashReport.initCrashReport(getApplicationContext(), "23c6e1948f", false);
    }
}
