<template>
  <div class="mainbar">
    <div class="main">
      <div class="picture_container">
        <div class="picture_header">
          <div class="header_container">
            <img class="container_image" src="@/assets/default_profile_image.png" alt=""/>
          </div>
          <nuxt-link :to="`/profile/${createdBy}`" class="picture_author">{{ name }}</nuxt-link>
          <nuxt-link :to="`/picture/${postId}`" class="picture_title">{{ title }}</nuxt-link>
        </div>
        <div class="container">
          <img class="container_img" :src="`/public/${filename}`" alt="">
        </div>
        <button v-if="createdBy === userId" class="delete_button" @click="deletePicture(postId)">Delete</button>
      </div>
      <div class="vote">
        <div class="vote_up_container" :class="[voteUpActive ? 'active' : '']">
          <font-awesome-icon class="vote_icon" :icon="['far', 'thumbs-up']" @click="addVote('voteUp')" @keydown="addVote('voteUp')"/>
          <span class="vote_count">{{ votesUp }}</span>
        </div>
        <div class="vote_down_container" :class="voteDownActive ? 'active' : ''">
          <font-awesome-icon class="vote_icon" :icon="['far', 'thumbs-down']" @click="addVote('voteDown')" @keydown="addVote('voteDown')"/>
          <span class="vote_count">{{ votesDown }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PictureCard',
  props: {
    postId: {
      type: Number,
    },
    userId: {
      type: Number,
    },
    createdBy: {
      type: Number,
    },
    createdAt: {
      type: String,
    },
    name: {
      type: String,
    },
    title: {
      type: String,
    },
    filename: {
      type: String,
    },
    filepath: {
      type: String,
    },
    votesUp: {
      type: Number,
    },
    votesDown: {
      type: Number,
    },
  },
  data() {
    return {
      voteUpActive: false,
      voteDownActive: false,
      score: 0,
      vote: '',
    };
  },
  created() {
    this.getVote().then(() => {
      console.log(this.vote.userId);
      console.log(this.vote.postId);
      console.log(this.vote.voteType);
      if (this.vote.voteType === 'voteUp') {
        this.voteUpActive = true;
      } else if (this.vote.voteType === 'voteDown') {
        this.voteDownActive = true;
      }
    });
    console.log(this.voteUpActive);
    console.log(this.voteDownActive);
  },
  methods: {
    async getVote() {
      const res = await this.$store.dispatch('picture/getVote', { postId: this.postId });
      this.vote = res;
    },
    async deletePicture(postId) {
      await this.$store.dispatch('picture/deletePicture', postId);
      this.$nuxt.refresh();
    },
    async addVote(type) {
      console.log(this.postId);
      console.log(this.userId);
      const payload = {
        postId: this.postId,
        vote: {
          userId: this.userId,
          voteType: type,
        },
      };
      console.log(payload);
      if (this.voteUpActive === true && type === 'voteUp') {
        await this.$store.dispatch('picture/deleteVote', payload);
        this.voteUpActive = false;
      } else if (this.voteDownActive === true && type === 'voteDown') {
        await this.$store.dispatch('picture/deleteVote', payload);
        this.voteDownActive = false;
      } else {
        await this.$store.dispatch('picture/addVote', payload);

        this.voteUpActive = false;
        this.voteDownActive = false;

        if (type === 'voteUp') {
          this.voteUpActive = true;
        } else if (type === 'voteDown') {
          this.voteDownActive = true;
        }
      }
    },
  },
};
</script>

<style lang="scss">
.mainbar {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;

  .main {
    background-color: #303030;
    border-radius: 5px;
    margin: 1rem 3rem;

    .picture_container {
      color: white;
      max-width: 610px;

      .picture_header {
        display: flex;
        align-items: center;
        padding: 1rem 1rem;

        .header_container {
          display: inline-block;
          cursor: pointer;
          width: 40px;
          height: 40px;

          .container_image {
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }

        .picture_author {
          margin-left: 10px;
          color: #fff;
        }

        .picture_title {
          margin-left: 30px;
          color: #fff;
          text-decoration: none;
          font-size: 1.5rem;
        }
      }

      .container {
        max-width: 610px;

        .container_img {
          height: auto;
          display: block;
          width: 610px;
        }

        @media screen and (max-width: 610px){
          .container_img {
            width: 100%;
          }
        }
      }

      .delete_button {
        float: right;
        border: 2px solid red;
        border-radius: 5px;
        background-color: red;
        color: black;
        font-size: 1.2rem;
        padding: 0.3rem 1rem;
        margin-top: 0.4rem;
        cursor: pointer;
      }
    }

    .vote {
      color: white;

      .vote_up_container {
        display: inline-flex;
        font-size: 1.2rem;
        justify-content: space-around;
        padding: 0.3rem 1rem;
        margin-top: 0.4rem;
        border-radius: 5px;
        border: 1px solid #949494;
        cursor: pointer;

        &:hover {
          background-color: #949494;
          border: 1px solid #949494;
        }

        &:active {
          background-color: #e6ba37;
          border: 1px solid #e6ba37;
        }

        .vote_count {
          margin-left: 15px;
        }
      }

      .vote_down_container {
        display: inline-flex;
        font-size: 1.2rem;
        justify-content: space-around;
        padding: 0.3rem 1rem;
        margin-top: 0.4rem;
        border-radius: 5px;
        border: 1px solid #949494;
        cursor: pointer;

        &:hover {
          background-color: #949494;
          border: 1px solid #949494;
        }

        &:active {
          background-color: #e6ba37;
          border: 1px solid #e6ba37;
        }

        .vote_count {
          margin-left: 15px;
        }
      }

      .active {
        background-color: #e6ba37;
        border: 1px solid #e6ba37;
        color: black;
      }
    }
  }
}
</style>
