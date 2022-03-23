<template>
  <div class="mainbar">
    <div class="main">
      <div class="vote">
        <div class="vote-container">
          <span v-if="voteUpActive === true" @click="addVote('voteUp')" @keydown="addVote('voteUp')">dodano</span>
          <span v-else @click="addVote('voteUp')" @keydown="addVote('voteUp')">&#9650;</span>
          <div>
            <div class="score">{{ score }}</div>
          </div>
          <span v-if="voteDownActive === true" @click="addVote('voteDown')" @keydown="addVote('voteDown')">dodano</span>
          <span v-else @click="addVote('voteDown')" @keydown="addVote('voteDown')">&#9660;</span>
        </div>
      </div>
      <div class="picture-container">
        <nuxt-link :to="`picture/${filename}`">{{ title }}</nuxt-link>
        <div>{{ filename }}</div>
        <div>{{ filepath }}</div>
        <img :src="`/public/${filename}`" alt="">
        <button @click="deletePicture(postId)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PictureCard',
  props: {
    postId: {
      type: Number,
    },
    userId: {
      type: Number,
    },
    createdBy: {
      type: String,
    },
    title: {
      type: String,
    },
    filename: {
      type: String,
    },
    filepath: {
      type: String,
    },
  },
  data() {
    return {
      voteUpActive: false,
      voteDownActive: false,
      score: 0,
      vote: '',
    };
  },
  created() {
    this.getVote().then(() => {
      console.log(this.vote.userId);
      console.log(this.vote.postId);
      console.log(this.vote.voteType);
      if (this.vote.voteType === 'voteUp') {
        this.voteUpActive = true;
      } else if (this.vote.voteType === 'voteDown') {
        this.voteDownActive = true;
      }
    });
    console.log(this.voteUpActive);
    console.log(this.voteDownActive);
  },
  methods: {
    async getVote() {
      const res = await this.$store.dispatch('picture/getVote', { postId: this.postId });
      this.vote = res;
    },
    async deletePicture(postId) {
      await this.$store.dispatch('picture/deletePicture', postId);
      this.$nuxt.refresh();
    },
    async addVote(type) {
      console.log(this.postId);
      console.log(this.userId);
      const payload = {
        postId: this.postId,
        vote: {
          userId: this.userId,
          voteType: type,
        },
      };
      console.log(payload);
      if (this.voteUpActive === true && type === 'voteUp') {
        await this.$store.dispatch('picture/deleteVote', payload);
        this.voteUpActive = false;
      } else if (this.voteDownActive === true && type === 'voteDown') {
        await this.$store.dispatch('picture/deleteVote', payload);
        this.voteDownActive = false;
      } else {
        await this.$store.dispatch('picture/addVote', payload);

        this.voteUpActive = false;
        this.voteDownActive = false;

        if (type === 'voteUp') {
          this.voteUpActive = true;
        } else if (type === 'voteDown') {
          this.voteDownActive = true;
        }
      }
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.mainbar{
  padding-top: 80px;
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.jeden{
  display: grid;
}

.dwa{
  grid-column: 2;
  width: auto;
  min-width: 0;
}

.app {
  grid-column: 1;
  width: auto;
  align-items: center;
  text-align: center;
}

.trzy {
  padding-right: 16px;
  display: flex !important;
  align-items: stretch !important;
  justify-content: center !important;
  flex-direction: column !important;
}

div {
  display: block;
}

span {
  border: 0;
  background: 0;
  font-size: 2rem;
  color: #000000;
  cursor: pointer;
  text-align: center;
}

.score {
  text-align: center;
  font-size: 1.4rem;
}
</style>
