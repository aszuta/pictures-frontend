<template>
  <article class="page_article">
    <div class="article_container">
      <div class="container_content">
        <div class="content_header">
          <div class="header_container">
            <img class="container_image" src="@/assets/default_profile_image.png" alt=""/>
          </div>
          <nuxt-link :to="`/profile/${createdBy}`" class="picture_author">{{  }}</nuxt-link>
          <nuxt-link :to="`/picture/${postId}`" class="picture_title">{{ title }}</nuxt-link>
        </div>
        <img class="content_image" :src="`/public/${filename}`" alt="">
        <button v-if="createdBy === userId" class="content_button" @click="deletePicture(postId)">Delete</button>
      </div>
      <div class="vote_container">
        <div class="vote_up_container" :class="[voteUpActive ? 'active' : '']">
          <font-awesome-icon class="vote_icon" :icon="['far', 'thumbs-up']" @click="addVote('voteUp')" @keydown="addVote('voteUp')"/>
          <span class="vote_count">{{ votes.voteUp || 0 }}</span>
        </div>
        <div class="vote_down_container" :class="voteDownActive ? 'active' : ''">
          <font-awesome-icon class="vote_icon" :icon="['far', 'thumbs-down']" @click="addVote('voteDown')" @keydown="addVote('voteDown')"/>
          <span class="vote_count">{{ votes.voteDown || 0 }}</span>
        </div>
      </div>
    </div>
  </article>
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
      type: Number,
    },
    createdAt: {
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
    votes: {},
  },
  data() {
    return {
      voteUpActive: false,
      voteDownActive: false,
      vote: '',
    };
  },
  created() {
    if (this.isLoggedIn === true) {
      this.getVote().then(() => {
        if (this.vote.voteType === 'voteUp') {
          this.voteUpActive = true;
        } else if (this.vote.voteType === 'voteDown') {
          this.voteDownActive = true;
        }
      });
    }
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    isLoggedIn() {
      return this.$store.getters['user/isLoggedIn'];
    },
  },
  methods: {
    async getVote() {
      this.vote = await this.$store.dispatch('picture/getVote', { postId: this.postId });
    },
    async deletePicture(postId) {
      await this.$store.dispatch('picture/deletePicture', postId);
      this.$nuxt.refresh();
    },
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
