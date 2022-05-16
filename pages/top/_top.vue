<template>
  <div class="main_content">
    <div class="content_navigation">
      <nuxt-link :to="`/top/${dzien}`" class="navigation_link" :class="activeLink === dzien ? 'active' : ''">Top dnia</nuxt-link>
      <nuxt-link :to="`/top/${tydzien}`" class="navigation_link" :class="activeLink === tydzien ? 'active' : ''">Top tygodnia</nuxt-link>
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
      if (param === 'dzien') {
        const currentDate = new Date();
        const pictureDate = new Date(item.createdAt);
        const pictureVotes = (item.votesUp - item.votesDown);
        const found = (currentDate - pictureDate) / 1000;
        if (found < 86400 && pictureVotes >= 100) {
          searchedPictures.push(item);
        }
      } else if (param === 'tydzien') {
        const currentDate = new Date();
        const pictureDate = new Date(item.createdAt);
        const pictureVotes = (item.votesUp - item.votesDown);
        const found = (currentDate - pictureDate) / 1000;
        if (found < 604800 && pictureVotes >= 200) {
          searchedPictures.push(item);
        }
      } else if (param === 'miesiac') {
        const currentDate = new Date();
        const pictureDate = new Date(item.currentAt);
        const pictureVotes = (item.votesUp - item.votesDown);
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
      dzien: 'dzien',
      tydzien: 'tydzien',
      miesiac: 'miesiac',
      activeLink: null,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.user.currentUser;
    },
  },
  methods: {
    getUser() {
      return this.$store.dispatch('user/getUser');
    },
  },
  mounted() {
    this.getUser();
  },
};
</script>

<style lang="scss">
.main_content {
  margin: 0;
  z-index: 0;
  display: flex;
  flex-direction: column;
  padding-top: 6rem;

  .content_navigation {
    display: inherit;
    justify-content: center;

    .navigation_link {
      margin: 1.2rem 0.3rem;
      padding: 0.4rem 0.4rem;
      border: 2px solid #fff;
      text-align: center;
      width: 150px;
      color: #fff;

      &:hover {
        color: #e6ba37;
        border: 2px solid #e6ba37;
      }

      &.active {
        color: #e6ba37;
        border: 2px solid #e6ba37;
      }
    }
  }
}
</style>
