<template>
  <div id='weixin'>
    wehchat
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user:'',
        password:'',
        notice:'',
        appId:""
      }
    },
    methods: {

    },
    components: {},
    beforeCreate: function () {},
    created: function () {},
    beforeMount: function () {
      var url = window.location.href;
      if(this.getQueryString('appId',url)){
        this.appId = this.getQueryString('appId',url);
      };
      window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?redirect_uri=http%3a%2f%2ftest.duoduomao.mifi.ucpaas.com%2fapp%2f#%2freferIdWaiting%3fappId='+this.appId+'&response_type=code&scope=snsapi_base&state=1#wechat_redirect';
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
</style>
