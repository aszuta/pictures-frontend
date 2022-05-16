<template>
  <article class="comment_container">
    <div class="maina">
      <div class="container_image">
        <img class="image_item" src="@/assets/default_profile_image.png" alt=""/>
      </div>
      <div class="container_main">
        <div class="main_header">
          <span class="header_username">{{ name }}</span>
          <span class="header_date">{{ date }}</span>
        </div>
        <div class="main_container">
          <span class="container_content">{{ content }}</span>
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

<style lang="scss">
.comment_container {
  display: inherit;
  justify-content: center;
  margin-bottom: 35px;

  .maina {
    display: inherit;
    flex-direction: row;
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

    .container_main {
      display: inherit;
      flex-direction: column;

      .main_header {
        margin-bottom: 2px;
        display: inherit;
        flex-direction: row;

        .header_username {
          margin-right: 10px;
          margin-bottom: 2px;
          display: block;
        }

        .header_date {
          color: #949494;
        }
      }
    }

    .main_container {
      display: block;
      max-width: 550px;

      .container_content {
        font-size: 1.2rem;
        width: 100%;
      }
    }

    @media  screen and (max-width: 610px) {
      .main_container {
        max-width: 300px;
      }
    }
  }
}
</style>
