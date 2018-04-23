<template>
  <div id='bindDevice'>
    <div class='login-wrapper'>
      <el-input
        placeholder="设备编号"
        v-model="deviceNum"
        @change='validata'
        clearable>
      </el-input>
      <el-input v-model="IMEI" placeholder="IMEI号" clearable @change='validata'></el-input>
      <p class='notice'>{{notice}}</p>
      <a href="javascript:;" class='login' @click='bindDeviceBtn'>设备绑定</a>
    </div>
    <div class='device-num'>
      <p>设备编号位置</p>
      <div class="img-wrapper">
        <img src="../assets/imgs/deviceNumPic.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        deviceNum:'',
        IMEI:'',
        notice:'',
        loginName:'',
        flowMall:''
      }
    },
    methods: {
      validata(){
        this.notice = "";
        if(this.deviceNum!=""&&this.IMEI!=""){
          $(".login").css('background-color','#409eff');
        }else{
          $(".login").css('background-color','#86b8e6');
        };
      },
      bindDeviceBtn(){
        if(this.deviceNum!=""&&this.IMEI!=""){
          this.yPost(this.yzxhttp+'appApi/appDev/bindUserDev',{
            idxViFiId:this.deviceNum,
            imei:this.IMEI,
          }).then(
            (response)=>{
              if(response.data.resultCode=== 0){
                if(this.flowMall&&this.flowMall=="Y"){
                  this.$router.push('/flowMall');
                }else{
                  this.$router.push('/bindSuc?loginName='+this.loginName);
                }
              }else{
                //错误提示
                this.notice=response.data.message;
              }
            });
        }
      }
    },
    beforeMount: function () {
      document.title="绑定设备";
      var url = window.location.href;
      this.loginName = this.getQueryString('loginName',url);
      this.flowMall = this.getQueryString('flowMall',url);
    },
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #bindDevice{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: #fff;
    .img-wrapper{
      text-align: center;
      margin-top: 16vh;
      img{
        width: 38vw;
      }
    }
    .login-wrapper{
      padding: 0 15px;
      .el-input{
        height: 46px;
        border-bottom: 0.5px solid #ccc;
        padding-top: 5px;
        box-sizing: border-box;
      }
      input{
        border: none;
        border-radius: 0;
        width: 100%;
      }
      .login{
        display: inline-block;
        width: 100%;
        height: 38px;
        line-height: 38px;
        text-align: center;
        background-color: #86b8e6;
        /*#*/
        color: #fff;
        border-radius: 4px;
      }
      .forget-pw{
        font-size: 12px;
        color: #409eff;
        float: right;
        margin-top: 15px;
      }
      .notice{
        color: red;
        font-size: 12px;
        height: 32px;
        line-height: 32px;
      }
    }
    .device-num{
      margin-top: 70px;
      padding: 0 15px;
      p{
        font-size: 14px;
        color: #666;
      }
      .img-wrapper{
        width: 100%;
        height: 160px;
        margin-top: 10px;
      img{
        display: inline-block;
        width: 100%;
       /* height: 100%;*/
      }
      }
    }
  }
</style>
