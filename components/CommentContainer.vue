<template>
  <section class="comments_section">
    <div class="form_error">{{ errors.contentError }}</div>
    <form class="container_form" @submit.prevent="submit()">
      <div class="form">
        <div class="container_image">
          <img class="image_item" src="@/assets/default_profile_image.png" alt=""/>
        </div>
        <label class="comment_label" for="comment">Dodaj komentarz: </label>
        <input id="comment" class="comment_input" v-model="content" type="text" name="" placeholder="Treść komentarza">
        <button class="comment_button">
          <font-awesome-icon :icon="['fas', 'paper-plane']" />
        </button>
      </div>
    </form>
    <div class="comments_container">
      <div class="container_title">
        <h2 class="section_title">Komentarze</h2>
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
      const payload = {
        postId: this.postId,
        comment: {
          name: this.name,
          content: this.content,
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
        this.sendComment();
      }
    },
  },
  // created() {
  //   this.commentsData = this.comments;
  // },
};
</script>

<style lang="scss">
.comments_section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  padding-top: 5vh;
  color: white;
  width: 100%;

  .form_error {
    text-align: center;
    margin: 0.4rem 0;
    color: #ff6b6b;
    text-transform: none;
    letter-spacing: 0;
    font-size: 0.9rem;
  }

  .container_form {
    display: flex;
    justify-content: center;

    .form {
      display: inherit;
      flex-direction: row;
      align-items: center;
      width: 610px;

      .container_image {
        display: inline-block;
        cursor: pointer;
        width: 40px;
        height: 40px;
        margin-right: 15px;

        .image_item {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }

      .comment_label {
        display: none;
      }

      .comment_input {
        background-color: transparent;
        border-bottom: 1px solid #949494;
        font-size: 1.2rem;
        outline: 0;
        color: #fff;
        margin-right: 10px;
        width: 510px;
      }

      .comment_button {
        background-color: transparent;
        color: white;
        font-size: 1.4rem;
        cursor: pointer;
      }

      @media screen and (max-width: 610px) {
        .comment_input {
          width: 75%;
        }
      }
    }
  }

  .comments_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    color: white;
    width: 100%;

    .container_title {
      display: inherit;
      justify-content: center;
      margin: 35px 0;

      .section_title {
        display: inherit;
        flex-direction: row;
        width: 610px;
      }
    }
  }
}
</style>
