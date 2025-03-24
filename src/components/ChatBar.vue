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
              <a class="flex justify-between"
                >{{ chat.title }}

                <!-- ❌图标 -->
                <span
                  @click="$emit('deleteChat', chat.id)"
                  class="transfrom hover:scale-110 duration-150"
                >
                  <svg
                    t="1742820075660"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="2635"
                    width="20"
                    height="20"
                  >
                    <path
                      d="M617.92 516.096l272 272-101.824 101.824-272-272-272 272-101.856-101.824 272-272-275.008-275.04L241.056 139.2l275.04 275.04 275.04-275.04 101.824 101.824-275.04 275.04z"
                      fill="#13227a"
                      p-id="2636"
                    ></path>
                  </svg>
                </span>
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
