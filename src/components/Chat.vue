<template>
  <div class="chat container">
    <div class="row">
      <div class="col s12">
        <div class="center">
          <div class="title">
            <h2 class="black-text">Chat</h2>
          </div>
        </div>
        <div class="card">
          <div class="card-content">
            <ul class="messages" v-chat-scroll>
              <li v-for="message in messages" :key="message.id">
                <span class="black-text userID">{{ message.userID }}</span>
                <span class="grey-text text-darken-3">{{ message.content }}</span>
                <span class="grey-text time">{{ message.timestamp }}</span>
              </li>
            </ul>
          </div>
          <div class="card-action">
            <NewMessage :userID="userID" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NewMessage from '@/components/NewMessage';
import db from '@/firebase/init';
import moment from 'moment';
import localization from 'moment/locale/fr';

export default {
  name: 'Chat',
  props: ['userID'],
  components: {
    NewMessage,
  },
  data() {
    return {
      messages: [],
    };
  },
  created() {
    const ref = db.collection('messages').orderBy('timestamp');
    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          const doc = change.doc;
          this.messages.push({
            id: doc.id,
            userID: doc.data().userID,
            content: doc.data().content,
            timestamp: moment(doc.data().timestamp)
              .locale('fr', localization)
              // .format('lll'),
              .startOf('hour')
              .fromNow(),
          });
        }
      });
    });
  },
};
</script>

<style lang="scss">
.title {
  display: flex;
}
.chat {
  h2 {
    margin-left: 20px;
    font-size: 2.6em;
    margin-bottom: 35px;
  }
  span {
    font-size: 1.4em;
  }
  .time {
    display: block;
    font-size: 0.8em;
  }
}
.messages {
  max-height: 300px;
  overflow: auto;
  display: flex;
  flex-direction: column;
}
.messages::-webkit-scrollbar {
  width: 3px;
}

.messages::-webkit-scrollbar-track {
  background: #ddd;
}

.messages::-webkit-scrollbar-thumb {
  background: #aaa;
}
p {
  font-size: 0.8em;
  padding: 24px;
}
</style>
