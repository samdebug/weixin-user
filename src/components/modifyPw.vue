<template>
  <div id='modifyPw'>
    <div class='img-wrapper'><img src="../assets/imgs/default_xiaoG_logo.png" alt=""></div>
    <div class='login-wrapper'>
      <el-input v-model="phoneNum" placeholder="手机号"   clearable @change='changeNum'></el-input>
      <div class='get-code'>
        <el-input v-model="passCode" placeholder="验证码" clearable @change='changeCode'></el-input>
        <span class='code' @click='getCode' :class='{ active: isActive }'>获取验证码</span>
        <span class='code' :class='{ active: !isActive }'>{{num}}s</span>
      </div>
      <el-input v-model="password" placeholder="设置新密码" type='password' clearable @blur='setPw' @change='validata'></el-input>
      <el-input v-model="passwordDoub" placeholder="确认密码" type='password' clearable @blur='confirmPw' @change='validata'></el-input>
      <p class='notice'>{{notice}}</p>
      <a href="javascript:;" class='login' @click='ModifyPw'>确定</a>
    </div>
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
        notice:'',
        num:60,
        isActive:true,
      }
    },
    methods: {
      validata(){
          this.notice='';
          if(this.phoneNum!=""&&this.passCode!=""&&this.password!=""&&this.passwordDoub!=""&&this.password==this.passwordDoub){
            $(".login").css('background-color','#409eff');
          }else{
            $(".login").css('background-color','#86b8e6');
          }
      },
      validataPw(){
        if(this.password!=this.passwordDoub&&this.password!=""&&this.passwordDoub!=""){
            this.notice='两次密码不一致'
        }
      },
      changeNum(){
        this.validata();
      },
      changeCode(){
        this.validata();
      },
      setPw(){
        this.validataPw();
      },
      confirmPw(){
        this.validataPw();
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
          this.yPost(this.yzxhttp+'appApi/commonApp/sendSms',{
            phoneNo:this.phoneNum,
            sendType:'pwdRec'
          }).then(
            (response)=>{
              if(response.data.resultCode== 0){
                this.isActive= false;
                if (this.num == 1) {
                  this.num = 60;
                  this.isActive = true;
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
        }
      },
      //修改密码
      ModifyPw(){
        var that = this;
        if(this.password!=this.passwordDoub){
          this.$message({
            message: '两次密码不一致',
            type: 'warning'
          });
          return;
        };
        if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(that.password)){
          this.$message({
            message: '密码长度请设置为6-20位字母和数字组合',
            type: 'warning'
          });
          return;
        };
        if(this.phoneNum!=""&&this.passCode!=""&&this.password!=""&&this.passwordDoub!=""&&this.password==this.passwordDoub){
          this.yPost(this.yzxhttp+'appApi/appUser/resetPassword',{
            phoneNo:this.phoneNum,
            vaildCode:this.passCode,
            newPwd:this.password,
          }).then(
            (response)=>{
              if(response.data.resultCode== 0){
                //跳转登录成功页面
                this.$router.push('/pwSuc');
              }else{
                //错误提示
                this.notice=response.data.message;
              }
            });
        }
      }
    },
    beforeMount: function () {
      document.title="修改密码";
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #modifyPw{
    position: absolute;
    width: 100%;
    background-color: #fff;
    left: 0;
    top: 0;
    right: 0;
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
 /*       background-color: #409eff;*/
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
