import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useUserInfoStore = defineStore("userInfo", {
  state: () => ({
    userInfo: ref({}),
    isLogin: ref(false),
    isLoading: ref(false),
  }),
  getters: {},
  actions: {
    forTest() {
      console.log(localStorage.getItem("mindFreeChats"));
    },
  },
});
