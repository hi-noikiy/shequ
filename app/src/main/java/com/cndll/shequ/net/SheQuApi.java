package com.cndll.shequ.net;


import com.cndll.shequ.bean.GroupMember;
import com.cndll.shequ.bean.GroupMemberRequest;
import com.cndll.shequ.bean.LoadUpResponse;
import com.cndll.shequ.bean.RequestGroupImage;
import com.cndll.shequ.bean.SearchUser;
import com.cndll.shequ.bean.SearchUserResponse;
import com.hyphenate.easeui.model.GroupImageBean;

import java.util.Map;

import okhttp3.RequestBody;
import retrofit2.http.Body;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.PartMap;
import rx.Observable;

/**
 * Created by jiang_ruicheng on 16/10/27.
 */
public interface SheQuApi {
    @POST("index.php/app/")
    Observable<GroupImageBean> downloadImage(@Body RequestGroupImage image);

    @POST("index.php/app/")
    Observable<SearchUserResponse> searchUser(@Body SearchUser user);

    @POST("index.php/app/")
    Observable<GroupMember> getGroupMember(@Body GroupMemberRequest request);

    @Multipart
    @POST("index.php/app/")
    Observable<LoadUpResponse> uploadImage(@PartMap Map<String, RequestBody> pa);
}
