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
