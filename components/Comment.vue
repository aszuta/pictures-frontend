<template>
  <article class="comment_container">
    <div class="container_main">
      <div class="main_image">
        <img class="image_item" src="@/assets/default_profile_image.png" alt=""/>
      </div>
      <div class="main_container">
        <div class="container_header">
          <span class="header_username">{{ name }}</span>
          <span class="header_date">{{ date }}</span>
        </div>
        <div class="container_content">
          <span class="content_main">{{ content }}</span>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'Comment',
  props: {
    name: {
      type: String,
    },
    content: {
      type: String,
    },
    date: {
      type: String,
    },
  },
};
</script>
