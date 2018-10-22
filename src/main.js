/* eslint-disable */
import VueChatScroll from 'vue-chat-scroll';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/store';
import VTooltip from 'v-tooltip';

Vue.use(VTooltip);

Vue.use(VueChatScroll);

Vue.config.productionTip = false;

// https://alligator.io/vuejs/vue-router-modify-head/
router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title);
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.metaTags);
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));
  if (!nearestWithMeta) return next();
  nearestWithMeta.meta.metaTags
    .map(tagDef => {
      const tag = document.createElement('meta');
      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key]);
      });
      tag.setAttribute('data-vue-router-controlled', '');
      return tag;
    })
    .forEach(tag => document.head.appendChild(tag));
  next();
});

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
