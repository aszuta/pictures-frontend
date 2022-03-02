<template>
  <div>
    <form class="box" method="post" @submit.prevent="login()">
      <h1>Login</h1>
      <label for="email">Email: </label>
      <input id="email" v-model="email" type="text" name="" placeholder="Email">
      <label for="password">Password: </label>
      <input id="password" v-model="password" type="password" name="" placeholder="Password">
      <input type="submit" name="" placeholder="Login">
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: 'siema@gmail.com',
      password: 'siema123',
    };
  },
  methods: {
    async login() {
      await this.$store.dispatch('user/loginUser', { email: this.email, password: this.password });
      this.$router.push('/DashboardVue');
    },
  },
};

</script>

<style scoped>

</style>
