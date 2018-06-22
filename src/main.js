// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import {AjaxPlugin, AlertPlugin, ConfirmPlugin, ToastPlugin} from 'vux'

AjaxPlugin.$http.defaults.baseURL = '/api'
Vue.use(AjaxPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)

require('es6-promise').polyfill()

Vue.config.productionTip = false

const whiteList = ['/login', '/process', '/process1']
router.beforeEach(function (to, from, next) {
  console.log('跑到beforeEach了')
  store.commit('SWITCH_IS_LOADING', true)
  // 判断页面直接进入还是重定向
  if (whiteList.indexOf(to.path) !== -1) {
    // console.log('在免登录白名单，直接进入')
    next()
  } else {
    // 不在白名单，先判断cookie中的时间戳是否过期
    const nowTimestamp = new Date().getTime()
    // console.log('不在白名单，获取当前时间戳为：' + nowTimestamp + '类型为：' + typeof (nowTimestamp))
    const cookieTimestamp = Number(store.getters.expires)
    // console.log('不在白名单，cookie中的时间戳没转number前为：' + store.getters.expires)
    // console.log('不在白名单，cookie中的时间戳转number后为：' + cookieTimestamp + '类型为：' + typeof (cookieTimestamp))
    if (nowTimestamp < cookieTimestamp) {
      // console.log('不在白名单，cookie中的时间戳没有过期,直接进入')
      next()
    } else {
      store.commit('SWITCH_IS_LOADING', false)
      // console.log('不在白名单，cookie中的时间戳过期了,返回登录页')
      next('/login') // 否则全部重定向到登录页
    }
  }
})
// 切换页面时,隐藏正在加载
router.afterEach(function (to) {
  console.log('跑到afterEach了')
  store.commit('SWITCH_IS_LOADING', false)
})

// 添加一个请求拦截器
AjaxPlugin.$http.interceptors.request.use(function (config) {
  // 在请求发送之前做一些事
  if (store.getters.token) {
    // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    config.headers['x-lt-token'] = store.getters.token
  }
  // 在请求发送之前做一些事
  store.commit('SWITCH_IS_LOADING', true)
  return config
})

// 添加一个全局AjaxPlugin返回拦截器
AjaxPlugin.$http.interceptors.response.use(function (res) {
  // 对返回的数据进行一些处理
  store.commit('SWITCH_IS_LOADING', false)
  return res.data.data
}, function (error) {
  store.commit('SWITCH_IS_LOADING', false)
  console.error(error.response.data.msg)
  let msg = error.response.data.msg
  Vue.$vux.alert.show({
    title: '提示',
    content: msg
  })
  return Promise.reject(error)
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
