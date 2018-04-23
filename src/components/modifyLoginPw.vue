<template>
  <div id='modi-login'>
    <div class='login-wrapper'>
      <el-input
        placeholder="旧密码"
        v-model="oldPw"
        @change='validata'
        type='password'
        clearable>
      </el-input>
      <el-input v-model="password" placeholder="新密码" clearable @change='validata' @blur='checkPw' type='password'></el-input>
      <el-input v-model="passwordDouB" placeholder="确认密码" clearable @change='validata' @blur='checkPw' type='password'></el-input>
      <p class='notice'>{{notice}}</p>
      <a href="javascript:;" class='login' @click='modifyPw'>确认修改</a>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        oldPw:'',
        password:'',
        passwordDouB:'',
        notice:'',
        loginName:''
      }
    },
    methods: {
      validata(){
        this.notice = "";
        if(this.oldPw!=""&&this.password!=""&&this.passwordDouB!=""&&this.password===this.passwordDouB){
          $(".login").css('background-color','#409eff');
        }else{
          $(".login").css('background-color','#86b8e6');
        };
      },
      modifyPw(){
        var that = this;
        if(that.password!=that.passwordDouB){
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
        if(this.oldPw!=""&&this.password!=""&&this.passwordDouB!=""&&this.password===this.passwordDouB){
          this.yPost(this.yzxhttp+'appApi/appUser/setPassword',{
            loginName:this.loginName,
            oldPwd:this.oldPw,
            newPwd:this.password,
          }).then(
            (response)=>{
              if(response.data.resultCode== 0){
                this.$router.push('/pwSuc?loginName='+this.loginName);
              }else{
                //错误提示
                this.notice=response.data.message;
              }
            });
        }
      },
      checkPw(){
        if(this.password!=""&&this.passwordDouB!=""&&this.password!=this.passwordDouB){
          this.notice='两次密码不一致';
        }
      }
    },
    components: {},
    beforeCreate: function () {},
    created: function () {},
    beforeMount: function () {
      document.title="修改登录密码";
      var url = window.location.href;
      this.loginName = this.getQueryString('loginName',url);
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
  #modi-login{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
    .login-wrapper{
      padding: 0 15px;
      .el-input{
        height: 46px;
        border-bottom: 0.5px solid #ccc;
        padding-top: 5px;
        box-sizing: border-box;
      }
      input{
        padding-left: 0;
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
        /* background-color: #409eff;*/
        background-color: #86b8e6;
        /*#86b8e6*/
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
