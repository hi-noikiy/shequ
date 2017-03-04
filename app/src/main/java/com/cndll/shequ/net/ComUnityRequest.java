package com.cndll.shequ.net;

import retrofit2.Retrofit;
import retrofit2.adapter.rxjava.RxJavaCallAdapterFactory;
import retrofit2.converter.gson.GsonConverterFactory;

/**
 * Created by jiang_ruicheng on 16/10/29.
 */
public class ComUnityRequest {
    private ComUnityRequest() {
    }

    private static String ACCOUNTURL = "http://192.168.0.19/";

    /*private static ComUnityRequest zkTecoRequest;

    public static ComUnityRequest getInstance() {
        if (zkTecoRequest == null) {
            zkTecoRequest = new ComUnityRequest();
        }
        return zkTecoRequest;
    }*/
    public static SheQuApi getAPI() {
        return new Retrofit.Builder().
                baseUrl(ACCOUNTURL).
                addCallAdapterFactory(RxJavaCallAdapterFactory.create()).
                addConverterFactory(GsonConverterFactory.create()).
                build().
                create(SheQuApi.class);
    }
}
