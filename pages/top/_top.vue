<template>
  <div class="main_content">
    <div class="content_navigation">
      <nuxt-link :to="`/top/${day}`" class="navigation_link" :class="activeLink === dzien ? 'active' : ''">Top dnia</nuxt-link>
      <nuxt-link :to="`/top/${week}`" class="navigation_link" :class="activeLink === tydzien ? 'active' : ''">Top tygodnia</nuxt-link>
      <nuxt-link :to="`/top/${month}`" class="navigation_link" :class="activeLink === miesiac ? 'active' : ''">Top miesiąca</nuxt-link>
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
      :votes="picture.votes"
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
      const votesUp = item.votes.votesUp || 0;
      const votesDown = item.votes.votesDown || 0;
      if (param === 'dzien') {
        const currentDate = new Date();
        const pictureDate = new Date(item.createdAt);
        const pictureVotes = (votesUp - votesDown);
        const found = (currentDate - pictureDate) / 1000;
        if (found < 86400 && pictureVotes >= 100) {
          searchedPictures.push(item);
        }
      } else if (param === 'tydzien') {
        const currentDate = new Date();
        const pictureDate = new Date(item.createdAt);
        const pictureVotes = (votesUp - votesDown);
        const found = (currentDate - pictureDate) / 1000;
        if (found < 604800 && pictureVotes >= 200) {
          searchedPictures.push(item);
        }
      } else if (param === 'miesiac') {
        const currentDate = new Date();
        const pictureDate = new Date(item.currentAt);
        const pictureVotes = (votesUp - votesDown);
        const found = (currentDate - pictureDate) / 1000;
        if (found < 2629743 && pictureVotes >= 300) {
          searchedPictures.push(item);
        }
      }
    });
    return {
      searchedPictures,
      activeLink: top,
    };
  },
  data() {
    return {
      day: 'dzien',
      week: 'tydzien',
      month: 'miesiac',
      activeLink: null,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.user.currentUser;
    },
  },
};
</script>
