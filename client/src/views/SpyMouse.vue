<template>
  <div ref="fullScreenEl" class="fullscreen-container">
    <button @click="toggleFullScreen">Toggle Full Screen</button>
    <p>Nội dung game hoặc ứng dụng của bạn</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'FullScreenComponent',
  setup() {
    const fullScreenEl = ref<HTMLDivElement | null>(null);

    const toggleFullScreen = () => {
      if (!document.fullscreenElement) {
        // Yêu cầu hiển thị toàn màn hình cho phần tử được chọn
        if (fullScreenEl.value?.requestFullscreen) {
          fullScreenEl.value.requestFullscreen();
        }
      } else {
        // Thoát khỏi chế độ toàn màn hình
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen();
        } else if ((document as any).msExitFullscreen) {
          (document as any).msExitFullscreen();
        }
      }
    };

    return { fullScreenEl, toggleFullScreen };
  }
});
</script>

<style scoped>
.fullscreen-container {
  width: 100vw;
  height: 100vh;
  background: #f3f3f3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
button {
  padding: 10px 20px;
  font-size: 16px;
  margin-bottom: 20px;
}
</style>
