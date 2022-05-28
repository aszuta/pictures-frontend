<template>
  <div class="vote_container">
    <div class="vote_up_container" :class="[voteUpActive ? 'active' : '']">
      <font-awesome-icon class="vote_icon" :icon="['far', 'thumbs-up']" @click="addVote('voteUp')" @keydown="addVote('voteUp')"/>
      <span class="vote_count">0</span>
    </div>
    <div class="vote_down_container" :class="voteDownActive ? 'active' : ''">
      <font-awesome-icon class="vote_icon" :icon="['far', 'thumbs-down']" @click="addVote('voteDown')" @keydown="addVote('voteDown')"/>
      <span class="vote_count">0</span>
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
    if (this.voteType === 'voteUp') {
      this.voteUpActive = true;
    } else if (this.voteType === 'voteDown') {
      this.voteDownActive = true;
    }
  },
  methods: {
    async addVote(type) {
      const payload = {
        postId: this.postId,
        vote: {
          userId: this.userId,
          voteType: type,
        },
      };
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
