<template>
  <div class="main_content">
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
  </div>
</template>

<script>
export default {
  async asyncData({ store }) {
    await store.dispatch('picture/getPictures');
    const data = await store.getters['picture/getPictures'];
    return { pictures: data };
  },
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
.main_content{
  margin: 0;
  z-index: 0;
  display: flex;
  flex-direction: column;
  padding-top: 6rem;

  .pagination_component {
    display: flex;
    justify-content: center;

    .pagination_container {
      list-style: none;
      display: inline-block;
      padding: 0;
      margin-top: 10px;

      .pagination_item {
        display: inline;
        text-align: center;

        .pagination_button {
          float: left;
          display: block;
          font-size: 1.1rem;
          padding: 0;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          color: #fff;
          margin-left: 3px;
          border: 2px solid transparent;
          background-color: transparent;
          cursor: pointer;

          &.active {
            border: 2px solid #e6ba37;
            border-radius: 50%;
            color: white;
            cursor: auto;
          }

          &:hover {
            border: 2px solid #e6ba37;
            border-radius: 50%;
            color: white;
            cursor: pointer;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 600px){
  .main-content{
    width: auto;
  }
}

</style>
