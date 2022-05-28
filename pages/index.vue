<template>
  <main class="layout_page">
    <PictureCard
      v-for="picture in itemsForList"
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
    <div class="pagination_component">
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
    </div>
  </main>
</template>

<script>
export default {
  async asyncData({ store }) {
    await store.dispatch('picture/getPictures');
    const pictures = await store.getters['picture/getPictures'];
    return { pictures };
  },
  name: 'Home',
  data() {
    return {
      perPage: 2,
      pageNumber: Number(this.$route.query.pageNumber) || 1,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.user.currentUser;
    },
    itemsForList() {
      return this.pictures.slice((this.pageNumber - 1) * this.perPage, this.pageNumber * this.perPage);
    },
    numberPages() {
      return Math.ceil(this.pictures.length / this.perPage);
    },
  },
  methods: {
    changePageNumber(newPageNumber) {
      this.pageNumber = newPageNumber;
      this.$router.push({
        path: this.$route.path,
        query: {
          pageNumber: newPageNumber,
        },
      });
    },
  },
};

</script>
