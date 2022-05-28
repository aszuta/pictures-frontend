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
