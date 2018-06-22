<template>
  <div>
    <div>
      <flexbox>
        <flexbox-item>
          <group label-width="4.5em" label-margin-right="2em" label-align="right">
            <x-input v-model="searchInfo.customerCode" title="" placeholder="请输入证件号码" :min="1" :max="30" ref="refCustomerCode"></x-input>
          </group>
        </flexbox-item>
      </flexbox>
    </div>
    <div>
      <flexbox class="btn_sure">
        <flexbox-item>
          <x-button @click.native="addCustomer" type="warn">新增</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button @click.native="searchCustomer" type="primary">查询</x-button>
        </flexbox-item>
      </flexbox>
      <divider> 查询结果</divider>
    </div>
    <div v-if="customerList.length !== 0">
      <div class="weui-cells vux-no-group-title" v-for="(item, index) in customerList">
        <div class="weui-cell">
          <div class="weui-cell__hd"></div>
          <div class="vux-cell-bd vux-cell-primary">
            <label class="vux-label">客户名称：{{item.customerName}}</label>
            <span class="vux-label-desc"></span>
          </div>
          <div class="vux-cell-modify" @click="modifyCustomer(item.id)"><img src="../../assets/img/icon_modify.png"></div>
        </div>
        <div class="weui-cell vux-cell-form-preview">
          <div class="weui-form-preview__bd">
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">证件号码：{{item.customerCode}}</label>
              <span class="weui-form-preview__value"></span>
            </div>
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label" v-if="item.status == 1">开户状态：预开户</label>
              <label class="weui-form-preview__label" v-if="item.status == 2">开户状态：待核准</label>
              <label class="weui-form-preview__label" v-if="item.status == 3">开户状态：待激活</label>
              <label class="weui-form-preview__label" v-if="item.status == 4">开户状态：已完成</label>
              <span class="weui-form-preview__value"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="noData" v-else>
      <img src="../../assets/img/noData.png">
      <p>暂无录入公司信息</p>
    </div>
  </div>
</template>

<script>
import { Group, XInput, XButton, Search, Flexbox, FlexboxItem, Divider, Cell } from 'vux'
export default {
  components: {
    Group,
    XInput,
    XButton,
    Search,
    Flexbox,
    FlexboxItem,
    Divider,
    Cell
  },
  data () {
    return {
      searchInfo: {
        customerCode: ''
      },
      customerList: []
    }
  },
  // Vue 生命周期中的第一步，进行数据的初期化，和关闭加载窗口
  created: function () {
    const vm = this
    vm.initCustomer().then(function (res) {
      vm.customerList = res
      console.log(vm.customerList)
    })
  },
  methods: {
    // 固定初始化方法，init + 页面名称
    initCustomer: function () {
      const vm = this
      return vm.$http.get('/customer/listCustomer')
    },
    searchCustomer: function () {
      const vm = this
      vm.$http.get('/customer/listCustomer?customerCode=' + vm.searchInfo.customerCode)
      .then(function (res) {
        vm.customerList = res
      })
    },
    addCustomer: function () {
      const vm = this
      vm.$router.push('/customer/add')
    },
    modifyCustomer: function (id) {
      const vm = this
      vm.$router.push({path: '/customer/modify', query: { id: id }})
    }
  }
}
</script>
<style scoped>
  .btn_sure{
    margin: auto;
    margin-top: 1.17647059em;
  }

  .vux-cell-modify{
    color: #999;
  }
  .vux-cell-modify > img{
    width: 20px;
  }
  .weui-form-preview__item{
    color: #999;
    font-size: 14px;
  }

  /*无数据*/
  .noData{
    margin-top: 20%;
    text-align: center;
  }
  .noData img{
    width: 50%;
  }
  .noData p{
    color: #afaaaa;
  }
</style>
