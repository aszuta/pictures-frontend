<template>
  <div class="search_container">
    <h2 class="container_title">Wyszukane obrazy</h2>
    <PictureCard
      v-for="picture in searchedPictures"
      :key="picture.id"
      :postId="picture.id"
      :userId="currentUser.id"
      :createdBy="picture.createdBy"
      :createdAt="picture.createdAt"
      :name="picture.name"
      :title="picture.title"
      :filename="picture.filename"
      :filepath="picture.filepath"
      :votes="picture.votes"
    />
  </div>
</template>

<script>
export default {
  async asyncData({ params: { search }, store }) {
    const data = await store.dispatch('picture/getPictures');
    const searchedPictures = [];

    // eslint-disable-next-line array-callback-return
    data.map((item) => {
      const param = search;
      const found = item.title.includes(param);
      if (found) {
        searchedPictures.push(item);
      }
    });
    return { searchedPictures };
  },
  data() {
    return {
      searchedPictures: [],
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.user.currentUser;
    },
  },
};
</script>
