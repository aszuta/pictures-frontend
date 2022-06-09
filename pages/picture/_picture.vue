<template>
  <div class="main_content">
    <PictureCard
      :postId="picture.id"
      :userId="currentUser.id"
      :createdBy="picture.createdBy"
      :createdAt="picture.createdAt"
      :title="picture.title"
      :filename="picture.filename"
      :filepath="picture.filepath"
      :votes="picture.votes"
    />
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
};
</script>
