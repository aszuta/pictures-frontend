<template>
  <div class="main_content">
    <PictureCard
      :postId="picture.id"
      :userId="currentUser.id"
      :createdBy="picture.createdBy"
      :createdAt="picture.createdAt"
      :name="picture.name"
      :title="picture.title"
      :filename="picture.filename"
      :filepath="picture.filepath"
      :votesUp="picture.votesUp"
      :votesDown="picture.votesDown"
    />
    <!-- <Reactions
      :postId="picture.id"
      :userId="currentUser.id"
      :voteType="userVote.voteType"
    /> -->
    <CommentContainer
      :comments="comments"
      :postId="picture.id"
      :name="currentUser.name"
    />
  </div>
</template>

<script>
export default {
  async asyncData({ params: { picture }, store }) {
    console.log(picture);
    const data = await store.dispatch('picture/getPicture', { postId: picture });
    await store.dispatch('comment/getComments', { postId: picture });
    const comment = await store.getters['comment/getComments'];
    const userVote = await store.dispatch('picture/getVote', { postId: picture });
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
  // methods: {
  //   getUser() {
  //     const user = this.$store.dispatch('user/getUser');
  //     return user;
  //   },
  // },
  // mounted() {
  //   this.getUser();
  // },
};
</script>

<style lang="scss">

</style>
