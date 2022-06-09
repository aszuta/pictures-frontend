<template>
  <main class="profile_main">
    <div class="main_container">
      <div class="container_content">
        <div class="content_info">
          <div class="image_container">
            <img class="profile_image" src="@/assets/default_profile_image.png" alt=""/>
          </div>
          <div class="profile_name">{{ currentUser.name }}</div>
        </div>
      </div>
      <div class="container_form">
        <span class="form_modal" @click="showModal = true" @keydown="showModal = false">Wpisz Tytuł dla swojego obrazka</span>
        <PictureForm element="modal" v-if="showModal" @close="showModal = false" />
      </div>
      <PictureCard
        v-for="picture in pictures"
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
  </main>
</template>

<script>
export default {
  async asyncData({ params: { profile }, store }) {
    const user = await store.dispatch('user/getUser', { id: profile });
    const data = await store.dispatch('picture/getUserPictures');
    return {
      pictures: data,
      user,
    };
  },
  data() {
    return {
      showModal: false,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.user.currentUser;
    },
  },
};
</script>
