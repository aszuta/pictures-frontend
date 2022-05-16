<template>
  <main class="profile_main">
    <div class="profile_container">
      <div class="pomoc">
        <div class="container_info">
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
        :votesUp="picture.votesUp"
        :votesDown="picture.votesDown"
      />
    </div>
  </main>
</template>

<script>
export default {
  async asyncData({ store }) {
    await store.dispatch('picture/getUserPictures');
    const data = await store.getters['picture/getPictures'];
    return { pictures: data };
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
.profile_main {
  padding-top: 18vh;
  display: flex;
  justify-content: center;
  position: relative;

  .profile_container {
    display: inherit;
    flex-direction: column;
    align-items: center;

    .pomoc {
      display: inherit;

      .container_info {
        display: inherit;
        flex-direction: column;

        .image_container {
          border-radius: 50%;
          border: 4px solid #e6ba37;

          .profile_image {
            display: inherit;
            width: 150px;
            height: 150px;
            border-radius: 50%;
            border: 3px solid transparent;
          }
        }

        .profile_name {
          display: inherit;
          justify-content: center;
          padding-top: 2vh;
          color: white;
        }
      }
    }

    .container_form {
      padding: 4vh 0;

      .form_modal {
        cursor: pointer;
        color: #fff;
        border-bottom: 1px solid #949494;
      }
    }
  }
}
</style>
