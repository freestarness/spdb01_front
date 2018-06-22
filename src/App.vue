<template>
  <div id="app">
    <router-view class="slideInDown">
    </router-view>
    <loading v-model="isLoading"></loading>
  </div>
</template>

<script>
  import { Loading } from 'vux'
  import { mapState } from 'vuex'
  export default {
    name: 'app',
    components: {
      Loading
    },
    computed: {
      ...mapState({
        isLoading: state => state.app.isLoading
      })
    }
  }
</script>

<style>
  body {
    background-color: #f2f2f2;
  }
</style>
