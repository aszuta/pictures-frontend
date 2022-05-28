<template>
  <section class="comments_section">
    <div class="form_error">{{ errors.contentError }}</div>
    <form class="section_form" @submit.prevent="submit()">
      <div class="form_container">
        <div class="container_image">
          <img class="image_item" src="@/assets/default_profile_image.png" alt=""/>
        </div>
        <label class="container_label" for="comment">Dodaj komentarz: </label>
        <input id="comment" class="container_input" v-model="content" type="text" name="" placeholder="Treść komentarza">
        <button class="container_button">
          <font-awesome-icon :icon="['fas', 'paper-plane']" />
        </button>
      </div>
    </form>
    <div class="section_comments">
      <div class="comments_container">
        <h2 class="container_title">Komentarze</h2>
      </div>
      <Comment
        v-for="comment in comments" :key="comment.id"
        :name="comment.name"
        :content="comment.content"
        :date="comment.createdAt"
      />
    </div>
  </section>
</template>

<script>
import { commentValidation } from '../helpers/formsValidation';

export default {
  name: 'CommentsContainer',
  props: {
    comments: {},
    postId: {
      type: Number,
    },
    name: {
      type: String,
    },
  },
  data() {
    return {
      commentsData: null,
      content: '',
      errors: {
        contentError: null,
      },
    };
  },
  methods: {
    async sendComment() {
      const { postId, name, content } = this;
      const payload = {
        postId,
        comment: {
          name,
          content,
        },
      };
      await this.$store.dispatch('comment/addComment', payload);
      await this.$nuxt.refresh();
    },
    async submit() {
      const data = {
        content: this.content,
      };
      const validation = commentValidation(data);
      if (validation.errors) {
        const { errors } = validation;
        this.errors = {
          contentError: errors.contentError,
        };
      } else {
        await this.sendComment();
      }
    },
  },
};
</script>
