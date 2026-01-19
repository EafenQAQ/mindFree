<template>
    <div class="spinner-container">
        <div :style="spinnerStyle" class="spinner"></div>
    </div>
</template>

<script setup>
    import { computed } from "vue";
// Spinner 组件 - 用于显示加载状态

const props = defineProps({
    // 颜色参数
    color: {
        type: String,
        default: "#42b883"

    }
})

const spinnerStyle = computed(() => {
    return {

        borderLeftColor: props.color,

    }
})
</script>

<style scoped>
.spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

.spinner {
    width: 100%;
    height: 100%;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #42b883;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
