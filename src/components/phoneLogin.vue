<template>
  <div id='pboneLogin'>
    <div class='img-wrapper'><img src="../assets/imgs/default_xiaoG_logo.png" alt=""></div>
    <div class='login-wrapper'>
      <el-input v-model="phoneNum" placeholder="手机号" @change='validate'></el-input>
      <div class='get-code'>
        <el-input v-model="passCode" placeholder="验证码"  @change='validate'></el-input>
        <span class='code' @click='getCode' :class='{ active: isActive }'>获取验证码</span>
        <span class='code' :class='{ active: !isActive }'>{{num}}s</span>
      </div>
      <p class='notice'>{{notice}}</p>
      <a href="javascript:;" class='login' @click='login'>登录</a>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        phoneNum:'',
        passCode:'',
        num:60,
        isActive:true,
        notice:"",
      }
    },
    methods: {
      //获取验证码
      getCode(){
        var that = this;
        if(this.phoneNum==''){
          this.$message({
            message: '请输入正确手机号',
            type: 'warning'
          });
          return;
        };
        if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(that.phoneNum)){
          this.$message({
            message: '请输入正确手机号',
            type: 'warning'
          });
          return;
        };
       /* if(this.isActive){*/
          this.yPost(this.yzxhttp+'appApi/commonApp/sendSms',{
            phoneNo:this.phoneNum,
            sendType:'login'
          }).then(
            (response)=>{
              if(response.data.resultCode== 0){
                console.log(66666);
                this.notice='验证码五分钟内有效';
                this.isActive= false;
                if (this.num == 1) {
                  this.num = 60;
                  this.isActive = true;
                  this.notice ='';
                  return;
                } else {
                  this.num--;
                };
                var that = this;
                setTimeout(function() {
                  that.getCode();
                },1000);
              }else{
                //错误提示
                var message=response.data.message;
                this.$message({
                  message: message,
                  type: 'warning'
                });
              }
            });
       /* }*/
      },
      validate(){
        this.notice="";
       if(this.passCode!=""&&this.phoneNum!=""){
         $(".login").css("background-color","#409eff");
       }else{
         $(".login").css("background-color","#86b8e6");
       }
      },
      //登录
      login(){
        if(this.passCode!=""&&this.phoneNum!=''){
          this.yPost(this.yzxhttp+'appApi/appUser/smsLogin',{
            phoneNo:this.phoneNum,
            vaildCode:this.passCode,
          }).then(
            (response)=>{
              if(response.data.resultCode== 0){
                //跳转登录成功页面
                var bindDevFlag = response.data.data.bindDevFlag;
                this.$router.push('/successLogin?bindDevFlag='+bindDevFlag);
              }else{
                //错误提示
                this.notice=response.data.message;
              }
            });
        }
      },
    },
    beforeMount: function () {
      document.title="短信登录";
    },
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #pboneLogin{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
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
      margin-top: 8vh;
      .el-input{
        height: 46px;
        border-bottom: 0.5px solid #ccc;
        padding-top: 5px;
        box-sizing: border-box;
      }
      .get-code{
        position: relative;
        font-size: 14px;
        input{
          padding-right: 100px;
        }
        .code{
          display: none;
          position: absolute;
          top: 0px;
          right: 1px;
          color: #409eff;
          height: 46px;
          line-height: 46px;
          &.active{
            display: block;
          }
        }
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
  }
</style>
