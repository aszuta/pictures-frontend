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
  setLoginSuccess(state) {
    state.setLoginSuccess = true;
  },

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
    commit('setLoginSuccess');
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
    const res = await this.$axios.get('/api/user/profile', {
      withCredentials: true,
    });
    commit('setUser', res.data);
    return res.data;
  },

  // eslint-disable-next-line consistent-return
  async checkRefreshToken({ dispatch }) {
    try {
      const accessToken = await this.$cookies.get('authcookie');
      console.log(accessToken);

      if (!accessToken) {
        return await dispatch('refresh');
      }

      const decoded = await jwtDecode(accessToken);
      console.log(decoded);
      const exp = decoded.exp - 30;
      console.log(exp);
      const expDate = Date.now() / 1000;
      console.log(expDate);

      if (expDate > exp) {
        return await dispatch('refresh');
      }
    } catch (error) {
      console.log(error);
    }
  },

  async refresh({ commit }) {
    this.$cookies.removeAll();
    await this.$axios.get('/api/user/refresh', {
      withCredentials: true,
    });
    // this.$cookies.set('authcookie', res.data.accessToken, {
    //   expires: new Date(Date.now() + 5 * 60 * 1000),
    // });
    // this.$cookies.set('refreshtoken', res.data.refreshToken, {
    //   httpOnly: true,
    // });
    const token = this.$cookies.get('authcookie');
    commit('setAccessToken', token);
  },
};
