/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
export const state = () => ({
  comments: [],
});

export const mutations = {
  setComments(state, comments) {
    state.comments = comments;
  },
};

export const getters = {
  getComments(state) {
    return state.comments;
  },
};

export const actions = {
  async addComment({ commit }, payload) {
    await this.$axios.post(`api/comment/${payload.postId}`, payload.comment);
  },

  async getComments({ commit }, payload) {
    const comments = await this.$axios.$get(`api/comment/${payload.postId}`);
    commit('setComments', comments);
  },

  async deleteComment({ commit }, payload) {
    await this.$axios.delete(`api/comment/${payload.postId}`);
  },
};
