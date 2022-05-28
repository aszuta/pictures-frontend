<template>
  <div class="main_content">
    <div class="content_navigation">
      <nuxt-link :to="`/top/${dzien}`" class="navigation_link">Top dnia</nuxt-link>
      <nuxt-link :to="`/top/${tydzien}`" class="navigation_link">Top tygodnia</nuxt-link>
      <nuxt-link :to="`/top/${miesiac}`" class="navigation_link" :class="activeLink === miesiac ? 'active' : ''">Top miesiąca</nuxt-link>
    </div>
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
      :votesUp="picture.votesUp"
      :votesDown="picture.votesDown"
    />
  </div>
</template>

<script>
export default {
  async asyncData({ params: { top }, store }) {
    await store.dispatch('picture/getPictures');
    const data = await store.getters['picture/getPictures'];
    const searchedPictures = [];

    // eslint-disable-next-line array-callback-return
    data.map((item) => {
      const param = top;
      if (param === 'miesiac') {
        const currentDate = new Date();
        const pictureDate = new Date(item.currentAt);
        const pictureVotes = (item.votesUp - item.votesDown);
        const found = (currentDate - pictureDate) / 1000;
        if (found < 2629743 && pictureVotes >= 300) {
          searchedPictures.push(item);
        }
      }
    });
    return { searchedPictures };
  },
  data() {
    return {
      dzien: 'dzien',
      tydzien: 'tydzien',
      miesiac: 'miesiac',
      activeLink: 'miesiac',
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.user.currentUser;
    },
  },
};
</script>
