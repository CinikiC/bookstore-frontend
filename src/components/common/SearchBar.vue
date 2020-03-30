<template>
    <el-container>
      <el-input @keyup.enter.native="searchClick" placeholder="输入作者名或书名开始搜索..." prefix-icon="el-icon-search" size="small" v-model="keywords"></el-input>
      <el-button size="small" type="primary" icon="el-icon-search" @click="searchClick">搜索</el-button>
    </el-container>
</template>

<script>
export default {
  name: 'SearchBar',
  data () {
    return {
      keywords: '',
      books: [],
      cardLoading: ''
    }
  },
  methods: {
    searchClick () {
      this.$emit('onSearch')
    }
  }
}
</script>

<style scoped>

</style>
