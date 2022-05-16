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
    <!-- <div class="pagination_component">
      <ul class="pagination_container">
        <li class="pagination_item">
          <button class="pagination_button" :disabled="pageNumber > 1" @click="changePageNumber(pageNumber - 1)">
            <font-awesome-icon :icon="['fas', 'angle-left']" />
          </button>
        </li>
        <li v-for="(item, index) in Array(numberPages)" :key="index" class="pagination_item">
          <button :class="['pagination_button', pageNumber == index + 1 ? 'active' : '']" @click="changePageNumber(index + 1)">{{ index + 1 }}</button>
        </li>
        <li class="pagination_item">
          <button class="pagination_button" @click="changePageNumber(pageNumber + 1)">
            <font-awesome-icon :icon="['fas', 'angle-right']" />
          </button>
        </li>
      </ul>
    </div> -->
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
      // perPage: 2,
      // pageNumber: Number(this.$route.query.pageNumber) || 1,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.user.currentUser;
    },
    // itemsForList() {
    //   return this.pictures.slice((this.pageNumber - 1) * this.perPage, this.pageNumber * this.perPage);
    // },
    // numberPages() {
    //   return Math.ceil(this.pictures.length / this.perPage);
    // },
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
