<template>
  <div>
    Witaj {{ currentUser.name }}<br>
    <form @submit.prevent="sendFile" enctype="multipart/form-data">
      <label for="title">Dodaj tytuł: </label>
      <input id="title" v-model="title" type="text" name="" placeholder="Title">
      <label for="file">Dodaj obrazek: </label>
      <input id="file" type="file" ref="file" @change="selectFile">
      <button>Send</button>
    </form>
    <button @click.prevent="logOut">Log Out</button>
    <div v-for="picture in pictures" :key="picture.id">
      <nuxt-link :to="`picture/${picture.filename}`">{{ picture.title }}</nuxt-link>
      <div>{{ picture.filename }}</div>
      <div>{{ picture.filepath }}</div>
      <img :src="`./uploads/files/${picture.filename}`" alt="">
      <button @click="deletePicture(picture.id)">Delete</button>
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
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.user.currentUser;
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
      await this.$axios.post('/api/picture/file', formData);
      this.$nuxt.refresh();
    },
    async deletePicture(id) {
      await this.$axios.delete(`api/picture/file/${id}`);
      this.$nuxt.refresh();
    },
    getUser() {
      const user = this.$store.dispatch('user/getUser');
      return user;
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
