/* eslint-disable no-console */
/* eslint-disable no-shadow */
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
  async getPictures({ commit }) {
    const pictures = await this.$axios.$get('api/picture/files');
    commit('setPictures', pictures);
  },
};
