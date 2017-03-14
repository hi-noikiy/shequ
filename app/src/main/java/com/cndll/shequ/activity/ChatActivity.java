package com.cndll.shequ.activity;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;

import com.cndll.shequ.R;
import com.hyphenate.easeui.EaseConstant;
import com.hyphenate.easeui.ui.EaseChatFragment;

public class ChatActivity extends AppCompatActivity {
    EaseChatFragment fragment;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chat);
        fragment = new EaseChatFragment();
        fragment.setOnRightTitleBarClick(new EaseChatFragment.RightTitleBarClick() {
            @Override
            public void onclik(View v) {
                startActivity(new Intent(ChatActivity.this, GroupDetailsAcitivity.class).putExtra("GROUPID", getIntent().getStringExtra(EaseConstant.EXTRA_USER_ID)));
            }
        });

        Intent intent = getIntent();
        Bundle arg    = new Bundle();
        arg.putInt(EaseConstant.EXTRA_CHAT_TYPE, intent.getIntExtra(EaseConstant.EXTRA_CHAT_TYPE, 0));
        /*arg.putInt(EaseConstant.EXTRA_CHAT_TYPE, EaseConstant.CHATTYPE_SINGLE);*/
        arg.putString(EaseConstant.EXTRA_USER_ID, intent.getStringExtra(EaseConstant.EXTRA_USER_ID));
        fragment.setArguments(arg);
        getSupportFragmentManager().beginTransaction().add(R.id.frame, fragment).commit();
    }

}
