<template>
  <div class="input">

    <template v-if="!isFile && !isSearch && !isComment">
      <label :for="name" class="form_label form_title">{{ label }}</label>
      <input :id="name" @input="updateValue($event.target.value)" class="form_input" :type="type" :placeholder="placeholder">
    </template>

    <template v-else-if="isFile">
      <label :for="name" class="form_label">{{ label }}</label>
      <input :id="name" @input="updateFile($event.target.files[0])" ref="file" accept="image/jpeg,image/png,image/jpg" class="upload_input" type="file" :placeholder="placeholder">
    </template>

    <template v-else-if="isComment">
      <label :for="name" class="container_label">{{ label }}</label>
      <input :id="name" @input="updateValue($event.target.value)" class="container_input" :type="type" :placeholder="placeholder">
    </template>

    <template v-else-if="isSearch">
      <form @submit.prevent="search">
        <label :for="name">{{ label }}</label>
        <input v-model="inputValue" :id="name" class="search_input" :type="type" :placeholder="placeholder">
        <button class="search_button">
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
        </button>
      </form>
    </template>

  </div>
</template>

<script>
export default {
  name: 'InputContainer',
  props: {
    name: {
      type: String,
    },
    type: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    label: {
      type: String,
    },
    isFile: {
      type: Boolean,
    },
    isSearch: {
      type: Boolean,
    },
    isComment: {
      type: Boolean,
    },
  },
  data() {
    return {
      inputValue: '',
      file: null,
    };
  },
  methods: {
    updateValue(value) {
      this.$emit('input', value);
    },
    updateFile(value) {
      this.url = URL.createObjectURL(value);
      this.file = value;
      const data = {
        url: this.url,
        file: this.file,
      };
      this.$emit('input', data);
    },
    search() {
      this.$router.push(`/search/${this.inputValue}`);
    },
  },
};
</script>
