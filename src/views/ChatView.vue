<template>
  <div
    class="backdrop bg-gradient-to-t from-blue-900/50 to-blue-100/50 h-screen -z-10 p-5 -mt-32"
  >
    <div class="chat-container flex items-center justify-center h-screen gap-4">
      <aside
        class="hidden chat-sidebar max-w-[250px] sm:block w-1/4 h-4/5 bg-white/50 rounded-lg shadow-xl"
      >
        <!-- 添加新会话 -->
        <div class="flex justify-start m-5">
          <button class="btn btn-primary rounded-full text-4xl">+ <span class="text-xl">添加新会话</span></button>
        </div>
        <!-- 会话窗口 -->
        <div class="chat-cards flex flex-col gap-1 overflow-y-auto">
          <div
            class="chat-card flex justify-between flex-1 items-center p-4 bg-gray-800 rounded-2xl text-white hover:cursor-pointer hover:bg-gray-700 duration-150"
          >
            <h3>新的聊天</h3>
            <div class="hamburger">
              <!-- change popover-1 and --anchor-1 names. Use unique names for each dropdown -->
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
      <main
        class="flex flex-col items-center p-5 justify-between chat-main w-3/4 h-4/5 bg-white/50 rounded-lg shadow-xl"
      >
        <!-- 消息框 -->
        <div></div>
        <!-- 输入框 -->
        <div class="chat-input-container w-full">
          <input
            type="text"
            placeholder="Type here"
            class="input input-ghost shadow-lg bg-white/60 rounded-2xl w-full"
          />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
