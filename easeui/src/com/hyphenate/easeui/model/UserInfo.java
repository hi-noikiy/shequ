package com.hyphenate.easeui.model;

import java.util.Map;

/**
 * Created by kongqing on 17-3-4.
 */

public class UserInfo {
    public Map<String, User> getInfo() {
        return info;
    }

    public void setInfo(Map<String, User> info) {
        this.info = info;
    }

    private Map<String, User> info;

    private UserInfo() {

    }

    public static UserInfo getInstance() {
        return INIT.userInfo;
    }

    private static class INIT {
        private static final UserInfo userInfo = new UserInfo();
    }

    public static class User {
        public String getNick() {
            return nick;
        }

        public void setNick(String nick) {
            this.nick = nick;
        }

        public String getIcon() {
            return icon;
        }

        public void setIcon(String icon) {
            this.icon = icon;
        }

        private String icon;
        private String nick;
    }
}
