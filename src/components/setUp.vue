<template>
  <div id="setUp">
    <ul>
      <li class='clearfix' @click='goModiUser'>
        <span class='fl'>用户名</span>
        <span class='fr user'>{{loginName}}<span class='el-icon-arrow-right' style='margin-left: 5px'></span></span>
      </li>
      <li class='clearfix' @click='goModifyLoginpw'>
        <span class='fl'>修改登录密码</span>
        <span class='fr el-icon-arrow-right'></span>
      </li>
      <!-- <li class='clearfix' @click='goModifyMifi' v-if="'Y' === bindDevFlag">
        <span class='fl'>修改MIFI密码</span>
        <span class='fr el-icon-arrow-right'></span>
      </li>
      <li class='clearfix' @click='goUnbind' v-if="'Y' === bindDevFlag">
        <span class='fl'>设备信息</span>
        <span class='fr user'>解绑<span class='el-icon-arrow-right' style='margin-left: 5px'></span></span>
      </li> -->
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        phoneNo:'',
        loginName:'',
        idxViFiID:'',
        imei:"",
        bindDevFlag:''
      }
    },
    methods: {
      goModiUser(){
        this.$router.push('/modifyUserName?loginName='+this.loginName+'&phoneNo='+this.phoneNo);
      },
      goModifyLoginpw(){
        this.$router.push('/modifyLoginPw?loginName='+this.loginName);
      },
      goModifyMifi(){
        this.$router.push('/modifyMIFIpw?loginName='+this.loginName+'&idxViFiID='+this.idxViFiID);
      },
      goUnbind(){
        this.$router.push('/unbind?loginName='+this.loginName+'&idxViFiID='+this.idxViFiID+'&imei='+this.imei);
      }
    },
    components: {},
    beforeCreate: function () {},
    created: function () {},
    beforeMount: function () {
      document.title="设置";
      var url = window.location.href;
      this.loginName = this.getQueryString('loginName',url);
      this.phoneNo = this.getQueryString('phoneNo',url);
      this.idxViFiID = this.getQueryString('idxViFiID',url);
      this.imei = this.getQueryString('imei',url);
      this.bindDevFlag = this.getQueryString('bindDevFlag',url);
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
#setUp{
  font-size: 14px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: whitesmoke;
  li{
    padding: 0 15px;
    border-bottom: 0.5px solid #e1e1e1;
    line-height: 40px;
    background-color: #fff;
    .user{
      color: #ccc;
    }
    .el-icon-arrow-right{
      color: #ccc;
      font-size: 12px;
      margin-top: 14px;
    }
    &:last-child{
      border: none;
    }
  }
}
</style>
