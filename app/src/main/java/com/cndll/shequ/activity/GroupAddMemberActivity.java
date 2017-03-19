package com.cndll.shequ.activity;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;

import com.cndll.shequ.R;
import com.cndll.shequ.bean.SearchUser;
import com.cndll.shequ.bean.SearchUserResponse;
import com.cndll.shequ.net.ComUnityRequest;
import com.facebook.drawee.view.SimpleDraweeView;
import com.hyphenate.chat.EMClient;
import com.hyphenate.exceptions.HyphenateException;

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
    @BindView(R.id.query)
    EditText     query;
    @BindView(R.id.search_clear)
    ImageButton  searchClear;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_group);
        ButterKnife.bind(this);
        init();
    }

    private RecyclerViewAdapter adapter;
    private String              groupid;

    private void init() {
        back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
        groupid = getIntent().getStringExtra("GROUPID");
        adapter = new RecyclerViewAdapter();
        LinearLayoutManager manager = new LinearLayoutManager(this);
        userlist.setLayoutManager(manager);
        userlist.setAdapter(adapter);
        adapter.addMemberListener(new RecyclerViewAdapter.GroupListener() {
            @Override
            public void addMember(String id) {
                try {
                    EMClient.getInstance().groupManager().addUsersToGroup(groupid, new String[]{id});
                } catch (HyphenateException e) {
                    e.printStackTrace();
                    e.getMessage();
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            Toast.makeText(GroupAddMemberActivity.this, "添加失败", Toast.LENGTH_SHORT).show();
                        }
                    });
                }
            }
        });
        query.setOnEditorActionListener(new TextView.OnEditorActionListener() {
            @Override
            public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
                searchUser(query.getText().toString());
                return false;
            }
        });
    }

    private void searchUser(String user) {
        ComUnityRequest.getAPI().searchUser(new SearchUser().setContent(user)).subscribeOn(Schedulers.io()).subscribe(new Observer<SearchUserResponse>() {
            @Override
            public void onCompleted() {

            }

            @Override
            public void onError(final Throwable e) {
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        Toast.makeText(GroupAddMemberActivity.this, "" + e.getMessage(), Toast.LENGTH_SHORT).show();
                    }
                });
            }

            @Override
            public void onNext(final SearchUserResponse searchUserResponse) {
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        updateListView(searchUserResponse);
                    }
                });
            }
        });
    }

    private void updateListView(SearchUserResponse r) {
        adapter.addMember(r.getData());
    }

    public static class RecyclerViewAdapter extends RecyclerView.Adapter<RecyclerViewAdapter.Holer> {
        public interface GroupListener {
            void addMember(String id);
        }

        public GroupListener getG() {
            return g;
        }

        public void addMemberListener(GroupListener g) {
            this.g = g;
        }

        private GroupListener g;

        public List<SearchUserResponse.DataBean> getMember() {
            return member;
        }

        public void addMember(List<SearchUserResponse.DataBean> member) {

            this.member = member;
            notifyDataSetChanged();
        }

        List<SearchUserResponse.DataBean> member;

        @Override
        public Holer onCreateViewHolder(ViewGroup parent, int viewType) {
            View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.search_user_iteam, parent, false);
            return new Holer(view);
        }

        @Override
        public void onBindViewHolder(Holer holder, final int position) {
            holder.avatar.setImageURI(member.get(position).getIcon());
            holder.nick.setText(member.get(position).getNick());
            holder.addMember.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    if (g != null) {
                        g.addMember(member.get(position).getMobile());
                    }
                }
            });
        }

        private void doMember(SimpleDraweeView s, GroupListener g) {

        }

        @Override
        public int getItemCount() {
            if (member != null) {
                return member.size();
            }
            return 0;
        }

        public static class Holer extends RecyclerView.ViewHolder {
            SimpleDraweeView avatar;
            TextView         nick;
            Button           addMember;

            public Holer(View itemView) {
                super(itemView);
                avatar = (SimpleDraweeView) itemView.findViewById(R.id.avatar);
                nick = (TextView) itemView.findViewById(R.id.nick);
                addMember = (Button) itemView.findViewById(R.id.add_member);
            }
        }
    }
}

