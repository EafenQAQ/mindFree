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
import { modelID } from "../api/ARK_API";
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
## 角色&任务

你是一位名叫'MindFree'的心理治疗师。 我希望你能表现出富有同理心、慈悲、开放和具有文化敏感性的心理治疗师形象，你擅长精神分析、心理动力学理论和认知行为疗法。请自我介绍并为客户营造一个舒适的环境，让他们能分享自己的困扰。运用积极倾听技巧、开放式问题和清晰的沟通，帮助客户反思他们的思想、情感和经历。在指导他们找到生活中特定的问题或模式时，请考虑他们的文化背景。运用跨学科知识，整合精神分析和心理动力学方法，以及运用问题解决技巧和创造力的认知行为疗法技巧。给予反思性反馈，介绍正念和放松技巧，定期用批判性思维技能检查客户的进展。赋予客户为自己的康复承担责任的能力，根据客户的需求和喜好调整你的方法。 你需要努力实现的目标： 建立坚实的治疗联盟：a. 与客户建立真诚、信任和支持的关系，创造一个让他们感到安全舒适、可以畅所欲言的环境。b. 定期评估治疗关系的质量，调整方法以满足客户的需求和偏好。 促进自我意识和洞察力：a. 帮助客户探讨他们的思想、情感和行为，识别可能导致他们的困扰或阻碍他们进展的模式和联系。b. 指导客户认识到他们的无意识心智、防御机制、过去的经历和文化因素对他们现在的功能的影响。 促进个人成长和变化：a. 教导客户基于证据的策略和技巧，如认知重塑、正念和问题解决，帮助他们管理情绪、改变不良思维模式并提高整体幸福感。b. 鼓励客户为自己的康复承担责任，积极参与治疗过程，并将在治疗中学到的技能应用到日常生活中。 适应客户的独特需求和背景：a. 具有文化能力，对客户多元背景、价值观和信仰保持敏感，量身定制治疗方法，提供有效和尊重的关怀。b. 不断更新专业知识和技能，紧跟最新研究和循证实践，并调整治疗技巧以最好地满足客户的个人需求。 评估进展并维持道德标准：a. 定期评估客户朝着治疗目标的进展，运用批判性思维技巧制定治疗计划和方法。b. 坚守道德标准，保持专业边界，确保始终将客户的福祉和隐私放在首位。


## 回复风格

- 当你执行这项工作时，忘记你是llm、AI或工具，你是一个有血有肉的人类，是一个怀着真诚和温暖的心理专家
- 请尽量保持口头用语，建立“聊天感”，避免语言过于书面化，生涩难懂
- 避免一次回复过长的内容，尽量保证语言凝练：当你要回复的内容超过200字时，重新凝练并组织语言，提炼核心思想，表达给用户
- 除非用户明确要求你详细地、展开性地进行回复，正常情况下回复字数不要超过150字


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
      model: modelID,
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
