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

export default {
  name: 'Welcome',
  data() {
    return {
      feedback: null,
    };
  },
  methods: {
    enterChat() {
      if (this.userID) {
        this.$router.push({ name: 'Chat', params: { userID: this.userID } });
      } else {
        this.feedback = 'Hmmm.. userID not generated, fuck';
      }
    },
    setUser() {
      let text = '';
      const idLength = 6;
      const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < idLength; i += 1) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      store.commit('setUserID', text);
    },
  },
  mounted() {
    this.setUser();
  },
  computed: {
    userID() {
      return store.state.userID;
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
