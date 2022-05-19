<template>
  <section class="section_container">
    <div class="dupa">
      <form class="container_form" method="post" @submit.prevent="submit()">
        <h1 class="form_title">Register</h1>
        <div class="form_error">{{ errors.nameError }}</div>
        <label for="name">Name: </label>
        <input id="name" class="form_input" v-model="name" type="text" name="" placeholder="Name">
        <div class="form_error">{{ errors.emailError }}</div>
        <label for="email">Email: </label>
        <input id="email" class="form_input" v-model="email" type="text" name="" placeholder="Email">
        <div class="form_error">{{ errors.passwordError }}</div>
        <label for="password">Password: </label>
        <input id="password" class="form_input" v-model="password" type="password" name="" placeholder="Password">
        <button class="form_button" type="submit">Zarejestruj</button>
      </form>
      <div class="container_info">
        <div class="min_info">Masz konto?</div>
        <NuxtLink to="/LoginVue" class="sign_up">Zaloguj się</NuxtLink>
      </div>
    </div>
  </section>
</template>

<script>
import { userValidation } from '../helpers/formsValidation';

export default {
  middleware: ['is-logged-out'],
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
      this.$router.push('LoginVue');
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
        this.register();
      }
    },
  },
};
</script>

<style lang="scss">
.section_container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 6rem;
  height: 80vh;
  color: #fff;

  .dupa {
    display: flex;
    flex-direction: column;

    .container_form {
      display: flex;
      flex-direction: column;
      padding: 1rem 2rem;

      .form_title {
        text-align: center;
        margin: 0.4rem 0;
      }

      .form_error {
        text-align: center;
        margin: 0.4rem 0;
        color: #ff6b6b;
        text-transform: none;
        letter-spacing: 0;
        font-size: 0.9rem;
      }

      .form_input {
        margin: 0.2rem 0;
        padding: 0.6rem 1rem;
        border: 2px solid white;
        background-color: #262626;
        font-size: 1.1rem;
        transition: 0.3s;
        width: 350px;
        color: white;

        &:hover {
          border: 2px solid #e6ba37;
          transition: 0.3s;
        }
      }

      .form_button {
        margin: 1rem 0;
        padding: 0.6rem 1rem;
        border: 2px solid #e6ba37;
        background: #e6ba37;
        font-size: 1.1rem;
        letter-spacing: 0.1rem;
        color: black;
        cursor: pointer;
        transition: 0.3s;

        &:hover {
          background: #ffd24a;
          border: 2px solid #ffd24a;
          color: black;
          transition: 0.3s;
        }
      }
    }

    .container_info {
      display: flex;
      flex-direction: column;

      .min_info {
        display: flex;
        justify-content: center;
      }

      .sign_up {
        display: flex;
        justify-content: center;
        color: #e6ba37;
      }
    }
  }
}
</style>
