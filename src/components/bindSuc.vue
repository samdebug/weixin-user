<template>
  <div id="successBind">
    <div class='img-wrapper'>
      <img src="../assets/imgs/icon_success.png" alt="">
    </div>
    <p style='font-size: 16px;font-weight: 600'>绑定成功</p>
    <p class='btn-wrapper' style='margin-top: 30px'>
      <span class='btn' :class='{ active: isActive=="立即充值" }' @click='bindDevice("立即充值")'>立即充值</span>
    </p>
    <p class='btn-wrapper'>
      <span class='btn' :class='{ active: isActive=="以后绑定" }' @click='bindLater("以后绑定")'>以后再说</span>
    </p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isActive:'立即充值',
        loginName:'',
        phoneNo:''
      }
    },
    methods: {
      bindDevice(val){
        this.isActive=val;
        //跳转充值页面
        this.$router.push('/flowMall');
      },
      bindLater(val){
        this.isActive=val;
        //跳转个人中心页
        this.$router.push('/userCenter?loginName='+this.loginName);
      },
    },
    beforeMount: function () {
      document.title="绑定成功";
      //判断是否绑定设备
      var url = window.location.href;
      var bindDevFlag = this.getQueryString('bindDevFlag',url);
      this.loginName = this.getQueryString('loginName',url);
      this.phoneNo = this.getQueryString('phoneNo',url);

      if(bindDevFlag=='Y'){
        //已绑定
        this.$router.push('/userCenter?loginName='+this.loginName+'&phoneNo='+this.phoneNo);
      };

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #successBind{
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
