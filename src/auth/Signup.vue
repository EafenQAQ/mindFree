<template>
  <div id="signup" class="flex justify-center items-center h-[80vh]">
    <form
      class="w-1/2 max-w-md min-w-[350px] shadow-2xl flex flex-col justify-center items-center p-4 gap-2 shadow-bottom rounded-md"
      action="#"
      @submit.prevent="handleSubmit"
    >
      <div class="my-2 text-3xl font-semibold">
        <h1>注册</h1>
      </div>

      <!-- 用户名 -->
      <input
        type="text"
        required
        placeholder="用户名"
        class="input"
        v-model="user"
      />
      <!-- 邮箱 -->
      <label class="input validator">
        <svg
          class="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2.5"
            fill="none"
            stroke="currentColor"
          >
            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
          </g>
        </svg>
        <input
          type="email"
          placeholder="mail@site.com"
          required
          v-model="email"
        />
      </label>
      <div class="validator-hint hidden">请输入邮箱</div>
      <!-- 密码 -->
      <label class="input validator">
        <svg
          class="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2.5"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
            ></path>
            <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
          </g>
        </svg>
        <input
          v-model="passwd"
          type="password"
          required
          placeholder="密码"
          minlength="8"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
        />
      </label>
      <p class="validator-hint hidden">
        Must be more than 8 characters, including
        <br />At least one number <br />At least one lowercase letter <br />At
        least one uppercase letter
      </p>
      <!-- 确认密码 -->
      <label class="input validator">
        <svg
          class="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2.5"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
            ></path>
            <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
          </g>
        </svg>
        <input
          @input="confirmPassword"
          v-model="confirm"
          type="password"
          required
          placeholder="确认密码"
          minlength="8"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          ref="confirmInput"
          title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
        />
      </label>
      <p v-if="showConfirm" class="text-red-500 text-sm">
        您两次输入的密码不一致
      </p>
      <!-- 验证码 -->
      <div :hidden="true" class="flex gap-1">
        <input
          v-model="varifycode"
          type="text"
          placeholder="请输入验证码"
          class="input"
        />
        <button
          type="button"
          @click="handleVerifyEmail"
          class="btn btn-outline btn-primary"
        >
          发送
        </button>
      </div>

      <!-- 按钮 -->
      <div class="flex gap-2 w-full justify-center mt-4">
        <button class="btn btn-outline btn-secondary w-full max-w-[310px]">
          注册
        </button>
      </div>
      <!-- 跳转到登录 -->
      <div class="flex items-center justify-center gap-1">
        <span>已经有账号？请</span>
        <RouterLink :to="{ name: 'login' }">
          <span class="text-[#de2a8a] hover:text-[#f673b9]">登录</span>
        </RouterLink>
      </div>
      <!-- 注册成功提示 -->
      <div v-show="showSuccess" class="flex justify-center items-center">
        <div id="attention">
          <svg
            t="1743053307921"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4242"
            width="20"
            height="20"
          >
            <path
              d="M512 147.2C310.528 147.2 147.2 310.528 147.2 512S310.528 876.8 512 876.8 876.8 713.472 876.8 512 713.472 147.2 512 147.2z m0 64c166.144 0 300.8 134.656 300.8 300.8S678.144 812.8 512 812.8 211.2 678.144 211.2 512 345.856 211.2 512 211.2z"
              fill="#d4237a"
              p-id="4243"
            ></path>
            <path
              d="M478.72 462.3104m33.28 0l0 0q33.28 0 33.28 33.28l0 173.056q0 33.28-33.28 33.28l0 0q-33.28 0-33.28-33.28l0-173.056q0-33.28 33.28-33.28Z"
              fill="#d4237a"
              p-id="4244"
            ></path>
            <path
              d="M512 370.7136m-48.64 0a48.64 48.64 0 1 0 97.28 0 48.64 48.64 0 1 0-97.28 0Z"
              fill="#d4237a"
              p-id="4245"
            ></path>
          </svg>
        </div>
        <p class="text-amber-500 text-center">
          已发送验证信息，请去邮箱验证后登录
        </p>
      </div>
    </form>
    <button
      :hidden="true"
      @click="forTest"
      class="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
    >
      test
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { uid } from "uid";
import http from "../utils/axios";
import supabase from "../utils/supabase";

const router = useRouter();

const user = ref("");
const email = ref("");
const passwd = ref("");
const confirm = ref("");
const varifycode = ref("");
const showSuccess = ref(false);
const showConfirm = ref(null);
const inputTimer = ref(null);
const confirmInput = ref(null);

// 确认密码一致
const confirmPassword = () => {
  // 清除定时器
  clearTimeout(inputTimer.value);
  inputTimer.value = setTimeout(() => {
    if (passwd.value == confirm.value) {
      showConfirm.value = false;
    } else {
      showConfirm.value = true;
    }
  }, 200);
};

// 发送验证码
const handleVerifyEmail = async () => {
  try {
    const response = await http.post("/get_code", {
      email: email.value,
    });
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

// 发送新用户信息到服务器
const handleSubmit = async () => {
  try {
    // 向后端服务器发送请求

    // const response = await http.post('/ug', {
    //   user: user.value,
    //   email: email.value,
    //   passwd: passwd.value,
    //   confirm: confirm.value,
    //   varifycode: varifycode.value,
    // })
    // console.log(response)

    // 向supabase发送请求

    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: passwd.value,
      options: {
        data: {
          username: user.value,
        },
      },
    });
    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
  } catch (err) {
    console.log(err);
  }
  // 确认密码一致
  if (passwd.value == confirm.value) {
    showSuccess.value = true;
    // setTimeout(() => {
    //   router.push('/login')
    // }, 2000)
  } else {
    confirmInput.value.focus();
  }
};

// 将用户数据发送到supabase数据库
const forTest = async () => {};

// 测试用
// const forTest = () => {}
</script>

<style lang="scss" scoped></style>
