<template>
  <section class="section_container">
    <div class="container_content">
      <form class="content_form" method="post" @submit.prevent="submit()">
        <h1 class="form_title">Register</h1>
        <div class="form_error">{{ errors.nameError }}</div>
        <InputContainer v-model="email" type="text" placeholder="Name" name="name" label="Name: " />
        <div class="form_error">{{ errors.emailError }}</div>
        <InputContainer v-model="email" type="text" placeholder="Email" name="email" label="Email: " />
        <div class="form_error">{{ errors.passwordError }}</div>
        <InputContainer v-model="email" type="password" placeholder="Password" name="password" label="Password: " />
        <button class="form_button" type="submit">Zarejestruj</button>
      </form>
      <div class="content_info">
        <div class="min_info">Masz konto?</div>
        <NuxtLink to="/login" class="sign_up">Zaloguj się</NuxtLink>
      </div>
    </div>
  </section>
</template>

<script>
import { userValidation } from '../helpers/formsValidation';

export default {
  middleware: ['is-logged-in'],
  data() {
    return {
      name: '',
      email: '',
      password: '',
      errors: {
        nameError: null,
        emailError: null,
        passwordError: null,
      },
    };
  },
  methods: {
    async register() {
      await this.$store.dispatch('user/registerUser', {
        name: this.name,
        email: this.email,
        password: this.password,
      });
      this.$router.push('login');
    },
    async submit() {
      const data = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      const validation = userValidation(data);
      if (validation.errors) {
        const { errors } = validation;
        this.errors = {
          nameError: errors.nameError,
          emailError: errors.emailError,
          passwordError: errors.passwordError,
        };
      } else {
        await this.register();
      }
    },
  },
};
</script>
