<template>
  <div id="signup" class="flex flex-col justify-center items-center h-[80vh] relative">
    <!-- alert窗口 -->
    <div id="loginAlert" class="absolute top-0">
      <!-- 登录成功提示 -->
      <Transition name="loginAlert">
        <div v-if="loginSuccess" class="alert-container flex w-full h-[4rem]">
          <div role="alert" class="alert alert-success mb-4 ease-in duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>登录成功！</span>
          </div>
        </div>
      </Transition>
      <!-- 登录失败提示 -->
      <Transition name="loginAlert">
        <div v-show="loginFail" role="alert" class="alert alert-error mb-4 ease-in duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none"
            viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span v-if="failedMes">{{ failedMes }}</span>
        </div>
      </Transition>
    </div>

    <form
      class="w-1/2 max-w-md min-w-[350px] flex flex-col justify-center items-center p-4 gap-2 shadow-bottom shadow-xl rounded-md bg-white/50 backdrop-blur-lg"
      action="#" @submit.prevent="handleSubmit">
      <div class="my-2 text-3xl font-semibold">
        <h1>登录</h1>
      </div>
      <!-- 邮箱 -->
      <label class="input validator">
        <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
          </g>
        </svg>
        <input v-model="email" type="email" placeholder="mail@site.com" required />
      </label>
      <div class="validator-hint hidden">请输入邮箱</div>
      <!-- 密码 -->
      <label class="input validator">
        <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
            <path
              d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z">
            </path>
            <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
          </g>
        </svg>
        <input v-model="passwd" type="password" required placeholder="密码" minlength="8"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />
      </label>
      <p class="validator-hint hidden">
        密码必须超过8个字符，包括:
        <br />至少一个数字 <br />至少一个小写字母 <br />至少一个大写字母
      </p>
      <!-- 验证码 -->
      <!-- <input type="text" required placeholder="请输入验证码" class="input" /> -->

      <!-- 记住密码 -->
      <fieldset class="fieldset p-4 bg-base-100 border border-base-300 rounded-box w-64">
        <legend class="fieldset-legend">Login options</legend>
        <label class="fieldset-label">
          <input v-model="ifRememberMe" type="checkbox" class="checkbox checkbox-accent" />
          <div class="flex items-center w-full justify-between">
            <label for="rememberPw" class="text-black text-sm">记住我</label>
            <button class="btn btn-link">忘记密码？</button>
          </div>
        </label>
      </fieldset>

      <!-- 按钮 -->
      <button :disabled="isLoading" class="btn btn-outline btn-accent w-full max-w-[310px] relative">
        <span>登录</span>
        <span v-if="isLoading" class="absolute right-4 w-4 h-4">
          <Spinner />
        </span>

      </button>
      <!-- 跳转到注册 -->
      <div class="flex items-center justify-center gap-1">
        <span>还没有账号？请</span>
        <RouterLink :to="{ name: 'signup' }">
          <span class="text-accent hover:text-green-500">注册</span>
        </RouterLink>

      </div>
    </form>
  </div>
</template>

<script setup>
import supabase from "../utils/supabase";
import axios from "axios";
import { uid } from "uid";
import { ref, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { errorMessages } from "vue/compiler-sfc";
import { useUserInfoStore } from "../Stores/UserInfo";
import Spinner from "../components/Spinner.vue";

const router = useRouter();
const userStore = useUserInfoStore();

// 表单数据
const email = ref("");
const passwd = ref("");
const ifRememberMe = ref(false);

// 登录状态
const loginSuccess = ref(false);
const loginFail = ref(false);

// 失败信息
const failedMes = ref(null)
// 加载状态
const isLoading = ref(false)

let timer = null;

const handleSubmit = async () => {
  isLoading.value = true

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: passwd.value,
  });


  if (error) {
    loginFail.value = true;

    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      loginFail.value = false;
    }, 3000);

    if (error.message === "Invalid login credentials") {
      failedMes.value = "邮箱或密码错误"
    } else if (error.message === "Email not confirmed") {
      failedMes.value = "邮箱未验证：请去邮箱检查邮件"

    }
    else {
      failedMes.value = "登录失败"
    }
  } else {
    loginSuccess.value = !loginSuccess.value;
    userStore.isLoggedIn = true;
    timer = setTimeout(() => {
      router.push({ name: "chatView" });
    }, 2000);

    // 把密码存到localStorage
    if (ifRememberMe.value) {
      localStorage.setItem("email", email.value);
      localStorage.setItem("passwd", passwd.value);
    }

  }

  isLoading.value = false
};

// 清除定时器
onUnmounted(() => {
  clearTimeout(timer);
});

</script>
<style scoped>
.loginAlert-enter-active,
.loginAlert-leave-active {
  transition: all 0.5s ease;
}

.loginAlert-enter-from,
.loginAlert-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
