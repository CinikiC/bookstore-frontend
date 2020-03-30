<template>
    <div>
      <navi-bar></navi-bar>
      <div v-for="item in carts" :key="item.cartid">
        <div>{{item.book.title}}</div>
        <div>{{item.book.price}}</div>
        <div>{{item.number}}</div>
        <p></p>
      </div>
    </div>
</template>

<script>
import NaviBar from './common/NaviBar'
export default {
  name: 'Cart',
  components: {NaviBar},
  data () {
    return {
      carts: []
    }
  },
  mounted: function () {
    this.loadCarts()
  },
  methods: {
    loadCarts () {
      var _this = this
      this.$axios
        .get('/carts')
        .then(resp => {
          if (resp && resp.status === 200) {
            _this.carts = resp.data
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
