export default ({ app }) => {
  setInterval(async () => {
    await app.store.dispatch('user/checkRefreshToken');
  }, 30000);
};
