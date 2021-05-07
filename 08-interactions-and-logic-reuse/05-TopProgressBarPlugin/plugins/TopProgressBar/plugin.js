import TopProgressBar from './index';
import TheTopProgressBar from './TheTopProgressBar';

export default {
  install: function (Vue, options) {
    let { router } = options;
    if (!TopProgressBar.instance) {
      const container = document.createElement('div');
      document.body.appendChild(container);
      TopProgressBar.setInstance(new Vue(TheTopProgressBar).$mount(container));
    }

    if (router) {
      router.beforeEach((to, from, next) => {
        console.log(to, from, next, 'before');
        TopProgressBar.start();
        console.log('start', 'router');
        next();
      });
      router.afterEach(() => {
        TopProgressBar.finish();
      });
      router.onError((err) => {
        TopProgressBar.fail();
        throw err;
      });
    }

    Vue.prototype.$progress = TopProgressBar;
    Vue.$progress = TopProgressBar;
  },
};
