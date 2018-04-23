<template>
  <div id='waiting'
       v-loading="loading2"
       :element-loading-text='text'
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)">

  </div>
</template>

<script>
  export default {
    data() {
      return {
        code:'',
        loading2:true,
        num:30,
        isActive:false,
        text:'拼命加载中'
      }
    },
    methods: {
      time(){

        if (this.num == 1) {
          this.text='等待超时，请重新进入！'
          return
        } else {
          this.num--;
        };
        var that = this;
        setTimeout(function() {
          that.time();
        },1000)
      }
    },
    components: {},
    beforeCreate: function () {
    },
    created: function () {},
    beforeMount: function () {
      /*this.time();*/
      var url = window.location.href;
     // url ='http://test.duoduomao.mifi.ucpaas.com/app/#/?referId=o8bIW03SNGi9dFwk1h6gmKN7q3tQ&type=user'
      var referId = this.getQueryString('refeId',url);
      //存referId
      this.lcookie.setCookies("referId",referId);
      this.referId = referId;


      var type = this.getQueryString('type',url);
  //    alert("referId:"+this.referId+"   type:"+type+"    cookieReferId:"+this.lcookie.getCookies("referId"));
      if(referId){
        if(type=='mall'){
          //跳转商城
          this.$router.push("/flowMall");
        }else if(type=='user'){
          //跳转登陆页
          this.$router.push("/");
        }

      }
    /*  if(this.getQueryString('code',url)){
        this.code = this.getQueryString('code',url);
        this.yPost(this.yzxhttp+'appApi/appUser/getWeixinToken',{
          code:this.code
        }).then(
          (response)=>{
            if(response.data.resultCode== 0){
              var referId = response.data.data.referId;
              //存referId
              this.lcookie.setCookies("referId",referId);
              //跳转登陆页
              this.$router.push("/");
            }else{

            }
          });
      }else{

      }*/
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
  #waiting{
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-80%);
  }
</style>
