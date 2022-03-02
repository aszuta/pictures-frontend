<template>
  <div>
    <div>
      <form method="post" @submit.prevent="register()">
        <h1>Register</h1>
        <label for="name">Name: </label>
        <input id="name" v-model="name" type="text" name="" placeholder="Name">
        <label for="email">Email: </label>
        <input id="email" v-model="email" type="text" name="" placeholder="Email">
        <label for="password">Password: </label>
        <input id="password" v-model="password" type="password" name="" placeholder="Password">
        <input type="submit" name=""  placeholder="Register">
      </form>
    </div>
    <div class="info">
      <div class="min-info">Masz konto?</div>
        <NuxtLink to="/login" class="sign-up">Zaloguj się</NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
    };
  },
  methods: {
    register() {
      this.$store.dispatch('user/registerUser', {
        name: this.name,
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

<style scoped>

</style>
