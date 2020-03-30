<template>
    <div>
      <navi-bar></navi-bar>
      <router-view/>
    </div>
</template>

<script>
import NaviBar from './common/NaviBar'
export default {
  name: 'Home',
  components: {
    NaviBar
  }
}
</script>

<style scoped>

</style>
