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

<style lang="scss">
.layout_header {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 6rem;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #242424;
  z-index: 100;

  .header_container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1920px;
    height: inherit;

    .header_logo {
      padding: 0 3vh;
      font-weight: 500;
      z-index: 10;
      color: white;
    }

    .header_hamburger {
      width: 14vh;
      height: 6rem;
      position: relative;
      background: transparent;
      z-index: 10;

      > span:first-child {
        top: 1rem;
      }

      > span {
        display: block;
        width: 1.6rem;
        height: 0.2rem;
        margin: auto;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: white;
        transition: left 0.32s;
      }

      > span:last-child {
        bottom: 1rem;
      }
    }

    .header_navigation {
      display: flex;
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      right: -100%;
      background-color: #212121;
      transition: right 0.3s;

      .navigation_list {
        display: inherit;
        width: 100%;
        height: inherit;
        list-style: none;

        .list_item {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          width: inherit;
          height: inherit;

          .item_link {
            display: inherit;
            justify-content: inherit;
            align-items: inherit;
            width: inherit;
            height: inherit;
            position: relative;
            text-align: center;
            text-transform: uppercase;
            font-size: 1.4rem;
            letter-spacing: 0.1vh;
            cursor: pointer;

            .item_modal {
              background-color: transparent;
              color: #e6ba37;
              width: inherit;
              height: inherit;
              position: relative;
              text-align: center;
              text-transform: uppercase;
              font-size: inherit;
              letter-spacing: inherit;
              cursor: pointer;
            }

            .item_logout {
              background-color: transparent;
              width: inherit;
              height: inherit;
              position: relative;
              text-align: center;
              text-transform: uppercase;
              font-size: inherit;
              letter-spacing: inherit;
              color: #fff;
              cursor: pointer;
            }
          }

          @media screen and (min-width: 1024px) {
            .item_link {
              width: auto;
              padding: 0 1vw;
              font-size: 0.8rem;
              letter-spacing: 0.1vh;
              color: #fff;
            }

            .item_link:after {
              content: "";
              display: block;
              width: 0;
              height: 0.25vh;
              margin: auto;
              position: absolute;
              top: 0;
              right: 0;
              bottom: -3.8vh;
              left: 0;
              background: black;
              transition: width 0.32s;
            }
          }
        }

        @media screen and (min-width: 1024px) {
          .list_item {
            width: auto;
            color: white;
          }
        }
      }

      @media screen and (min-width: 1024px) {
        .navigation_list {
          width: auto;
          padding: 0 2vw;
        }
      }
    }

    @media screen and (min-width: 1024px) {
      .header_hamburger {
        display: none;
      }

      .header_navigation {
        width: auto;
        position: static;
        transition: none;
        background: transparent;
      }
    }
  }
}

.is-navigation-active {
  .header_container {
    .header_hamburger {
      > span:nth-child(2) {
        left: -1rem;
      }
    }

    .header_navigation {
      right: 0;

      .navigation_list {
        padding-top: 14vh;
        flex-direction: column;

        .list_item {
          font-weight: 500;
          color: white;
        }

        .item_link {
          color: white;

          .item_modal {
            color: #e6ba37;
          }

          .item_logout {
            color: white;
          }
        }
      }
    }
  }
}

</style>
