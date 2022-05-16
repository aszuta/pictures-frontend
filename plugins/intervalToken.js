export default ({ app }) => {
  setInterval(async () => {
    if (app.store.getters['user/isLoggedIn']) {
      await app.store.dispatch('user/checkRefreshToken');
    }
  }, 30000);
};
