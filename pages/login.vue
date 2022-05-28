<template>
  <section class="section_container">
    <div class="container_content">
      <form class="content_form" method="post" @submit.prevent="login()">
        <h1 class="form_title">Login</h1>
        <div class="form_error">{{ error }}</div>
        <label for="email">Email: </label>
        <input id="email" class="form_input" v-model="email" type="text" name="" placeholder="Email">
        <label for="password">Password: </label>
        <input id="password" class="form_input" v-model="password" type="password" name="" placeholder="Password">
        <button type="submit" class="form_button">Zaloguj</button>
      </form>
      <div class="content_info">
        <div class="min_info">Nie masz konto?</div>
        <NuxtLink to="/register" class="sign_up">Zarejestruj się</NuxtLink>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  middleware: ['is-logged-in'],
  data() {
    return {
      email: '',
      password: '',
      error: '',
    };
  },
  methods: {
    async login() {
      try {
        const { email, password } = this;
        await this.$store.dispatch('user/loginUser', { email, password });
        this.$router.push('/');
      } catch (error) {
        this.error = 'Niepoprawny login lub hasło.';
      }
    },
  },
};

</script>
