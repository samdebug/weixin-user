<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  body,html{
    padding: 0;
    margin: 0;
    width: 100%;
    background-color: rgb(245,245,245);
    -webkit-overflow-scrolling: touch;
  }
#app {
  font-family: 'microsoft yahei', Helvetica, Arial, sans-serif;
  /* font-weight: 300; */
  margin: 0;
  padding: 0;
}

</style>
