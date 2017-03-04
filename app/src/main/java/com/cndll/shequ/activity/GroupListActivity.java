package com.cndll.shequ.activity;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.BaseAdapter;
import android.widget.ListView;
import android.widget.TextView;

import com.cndll.shequ.R;
import com.hyphenate.chat.EMClient;
import com.hyphenate.chat.EMGroup;
import com.hyphenate.easeui.EaseConstant;

import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;
import de.hdodenhof.circleimageview.CircleImageView;

public class GroupListActivity extends AppCompatActivity {

    @BindView(R.id.group_list)
    ListView groupList;
    private GroupAdapter adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_group_list);
        ButterKnife.bind(this);
        adapter = new GroupAdapter();
        /*try {*/
        adapter.setGroups(EMClient.getInstance().groupManager().getAllGroups());
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

    public static class GroupAdapter extends BaseAdapter {
        public List<EMGroup> getGroups() {
            return groups;
        }

        public void setGroups(List<EMGroup> groups) {
            this.groups = groups;
        }

        List<EMGroup> groups;

        @Override
        public int getCount() {
            if (groups == null) {
                return 0;
            } else
                return groups.size();
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
            return view;
        }


        static class ViewHolder {
            @BindView(R.id.avatar)
            CircleImageView avatar;
            @BindView(R.id.group_name)
            TextView        groupName;

            ViewHolder(View view) {
                ButterKnife.bind(this, view);
            }
        }
    }
}
