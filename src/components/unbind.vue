<template>
  <div id="unbind">
    <div class="mask" :class='{active:notActive}'></div>
    <div class='box' :class='{active:notActive}'>
      <h2>解除绑定 <i class='close' @click='closeBox'></i></h2>
      <p style='font-weight: 600;margin-top: 10px'>确定要解除绑定关系吗？</p>
      <p style='color: #ccc'>解除后不影响设备的正常使用</p>
      <span class='unbind-btn' @click='confirmUnbind'>确认解除</span>
    </div>
    <div class='wrapper'>
      <p><span>设备编号：</span>{{idxViFiID}}</p>
      <p><span>IMEI：</span>{{imei}}</p>
    </div>
    <div class='btn-wrapper'>
      <a href="javascript:;" class='login' @click='unbind'>解除绑定</a>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user:'',
        password:'',
        notActive:false,
        loginName:'',
        idxViFiID:'',
        imei:''
      }
    },
    methods: {
      closeBox(){
        this.notActive = false;
      },
      unbind(){
        this.notActive = true;
      },
      confirmUnbind(){
        this.notActive = false;
        this.yPost(this.yzxhttp+'appApi/appDev/relaxUserDev',{
        }).then(
          (response)=>{
            if(response.data.resultCode=== 0){
                this.$router.push('/unbindSuc?loginName='+this.loginName);
            }else{
              //错误提示
              this.notice=response.data.message;
            }
          });
      },
    },
    components: {},
    beforeCreate: function () {},
    created: function () {},
    beforeMount: function () {
      document.title="解绑";
      var url = window.location.href;
      this.loginName = this.getQueryString('loginName',url);
      this.idxViFiID = this.getQueryString('idxViFiID',url);
      this.imei = this.getQueryString('imei',url);
      //
      this.referId = this.referId;
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
  .mask{
    display: none;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    &.active{
      display: block;
    }
  }
  .box{
    display: none;
    width: 70vw;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 99;
    text-align: center;
    border-radius: 10px;
    font-size: 14px;
    &.active{
      display: block;
    }
    h2{
      padding: 10px 0;
      margin: 0;
      font-size: 16px;
      border-bottom: 0.5px solid #ccc;
      position: relative;
      .close{
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url("../assets/imgs/icon_close.png") no-repeat;
        background-size: 100%;
        position: absolute;
        right: 15px;
      }
    }
    p{
      line-height: 26px;
    }
    .unbind-btn{
      display: inline-block !important;
      margin-top: 15px;
      margin-bottom: 30px;
      display: inline-block;
      width: 60% !important;
      height: 38px;
      line-height: 38px;
      text-align: center !important;
      background-color: #409eff;
      color: #fff !important;
      border-radius: 4px;
    }
  }
  #unbind{
    font-size: 14px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
    p{
      span{
        color: #ccc;
        display: inline-block;
        width: 70px;
        text-align: right;
      }
    }
    .wrapper{
      padding: 10px 15px;
      border-bottom: 0.5px solid #ccc;
    }
    .btn-wrapper{
      padding: 0px 15px;
    }
    .login{
      margin-top: 30px;
      display: inline-block;
      width: 100%;
      height: 38px;
      line-height: 38px;
      text-align: center;
      background-color: #409eff;
      /*#86b8e6*/
      color: #fff;
      border-radius: 4px;
    }
  }
</style>
