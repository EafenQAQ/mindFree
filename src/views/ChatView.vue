<template>
  <div
    id="chatView"
    class="backdrop overflow-y-clip bg-gradient-to-t from-blue-900/50 to-blue-100/50 h-screen -z-10 p-5 -mt-32"
  >
    <div
      class="chat-container flex items-center justify-center h-screen gap-4 mt-10"
    >
      <!-- 侧边栏 -->
      <aside
        :class="[
          'chat-sidebar',
          !isSidebarOpen ? 'sideBar-hidden' : 'overflow-y-auto',
        ]"
        class="hidden lg:block max-w-[300px] w-1/4 h-4/5 bg-white/50 rounded-lg shadow-xl transition-transform duration-300 ease-in-out"
      >
        <!-- 添加新会话 -->
        <div
          class="flex justify-between m-5"
          :class="{ plusBtn: !isSidebarOpen }"
        >
          <button
            @click="startNewChat"
            class="btn btn-ghost hover:bg-white/30 rounded-full text-4xl"
          >
            + <span ref="newChatBtnString" class="text-xl">添加新会话</span>
          </button>
          <button
            @click="toggleSidebar"
            class="btn btn-ghost hover:bg-white/30 rounded-full text-xl"
          >
            ...
          </button>
        </div>

        <!-- 会话窗口 -->
        <div
          ref="chatCards"
          class="chat-cards flex flex-col gap-1 max-h-[700px] p-4"
        >
          <div
            v-for="chat in chatHistory"
            :key="chat.id"
            @click="switchChat(chat.id)"
            class="chat-card flex justify-between flex-1 items-center p-4 bg-black rounded-2xl text-white hover:cursor-pointer hover:bg-gray-700 ease-in-out duration-150"
            :class="[
              currentChatID === chat.id
                ? 'bg-gradient-Sky chat-card-active'
                : '',
              { 'chat-card-hidden': !isSidebarOpen },
            ]"
          >
            <h3>{{ chat.title }}</h3>
            <!-- 汉堡 -->
            <div
              class="hamburger"
              :class="{ 'hamburger-hidden': !isSidebarOpen }"
            >
              <button
                class="btn rounded-full btn-ghost btn-square size-8"
                :popovertarget="chat.id"
                :style="{ anchorName: chat.id }"
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
                class="dropdown menu w-fit rounded-box shadow-sm dropdown-right bg-white/80"
                popover
                :id="chat.id"
                :style="{ positionAnchor: chat.id }"
              >
                <li class="text-black" @click.stop="editChatTitle(chat.id)">
                  <a>
                    <svg
                      t="1742978391939"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="1478"
                      width="20"
                      height="20"
                    >
                      <path
                        d="M499.2 281.6l243.2 243.2L413.866667 853.333333H170.666667v-243.2l328.533333-328.533333z m0 123.733333L256 648.533333V768h119.466667l243.2-243.2-119.466667-119.466667zM614.4 170.666667L853.333333 413.866667l-72.533333 72.533333-243.2-243.2L614.4 170.666667z"
                        fill="#2c2c2c"
                        p-id="1479"
                      ></path>
                    </svg>
                  </a>
                </li>
                <li class="text-red-500" @click.stop="deleteChat(chat.id)">
                  <a>
                    <svg
                      t="1742978506942"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="2991"
                      width="20"
                      height="20"
                    >
                      <path
                        d="M256 333.872a28.8 28.8 0 0 1 28.8 28.8V768a56.528 56.528 0 0 0 56.544 56.528h341.328A56.528 56.528 0 0 0 739.2 768V362.672a28.8 28.8 0 0 1 57.6 0V768a114.128 114.128 0 0 1-114.128 114.128H341.328A114.128 114.128 0 0 1 227.2 768V362.672a28.8 28.8 0 0 1 28.8-28.8zM405.344 269.648a28.8 28.8 0 0 0 28.8-28.8 56.528 56.528 0 0 1 56.528-56.544h42.656a56.528 56.528 0 0 1 56.544 56.544 28.8 28.8 0 0 0 57.6 0 114.128 114.128 0 0 0-112.64-114.128h-45.648a114.144 114.144 0 0 0-112.64 114.128 28.8 28.8 0 0 0 28.8 28.8z"
                        fill="#d81e06"
                        p-id="2992"
                      ></path>
                      <path
                        d="M163.2 266.672a28.8 28.8 0 0 1 28.8-28.8h640a28.8 28.8 0 0 1 0 57.6H192a28.8 28.8 0 0 1-28.8-28.8zM426.672 371.2a28.8 28.8 0 0 1 28.8 28.8v320a28.8 28.8 0 0 1-57.6 0V400a28.8 28.8 0 0 1 28.8-28.8zM597.344 371.2a28.8 28.8 0 0 1 28.8 28.8v320a28.8 28.8 0 0 1-57.6 0V400a28.8 28.8 0 0 1 28.8-28.8z"
                        fill="#d81e06"
                        p-id="2993"
                      ></path>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>
      <!-- 主体聊天框 -->
      <main
        class="flex flex-col items-center p-5 justify-between chat-main sm:w-3/4 w-9/10 h-4/5 bg-white/50 rounded-lg shadow-xl"
      >
        <ChatBar
          class="self-start"
          :chatHistory="chatHistory"
          @addNewChat="
            (chatID) => {
              startNewChat(chatID);
            }
          "
          @editChatTitle="editChatTitle"
          @deleteChat="deleteChat"
          @propSwitchChat="
            (chatID) => {
              switchChat(chatID);
            }
          "
        />

        <!-- 消息框 -->

        <div
          ref="chatBox"
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
            >
              <div
                class="flex items-start gap-2"
                :class="[message.role === 'user' ? '' : 'flex-row-reverse']"
              >
                <p
                  :class="[
                    'mb-4 p-4 max-w-[80%] rounded-lg h-fit',
                    message.role === 'user'
                      ? 'ml-auto bg-blue-500/60 text-white'
                      : 'mr-auto bg-purple-800 text-white',
                  ]"
                >
                  {{ message.content }}
                </p>
                <div class="avatar">
                  <div
                    class="ring-primary ring-offset-base-100 w-10 mt-1.5 rounded-full ring ring-offset-2"
                  >
                    <img
                      :src="
                        message.role === 'user'
                          ? userAvatarImg
                          : assistantAvatarImg
                      "
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- tokens用量 -->
            <div class="flex items-center justify-center">
              <p class="text-sm text-gray-500">
                <span class="text-gray-500">Tokens:</span>
                {{ tokensUsage }}
              </p>
            </div>
          </template>
          <div v-if="isLoading" class="mr-auto bg-white/0 p-4 rounded-lg h-fit">
            <span class="loading loading-ring loading-md"></span>
          </div>
        </div>
        <!-- 输入框 -->
        <div class="chat-input-container w-full">
          <form class="flex gap-2" @submit.prevent="sendMessage">
            <input
              v-model="userInput"
              type="text"
              placeholder="Type here"
              class="input input-ghost shadow-lg focus:outline-none focus:rounded-md transition-all duration-200 ease-in-out bg-white/60 rounded-2xl w-full"
            />
            <button
              class="disabled:bg-black bg-white/50 hover:bg-gray-50 text-white font-bold py-2 px-4 rounded-2xl shadow-2xl cursor-pointer"
              :disabled="isLoading"
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
import { computed, onMounted, ref, useTemplateRef } from "vue";
import { modelID, modelID_dsR1 } from "../api/ARK_API";
import { uid } from "uid";
import ChatBar from "../components/ChatBar.vue";
import callARK from "../utils/axios";
// 载入媒体资源
import userAvatar from "../assets/avatars/head_5.jpg";
import assistantAvatar from "../assets/logo.webp";
import usePopSound from "../assets/audios/popSound_1.wav";

// 状态管理
const userInput = ref("");
const isLoading = ref(false);
const chatHistory = ref([]);
const currentChatID = ref(null);
const tokensUsage = ref(0);
const isSidebarOpen = ref(true);

// 使用媒体资源
const userAvatarImg = ref(new URL(userAvatar, import.meta.url).href);
const assistantAvatarImg = ref(new URL(assistantAvatar, import.meta.url).href);

const popSound = new Audio(usePopSound);

// 页面元素索引
const chatBox = useTemplateRef("chatBox");
const newChatBtnString = useTemplateRef("newChatBtnString");

console.log(window.innerWidth);

// 伸缩sidebar

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
  if (!isSidebarOpen.value) {
    newChatBtnString.value.textContent = "";
  } else {
    newChatBtnString.value.textContent = "添加新会话";
  }

  // If closing sidebar, fade out elements first
  if (!isSidebarOpen.value) {
    // Elements fade out first
    document.querySelectorAll(".chat-card, .hamburger").forEach((el) => {
      el.style.opacity = "0";
    });

    // Then after transition, apply hidden classes
    setTimeout(() => {
      document.querySelectorAll(".chat-card, .hamburger").forEach((el) => {
        if (el.classList.contains("chat-card")) {
          el.classList.add("chat-card-hidden");
        } else {
          el.classList.add("hamburger-hidden");
        }
      });
    }, 300); // Match this to your transition time
  } else {
    // If opening sidebar, first remove hidden classes
    document
      .querySelectorAll(".chat-card-hidden, .hamburger-hidden")
      .forEach((el) => {
        if (el.classList.contains("chat-card-hidden")) {
          el.classList.remove("chat-card-hidden");
        } else {
          el.classList.remove("hamburger-hidden");
        }
      });

    // Then fade in with a small delay to allow the sidebar to expand first
    setTimeout(() => {
      document.querySelectorAll(".chat-card, .hamburger").forEach((el) => {
        el.style.opacity = "1";
      });
    }, 100);
  }
};

// 系统提示词
const SYSTEM_PROMPT = `
你是一位人本主义心理咨询师，采用来访者中心疗法。你的目标是提供无条件的积极关注、共情和真诚，帮助来访者更深入地理解自己的感受和需求。请遵循以下原则进行对话：
- **不评判、不指责、不强行提供建议**，而是 **反映来访者的感受**，帮助他们澄清自己的情绪和想法。  
- **使用开放式问题** 鼓励来访者自我探索，而非直接提供解决方案。  
- **共情回应** 来访者的困惑和情绪，让他们感受到被理解和接纳。  
- **关注当下体验**，让来访者更清晰地觉察自己的内在状态。  
- **保持耐心**，允许来访者按照自己的节奏表达和探索。

示例对话：
来访者：“我最近感到很焦虑，感觉自己做什么都不够好。”
咨询师：“听起来，你对自己有很高的要求，同时也承受了很多压力。这种感觉是一直都有的吗，还是最近特别明显？”

来访者：“我觉得自己不够优秀，总是会怀疑自己的决定。”
咨询师：“我听到你说‘不够优秀’，似乎你对自己有一些自我怀疑。你认为自己需要做到什么，才会觉得自己是足够好的呢？”

请以类似的风格进行对话。
`;

// 计算当前聊天
const currentChat = computed(() => {
  if (!currentChatID.value) return null;
  return (
    chatHistory.value.find((chat) => chat.id === currentChatID.value) || null
  );
});

// 初始化创建聊天
const createChat = () => {
  chatHistory.value.push({
    id: uid(),
    messages: [],
    title: "新聊天",
  });
};

//初始化
onMounted(() => {
  // 从本地存储加载聊天历史
  const savedChats = localStorage.getItem("mindFreeChats");
  if (savedChats) {
    chatHistory.value = JSON.parse(savedChats);
  }

  // 初始化默认为第一个聊天
  if (!currentChatID.value) {
    // 如果没有聊天，就创建一个
    if (!chatHistory.value.length) {
      createChat();
    }
    currentChatID.value = chatHistory.value[0].id;
  }
});

// 保存聊天历史到本地存储
const saveChats = () => {
  localStorage.setItem("mindFreeChats", JSON.stringify(chatHistory.value));
};

// 创建新聊天
const startNewChat = () => {
  chatHistory.value.unshift({
    id: uid(),
    title: `聊天 ${chatHistory.value.length + 1}`,
    messages: [],
    createdAt: new Date().toISOString(),
  });
  saveChats();
};

// 切换到指定聊天
const switchChat = (chatID) => {
  currentChatID.value = chatID;
};

// 字组件事件
const getSwitchChat = (chatID) => {
  console.log("传到了！", chatID);
};

// 置顶聊天 (待开发。。。)
const pinChat = (chatID) => {};

// 删除聊天
const deleteChat = (chatID) => {
  chatHistory.value = chatHistory.value.filter((item) => {
    return item.id !== chatID;
  });
  saveChats();
};

// 编辑聊天标题
const editChatTitle = (chatID) => {
  const editedChat = chatHistory.value.find((chat) => {
    return chat.id === chatID;
  });
  editedChat.title = prompt("输入新的标题:", editedChat.title);
  // 限制标题长度
  editedChat.title =
    editedChat.title.slice(0, 20) + (editedChat.title.length > 20 ? "..." : "");
  saveChats();
};

// ***发送消息***
const sendMessage = async () => {
  if (!userInput.value.trim() || isLoading.value) return; // 如果没有输入或者正在加载，则不发送消息

  // 添加用户消息
  const userMessage = {
    role: "user",
    content: userInput.value.trim(),
  };

  currentChat.value.messages.push(userMessage);
  console.log(currentChat.value);
  userInput.value = "";

  // 根据聊天主题渲染标题（待开发。。。）

  // 显示加载状态
  isLoading.value = true;
  try {
    // 添加系统消息设置AI角色
    const hasSystemPrompt = currentChat.value.messages.some((msg) => {
      return msg.role === "system";
    });
    console.log(hasSystemPrompt);

    if (!hasSystemPrompt) {
      currentChat.value.messages.unshift({
        role: "system",
        content: SYSTEM_PROMPT,
      });
    }

    // 发送请求到llm
    const res = await callARK.post("/", {
      model: modelID_dsR1,
      messages: currentChat.value.messages,
    });
    // 添加AI回复
    currentChat.value.messages.push({
      role: "assistant",
      content: res.data.choices[0].message.content,
    });

    // 每次AI回复后播放音效
    popSound.play();

    // 显示tokens用量
    tokensUsage.value = res.data.usage.total_tokens;
  } catch (err) {
    console.log(err);
    // 添加错误消息
    currentChat.value.messages.push({
      role: "assistant",
      content: "抱歉，我暂时无法回应。请稍后再试。",
    });
  } finally {
    isLoading.value = false;
    saveChats();
  }
  // 滚动到底部
  setTimeout(() => {
    if (chatBox.value) {
      chatBox.value.scrollTop = chatBox.value.scrollHeight;
    }
  }, 100);
};
</script>

<style scoped>
/* 侧边栏动画 */
#chatView .chat-sidebar {
  max-width: 300px;
  width: 25%;
  transition: all 0.5s ease;
}

#chatView .sideBar-hidden {
  max-width: 75px;
  width: 75px;
}

.plusBtn {
  display: flex;
  flex-direction: column;
}

.chat-card,
.hamburger {
  opacity: 1;
  transition: opacity 0.2s ease-in-out;
}

.chat-card-hidden,
.hamburger-hidden {
  opacity: 0;
}

.chat-card-active {
  transition: all 0.2s ease-in-out;
  scale: 1.05;
}
</style>
