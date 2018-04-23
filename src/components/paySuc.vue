<template>
  <div id="successLogin">
    <div class='img-wrapper'>
      <img src="../assets/imgs/icon_success.png" alt="">
    </div>
    <p style='font-size: 16px;font-weight: 600'>支付成功！</p>
    <p class='btn-wrapper' style='margin-top: 30px'>
      <span class='btn active'  @click='goUserCenter'>返回个人中心</span>
    </p>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        isActive:'绑定设备',
        loginName:''
      }
    },
    methods: {
      goUserCenter(){
        this.$router.push('/userCenter?loginName='+this.loginName);
      }
    },
    components: {},
    beforeCreate: function () {},
    created: function () {},
    beforeMount: function () {
      document.title="支付结果";
      var url = window.location.href;
      var loginName = this.getQueryString('loginName',url);
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
          color:  #409eff;
          background-color: #fff;
          border: 1px solid #409eff;
        }
      }
    }
  }
</style>
