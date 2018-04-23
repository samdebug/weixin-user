<template>
  <div id='modifyUserName'>
    <p class='device-num'>用户名：{{loginName}}</p>
   <div class='userInput'>
      <el-input
        placeholder="新用户名"
        v-model="userName"
        @change='validate'
        clearable>
      </el-input>
    </div>
    <div class='login-wrapper'>
    <!--  <el-input
        placeholder="新用户名"
        v-model="userName"
        @change='validate'
        clearable>
      </el-input>-->
      <p class='notice'></p>
      <a href="javascript:;" class='login' @click='confirmModify'>确认修改</a>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userName:'',
        phoneNo:''
      }
    },
    methods: {
      //跳转短信登录页
     /* goPhoneLogin(){
        this.$router.push('/phoneLogin');
      }*/
      validate(){
        if(this.userName!=""){
          $(".login").css('background-color','#409eff');
        }else{
          $(".login").css('background-color','#86b8e6');
        }
      },
      confirmModify(){
        if(this.userName!=""){
          this.yPost(this.yzxhttp+'appApi/appUser/resetUserName',{
            loginName:this.userName,
            phoneNo:this.phoneNo,
          }).then(
            (response)=>{
              if(response.data.resultCode== 0){
              //  this.loginName = this.userName
                this.$router.push('/modifySuc?loginName='+this.userName);
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
      }
    },
    components: {},
    beforeCreate: function () {},
    created: function () {},
    beforeMount: function () {
      document.title="修改用户名";
      var url = window.location.href;
      this.loginName = this.getQueryString('loginName',url);
      this.phoneNo = this.getQueryString('phoneNo',url);
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
  #modifyUserName{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
    .device-num{
      padding: 0 15px;
      line-height: 46px;
      background-color: #f5f5f5;
      color: #666;
    }
    .userInput{
      .el-input{
        padding: 0 15px;
        padding-left: 0;
        border: none;
        border-radius: 0;
        width: 100%;
        height: 46px;
        line-height: 46px;
        border-bottom: 0.5px solid #ccc;
        .el-input__inner{
          border: none;
        }
      }
    }
    .login-wrapper{
      padding: 0 15px;
      input{
        padding-left: 0;
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
