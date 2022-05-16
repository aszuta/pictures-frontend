<template>
  <div class="modal_mask" @click="$emit('close')" @keydown.esc="$emit('close')">
    <div class="modal_wrapper">
      <div class="modal_container" @click.stop="">
        <h2 class="modal_title">Dodaj obrazek</h2>
        <form
          @submit.prevent="submit()"
          enctype="multipart/form-data"
          class="modal_form"
        >
          <div class="form_error">{{ errors.titleError }}</div>
          <label for="title" class="form_label form_title">Dodaj tytuł:</label>
          <input
            id="title"
            v-model="title"
            type="text"
            name=""
            placeholder="Title"
            class="form_input"
          />
          <div class="form_error">{{ errors.fileError }}</div>
          <div class="form_drop_zone" v-if="!file">
            <font-awesome-icon :icon="['fas', 'upload']" class="form_icon"/>
            <label for="file" class="form_label">Kliknij lub przeciągnij obrazek tutaj</label>
            <input
              id="file"
              type="file"
              ref="file"
              accept="image/jpeg,image/png,image/jpg"
              @change="selectFile"
              class="upload_input"
              />
          </div>
          <div class="preview" v-else>
            <img class="preview_img" v-if="url" :src="url" alt="" />
          </div>
          <div class="form_actions">
            <button v-if="file" class="form_button" type="reset" @click="removeFile">Reset</button>
            <button class="form_button" type="submit">Send</button>
          </div>
        </form>
      </div>
      <div
        class="close_button"
        @click="$emit('close')"
        @keydown.esc="$emit('close')"
      >
        <font-awesome-icon :icon="['fas', 'xmark']" />
      </div>
    </div>
  </div>
</template>

<script>
import { pictureValidation } from '../helpers/formsValidation';

export default {
  name: 'PictureForm',
  data() {
    return {
      title: '',
      file: null,
      url: null,
      errors: {
        titleError: null,
        fileError: null,
      },
    };
  },
  methods: {
    selectFile() {
      // eslint-disable-next-line prefer-destructuring
      const data = this.$refs.file?.files[0];
      this.url = URL.createObjectURL(data);
      this.file = data;
    },
    async sendFile() {
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('createdBy', this.$store.state.user.currentUser.id);
      formData.append('picture', this.file);
      await this.$axios.post('/api/picture/file', formData).then(() => {
        this.removeFile();
      });
      this.$nuxt.refresh();
    },
    async submit() {
      const data = {
        title: this.title,
        file: this.file,
      };
      const validation = pictureValidation(data);
      if (validation.errors) {
        const { errors } = validation;
        this.errors = {
          titleError: errors.titleError,
          fileError: errors.fileError,
        };
        console.log(this.errors.fileError);
      } else {
        this.sendFile();
      }
    },
    removeFile() {
      this.title = '';
      this.file = null;
    },
  },
};
</script>

<style lang="scss">
.modal_mask {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
  color: black;

  .modal_wrapper {
    display: flex;
    flex-direction: column;
    position: relative;

    .modal_container {
      width: 500px;
      min-height: 300px;
      margin: 0 auto;
      padding: 20px 30px;
      padding-bottom: 40px;
      background-color: #262626;
      color: white;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
      transition: all 0.3s ease;
    }

    .modal_title {
      font-size: 1.6rem;
      text-align: center;
      margin: 0.8rem 0;
    }

    .modal_form {
      display: flex;
      flex-direction: column;

      .form_error {
        text-align: center;
        margin: 0.4rem 0;
        color: #ff6b6b;
        text-transform: none;
        letter-spacing: 0;
        font-size: 0.9rem;
      }

      .form_label {
        margin: 0.5rem 0;
        font-size: 1.1rem;
      }

      .form_input {
        margin: 0.2rem 0;
        padding: 0.6rem 1rem;
        border: 2px solid white;
        color: #fff;
        background-color: #262626;
        font-size: 1.1rem;
        transition: 0.3s;

        &:hover {
          border: 2px solid #e6ba37;
          transition: 0.3s;
        }
      }

      .form_drop_zone {
        height: 150px;
        width: 100%;
        margin: 0.3rem 0;
        background: #262626;
        border: 2px solid white;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        transition: 0.3s;

        &:hover {
          border: 2px solid #e6ba37;
          transition: 0.3s;
        }

        .form_icon {
          font-size: 2rem;
          margin-bottom: 1.1rem;
        }

        .upload_input {
          width: 500px;
          height: inherit;
          position: absolute;
          opacity: 0;
        }
      }

      .preview {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 1.3rem 0;
        border: 2px solid #fff;
        transition: 0.3s;

        &:hover {
          border: 2px solid #e6ba37;
          transition: 0.3s;
        }

        .preview_img {
          width: 100%;
          height: auto;
        }
      }

      .form_title {
        display: none;
      }

      .form_actions {
        display: inherit;
        justify-content: space-between;

        .form_button {
          margin: 0.4rem 0;
          padding: 0.6rem 1rem;
          border: 2px solid white;
          background: #262626;
          font-size: 1.1rem;
          letter-spacing: 0.1rem;
          color: white;
          cursor: pointer;
          width: 40%;
          transition: 0.3s;

          &:hover {
            background: #e6ba37;
            border: 2px solid #e6ba37;
            color: black;
            transition: 0.3s;
          }
        }
      }
    }

    @media  screen and (max-width: 700px) {
      .modal_container {
        width: auto;
        height: 50vh;
        padding: 2rem 2rem;
        box-shadow: none;

        .modal_form {
          .form_label {
            margin: 0.5rem 1rem;
          }
        }
      }
    }
  }

  .close_button {
    position: absolute;
    font-size: 1.6rem;
    top: 0.8rem;
    right: 0.8rem;
    color: #fff;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
      color: #e6ba37;
      transition: 0.3s;
    }
  }

  @media screen and (max-width: 700px) {
    .close_button {
      font-size: 2rem;
      top: 1rem;
      right: 1rem;
    }
  }
}
</style>
