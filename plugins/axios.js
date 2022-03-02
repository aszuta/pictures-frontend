/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
export default ({
  $axios, app, store, redirect,
}) => {
  $axios.onRequest((config) => {
    const token = app.$cookies.get('authcookie');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  });

  $axios.onError(async (error) => {
    const status = error.response.data.statusCode;
    if (status === 401) {
      store.commit('user/setUser', null);
      redirect('/DashboardVue');
      // store.dispatch('user/refresh');
    }
  });
};
