/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
export default ({
  $axios, app, /* store, redirect, */
}) => {
  $axios.onRequest((config) => {
    const token = app.$cookies.get('authcookie');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  });

  // $axios.onError(async (error) => {
  //   const status = error.response.data.statusCode;
  //   console.log(status);
  //   if (status === 401) {
  //     store.commit('user/setUser', null);
  //     redirect('/LoginVue');
  //     store.dispatch('user/refresh');
  //   }
  // });
};
