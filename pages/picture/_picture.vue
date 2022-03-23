<template>
  <div>
    <div>
      Witaj {{ currentUser.name }}<br>
      {{ postId }}
      <div>{{ picture.title }}</div>
      <img :src="`/public/${picture.filename}`" alt="">
    </div>
    <Reactions
      :postId="picture.id"
      :userId="currentUser.id"
      :voteType="userVote.voteType"
    />
    <form @submit.prevent="sendComment">
      <label for="comment">Dodaj komentarz: </label>
      <input id="comment" v-model="content" type="text" name="" placeholder="Treść komentarza">
      <button>Send</button>
    </form>
    <div v-for="comment in comments" :key="comment.id">
      <div>{{ comment.name }}</div>
      <div>{{ comment.content }}</div>
      <div>{{ comment.date }}</div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ params: { picture }, store }) {
    const data = await store.dispatch('picture/getPicture', { filename: picture });
    const comment = await store.dispatch(`api/comment/${data.id}`);
    const userVote = await store.dispatch('picture/getVote', { postId: data.id });
    return {
      picture: data,
      comments: comment,
      postId: data.id,
      userVote,
    };
  },
  data() {
    return {
      content: '',
      vote: '',
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.user.currentUser;
    },
  },
  methods: {
    async sendComment() {
      const payload = {
        postId: this.picture.id,
        comment: {
          name: this.currentUser.name,
          content: this.content,
        },
      };
      await this.$store.dispatch('comment/addComment', payload);
      await this.$axios.post(`api/comment/${this.picture.id}`, {
        name: this.currentUser.name,
        content: this.content,
      });
      await this.$nuxt.refresh();
    },
    getUser() {
      const user = this.$store.dispatch('user/getUser');
      return user;
    },
  },
  mounted() {
    this.getUser();
  },
};
</script>

<style scoped>

</style>
