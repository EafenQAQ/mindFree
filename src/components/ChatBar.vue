<template>
  <div id="chat-bar">
    <div class="drawer z-50">
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col items-center justify-center">
        <!-- Page content here -->
        <label
          for="my-drawer-2"
          class="btn btn-ghost hover:bg-white/30 drawer-button lg:hidden"
        >
          ...
        </label>
      </div>
      <div class="drawer-side h-[90vh] mt-20">
        <label
          for="my-drawer-2"
          aria-label="close sidebar"
          class="drawer-overlay"
        ></label>
        <ul
          class="menu bg-base-200 text-base-content min-h-full w-80 p-4 lg:hidden"
        >
          <!-- 创建新会话 -->
          <button
            @click="$emit('addNewChat')"
            class="btn btn-primary max-w-[300px] hover:bg-blue-800 rounded-full text-4xl mb-1.5"
          >
            +
          </button>
          <!-- Sidebar content here -->
          <div
            v-for="chat in chatHistory"
            :key="chat.id"
            @click="$emit('propSwitchChat', chat.id)"
          >
            <li>
              <a class="flex justify-between h-[50px] h-max-[75px]"
                >{{ chat.title }}

                <!-- 汉堡图标 -->
                <div @click.stop class="dropdown dropdown-start w-fit">
                  <div
                    tabindex="0"
                    role="button"
                    class="btn btn-ghost px-4 rounded-3xl m-1"
                  >
                    ...
                  </div>
                  <ul
                    tabindex="0"
                    class="dropdown-content menu w-fit bg-base-100 rounded-box z-1 p-2 shadow-sm"
                  >
                    <li
                      class="text-black"
                      @click.stop="$emit('editChatTitle', chat.id)"
                    >
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
                    <li
                      class="text-red-500"
                      @click.stop="$emit('deleteChat', chat.id)"
                    >
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
              </a>
            </li>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
defineProps({
  chatHistory: Array,
});
</script>

<style lang="scss" scoped></style>
