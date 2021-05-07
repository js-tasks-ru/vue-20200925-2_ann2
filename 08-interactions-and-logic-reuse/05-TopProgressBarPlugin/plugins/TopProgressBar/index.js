export default {
  instance: null,
  setInstance(instance) {
    this.instance = instance;
  },

  // Методы запуска прогресса
  start() {
    this.instance && this.instance.start();
  },
  finish() {
    this.instance.finish() && this.instance;
  },
  fail() {
    this.instance && this.instance.fail();
  },
};
