<template>
  <div>
    <div class="login_body">
      <flexbox>
        <flexbox-item>
          <group label-width="4.5em" label-margin-right="2em" label-align="right">
            <x-input v-model="searchInfo.customerCode" title="" placeholder="请输入证件号码" :min="1" :max="30"  required>
              <x-button @click.native="searchCustomer" slot="right" type="primary" mini>查询</x-button>
            </x-input>
          </group>
        </flexbox-item>
      </flexbox>
        <divider> 查询结果</divider>
        <h4>XXXXXX公司,您的对公账户开户进度如下：</h4>
        <div class="timeline animated">
          <div class="timeline-row active">
            <div class="timeline-time"><small>1.预开户</small> </div>
            <div class="timeline-icon">
              <div class="bg-primary">1<i class="fa fa-pencil"></i></div>
            </div>
            <div class="panel timeline-content">
              <div class="panel-body">
                <h2></h2>
                <p class="status">您的账户已预生成账号，待送人行核准。</p>
              </div>
            </div>
          </div>
          
          <div class="timeline-row active">
            <div class="timeline-time"><small>2.送交人行核准</small></div>
            <div class="timeline-icon">
              <div class="bg-primary">2<i class="fa fa-pencil"></i></div>
            </div>
            <div class="panel timeline-content">
              <div class="panel-body">
                <h2></h2>
                <p class="status">您的账户已送交人行，等待人行核准。</p>
              </div>
            </div>
          </div>

          <div class="timeline-row active">
            <div class="timeline-time"><small>3.账户等待激活</small></div>
            <div class="timeline-icon">
              <div class="bg-muted">3<i class="fa fa-pencil"></i></div>
            </div>
            <div class="panel timeline-content">
              <div class="panel-body">
                <h2></h2>
                <p class="un-status">尚未到达该步骤。</p>
              </div>
            </div>
          </div>

          <div class="timeline-row active">
            <div class="timeline-time"><small>4.正式户</small></div>
            <div class="timeline-icon">
              <div class="bg-muted">4<i class="fa fa-pencil"></i></div>
            </div>
            <div class="panel timeline-content">
              <div class="panel-body">
                <h2></h2>
                <p class="un-status">尚未到达该步骤。</p>
              </div>
            </div>
          </div> 
      </div>
    </div>
  </div>
</template>

<script>
import { Group, XInput, XButton, Search, Flow, FlowState, FlowLine, Flexbox, FlexboxItem, Divider } from 'vux'
export default {
  components: {
    Group,
    XInput,
    XButton,
    Search,
    Flow,
    FlowState,
    FlowLine,
    Flexbox,
    FlexboxItem,
    Divider
  },
  data () {
    return {
      searchInfo: {
        customerCode: ''
      },
      showSearchResult: false,

      customerInfo: {
        customerCode: '',
        customerName: '',
        status: '',
        logID: '',
        openDate: ''
      },
      state: {
        firstFlow: '',
        secondFlow: '',
        thirdFlow: '',
        forthFlow: ''
      }
    }
  },
  // Vue 生命周期中的第一步，进行数据的初期化，和关闭加载窗口
  created: function () {
    // this.getKey()
    this.$store.commit('SWITCH_IS_LOADING', false)
  },
  methods: {
    // 固定初始化方法，init + 页面名称
    initLogin: function () {
    },

    searchCustomer: function () {
      const vm = this
      vm.$http.get('/customer/getCustomer?customerCode=' + vm.searchInfo.customerCode)
      .then(function (res) {
        console.log(res)
        vm.showSearchResult = true
        vm.customerInfo = res
        console.log(vm.customerInfo)
      })
    }
  }
}
</script>
<style scoped>
    .un-status{
      color:#bbbbbb;
      text-align: left;
    }
    .vux-divider{
      color:#FFFFFF;
    }
    .status{
      text-align: left;
    }
    h4{
      color:#FFFFFF;
    }
    div.timeline.animated:after{
      background-color:#FFFFFF;
      width: 3px;
      top:20px;
    }

</style>
