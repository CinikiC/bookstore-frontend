<template>
  <el-container>
    <el-aside width="200px">
      <Category @indexSelect="listByCategory" ref="Category"></Category>
    </el-aside>
    <el-container>
      <el-main>
        <Managment class="book-area" ref="bookArea"></Managment>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Category from './home/Category'
import Managment from './admin/Managment'
export default {
  name: 'Admin',
  components: {
    Category,
    Managment
  },
  methods: {
    listByCategory () {
      var _this = this
      var cid = this.$refs.Category.cid
      var url = '/categories/' + cid + '/books'
      this.$axios
        .get(url)
        .then(resp => {
          if (resp && resp.status === 200) {
            _this.$refs.bookArea.books = resp.data
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
