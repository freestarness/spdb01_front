<template>
  <div>
    <img class="login_head" slot="label">
    <div class="login_body">
      <group label-width="4.5em" label-margin-right="2em" label-align="right">
        <x-input title="" placeholder="请输入登陆账号" v-model="loginInfo.userName"  type="text" required>
          <img class="icon" slot="label" src="../../assets/img/icon_openAccount_userName.png">
        </x-input>
        <x-input title="" placeholder="请输入登陆密码"  v-model="loginInfo.loginPassword"  required>
          <img class="icon" slot="label" src="../../assets/img/icon_openAccount_repeatPwd.png">
        </x-input>
      </group>
    </div>
    <div class="login_foot">
      <box gap="10px 10px">
        <x-button type="warn" @click.native="submitLogin" :show-loading="isLoading" :disabled="isDisable">{{btnContent}}</x-button>
      </box>
    </div>
  </div>
</template>

<script>
import { Group, XInput, XButton, Box, cookie, querystring } from 'vux'
export default {
  components: {
    Group,
    XInput,
    XButton,
    Box
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      loginInfo: {
        userName: '',
        loginPassword: ''
      },
      isDisable: false,
      isLoading: false,
      btnContent: '登录'
    }
  },
  // Vue 生命周期中的第一步，进行数据的初期化，和关闭加载窗口
  created: function () {
  },
  methods: {
    // 固定初始化方法，init + 页面名称
    initLogin: function () {
    },
    beforeSubmit: function () {
      const vm = this
      vm.isDisable = true
      vm.isLoading = true
      vm.btnContent = '正在登录...'
    },
    submitLogin: function () {
      const vm = this
      vm.beforeSubmit()
      vm.$http.post('/admin/login', querystring.stringify(vm.loginInfo))
      .then(function (res) {
        vm.onSuccess(res)
      }).catch(function (err) {
        vm.onError(err)
      })
    },
    onSuccess: function (res) {
      const vm = this
      // 按钮恢复
      vm.isDisable = vm.isLoading = false
      vm.btnContent = '登录'
      // 登录信息放入cookie
      cookie.set('userId', res.userId)
      cookie.set('token', res.token)
      cookie.set('tokenExpired', res.tokenExpired)

      vm.$store.commit('SET_USER_ID', res.userId)
      vm.$store.commit('SET_TOKEN', res.token)
      vm.$store.commit('SET_EXPIRES', res.tokenExpired)
      vm.$vux.toast.show({
        time: 1000,
        text: '登陆成功',
        onHide: function () {
          vm.$router.push('/customer/list')
        }
      })
    },
    onError: function () {
      const vm = this
      vm.isDisable = vm.isLoading = false
      vm.btnContent = '登录'
    }
  }
}
</script>

<style scoped>
  .icon{
    width: 50%;
  }
  .login_head {
    width:100%;
  }
  .login_body{
    margin-top:10%;
  }
  .login_foot{
    margin-top:15%;
  }
</style>
