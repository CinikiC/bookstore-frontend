<template>
  <div>
    <el-row style="height: 840px;">
      <search-bar @onSearch="searchResult" ref="searchBar"></search-bar>
      <el-tooltip effect="dark" placement="right"
                  v-for="item in books.slice((currentPage-1)*pageSize, currentPage*pageSize)"
                  :key="item.id">
        <p slot="content" style="font-size: 14px;margin-bottom: 6px;">{{item.title}}</p>
        <p slot="content" style="font-size: 13px;margin-bottom: 6px">
          <span>{{item.author}}</span> /
          <span>{{item.publishdate}}</span> /
          <span>{{item.press}}</span>
        </p>
        <p slot="content" style="width: 300px" class="abstract">{{item.abs}}</p>
        <el-card style="width: 135px;margin-bottom: 20px;height: 233px;float: left;margin-right: 15px" class="book"
                 bodyStyle="padding:10px" shadow="hover">
          <div class="cover">
            <img :src="item.cover" alt="封面">
          </div>
          <div class="info">
            <div class="title">
              {{item.title}}
              <el-button size="mini" round placement="right" v-on:click="dialogFormVisible=true, bookid=item.id">购买</el-button>
            </div>
          </div>
          <div class="author">{{item.author}}  ￥{{item.price}}</div>
        </el-card>
      </el-tooltip>
    </el-row>
    <el-row>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="books.length">
      </el-pagination>
    </el-row>
    <el-dialog title="选择购买数量" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="购买数量">
          <el-slider v-model="number" show-input></el-slider>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取消</el-button>
        <el-button type="primary" @click="submit(bookid)">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SearchBar from '../common/SearchBar'
export default {
  name: 'Books',
  components: {
    SearchBar
  },
  data () {
    return {
      books: [],
      currentPage: 1,
      pageSize: 15,
      dialogFormVisible: false,
      number: 0,
      bookid: 0
    }
  },
  mounted: function () {
    this.loadBooks()
  },
  methods: {
    loadBooks () {
      var _this = this
      this.$axios
        .get('/books')
        .then(resp => {
          if (resp && resp.status === 200) {
            _this.books = resp.data
          }
        })
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
    },
    searchResult () {
      var _this = this
      this.$axios
        .get('/search?keywords=' + this.$refs.searchBar.keywords, {})
        .then(resp => {
          if (resp && resp.status === 200) {
            _this.books = resp.data
          }
        })
    },
    submit (bookid) {
      var post = {
        uid: this.$store.state.user.uid,
        bookid: this.books[-(bookid - this.books.length)].id,
        number: this.number,
        title: this.books[-(bookid - this.books.length)].title,
        price: this.books[-(bookid - this.books.length)].price
      }
      this.$axios.post('/carts', post).then(resp => {
        if (resp && resp.status === 200) {
          this.$message.success('已添加到购物车！')
          this.dialogFormVisible = false
        } else {
          this.$message.error('发生未知错误！')
        }
      })
      console.log(post)
      // console.log(this.books[-(bookid - this.books.length)])
      // console.log(this.$store.state.user)
      // console.log(this.number)
    }
  }
}
</script>

<style scoped>
  .cover {
    width: 115px;
    height: 172px;
    margin-bottom: 7px;
    overflow: hidden;
    cursor: pointer;
  }

  img {
    width: 115px;
    height: 172px;
    /*margin: 0 auto;*/
  }

  .title {
    font-size: 14px;
    text-align: left;
  }

  .author {
    color: #333;
    width: 102px;
    font-size: 13px;
    margin-bottom: 6px;
    text-align: left;
  }

  .abstract {
    display: block;
    line-height: 17px;
  }

  a {
    text-decoration: none;
  }

  a:link, a:visited, a:focus {
    color: #3377aa;
  }
</style>
