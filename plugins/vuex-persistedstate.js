import createPersistedState from 'vuex-persistedstate';

export default ({ store, app }) => {
  createPersistedState({
    key: 'user',
    paths: [
      'user.accessToken',
    ],
    storage: {
      getItem: (key) => app.$cookies.get(key),
      setItem: (key, value) => app.$cookies.set(key, value, {
        path: '/',
        expires: new Date(Date.now() + 5 * 60 * 1000),
      }),
    },
    assertStorage() {
      return !!app.$cookies;
    },
  })(store);
};
