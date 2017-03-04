package com.cndll.shequ.activity;

import android.content.Intent;
import android.os.Bundle;
import android.os.Parcelable;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.Toast;

import com.cndll.shequ.R;
import com.hyphenate.EMCallBack;
import com.hyphenate.EMConversationListener;
import com.hyphenate.EMGroupChangeListener;
import com.hyphenate.EMMessageListener;
import com.hyphenate.chat.EMClient;
import com.hyphenate.chat.EMConversation;
import com.hyphenate.chat.EMMessage;
import com.hyphenate.easeui.EaseConstant;
import com.hyphenate.easeui.ui.EaseConversationListFragment;

import java.util.ArrayList;
import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;

public class MainActivity extends AppCompatActivity {
    @BindView(R.id.frame)
    FrameLayout frame;
    @BindView(R.id.activity_main)
    FrameLayout activityMain;
    @BindView(R.id.button)
    Button      button;
    EaseConversationListFragment fragment;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        ButterKnife.bind(this);
        init();
    }

    private void init() {
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
                                    //EMConversation conversation = EMClient.getInstance().chatManager().getConversation(e.getUserName());
                                    //conversation.appendMessage(e);
                                    fragment.refresh();
                                }
                                //  toast(s.toString());
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
        EMClient.getInstance().chatManager().addConversationListener(new EMConversationListener() {
            @Override
            public void onCoversationUpdate() {
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
/*
                        fragment.();
*/
                       // toast("conversation");
                    }
                });

            }
        });
        if (EMClient.getInstance().isLoggedInBefore())
            EMClient.getInstance().logout(true, new EMCallBack() {
                @Override
                public void onSuccess() {
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            login();
                        }
                    });
                }

                @Override
                public void onError(int i, String s) {

                }

                @Override
                public void onProgress(int i, String s) {

                }
            });
        else
            login();

        button.setVisibility(View.GONE);
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

    private void login() {
        EMClient.getInstance().login("jiangruicheng", "123456", new EMCallBack() {
            @Override
            public void onSuccess() {
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {

                        /*EMClient.getInstance().groupManager().asyncApplyJoinToGroup("1488542914446", "wo yao 12333", new EMCallBack() {
                            @Override
                            public void onSuccess() {
                                toast("join");
                            }

                            @Override
                            public void onError(int i, String s) {
                                toast(s + "error");
                            }

                            @Override
                            public void onProgress(int i, String s) {

                            }
                        });*/

                        EMClient.getInstance().groupManager().addGroupChangeListener(new EMGroupChangeListener() {

                            @Override
                            public void onInvitationReceived(String s, String s1, String s2, String s3) {
                                toast(s3);
                            }

                            @Override
                            public void onRequestToJoinReceived(String s, String s1, String s2, String s3) {
                                toast(s3);
                            }

                            @Override
                            public void onRequestToJoinAccepted(String s, String s1, String s2) {
                                toast(s2);
                            }

                            @Override
                            public void onRequestToJoinDeclined(String s, String s1, String s2, String s3) {
                                toast(s3);
                            }

                            @Override
                            public void onInvitationAccepted(String s, String s1, String s2) {
                                toast(s2);
                            }

                            @Override
                            public void onInvitationDeclined(String s, String s1, String s2) {
                                toast(s2);
                            }

                            @Override
                            public void onUserRemoved(String s, String s1) {
                                toast(s1);
                            }

                            @Override
                            public void onGroupDestroyed(String s, String s1) {
                                toast(s1);
                            }

                            @Override
                            public void onAutoAcceptInvitationFromGroup(String s, String s1, String s2) {
                                toast(s2);
                            }
                        });
                        EMClient.getInstance().chatManager().loadAllConversations();
                        EMClient.getInstance().groupManager().loadAllGroups();
                        fragment.refresh();
                       // toast("success" + EMClient.getInstance().getCurrentUser());
                       // toast(EMClient.getInstance().chatManager().getAllConversations().size() + "");
                        // EMConversation conversation = EMClient.getInstance().chatManager().getConversation("zangziye");
                    }
                });
            }

            @Override
            public void onError(int i, final String s) {
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                      //  toast(s);
                    }
                });
            }

            @Override
            public void onProgress(int i, String s) {

            }
        });
    }

    @Override
    protected void onResume() {
        super.onResume();
        EMClient.getInstance().chatManager().loadAllConversations();
        EMClient.getInstance().groupManager().loadAllGroups();
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
