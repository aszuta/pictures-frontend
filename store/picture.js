/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
import jwtDecode from 'jwt-decode';

export const actions = {
  async addPicture({ commit }, payload) {
    await this.$axios.post('api/picture', payload.formData);
  },

  async getPictures({ commit }) {
    return this.$axios.$get('api/picture');
  },

  async getPicture({ commit }, payload) {
    return this.$axios.$get(`api/picture/${payload.postId}`);
  },

  async getUserPictures({ commit }) {
    const accessToken = await this.$cookies.get('authcookie');
    const decoded = await jwtDecode(accessToken);
    const userId = decoded.sub;
    return this.$axios.$get(`api/picture/file/${userId}`);
  },

  async deletePicture({ commit }, payload) {
    await this.$axios.delete(`api/picture/${payload}`);
  },

  async addVote({ commit }, payload) {
    await this.$axios.post(`api/vote/${payload.postId}`, {
      userId: payload.vote.userId,
      voteType: payload.vote.voteType,
    });
  },

  // eslint-disable-next-line consistent-return
  async getVote({ commit, rootGetters }, payload) {
    if (rootGetters['user/isLoggedIn'] === true) {
      const accessToken = await this.$cookies.get('authcookie');
      const decoded = await jwtDecode(accessToken);
      const userId = decoded.sub;
      return this.$axios.$get(`api/vote?postId=${payload.postId}&userId=${userId}`);
    }
  },

  async deleteVote({ commit }, payload) {
    await this.$axios.delete(`api/vote/${payload.postId}`, { data: payload.vote });
  },
};
