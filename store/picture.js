/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
import jwtDecode from 'jwt-decode';

export const state = () => ({
  pictures: [],
});

export const mutations = {
  setPictures(state, pictures) {
    state.pictures = pictures;
  },
};

export const getters = {
  getPictures(state) {
    return state.pictures;
  },
};

export const actions = {
  async addPicture({ commit }, payload) {
    await this.$axios.post('api/picture/file', payload.formData);
  },

  async getPictures({ commit }) {
    const pictures = await this.$axios.$get('api/picture/files');
    commit('setPictures', pictures);
  },

  async getPicture({ commit }, payload) {
    const picture = await this.$axios.$get(`api/picture/file/${payload.postId}`);
    return picture;
  },

  async getUserPictures({ commit }, payload) {
    const accessToken = await this.$cookies.get('authcookie');
    const decoded = await jwtDecode(accessToken);
    const userId = decoded.sub;
    const pictures = await this.$axios.$get(`api/picture/pictures/${userId}`);
    commit('setPictures', pictures);
  },

  async deletePicture({ commit }, payload) {
    await this.$axios.delete(`api/picture/file/${payload}`);
  },

  async addVote({ commit }, payload) {
    await this.$axios.post(`api/vote/${payload.postId}`, {
      userId: payload.vote.userId,
      voteType: payload.vote.voteType,
    });
  },

  async getVote({ commit }, payload) {
    const accessToken = await this.$cookies.get('authcookie');
    const decoded = await jwtDecode(accessToken);
    const userId = decoded.sub;
    const vote = await this.$axios.$get(`api/vote/${payload.postId}/${userId}`);
    return vote;
  },

  async deleteVote({ commit }, payload) {
    await this.$axios.delete(`api/vote/${payload.postId}`, { data: payload.vote });
  },
};
