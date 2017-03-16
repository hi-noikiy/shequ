package com.cndll.shequ.util;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Environment;
import android.util.Log;

import com.cndll.shequ.bean.UpdateRequest;
import com.cndll.shequ.bean.UpdateResponse;
import com.cndll.shequ.net.ComUnityRequest;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import rx.Observer;
import rx.android.schedulers.AndroidSchedulers;
import rx.schedulers.Schedulers;

/**
 * Created by kongqing on 17-3-16.
 */

public class UpdateApp {
    public Context getContext() {
        return context;
    }

    public void setContext(Context context) {
        this.context = context;
    }

    private Context context;
    private String apkname = "QUMAIYI";

    private void update(String url) {
        try {
            URL               url1   = new URL(url);
            HttpURLConnection conn   = (HttpURLConnection) url1.openConnection();
            InputStream       in     = conn.getInputStream();
            File              file   = new File(Environment.getExternalStorageDirectory(), apkname);
            FileOutputStream  out    = new FileOutputStream(file);
            int               i;
            byte[]            buffer = new byte[1024];
            while ((i = in.read(buffer)) != -1) {
                out.write(buffer, 0, i);
                out.flush();
            }
            in.close();
            out.close();
            Intent intent = new Intent(Intent.ACTION_VIEW).setDataAndType(Uri.fromFile(new File(Environment.getExternalStorageDirectory(), apkname)), "application/vnd.android.package-archive");
            context.startActivity(intent);

        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void checkoutVertion() {
        String version;
        try {
            version = context.getPackageManager().getPackageInfo(context.getPackageName(), 0).versionName;
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
            version = "";
        }
        ComUnityRequest.getAPI().update(new UpdateRequest().setVersion(version)).subscribeOn(Schedulers.io()).observeOn(AndroidSchedulers.mainThread()).subscribe(new Observer<UpdateResponse>() {
            @Override
            public void onCompleted() {

            }

            @Override
            public void onError(Throwable e) {
                Log.d("E", e.getMessage());
            }

            @Override
            public void onNext(final UpdateResponse updateResponse) {
                if (updateResponse.getError() == 0) {
                    AlertDialog alertDialog = new AlertDialog.Builder(context).setTitle("版本更新").setPositiveButton("版本更新", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            new Thread() {
                                @Override
                                public void run() {
                                    super.run();
                                    update(updateResponse.getData().getApk_url());

                                }
                            }.start();
                        }
                    }).setNegativeButton("取消", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {

                        }
                    }).create();
                    alertDialog.show();
                }
            }
        });
    }
}
