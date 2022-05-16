/* eslint-disable no-console */
/* eslint-disable no-shadow */
import jwtDecode from 'jwt-decode';

export const state = () => ({
  accessToken: null,
  currentUser: '',
});

export const getters = {
  isLoggedIn(state) {
    return !!state.accessToken;
  },

  getUserInfo(state) {
    return state.currentUser;
  },
};

export const mutations = {
  setAccessToken(state, token) {
    state.accessToken = token;
  },

  setUser(state, data) {
    state.currentUser = data;
  },
};

export const actions = {
  async loginUser({ commit }, payload) {
    await this.$axios.post('/api/user/login', payload, {
      withCredentials: true,
    });
    const token = this.$cookies.get('authcookie');
    commit('setAccessToken', token);
  },

  async registerUser({ commit }, payload) {
    await this.$axios.post('/api/user/register', payload, {
      withCredentials: true,
    });
    const token = this.$cookies.get('authcookie');
    commit('setAccessToken', token);
  },

  async logOutUser({ commit }) {
    await this.$axios.post('/api/user/logout', {
      withCredentials: true,
    });
    commit('setAccessToken', null);
  },

  async getUser({ commit }) {
    const res = await this.$axios.$get('/api/user/profile', {
      withCredentials: true,
    });
    commit('setUser', res);
    return res;
  },

  // eslint-disable-next-line consistent-return
  async checkRefreshToken({ state, dispatch }) {
    if (state.currentUser !== '') {
      try {
        const accessToken = await this.$cookies.get('authcookie');

        if (!accessToken) {
          return await dispatch('refresh');
        }

        const decoded = await jwtDecode(accessToken);
        const exp = decoded.exp - 30;
        const expDate = Date.now() / 1000;

        if (expDate > exp) {
          return await dispatch('refresh');
        }
      } catch (error) {
        this.$router.push('/LoginVue');
      }
    }
  },

  async refresh({ commit }) {
    this.$cookies.removeAll();
    await this.$axios.get('/api/user/refresh', {
      withCredentials: true,
    });
    const token = this.$cookies.get('authcookie');
    commit('setAccessToken', token);
  },
};
