import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useUserInfoStore = defineStore("userInfo", {
  state: () => ({
    userInfo: "",
    isLogin: false,
    isLoading: false,
  }),
  getters: {},
  actions: {
    forTest() {
      console.log(localStorage.getItem("mindFreeChats"));
    },
  },
});
