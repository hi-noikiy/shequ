package com.hyphenate.easeui.model;

/**
 * Created by kongqing on 17-3-9.
 */

public class GroupsInfo {
    private static GroupImageBean groupImageBean;

    private GroupsInfo() {

    }

    public static GroupImageBean getGroupImageBean() {
        if (groupImageBean == null) {
            groupImageBean = INIT.GROUP_IMAGE_BEAN;
        }
        return groupImageBean;
    }

    private static class INIT {
        private static final GroupImageBean GROUP_IMAGE_BEAN = new GroupImageBean();
    }

}
