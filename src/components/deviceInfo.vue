<template>
  <div id="deviceDetail">
    <div class="deviceInfoBox" v-for="device in deviceDetail">
      <div :class="[device.ucpAccountType == 2 ? 'clearfix order-info accountPkg' : 'clearfix order-info devicePkg']">
        <div class='fl'>
          <p class="devicePage"><span class='info-title'>设备编号：</span><span style="padding-left:10px">{{device.idxViFiID}}</span></p>
          <p class="devicePage"><span class='info-title'>IMEI号：</span><span style="padding-left:27px">{{device.imei}}</span></p>
          <p class="devicePage"><span class='info-title'>WIFI SSID：</span><span style="padding-left:6px">{{device.wifissid}}</span></p>
          <p class="devicePage"><span class='info-title'>WIFI KEY：</span><span style="padding-left:12px">{{device.wifipwd}}</span></p>
        <!--  <p><span class='info-title'>实付：</span><span class='info-important'>￥9.90</span></p>-->
        </div>
       <!-- <div class='fr info-important'>未使用</div>-->
      </div>
      <div class='order-num'>
        <div class="mint-msgbox-btns">
          <button class="mint-msgbox-btn mint-msgbox-cancel " @click="goFlowDetail(device.idxViFiID)" style="">流量使用情况</button>
          <button class="mint-msgbox-btn mint-msgbox-cancel " @click="changePswClick(device.idxViFiID,device.imei)" style="">修改上网密码</button>
          <button class="mint-msgbox-btn mint-msgbox-cancel " @click="unbindActiveClick(device.idxViFiID)" style="border-right:none">解绑</button>
        </div>
      </div>
    </div>
    <div class="mask" :class='{active:unbindActive}'></div>
    <div class='box' :class='{active:unbindActive}'>
      <h2>解除绑定 <i class='close' @click='closeBox'></i></h2>
      <p style='font-weight: 600;margin-top: 10px'>确定要解除绑定关系吗？</p>
      <p style='color: #ccc'>解除后不影响设备的正常使用</p>
      <span class='unbind-btn' @click='unbindConfirm'>确认解绑</span>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  export default {
    data() {
      return {
        orderNo:'',
        datas:{},
        unbindActive:false,
        loginName:"",
        phoneNo:"",
        idxViFiID:"",
        // deviceDetail:[{type:"account","deviceNo":"624523678214214","IMEI":"1281727391283",SSID:"2312412412312",KEY:"e1123124eqwe123"},{"deviceNo":"624523678214214","IMEI":"1281727391283",SSID:"2312412412312",KEY:"e1123124eqwe123"},{"deviceNo":"624523678214214","IMEI":"1281727391283",SSID:"2312412412312",KEY:"e1123124eqwe123"},{"deviceNo":"624523678214214","IMEI":"1281727391283",SSID:"2312412412312",KEY:"e1123124eqwe123"},{"deviceNo":"624523678214214","IMEI":"1281727391283",SSID:"2312412412312",KEY:"e1123124eqwe123"},{"deviceNo":"624523678214214","IMEI":"1281727391283",SSID:"2312412412312",KEY:"e1123124eqwe123"}]
        deviceDetail:[]
      }
    },
    methods: {
      unbindActiveClick(idxViFiID){
        this.unbindActive = true;
        this.idxViFiID = idxViFiID;
      },
      closeBox(){
        this.unbindActive = false;
      },
      changePswClick(idxViFiID,imei){
        this.$router.push('/modifyMIFIpw?phoneNo='+this.phoneNo+'&loginName='+this.loginName+'&idxViFiID='+idxViFiID+'&imei='+imei);
      },
      goFlowDetail(idxViFiID){
        this.$router.push('/flowRecord?'+'&idxViFiID='+idxViFiID);
      },
      unbindConfirm(deviceId){
        this.unbindActive = false;
        this.yPost(this.yzxhttp+'appApi/appDev/relaxUserDev',{
          idxViFiId:this.idxViFiID
        }).then(
          (response)=>{
            if(response.data.resultCode=== 0){
                this.$router.push('/unbindSuc?loginName='+this.loginName);
            }else{
              //错误提示
              this.notice=response.data.message;
              Toast(this.notice);
            }
          });
      }
    },
    components: {},
    beforeCreate: function () {},
    created: function () {},
    beforeMount: function () {
      document.title="设备信息";
      var url = window.location.href;
      // this.yPost(this.yzxhttp+'appApi/appUser/userIndex',{
      //   reType:this.reType,
      //   loginName:this.loginName,
      //   referId:this.referId,
      // }).then(
      //   (response)=>{
      //     if(response.data.resultCode== 0){
      //       this.loginName= response.data.data.userInfo.loginName;
      //       this.phoneNo= response.data.data.userInfo.phoneNo;
      //     }
      //   });


      this.yPost(this.yzxhttp+'appApi/appDev/queryDev',{
      }).then(
        (response)=>{
          if(response.data.resultCode== 0){
            console.log(response.data.data,898989);
            this.deviceDetail =response.data.data.list;
          }else{
            //错误提示
            /*  this.notice=response.data.message;*/
          }
        });
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
.mint-msgbox-btns {
    height: 32px;
    line-height: 31px;
}
.mint-msgbox-btn{
  font-size: 14px;
}
#deviceDetail{
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  background-color: rgb(245,245,245);
  // .deviceInfoBox{
  //   display: inline-block;
  //   width: 20px;
  //   height: 20px;
  //   background: url("../assets/imgs/deviceInfo.png") no-repeat;
  //   background-size: 100%;
  //   position: absolute;
  //   right: 15px;
  // }
  .mask{
    z-index: 9;
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
  .fl{
    padding-left: 10px;
  }
  .devicePage{
    font-weight: 200;
  }
  .accountPkg {
    background: url("../assets/imgs/accountPkg.png") no-repeat;
  }
  .devicePkg {
    background: url("../assets/imgs/devicePkg.png") no-repeat;
  }
  .order-info{
    line-height: 30px;
    margin-top: 15px;
    padding: 10px 15px;
    background-color: #fff !important;
    background-position: right 0px;
    background-size: 16%;
    border-bottom: 1px dashed #e1e1e1;
    .info-title{
      color: #ccc;
    }
    .info-important{
      color: rgb(255,108,36);
    }
  }
  .order-num{
    line-height: 20px;
    padding: 10px 15px;
    background-color: #fff;
    font-size: 12px;
    color: #ccc;
    .functionButton{
      padding: 30px;
    }
  }
}
</style>
