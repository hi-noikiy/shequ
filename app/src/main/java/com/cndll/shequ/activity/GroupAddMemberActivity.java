package com.cndll.shequ.activity;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.TextView;

import com.cndll.shequ.R;
import com.cndll.shequ.bean.GroupMember;
import com.cndll.shequ.bean.SearchUser;
import com.cndll.shequ.bean.SearchUserResponse;
import com.cndll.shequ.net.ComUnityRequest;
import com.facebook.drawee.view.SimpleDraweeView;

import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;
import rx.Observer;
import rx.schedulers.Schedulers;

public class GroupAddMemberActivity extends AppCompatActivity {

    @BindView(R.id.back)
    ImageButton  back;
    @BindView(R.id.userlist)
    RecyclerView userlist;
    @BindView(R.id.search_user)
    EditText     searchUser;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_group);
        ButterKnife.bind(this);

    }

    private void init() {
        AdminActivity.RecyclerViewAdapter adapter = new AdminActivity.RecyclerViewAdapter();
        LinearLayoutManager               manager = new LinearLayoutManager(this);
        userlist.setLayoutManager(manager);
        userlist.setAdapter(adapter);
        searchUser.setOnEditorActionListener(new TextView.OnEditorActionListener() {
            @Override
            public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {

                return false;
            }
        });
    }

    private void searchUser(String user) {
        ComUnityRequest.getAPI().searchUser(new SearchUser().setContent(user)).observeOn(Schedulers.io()).subscribe(new Observer<SearchUserResponse>() {
            @Override
            public void onCompleted() {

            }

            @Override
            public void onError(Throwable e) {

            }

            @Override
            public void onNext(SearchUserResponse searchUserResponse) {
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {

                    }
                });
            }
        });
    }

    private void updateListView(SearchUserResponse r) {

    }

    public static class RecyclerViewAdapter extends RecyclerView.Adapter<RecyclerViewAdapter.Holer> {
        public interface GroupListener {
            void add();

            void delete();
        }

        public GroupListener getG() {
            return g;
        }

        public void setGroupListener(GroupListener g) {
            this.g = g;
        }

        private GroupListener g;

        public List<GroupMember.DataBean.ListBean> getGroupMemList() {
            return groupMemList;
        }

        public void setGroupMemList(List<GroupMember.DataBean.ListBean> groupMemList) {
            this.groupMemList = groupMemList;
        }

        List<GroupMember.DataBean.ListBean> groupMemList;

        @Override
        public Holer onCreateViewHolder(ViewGroup parent, int viewType) {
            View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.group_mub_item, null);
            return new Holer(view);
        }

        @Override
        public void onBindViewHolder(Holer holder, int position) {
            if (groupMemList == null) {
                switch (position) {
                    case 0:
                        holder.nick.setVisibility(View.GONE);
                        holder.avatar.setOnClickListener(new View.OnClickListener() {
                            @Override
                            public void onClick(View v) {
                                if (g != null) {
                                    g.add();
                                }
                            }
                        });
                        break;
                    case 1:
                        holder.nick.setVisibility(View.GONE);
                        holder.avatar.setOnClickListener(new View.OnClickListener() {
                            @Override
                            public void onClick(View v) {
                                if (g != null) {
                                    g.delete();
                                }
                            }
                        });
                        break;
                }
            } else {
                if (position == groupMemList.size()) {
                    holder.nick.setVisibility(View.GONE);
                    holder.avatar.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {
                            if (g != null) {
                                g.add();
                            }
                        }
                    });
                } else if (position == groupMemList.size() + 1) {
                    holder.nick.setVisibility(View.GONE);
                    holder.avatar.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {
                            if (g != null) {
                                g.delete();
                            }
                        }
                    });
                }
                if (position < groupMemList.size()) {
                    holder.nick.setText(groupMemList.get(position).getNick());
                    holder.avatar.setImageURI(groupMemList.get(position).getIcon());
                }
            }

        }

        private void doMember(SimpleDraweeView s, GroupDetailsAcitivity.RecyclerViewAdapter.GroupListener g, int type) {

        }

        @Override
        public int getItemCount() {
            if (groupMemList != null) {
                return groupMemList.size() + 2;
            }
            return 2;
        }

        public static class Holer extends RecyclerView.ViewHolder {
            SimpleDraweeView avatar;
            TextView         nick;

            public Holer(View itemView) {
                super(itemView);
                avatar = (SimpleDraweeView) itemView.findViewById(R.id.avatar);
                nick = (TextView) itemView.findViewById(R.id.nick);
            }
        }
    }
}

