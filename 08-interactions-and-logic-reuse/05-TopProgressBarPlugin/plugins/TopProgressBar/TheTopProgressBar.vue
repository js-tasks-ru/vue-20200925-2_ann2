<template>
  <div
    class="progress"
    :style="`width: ${width}%`"
    :class="{ show, failed }"
  ></div>
</template>

<script>
export default {
  name: 'TheTopProgressBar',
  data() {
    return {
      width: 0,
      show: false,
      failed: false,
    };
  },

  methods: {
    start() {
      this.show = true;
      this.failed = false;
      const that = this;
      const duration = 1000;
      const performanceStart = performance.now();

      requestAnimationFrame(function animate(time) {
        if (that.failed) {
          return;
        }
        let timeFraction = (time - performanceStart) / duration;
        if (timeFraction > 1) timeFraction = 1;
        let progress = timeFraction;
        that.width = progress * 100;

        if (timeFraction < 1) {
          requestAnimationFrame(animate);
        }
      });
    },

    finish() {
      this.width = 100;
      setTimeout(() => {
        this.width = 0;
        this.show = false;
      }, 400);
    },
    fail() {
      this.failed = true;
      this.show = true;
      this.finish();
    },
  },
};
</script>

<style scoped>
.progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  width: 0;
  opacity: 0;
  background-color: var(--blue);
  transition: opacity 0.2s linear 0.2s;
  z-index: 999999;
}

.progress.show {
  opacity: 1;
  transition: none;
}

.progress.failed {
  background-color: #db3851;
}
</style>
