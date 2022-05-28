<template>
  <header class="layout_header" :class="[isNavigationActive ? 'is-navigation-active' : '']">
    <div class="header_container">
      <div class="header_logo">Logo</div>
      <Search/>
      <button class="header_hamburger" @click="open()">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav class="header_navigation">
        <ul class="navigation_list" @click="isNavigationActive = false" @keydown="isNavigationActive = false">
          <li class="list_item">
            <div class="item_link">
              <button class="item_modal" @click="openModal()" @keydown="showModal = false">Dodaj</button>
              <PictureForm element="modal" v-if="showModal" @close="showModal = false" />
            </div>
          </li>
          <li class="list_item">
            <nuxt-link :to="`/top`" class="item_link">Top</nuxt-link>
          </li>
          <li class="list_item">
            <nuxt-link :to="`/login`" v-if="isLoggedIn === false" class="item_link">Zaloguj</nuxt-link>
            <nuxt-link v-else :to="`/profile/${currentUser.id}`" class="item_link">{{ currentUser.name }}</nuxt-link>
          </li>
          <li class="list_item">
            <div class="item_link">
              <nuxt-link :to="`/register`" v-if="isLoggedIn === false" class="item_link">Zarejestruj</nuxt-link>
              <button v-else class="item_logout" @click.prevent="logOut">Wyloguj</button>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
    },
  },
  data() {
    return {
      isNavigationActive: false,
      showModal: false,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.user.currentUser;
    },
    // eslint-disable-next-line vue/return-in-computed-property
    isLoggedIn() {
      return this.$store.getters['user/isLoggedIn'];
    },
  },
  methods: {
    open() {
      this.isNavigationActive = !this.isNavigationActive;
    },
    openModal() {
      if (this.isLoggedIn === true) {
        this.showModal = !this.showModal;
      } else {
        this.$router.push('login');
      }
    },
    logOut() {
      this.$store.dispatch('user/logOutUser');
    },
  },
};
</script>
