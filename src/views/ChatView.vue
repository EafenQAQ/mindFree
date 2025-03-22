<template>
  <div
    class="backdrop bg-gradient-to-t from-blue-900/50 to-blue-100/50 h-screen -z-10 p-5 -mt-32"
  >
    <div
      class="chat-container flex items-center justify-center h-screen gap-4 mt-10"
    >
      <!-- 侧边栏 -->
      <aside
        class="hidden chat-sidebar max-w-[250px] sm:block w-1/4 h-4/5 bg-white/50 rounded-lg shadow-xl"
      >
        <!-- 添加新会话 -->
        <div class="flex justify-start m-5">
          <button class="btn btn-primary rounded-full text-4xl">
            + <span class="text-xl">添加新会话</span>
          </button>
        </div>
        <!-- 会话窗口 -->
        <div class="chat-cards flex flex-col gap-1 overflow-y-auto">
          <div
            class="chat-card flex justify-between flex-1 items-center p-4 bg-gray-800 rounded-2xl text-white hover:cursor-pointer hover:bg-gray-700 duration-150"
          >
            <h3>新的聊天</h3>
            <div class="hamburger">
              <button
                class="btn rounded-full btn-ghost btn-square size-8"
                popovertarget="popover-1"
                style="anchor-name: --anchor-1"
              >
                <svg
                  class="swap-off fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"
                  />
                </svg>
              </button>
              <ul
                class="dropdown menu w-18 rounded-box shadow-sm dropdown-right bg-white/80"
                popover
                id="popover-1"
                style="position-anchor: --anchor-1"
              >
                <li class="text-black"><a>置顶</a></li>
                <li class="text-black"><a>编辑</a></li>
                <li class="text-red-500"><a>删除</a></li>
              </ul>
            </div>
          </div>
          <div
            class="chat-card flex flex-col flex-1 justify-center p-4 bg-gray-800 rounded-2xl text-white hover:cursor-pointer hover:bg-gray-700 duration-150"
          >
            <h3>新的聊天</h3>
            <div class="flex gap-4 text-sm text-gray-400"></div>
          </div>
        </div>
      </aside>
      <!-- 主体聊天框 -->
      <main
        class="flex flex-col items-center p-5 justify-between chat-main w-3/4 h-4/5 bg-white/50 rounded-lg shadow-xl"
      >
        <!-- 消息框 -->
        <div
          class="chat-box w-full flex-1 flex flex-col overflow-y-auto my-2 p-4"
        >
          <div
            v-if="currentChat && currentChat.messages.length === 0"
            class="flex flex-col items-center justify-center h-full text-gray-500"
          >
            <p class="text-xl mb-2">欢迎来到 MindFree</p>
            <p>你可以向我倾诉任何烦恼，我会尽力帮助你</p>
          </div>
          <template v-else>
            <div
              v-for="(message, msgIndex) in currentChat?.messages"
              :key="msgIndex"
              :hidden="message.role === 'system'"
              :class="[
                'mb-4 p-4 max-w-[80%] rounded-lg h-fit',
                message.role === 'user'
                  ? 'ml-auto bg-blue-300 text-white'
                  : 'mr-auto bg-purple-800 text-white',
              ]"
            >
              <p>{{ message.content }}</p>
            </div>
          </template>
          <div v-if="isLoding" class="mr-auto bg-white p-4 rounded-lg h-fit">
            <p>thinking...</p>
          </div>
        </div>
        <!-- 输入框 -->
        <div class="chat-input-container w-full">
          <form class="flex gap-2" @submit.prevent="sendMessage">
            <input
              v-model="userInput"
              type="text"
              placeholder="Type here"
              class="input input-ghost shadow-lg bg-white/60 rounded-2xl w-full"
            />
            <button
              class="bg-white/50 hover:bg-gray-200 text-white font-bold py-2 px-4 rounded-2xl shadow-2xl cursor-pointer"
            >
              <svg
                t="1742632205333"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="9539"
                width="25"
                height="25"
              >
                <path
                  d="M1007.70112 6.295573a35.726096 35.726096 0 0 1 15.355056 36.545032L877.08078 920.27967a35.982014 35.982014 0 0 1-18.272516 25.694126 35.009527 35.009527 0 0 1-31.426681 1.74024l-258.47677-105.693966-138.144318 168.496144A33.576388 33.576388 0 0 1 402.814294 1023.670378a30.812478 30.812478 0 0 1-12.539962-2.303258 35.828463 35.828463 0 0 1-17.402397-13.410082 35.674913 35.674913 0 0 1-6.602674-20.831692V787.714356L859.371282 182.725162 249.212554 711.194995 23.902703 618.655193c-14.126651-5.323086-21.701812-15.815707-22.827849-31.426681-0.767753-15.201505 5.323086-26.461879 18.221333-33.678755L968.904013 5.118352c5.681371-3.429296 11.772209-5.118352 18.221333-5.118352 7.677528 0 14.484936 2.047341 20.575774 6.295573z"
                  fill="#7263BC"
                  p-id="9540"
                ></path>
              </svg>
            </button>
          </form>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import callARK from "../utils/axios";
import { modelID } from "../api/ARK_API";

// 状态管理
const userInput = ref("");
const isLoding = ref(false);
const chatHistory = ref([]);
const currentChatIndex = ref(0);
const currentChat = ref({
  module: `${modelID}`,
  messages: [],
});

// 计算当前聊天
// const currentChat = computed(() => {
//   if (chatHistory.value.length === 0) return null;
//   return chatHistory.value[currentChatIndex.value];
// });

// 发送消息
const sendMessage = async () => {
  if (!userInput.value.trim() || isLoding.value) return; // 如果没有输入或者正在加载，则不发送消息

  // 添加用户消息
  const userMessage = {
    role: "user",
    content: userInput.value,
  };

  currentChat.value.messages.push(userMessage);
  console.log(currentChat.value);
  userInput.value = "";

  try {
    // 添加系统消息设置AI角色
    currentChat.value.messages.unshift({
      role: "system",
      content:
        "你是MindFree，一个专业、富有同情心的心理咨询师。你具有人本主义的理念，擅长运用真诚、温暖、无条件积极关注等技术和来访者建立链接。你的回答应该像一个人类，而不是AI，你的目标是倾听用户的问题，提供情感支持，请用温暖、理解的语气回应，避免给出医疗诊断或替代专业心理健康咨询。对于严重的心理健康问题，建议用户寻求专业帮助。",
    });

    // 发送请求到llm
    const res = await callARK.post("/", {
      model: modelID,
      messages: currentChat.value.messages,
    });
    console.log(res.data);
    // 添加AI回复
    currentChat.value.messages.push({
      role: "assistant",
      content: res.data.choices[0].message.content,
    });
  } catch (err) {
    console.log(err);
    // 添加错误消息
    currentChat.value.messages.push({
      role: "assistant",
      content: "抱歉，我暂时无法回应。请稍后再试。",
    });
  }
};
</script>

<style lang="scss" scoped></style>
