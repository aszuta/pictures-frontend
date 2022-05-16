/* eslint-disable consistent-return */
export default function ({ store, redirect }) {
  if (store.getters['user/isLoggedIn']) {
    return redirect('DashboardVue');
  }
}
