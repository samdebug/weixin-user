<template>
  <div id="lessBalance">
    <div class='img-wrapper'>
      <img src="../assets/imgs/lessBalance.png" alt="">
    </div>
    <p style='color: #666'>余额不足</p>
    <p class='btn-wrapper' style='margin-top: 30px'>
      <span class='btn' :class='{ active: isActive=="继续支付" }' @click='bindDevice("继续支付")'>继续支付</span>
    </p>
    <p class='btn-wrapper'>
      <span class='btn' :class='{ active: isActive=="稍后支付" }' @click='bindLater("稍后支付")'>稍后支付</span>
    </p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isActive:'继续支付'
      }
    },
    methods: {
      bindDevice(val){
        this.isActive=val;
      },
      bindLater(val){
        this.isActive=val;
      },
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
  #lessBalance{
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
