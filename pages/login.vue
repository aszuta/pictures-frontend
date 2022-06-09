<template>
  <section class="section_container">
    <div class="container_content">
      <form class="content_form" method="post" @submit.prevent="login()">
        <h1 class="form_title">Login</h1>
        <div class="form_error">{{ error }}</div>
        <InputContainer v-model="email" type="text" placeholder="Email" name="email" label="Email: " />
        <InputContainer v-model="password" type="password" placeholder="Password" name="password" label="Password: "/>
        <button type="submit" class="form_button">Zaloguj</button>
      </form>
      <div class="content_info">
        <div class="min_info">Nie masz konta?</div>
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
