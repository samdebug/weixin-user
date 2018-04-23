<template>
  <div id='login'>
    <div class='img-wrapper'><img src="../assets/imgs/default_xiaoG_logo.png" alt=""></div>
    <div class='login-wrapper'>
      <el-input
        placeholder="手机号/用户名"
        v-model="user"
        @change='inputAccount'
        clearable>
      </el-input>
      <el-input v-model="password" placeholder="密码" clearable @change='inputPw' type='password'></el-input>
      <!-- <input type="number" placeholder='手机号'>
       <input type="password" placeholder='密码'>-->
      <p class='notice' style='color: red'>{{notice}}</p>
      <a href="javascript:;" class='login' @click='login'>登录</a>
      <span href="javascript" class='forget-pw' @click='goModifyPw'>忘记密码</span>
    </div>
      <p class='login-bottom'>
        <span @click='goPhoneLogin'>短信登录</span>
        <span style='color: #ccc;padding: 0'>|</span>
        <span @click='goRegister'>新用户注册</span>
      </p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user:'',
        password:'',
        notice:'',
        appId:"",
        code:''
      }
    },
    methods: {
      //跳转短信登录页
      goPhoneLogin(){
        this.$router.push('/phoneLogin');
      },
      inputIsEmpty(){
        if(this.user!=""&&this.password!=""){
          $(".login").css("background-color","#409eff")
        }
      },
      inputAccount(){
        this.notice ="";
       this.inputIsEmpty();
      },
      inputPw(){
        this.notice ="";
        this.inputIsEmpty();
      },
      //忘记密码
      goModifyPw(){
        this.$router.push('/modifyPw');
      },
      //登录
      login(){
        if(this.user!=""&&this.password!=''){
          this.yPost(this.yzxhttp+'appApi/appUser/login',{
            loginName:this.user,
            loginPwd:this.password,
          }).then(
            (response)=>{
              if(response.data.resultCode== 0){
                //跳转登录成功页面
                var bindDevFlag = response.data.data.bindDevFlag,
                     loginName = response.data.data.loginName,
                      phoneNo = response.data.data.phoneNo;
                this.$router.push('/successLogin?bindDevFlag='+bindDevFlag+"&loginName="+loginName+'&phoneNo='+phoneNo+'&flowMall=N');
              }else{
                //错误提示
                this.notice=response.data.message;
              }
            });
        }
      },
      //注册
      goRegister(){
        this.$router.push('/register');
      }
    },
    beforeMount: function () {
      document.title="登录";
      //判断用户是否登录
      this.yPost(this.yzxhttp+'appApi/appUser/loginFlag',{
      }).then(
        (response)=>{
          if(response.data.resultCode== 0){
            var bindDevFlag = response.data.data.bindDevFlag,
              loginName = response.data.data.loginName;
            this.$router.push('/successLogin?bindDevFlag='+bindDevFlag+"&loginName="+loginName+'&flowMall=N');
          };
        });
    },
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #login{
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
      input{
        border: none;
        border-radius: 0;
        width: 100%;
        padding: 5px 0;
      }
      .login{
        display: inline-block;
        width: 100%;
        height: 38px;
        line-height: 38px;
        text-align: center;
       /* background-color: #409eff;*/
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
    .login-bottom{
      font-size: 12px;
      color: #409eff;
      text-align: center;
      position: absolute;
      width: 100%;
      bottom: 25px;
      span{
        display: inline-block;
        padding: 0px 6px;
      }
    }
  }
</style>
