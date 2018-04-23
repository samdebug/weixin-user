<template>
  <div id='mifi'>
    <p class='device-num'>设备编号：{{idxViFiID}}</p>
    <div class='login-wrapper'>
      <el-input
        placeholder="新密码"
        v-model="password"
        type='password'
        @change='validata'
        @blur='checkPw'
        clearable>
      </el-input>
      <el-input v-model="passwordTw" placeholder="确认密码" clearable type='password' @change='validata' @blur='checkPw'></el-input>
      <p class='notice'>{{notice}}</p>
      <a href="javascript:;" class='login' @click='modifyPw'>确认修改</a>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        passwordTw:'',
        password:'',
        notice:'',
        loginName:'',
        idxViFiID:''
      }
    },
    methods: {
      validata(){
        this.notice = "";
        if(this.password!=""&&this.passwordTw!=""&&this.password===this.passwordTw){
          $(".login").css('background-color','#409eff');
        }else{
          $(".login").css('background-color','#86b8e6');
        };
      },
      checkPw(){
        if(this.password!=""&&this.passwordTw!=""&&this.password!=this.passwordTw){
          this.notice='密码不一致';
        }
      },
      modifyPw(){
        var that = this;
        if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/.test(that.password)){
          this.$message({
            message: '密码长度请设置为8-20位字母和数字组合',
            type: 'warning'
          });
          return;
        };
        if(this.password!=""&&this.passwordTw!=""&&this.password===this.passwordTw){
          this.yPost(this.yzxhttp+'appApi/appDev/devPwdReset',{
            newPwd:this.password,
            idxViFiId:this.idxViFiID
          }).then(
            (response)=>{
              if(response.data.resultCode== 0){
                this.notice=response.data.message;
                   this.$router.push('/modifySuc?loginName='+this.loginName);
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
      document.title="修改MIFI密码";
      var url = window.location.href;
      this.loginName = this.getQueryString('loginName',url);
      this.idxViFiID = this.getQueryString('idxViFiID',url);
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
  #mifi{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
    .device-num{
      padding: 0 15px;
      line-height: 46px;
      // background-color: #f5f5f5;
      color: #666;
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
