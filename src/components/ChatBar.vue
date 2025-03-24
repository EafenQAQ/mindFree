<template>
  <div id="chat-bar">
    <div class="drawer lg:drawer-open">
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
        <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <!-- Sidebar content here -->
          <li><a>我的会话</a></li>
          <li><a></a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
