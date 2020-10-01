import Vue from './vue.esm.browser.js';

// const app = ...
// Рекомендуется использовать МЕТОД в качестве обработчика события
new Vue({
  el: '#app',
  data: {
      count: 0,
  },
  methods: {
    counter() {
      this.count++;
    }
  }
})
