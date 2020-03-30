<template>
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="6">
        <el-button icon="el-icon-house" v-on:click="$router.replace('/home')">主页</el-button>
      </el-col>
      <el-col :span="6">
        <h3>欢迎 {{this.$store.state.user.username}} {{this.$store.state.user.uid}}！</h3>
      </el-col>
      <el-col :span="6">
        <el-button icon="el-icon-shopping-cart-2" v-on:click="$router.replace('/cart')">我的购物车</el-button>
      </el-col>
    </el-row>
</template>

<script>
export default {
  name: 'NaviBar',
  data () {
    return {}
  }
}
</script>

<style scoped>
  .row-bg {
    margin-bottom: 20px;
    border-radius: 10px;
    border: 1px #2c3e50;
    padding: 10px 10px 10px 10px;
  }
  el-col {
    border-radius: 4px;
    border-radius: 10px;
    border: 1px #2c3e50;
  }
</style>
