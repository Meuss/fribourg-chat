import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    userID: null,
    userColor: null,
  },
  mutations: {
    setUserID(state, payload) {
      this.state.userID = payload;
    },
    setUserColor(state, payload) {
      this.state.userColor = payload;
    },
  },
  getters: {},
  actions: {},
});
