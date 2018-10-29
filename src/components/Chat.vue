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
            <ul class="messages collection" v-chat-scroll>
              <li v-for="message in messages" :key="message.id" class="collection-item" :style="[ message.currentuser ? { boxShadow: `2px 0px 0px 0px inset ${message.userColor}` } : '']"> <!-- not ok -->
                <div class="message-content">
                  <v-popover offset="0">
                    <svg xmlns="http://www.w3.org/2000/svg" class="anonymous tooltip-target" viewBox="0 0 170.215 170.215">
                      <path :style="{ fill: message.userColor }" d="M154.32 69.536h-23.452V45.767c0-21.46-15.234-40.283-36.224-44.756a45.438 45.438 0 0 0-19.074 0C54.581 5.484 39.347 24.307 39.347 45.768v23.769H15.895a4 4 0 0 0 0 8H154.32a4 4 0 0 0 0-8.001zm-61.343-60.7c17.32 3.691 29.892 19.223 29.892 36.932v11.01H47.347v-11.01c0-17.709 12.571-33.241 29.892-36.932a37.54 37.54 0 0 1 15.738 0zM129.41 126.139a4.002 4.002 0 0 0-4.299.667l-39.648 35.409h-.711l-39.648-35.409a3.996 3.996 0 0 0-4.299-.667 4.002 4.002 0 0 0-2.365 3.651v36.425a4 4 0 0 0 4 4H127.777a4 4 0 0 0 4-4V129.79a4.005 4.005 0 0 0-2.367-3.651zM57.495 115.586h6.999c8.43 0 15.456-6.051 16.706-14.387l1.563-10.421h4.688l1.563 10.421c1.25 8.336 8.276 14.387 16.706 14.387h6.999c8.716 0 15.942-6.54 16.81-15.212l1.759-17.597H38.927l1.759 17.597a16.839 16.839 0 0 0 16.809 15.212z"/>
                    </svg>
                    <template slot="popover">
                      <div class="actions">
                        user: {{message.userID}}
                        <div class="btn blue" @click="startReply(message.userID);">
                          <i class ="material-icons">reply</i>
                        </div>
                      </div>
                    </template>
                  </v-popover>
                  <span class="grey-text text-darken-3">{{ message.content }}</span>
                </div>
                <div class="details">
                  <v-popover offset="16">
                    <button class="tooltip-target btn">?</button>
                    <template slot="popover">
                      <p>{{message.timestamp}}</p>
                      <div class="actions">
                        <div class="btn blue">reply to #{{message.userID}}</div>
                        <div class="btn red">mute user #{{message.userID}}</div>
                        <div class="btn red">hide this comment</div>
                        <div class="btn red">report this comment</div>
                      </div>
                      <a v-close-popover class="btn red">Close</a>
                    </template>
                  </v-popover>
                </div>
              </li>
            </ul>
          </div>
          <div class="card-action">
            <NewMessage :userID="userID" :userColor="userColor" />
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
  props: ['userID', 'userColor'],
  components: {
    NewMessage,
  },
  data() {
    return {
      messages: [],
      currentuser: this.userID,
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
            userColor: doc.data().userColor,
            currentuser: false,
            content: doc.data().content,
            timestamp: moment(doc.data().timestamp)
              .locale('fr', localization)
              // .format('lll'),
              .startOf('hour')
              .fromNow(),
          });
          this.highlightUserMessages();
        }
      });
    });
  },
  mounted() {
    this.highlightUserMessages();
  },
  methods: {
    highlightUserMessages() {
      this.messages.forEach(message => {
        if (message.userID === this.currentuser) {
          // eslint-disable-next-line
          message.currentuser = true;
        }
      });
    },
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
  .collection .collection-item {
    padding: 5px 70px 5px 10px;
    position: relative;
    .details {
      display: flex;
      position: absolute;
      right: 5px;
      top: 8px;
    }
  }
  .anonymous {
    width: 30px;
    height: 30px;
    margin: 0 0.5rem 0.1rem 0;
    border-radius: 2px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  }
  .message-content {
    display: flex;
    align-items: flex-start;
    flex: 1;
    span {
      padding-top: 0.4rem;
      max-width: calc(100% - 40px);
      word-wrap: break-word;
    }
  }
  span {
    font-size: 1.2em;
    &.user {
      min-width: 70px;
      padding: 5px 4px;
      margin: 1rem 0 0.1rem 0;
      border-radius: 2px;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
      color: white;
      display: inline-block;
      font-weight: bold;
      font-size: 1em;
    }
  }
  .time {
    font-size: 0.8em;
  }
}
.messages {
  max-height: 800px;
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
// =====================================================
// tooltip
// =====================================================
.tooltip {
  &.popover {
    .popover-inner {
      max-width: 330px;
      background: white;
      color: black;
      padding: 10px;
      border-radius: 5px;
      box-shadow: 0 5px 30px rgba(black, 0.1);
      border: 1px solid rgba(0, 0, 0, 0.1);
    }
    p {
      padding: 0;
    }
    .actions {
      display: flex;
      flex-wrap: wrap;
      // flex-direction: column;
    }
    .btn {
      margin-top: 10px;
    }
  }
}
span {
  &:focus {
    outline: 0;
  }
}
</style>
