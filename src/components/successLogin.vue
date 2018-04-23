<template>
  <div id="successLogin">
    <div class='img-wrapper'>
      <img src="../assets/imgs/icon_success.png" alt="">
    </div>
    <p style='font-size: 16px;font-weight: 600'>登录成功</p>
    <p>请尽快绑定设备，进入正常使用</p>
    <p class='btn-wrapper' style='margin-top: 30px'>
      <span class='btn' :class='{ active: isActive=="绑定设备" }' @click='bindDevice("绑定设备")'>绑定设备</span>
    </p>
    <p class='btn-wrapper' v-if="'N' === flowMall">
      <span class='btn' :class='{ active: isActive=="以后绑定" }' @click='bindLater("以后绑定")'>以后绑定</span>
    </p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isActive:'绑定设备',
        loginName:'',
        phoneNo:'',
        flowMall:'',
        bindDevFlag:''
      }
    },
    methods: {
      bindDevice(val){
        this.isActive=val;
        //跳转绑定设备页面
        this.$router.push('/bindDevice?loginName='+this.loginName+"&flowMall="+this.flowMall);
      },
      bindLater(val){
        this.isActive=val;
        //跳转个人中心页
        this.$router.push('/userCenter?loginName='+this.loginName+'&phoneNo='+this.phoneNo);
      },
    },
    components: {},
    beforeCreate: function () {},
    created: function () {},
    beforeMount: function () {
      document.title="登录成功";
      //判断是否绑定设备
      var url = window.location.href;
      var bindDevFlag = this.getQueryString('bindDevFlag',url);
      this.bindDevFlag = this.getQueryString('bindDevFlag',url);
       this.loginName = this.getQueryString('loginName',url);
       this.phoneNo = this.getQueryString('phoneNo',url);
       this.flowMall = this.getQueryString('flowMall',url);

      if(bindDevFlag=='Y'){
        //已绑定
        this.$router.push('/userCenter?loginName='+this.loginName+'&phoneNo='+this.phoneNo);
      };

    },
    mounted: function () {},
    beforeUpdate: function () {},
    updated: function () {},
    activated: function () {},
    deactivated: function () {},
    destroyed: function () {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
#successLogin{
  text-align: center;
  font-size: 14px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: #fff;
  .img-wrapper{
    text-align: center;
    margin-top: 50px;
    img{
      width: 99px;
      height: 99px;
    }
  }
  p{
    padding-top: 10px;
    &.btn-wrapper{
      font-size: 16px;
    }
    span.btn{
      color: #409eff;
      display: inline-block;
      border-radius: 4px;
      background-color: #fff;
      border: 1px solid #409eff;
      width: 40vw;
      padding: 6px;
      &.active{
          color: #fff;
        background-color: #409eff;
      }
    }
  }
}
</style>
