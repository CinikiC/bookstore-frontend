<template>
  <el-container>
    <el-aside width="200px">
      <Category @indexSelect="listByCategory" ref="Category"></Category>
    </el-aside>
    <el-container direction="vertical">
      <el-header>
        <Swiper></Swiper>
      </el-header>
      <el-main>
        <Books class="book-area" ref="bookArea"></Books>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Category from './Category'
import Swiper from './Swiper'
import Books from './Books'
export default {
  name: 'AppIndex',
  components: {
    Category,
    Swiper,
    Books
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
.book-area{
  margin-top: 250px;
}
</style>
