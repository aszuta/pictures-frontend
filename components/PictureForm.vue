<template>
  <div class="modal_mask" @click="$emit('close')" @keydown.esc="$emit('close')">
    <div class="modal_wrapper">
      <div class="modal_container" @click.stop="">
        <h2 class="modal_title">Dodaj obrazek</h2>
        <form @submit.prevent="submit()" enctype="multipart/form-data" class="modal_form">
          <div class="form_error">{{ errors.titleError }}</div>
          <InputContainer v-model="title" type="text" placeholder="Title" name="title" label="title" />
          <div class="form_error">{{ errors.fileError }}</div>
          <div class="form_drop_zone" v-if="!data.file">
            <font-awesome-icon :icon="['fas', 'upload']" class="form_icon"/>
            <InputContainer v-model="data" name="file" label="Kliknij lub przeciągnij obrazek tutaj" is-file/>
          </div>
          <div class="preview" v-else>
            <img class="preview_img" v-if="data.url" :src="data.url" alt="" />
          </div>
          <div class="form_actions">
            <button v-if="data.file" class="form_button" type="reset" @click="removeFile">Reset</button>
            <button class="form_button" type="submit">Send</button>
          </div>
        </form>
      </div>
      <div class="close_button" @click="$emit('close')" @keydown.esc="$emit('close')" >
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
      data: {
        url: null,
        file: null,
      },
      errors: {
        titleError: null,
        fileError: null,
      },
    };
  },
  methods: {
    async sendFile() {
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('createdBy', this.$store.state.user.currentUser.id);
      formData.append('picture', this.data.file);
      await this.$axios.post('/api/picture/file', formData).then(() => {
        this.removeFile();
      });
      this.$nuxt.refresh();
    },
    async submit() {
      const data = {
        title: this.title,
        file: this.data.file,
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
      this.data.file = null;
    },
  },
};
</script>
