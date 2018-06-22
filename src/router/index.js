import Vue from 'vue'
import Router from 'vue-router'
// "@"表示src，下方路径即为 “src/.../...”
import Login from '@/components/login/login'
import Process from '@/components/customer/process'
import Process1 from '@/components/customer/process1'
import CustomerList from '@/components/manager/customer_list'
import CustomerAdd from '@/components/manager/customer_add'
import CustomerModify from '@/components/manager/customer_modify'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/process',
      name: 'Process',
      component: Process
    },
    {
      path: '/process1',
      name: 'Process1',
      component: Process1
    },
    {
      path: '/customer/list',
      name: 'customerList',
      component: CustomerList
    },
    {
      path: '/customer/add',
      name: 'customerAdd',
      component: CustomerAdd
    },
    {
      path: '/customer/modify',
      name: 'customerModify',
      component: CustomerModify
    }
  ]
})
