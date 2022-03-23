<template>
  <div class="app">
    <div class="reaction-container">
      <span v-if="voteUpActive === true" @click="addVote('voteUp')" @keydown="addVote('voteUp')">dodano</span>
      <span v-else @click="addVote('voteUp')" @keydown="addVote('voteUp')">&#9650;</span>
      <div>
        <div class="score">{{ score }}</div>
      </div>
      <span v-if="voteDownActive === true" @click="addVote('voteDown')" @keydown="addVote('voteDown')">dodano</span>
      <span v-else @click="addVote('voteDown')" @keydown="addVote('voteDown')">&#9660;</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Reactions',
  props: {
    postId: {
      type: Number,
    },
    userId: {
      type: Number,
    },
    voteType: {
      type: String,
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.user.currentUser;
    },
  },
  data() {
    return {
      voteUpActive: false,
      voteDownActive: false,
      score: 0,
    };
  },
  created() {
    console.log(this.voteUpActive);
    console.log(this.voteDownActive);
    if (this.voteType === 'voteUp') {
      this.voteUpActive = true;
    } else if (this.voteType === 'voteDown') {
      this.voteDownActive = true;
    }
  },
  methods: {
    async addVote(type) {
      console.log(this.postId);
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

</style>
