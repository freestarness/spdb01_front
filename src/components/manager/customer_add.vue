<template>
  <!--模板部分,这一块是视图层,只可以有一个最上级标签-->
  <div>
    <!--收货信息-->
    <group title="客户名称">
      <x-input title="客户名称" name="customerName" v-model="addInfo.customerName" placeholder="请输入客户名称"  required></x-input>
    </group>
    <group title="客户证件号码">
      <x-input title="证件号码" name="customerCode" v-model="addInfo.customerCode" placeholder="请输入证件号码"  required></x-input>
    </group>
    <group title="客户状态" >
      <popup-picker title="客户状态" :data="statuslist" v-model="addInfo.status" placeholder="请选择客户状态" show-name alue-text-align="right"></popup-picker>
    </group>
    <group title="开户时间(天)" v-if="addInfo.status[0]=='3'||addInfo.status=='4'">
      <x-input title="开户时间（天）" name="openDate" v-model="addInfo.openDate" placeholder="请输入开户时间" keyboard="number"></x-input>
    </group>
    <!--按钮-->
    <flexbox class="btn_customer">
      <flexbox-item>
        <x-button type="warn" @click.native="submitCustomer()">提交</x-button>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import { XInput, Group, XButton, Flexbox, FlexboxItem, PopupPicker, querystring } from 'vux'
export default {
  components: {
    XInput,
    Group,
    PopupPicker,
    XButton,
    Flexbox,
    FlexboxItem
  },
  data () {
    return {
      addInfo: {
        customerCode: '',
        customerName: '',
        status: ['1'],
        openDate: ''
      },
      statuslist: [[{
        name: '预开户',
        value: '1'
      }, {
        name: '待核准',
        value: '2'
      }, {
        name: '待激活',
        value: '3'
      }, {
        name: '已完成',
        value: '4'
      }]]
    }
  },
  // Vue 生命周期中的第一步，进行数据的初期化，和关闭加载窗口
  created: function () {
  },
  methods: {
    // 固定初始化方法，init + 页面名称
    initCustomer: function () {
    },
    submitCustomer: function () {
      const vm = this
      if (vm.addInfo.customerCode == '') {
        this.$vux.alert.show({
          title: '提示',
          content: '客户证件号码不能为空'
        })
      } else if (vm.addInfo.customerName == '') {
        this.$vux.alert.show({
          title: '提示',
          content: '客户名称不能为空'
        })
      } else if ((vm.addInfo.status[0] == '3' || vm.addInfo.status[0] == '4') && vm.addInfo.openDate <= 0) {
        this.$vux.alert.show({
          title: '提示',
          content: '开户时间不能小于1天'
        })
      } else {
        vm.$http.post('/customer/addCustomer', querystring.stringify(vm.addInfo))
        .then(function (res) {
          vm.onSuccess(res)
        })
      }
    },
    onSuccess: function (res) {
      const vm = this
      vm.$vux.toast.show({
        time: 1000,
        text: '添加成功',
        onHide: function () {
          vm.$router.push('/customer/list')
        }
      })
    }
  }
}
</script>
<style scoped>
  .btn_customer{
    width: 90%;
    margin: auto;
    margin-top: 15px;
  }
</style>
