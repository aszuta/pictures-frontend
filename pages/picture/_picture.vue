<template>
  <div>
    <div>{{ picture.title }}</div>
    <div>{{ picture.filepath }}</div>
  </div>
</template>

<script>
export default {
  async asyncData({ params: { picture }, $axios }) {
    const data = await $axios.$get(`api/picture/file/${picture}`);
    return { picture: data };
  },
};
</script>

<style scoped>

</style>
