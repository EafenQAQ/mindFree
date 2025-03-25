import { defineStore } from "pinia";
import supabase from "../utils/supabase";
import { ref } from "vue";

export const useUserInfoStore = defineStore("userInfoStore", {
  state: () => ({
    isLoggedIn: false,
    username: "",
    email: "",
    email_verified: false,
    phone_verified: false,
    password: "",
    avatar: "",
  }),
  getters: {},
  actions: {
    //获取用户信息
    async loadUserInfo() {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.log(error);
      } else {
        console.log(data);

        this.setUserInfo(data.user.user_metadata);
      }
    },

    //将用户信息存储到Pinia
    setUserInfo(userInfo) {
      this.username = userInfo.username;
      this.email = userInfo.email;
      this.email_verified = userInfo.email_verified;
      this.phone_verified = userInfo.phone_verified;
      if (userInfo.username != "") {
        this.isLoggedIn = true;
      }
      // this.password = userInfo.password
      // this.avatar = userInfo.avatar
    },
    // 判断用户登录状态
    async getUserState(next) {
      const localUser = await supabase.auth.getSession();
      if (localUser.data.session == null) {
        next("/login");
      } else {
        console.log("next");

        next();
      }
    },
    //注销登录
    async logOut() {
      const { error } = await supabase.auth.signOut();
      this.username = "";
      this.email = "";
      this.email_verified = false;
      this.phone_verified = false;
      this.isLoggedIn = false;

      if (error) {
        console.log(error);
      }
    },
  },
});
