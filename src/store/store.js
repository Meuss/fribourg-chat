import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    userID: null,
  },
  mutations: {
    setUserID(state, payload) {
      this.state.userID = payload;
    },
  },
  getters: {},
  actions: {},
});
