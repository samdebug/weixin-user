<template>
  <div id="noTaocan">
    <div class='img-wrapper'>
      <img src="../assets/imgs/no-flow.png" alt="">
    </div>
    <p style='font-size: 14px;color: #ccc;'>一个套餐都没有，真扫兴</p>


  </div>
</template>

<script>
  export default {
    data() {
      return {
        isActive:'绑定设备'
      }
    },
    methods: {
      login(){

      }
    },
    components: {},
    beforeCreate: function () {},
    created: function () {},
    beforeMount: function () {
      document.title="支付结果";
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
  #noTaocan{
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
          color:  #fff;
          background-color: #409eff;
        }
      }
    }
  }
</style>
