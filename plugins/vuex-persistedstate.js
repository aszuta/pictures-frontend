import createPersistedState from 'vuex-persistedstate';

export default ({ store, app }) => {
  createPersistedState({
    key: 'user',
    paths: [
      'user.accessToken',
      'user.currentUser',
    ],
    storage: {
      getItem: (key) => app.$cookies.get(key),
      setItem: (key, value) => app.$cookies.set(key, value, {
        path: '/',
        expires: new Date(Date.now() + 5 * 60 * 1000),
      }),
      removeItem: (key) => app.$cookies.remove(key),
    },
    assertStorage() {
      return !!app.$cookies;
    },
  })(store);
};
