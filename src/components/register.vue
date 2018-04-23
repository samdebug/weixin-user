<template>
  <div id='register'>
    <div class='img-wrapper'><img src="../assets/imgs/default_xiaoG_logo.png" alt=""></div>
    <div class='login-wrapper'>
      <el-input v-model="phoneNum" placeholder="手机号" type='' @change='validata'></el-input>
      <div class='get-code'>
        <el-input v-model="passCode" placeholder="验证码" @change='validata'></el-input>
        <span class='code' @click='getCode' :class='{ active: isActive }'>获取验证码</span>
        <span class='code' :class='{ active: !isActive }'>{{num}}s</span>
      </div>
      <el-input v-model="password" placeholder="设置密码" type='password' @change='validata'></el-input>
      <el-input v-model="passwordDoub" placeholder="确认密码" type='password' @change='validata'></el-input>
      <p style='color: red;line-height: 24px;font-size: 12px;height: 24px;'>{{notice}}</p>
      <a href="javascript:;" class='login' @click='register'>确定</a>
      <p class='notice' style='color: #ccc'>注册代表你同意 <span @click='goProtocol'>用户注册协议</span></p>

    </div>
    <p class='login-bottom'>
      已有账号？去<span @click='goLogin'>登录</span>
    </p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        phoneNum:'',
        passCode:'',
        password:'',
        passwordDoub:'',
        num:60,
        isActive:true,
        notice:''
      }
    },
    methods: {
      //跳转短信登录页
      goLogin(){
        this.$router.push('/');
      },
      goProtocol(){
        this.$router.push('/registerProtocol');
      },
      //获取验证码
      getCode(){
        var that = this;
        if(this.phoneNum==''){
          this.$message({
            message: '请输入手机号',
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
        if(this.isActive){
          //
          this.yPost(this.yzxhttp+'appApi/commonApp/sendSms',{
            phoneNo:this.phoneNum,
            sendType:'register'
          }).then(
            (response)=>{
              if(response.data.resultCode== 0){
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
                },1000)
              }else{
                //错误提示
                var message=response.data.message;
                this.$message({
                  message: message,
                  type: 'warning'
                });
              }
            });
        }
      },
      validata(){
        if(this.phoneNum!=""&&this.passCode!=""&&this.password!=""&&this.passwordDoub!=""&&this.password==this.passwordDoub){
          $(".login").css('background-color','#409eff');
        }else{
          $(".login").css('background-color','#86b8e6');
        }
      },
      //注册
      register(){
        var that = this;
        if(this.password!=this.passwordDoub){
          this.$message({
            message: '两次密码不一致',
            type: 'warning'
          });
          return;
        };
        if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/.test(that.password)){
          this.$message({
            message: '密码长度请设置为6-20位字母和数字组合',
            type: 'warning'
          });
          return;
        };
        if(this.phoneNum!=""&&this.passCode!=""&&this.password!=""&&this.passwordDoub!=""&&this.password==this.passwordDoub){
          this.yPost(this.yzxhttp+'appApi/appUser/register',{
            phoneNo:this.phoneNum,
            loginPwd:this.password,
            vaildCode:this.passCode,
          }).then(
            (response)=>{
              if(response.data.resultCode== 0){
               this.$router.push('/registerSuc');
              }else{
                //错误提示
                this.notice=response.data.message;
              }
            });
        }
      },
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
  #register{
    background-color: #fff;
    position: absolute;
    width: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
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
        height: 46px;
        line-height: 46px;
        border-bottom: 0.5px solid #ccc;
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
/*        margin-top: 20px;*/
      }
      .forget-pw{
        font-size: 12px;
        color: #409eff;
        float: right;
        margin-top: 15px;
      }
      .notice{
        color: #ccc;
        font-size: 12px;
        height: 32px;
        line-height: 32px;
        span{
          color: #409eff;
        }
      }
    }
    .login-bottom{
      font-size: 12px;
      color: #ccc;
      text-align: center;
      position: absolute;
      width: 100%;
      bottom: 25px;
      span{
        color: #409eff;
        display: inline-block;
      }
    }
  }
</style>
