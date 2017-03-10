package com.cndll.shequ.activity;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.support.v7.app.AppCompatActivity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.BaseAdapter;
import android.widget.ListView;
import android.widget.TextView;

import com.cndll.shequ.R;
import com.cndll.shequ.RXbus.RxBus;
import com.cndll.shequ.util.UpdataGroupsInfo;
import com.facebook.drawee.view.SimpleDraweeView;
import com.hyphenate.chat.EMClient;
import com.hyphenate.chat.EMGroup;
import com.hyphenate.easeui.EaseConstant;
import com.hyphenate.easeui.model.GroupImageBean;
import com.hyphenate.easeui.widget.EaseTitleBar;
import com.hyphenate.exceptions.HyphenateException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import butterknife.BindView;
import butterknife.ButterKnife;
import rx.Observer;
import rx.Subscription;

public class GroupListActivity extends AppCompatActivity {

    @BindView(R.id.group_list)
    ListView     groupList;
    @BindView(R.id.title_bar)
    EaseTitleBar titleBar;
    private GroupAdapter adapter;

    private Handler handler = new Handler();
    private List<EMGroup> emGroupList;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_group_list);
        ButterKnife.bind(this);
        init();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        updataimage.unsubscribe();
    }

    private Subscription updataimage;

    private void init() {
        titleBar.setTitle("我的群聊");
        titleBar.setLeftImageResource(R.drawable.ease_mm_title_back);
        titleBar.setLeftLayoutClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
        adapter = new GroupAdapter();
        /*try {*/
        if (updataimage == null)
            updataimage = RxBus.getDefault().toObservable(GroupImageBean.class).subscribe(new Observer<GroupImageBean>() {
                @Override
                public void onCompleted() {

                }

                @Override
                public void onError(Throwable e) {

                }

                @Override
                public void onNext(final GroupImageBean dataBean) {
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            adapter.setImagedata(dataBean.getData());
                        }
                    });
                }
            });
        new Thread() {
            @Override
            public void run() {
                super.run();
                try {
                    emGroupList = EMClient.getInstance().groupManager().getJoinedGroupsFromServer();
                    handler.post(new Runnable() {
                        @Override
                        public void run() {
                            adapter.setGroups(emGroupList);
                            //getImage();
                            UpdataGroupsInfo.getGroupInfo();
                        }
                    });
                } catch (HyphenateException e) {
                    e.printStackTrace();
                }
            }
        }.start();

        groupList.setAdapter(adapter);
        //Toast.makeText(this, "" + adapter.getGroups(), Toast.LENGTH_SHORT).show();
        /*} catch (HyphenateException e) {
            e.printStackTrace();
            Toast.makeText(this, "" + e.getMessage(), Toast.LENGTH_SHORT).show();
        }*/
        groupList.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                //  Toast.makeText(GroupListActivity.this, "" + adapter.getGroups().get(position).getGroupId(), Toast.LENGTH_LONG).show();
                startActivity(new Intent(GroupListActivity.this, ChatActivity.class).putExtra(EaseConstant.EXTRA_CHAT_TYPE, EaseConstant.CHATTYPE_GROUP).putExtra(EaseConstant.EXTRA_USER_ID, adapter.getGroups().get(position).getGroupId()));
            }
        });
    }

    /*private void getImage() {
        RequestGroupImage requestGroupImage = new RequestGroupImage();
        requestGroupImage.setUid(UserLodingInFo.getInstance().getId());
        ComUnityRequest.getAPI().downloadImage(requestGroupImage).subscribeOn(Schedulers.io()).subscribe(new Observer<GroupImageBean>() {
            @Override
            public void onCompleted() {

            }

            @Override
            public void onError(final Throwable e) {
                e.printStackTrace();
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        Toast.makeText(GroupListActivity.this, "error" + e.toString(), Toast.LENGTH_SHORT).show();
                    }
                });
            }

            @Override
            public void onNext(final GroupImageBean groupImageBean) {
                if (groupImageBean.getData() == null) {
                    return;
                }
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        adapter.setImagedata(groupImageBean.getData());
                        // Toast.makeText(GroupListActivity.this, groupImageBean.getError() + "" + groupImageBean.getData().get(0).getIcon(), Toast.LENGTH_SHORT).show();
                    }
                });
            }
        });
    }*/

    public static class GroupAdapter extends BaseAdapter {
        public List<EMGroup> getGroups() {
            return groups;
        }

        public List<GroupImageBean.DataBean> getImagedata() {
            return imagedata;
        }

        public void setImagedata(List<GroupImageBean.DataBean> imagedata) {
            this.imagedata = imagedata;
            setImageBean();
            notifyDataSetChanged();
        }

        private List<GroupImageBean.DataBean> imagedata;

        public void setGroups(List<EMGroup> groups) {
            this.groups = groups;
            notifyDataSetChanged();
        }

        List<EMGroup> groups;

        @Override
        public int getCount() {
            if (groups == null) {
                return 0;
            } else
                return groups.size();
        }

        private Map<String, GroupImageBean.DataBean> imagebean;

        private Uri getImageUri(String ID) {
            if (imagebean == null || imagebean.get(ID) == null || imagebean.get(ID).getIcon() == null) {
                return null;
            }
            Uri u = Uri.parse(imagebean.get(ID).getIcon());
            return u;
        }

        private void setImageBean() {
            if (imagedata != null) {
                imagebean = new HashMap<>();
                for (GroupImageBean.DataBean bean : imagedata) {
                    imagebean.put(String.valueOf(bean.getGroup_id()), bean);
                }
            }
        }

        @Override

        public Object getItem(int position) {
            if (groups == null) {
                return null;
            } else
                return groups.get(position);
        }

        @Override
        public long getItemId(int position) {
            return position;
        }

        @Override
        public View getView(int position, View convertView, ViewGroup parent) {
            View       view       = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_group_list, null);
            ViewHolder viewHolder = new ViewHolder(view);
            viewHolder.groupName.setText(groups.get(position).getGroupName());
            if (imagedata != null && getImageUri(groups.get(position).getGroupId()) != null) {
                viewHolder.avatar.setImageURI(getImageUri(groups.get(position).getGroupId()));
            }
            return view;
        }


        static class ViewHolder {
            @BindView(R.id.avatar)
            SimpleDraweeView avatar;
            @BindView(R.id.group_name)
            TextView         groupName;

            ViewHolder(View view) {
                ButterKnife.bind(this, view);
            }
        }
    }
}
