<template>
  <div class="App_layout">
    <Nav />
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: 'PageLayout',
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Rubik&display=swap");

* {
  margin: 0;
  padding: 0;
  border: none;
  box-sizing: border-box;
  font-family: inherit;
  text-decoration: inherit;
  font-family: Rubik;
}

html, body {
  overflow-x: hidden;
}

.App_layout {
  width: 100%;
  min-height: 100vh;
  background-color: #262626;
}
</style>
