<template>
  <div>
    <header class="global-header">
      <div class="top">
        <div class="row">
          <div class="global-logo">Jakieś logo</div>
          <button class="modal">Dodaj obrazek</button>
          <div class="user-name">{{ currentUser.name }}</div>
          <button class="logout-button" @click.prevent="logOut">Log Out</button>
        </div>
      </div>
    </header>
    <PictureCard
      v-for="picture in itemsForList"
      :key="picture.id"
      :postId="picture.id"
      :userId="currentUser.id"
      :createdBy="picture.createdBy"
      :title="picture.title"
      :filename="picture.filename"
      :filepath="picture.filepath"
    />
    <div class="pagination-component">
      <span v-for="(item, index) in new Array(numberPages)" :key="index">
        <button @click="pageNumber = index + 1">{{ index + 1 }}</button>
      </span>
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
      title: '',
      file: '',
      perPage: 2,
      pageNumber: 1,
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
    selectFile() {
      // eslint-disable-next-line prefer-destructuring
      const data = this.$refs.file.files[0];
      this.file = data;
    },
    async sendFile() {
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('createdBy', this.currentUser.id);
      formData.append('picture', this.file);
      await this.$store.dispatch('picture/addPicture', formData);
      this.$nuxt.refresh();
    },
    getUser() {
      return this.$store.dispatch('user/getUser');
    },
    logOut() {
      this.$store.dispatch('user/logOutUser');
    },
  },
  mounted() {
    this.getUser();
  },
};

</script>

<style scoped>

</style>
