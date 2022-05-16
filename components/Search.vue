<template>
  <div class="header_search">
    <form @submit.prevent="search">
      <label for="search"></label>
      <input id="search" class="search_input" type="text" v-model="input" placeholder="Search title..."/>
      <button class="search_button">
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
    };
  },
  methods: {
    search() {
      this.$router.push(`/search/${this.input}`);
    },
  },
};
</script>

<style lang="scss">
.header_search {
  display: inherit;
  justify-content: center;
  align-items: inherit;
  width: inherit;
  height: inherit;
  position: relative;

  .search_input {
    padding: 6px;
    font-size: 14px;
    border-radius: 40px;
    text-align: center;
  }

  .search_button {
    float: right;
    padding: 7px 10px;
    background-color: #e6ba37;
    cursor: pointer;
    border-radius: 40px;
  }

  @media screen and (min-width: 1024px) {
    .search_input {
      width: 300px;
    }
  }
}
</style>
