<template>
  <div class="welcome container">
    <div class="card">
      <div class="card-content center-align">
        <h2 class="black-text">Tchô tes colles!</h2>
        <form @submit.prevent="enterChat">
          <button class="btn black">J'accepte</button>
          <p v-if="feedback" class="red-text">{{ feedback }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store/store';
import colors from '../assets/colors.json';

export default {
  name: 'Welcome',
  data() {
    return {
      feedback: null,
    };
  },
  methods: {
    enterChat() {
      if (this.userID && this.userColor) {
        this.$router.push({ name: 'Chat', params: { userID: this.userID, userColor: this.userColor } });
      } else {
        this.feedback = 'Hmmm.. userID or userColor not generated, fuck';
      }
    },
    setUser() {
      // set user id
      let text = '';
      const idLength = 6;
      const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < idLength; i += 1) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      store.commit('setUserID', text);
      // set user color
      const userColor = colors[Math.floor(Math.random() * colors.length)];
      store.commit('setUserColor', userColor);
    },
  },
  created() {
    this.setUser();
  },
  computed: {
    userID() {
      return store.state.userID;
    },
    userColor() {
      return store.state.userColor;
    },
  },
};
</script>

<style lang="scss">
.welcome {
  max-width: 400px;
  margin-top: 100px;
  h2 {
    font-size: 3em;
  }
  button {
    margin: 30px auto;
  }
}
</style>
