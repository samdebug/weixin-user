<template>
  <div id='registerProtocol'>
    <h2>协议内容</h2>
    <p>"环球漫游"是由北京环球友邻有限公司自建并运营的电子商务网站。环球漫游公司将通过本网站向您提供优质的环球wifi租赁及相关服务，并严格遵守本协议及相关承诺。当您通过本网站系统注册成为用户或以其它方式获得本网站所提供的商品及相关服务时，即表明您已经完全接受并签署了本协议。</p>
    <div class='list-wrapper'>
      <h3>一.协议接纳</h3>
      <p>
        1、您应当认真阅读本协议，对于协议中粗体字的内容和涉及重要权益的内容，您应当加以重点阅读。如果您对本协议中的某一或某些条款产生疑问，您应当向环球漫游公司咨询。如果您不同意本协议中的某一或某些条款，您应当立即停止注册。
      </p>
      <p>
        2、本协议为电子形式的协议，是处理您与环球漫游公司一切权利义务关系的约定，对双方均具有法律约束力。
      </p>
    </div>
    <div class='list-wrapper'>
      <h3>一.服务说明</h3>
      <p>
        1、您应当认真阅读本协议，对于协议中粗体字的内容和涉及重要权益的内容，您应当加以重点阅读。如果您对本协议中的某一或某些条款产生疑问，您应当向环球漫游公司咨询。如果您不同意本协议中的某一或某些条款，您应当立即停止注册。
      </p>
      <p>
        2、本协议为电子形式的协议，是处理您与环球漫游公司一切权利义务关系的约定，对双方均具有法律约束力。
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    methods: {
    },
    components: {},
    beforeCreate: function () {},
    created: function () {},
    beforeMount: function () {
      document.title="注册";
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
  #registerProtocol{
    color: #666;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
    h2{
      color: #000;
      font-size: 16px;
      text-align: center;
      border-bottom: 1px solid #ccc;
      padding-bottom: 8px;
    }
    h3{
      color: #000;
      padding-left: 10px;
      padding-right: 10px;
      font-size: 14px;
      font-weight: 600;
    }
    p{
      padding-left: 10px;
      padding-right: 10px;
      font-size: 14px;
      line-height: 24px;
    }
  }
</style>
