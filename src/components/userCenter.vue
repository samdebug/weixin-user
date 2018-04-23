<template>
  <div id="userCenter">
    <div class="mask" :class='{active:notActive}'></div>
    <div class='box' :class='{active:notActive}'>
      <h2>退出账户 <i class='close' @click='closeBox'></i></h2>
      <p style='font-weight: 600;margin-top: 10px'>确认要退出吗？</p>
      <p style='color: #ccc'>退出之后设备仍能正常使用</p>
      <span class='unbind-btn' @click='confirmUnbind'>确认退出</span>
    </div>
    <div class="bgImg clearfix">
          <div class='fl' @click='goTaocan'>
            <canvas id="c" ></canvas>
          </div>
          <div class='fl user-name'>
            <p style='font-size: 16px;margin-bottom: 5px'>{{data.loginName}}</p>
            <p>{{data.phoneNo}}</p>
          </div>
          <!-- v-if="'N' === bindDevFlag"-->
          <span class='fr bind-device' @click='bindDevice'>绑定设备</span>
    </div>
    <div>
      <ul class='lists'>
        <li class='clearfix' @click='goTaocan'>
         <p class='fl'> <span class='pkgInfo listImg'></span>套餐信息</p>
          <span class='fr el-icon-arrow-right' style='margin-top: 13px'></span>
        </li>
        <li class='clearfix' @click='goDeviceInfo'>
         <p class='fl'> <span class='deviceInfo listImg'></span>设备信息</p>
          <span class='fr el-icon-arrow-right' style='margin-top: 13px'></span>
        </li>

        <li class='clearfix' @click='goOrderInfo'>
         <p class='fl'> <span class='order-img listImg'></span>订单信息</p>
          <span class='fr el-icon-arrow-right' style='margin-top: 13px'></span>
        </li>
        <!-- <li class='clearfix' @click='goFlowRecord'>
          <p class='fl'> <span class='flow_icon listImg'></span>流量使用情况</p>
          <span class='fr el-icon-arrow-right' style='margin-top: 13px'></span>
        </li> -->
        <li class='clearfix' @click='goSetUp'>
          <p class='fl'> <span class='icon_setting listImg'></span>设置</p>
          <span class='fr el-icon-arrow-right' style='margin-top: 13px'></span>
        </li>
        <!-- <li class='clearfix' v-if="'Y' === bindDevFlag" @click='goModifyMiFi'>
          <p class='fl'> <span class='icon_pw listImg'></span>MIFI密码</p>
          <p style='color: #878787;' class='fr eye_pw ' :class='{ active: isActive }' @click.stop='hidePw'> <span class='icon_eye listImg  fr' style='margin-right: 0'></span>{{deviceDatas.wifipwd}}</p>
          <p style='color: #878787;' class='fr eye_pw' :class='{ active: !isActive }' @click.stop='showPw'> <span class='icon_eyelash listImg fr' style='margin-right: 0'></span>*****</p>
        </li> -->
      </ul>
    </div>
    <span class='loginOut' @click='loginOut'>退出登录</span>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  const wx = require('weixin-js-sdk')
  export default {
    data() {
      return {
        rangeValud:'40',
        loginName:'',
        data:{},
        flowA:'0',
        notActive:false,
        isActive:true,
        phoneNo:'',
        deviceDatas:{},
        idxViFiID:'',
        imei:'',
        bindDevFlag:''
      }
    },
    methods: {
      //水波求
      drawBall(){
       /* function resizeCanvas() {
          var mW=canvas.width = window.innerWidth;
          var mH= canvas.height = window.innerHeight;
        }*/
        console.log(window.innerWidth*0.3);
        var canvas = document.getElementById('c');
        var ctx = canvas.getContext('2d');
        var nowRange = 0, //用于做一个临时的range
          rangeValue = this.rangeValud;

        //画布属性
        /*resizeCanvas()*/
        var mW = canvas.width = window.innerWidth*0.35;
        var mH = canvas.height = window.innerWidth*0.35;
        var lineWidth = 2;

        //圆属性
        var r = mH / 2; //圆心
        var cR = r - 16 * lineWidth; //圆半径

        //Sin 曲线属性
        var sX = 0;
        var sY = mH / 2;
        var axisLength = mW; //轴长
        var waveWidth = 0.05 ; //波浪宽度,数越小越宽
        var waveHeight = 6; //波浪高度,数越大越高
        var speed = 0.05; //波浪速度，数越大速度越快
        var xOffset = 0; //波浪x偏移量

        ctx.lineWidth = lineWidth;

        //画圈函数
        var IsdrawCircled = false;
        var drawCircle = function(){

          ctx.beginPath();
          ctx.strokeStyle = 'rgb(158,207,237)';
          ctx.arc(r, r, cR, 0, 2 * Math.PI);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(r, r, cR, 0, 2 * Math.PI);
          ctx.clip();
          ctx.fillStyle="#f4f9fc";//填充颜色,默认是黑色
          ctx.fill();//画实心圆

        }

        //画sin 曲线函数
        var drawSin = function(xOffset){
          ctx.save();

          var points=[]; //用于存放绘制Sin曲线的点

          ctx.beginPath();
          //在整个轴长上取点
          for(var x = sX; x < sX + axisLength; x += 20 / axisLength){
            //此处坐标(x,y)的取点，依靠公式 “振幅高*sin(x*振幅宽 + 振幅偏移量)”
            var y = -Math.sin((sX + x) * waveWidth + xOffset);

            var dY = mH * (1 - nowRange / 100 );

            points.push([x, dY + y * waveHeight]);
            ctx.lineTo(x, dY + y * waveHeight);
          }

          //封闭路径
          ctx.lineTo(axisLength, mH);
          ctx.lineTo(sX, mH);
          ctx.lineTo(points[0][0],points[0][1]);
          ctx.fillStyle = 'pink';
          ctx.fill();

          ctx.restore();
        };
        var flowA = this.flowA;
        console.log(flowA);
        //写百分比文本函数
        var drawText = function(){
          ctx.save();

          var size = "12";
          ctx.font =size + 'px Microsoft Yahei';
          ctx.textAlign = 'center';
          ctx.fillStyle = "#000";
          ctx.fillText(flowA+"M", r, r + size / 18);
          /*ctx.fillText("当前可用", r, r + size / 1);*/

          ctx.restore();
        };
        var drawTextT = function(){
          ctx.save();
          var size = "10";
          ctx.font = size + 'px Microsoft Yahei';
          ctx.textAlign = 'center';
          ctx.fillStyle = "#000";
          ctx.fillText("当前可用", r, r + size / 0.6);

          ctx.restore();
        };

        var render = function(){
          ctx.clearRect(0, 0, mW, mH);
          if(IsdrawCircled == false){
            drawCircle();
          }

          if(nowRange <= rangeValue){
            var tmp = 1;
            nowRange += tmp;
          }

          if(nowRange > rangeValue){
            var tmp = 1;
            nowRange -= tmp;
          }

          drawSin(xOffset);
          drawText();
          drawTextT();

          xOffset += speed;
          requestAnimationFrame(render);
        }
        render();
      },
      //解绑设备
      unbind(){
        this.$router.push('/unbind');
      },
      //绑定设备
      bindDevice(){
        this.$router.push('/bindDevice?loginName='+this.loginName);
      },
      closeBox(){
        this.notActive = false;
      },
      loginOut(){
        this.notActive = true;
      },
      //退出
      confirmUnbind(){
        this.yPost(this.yzxhttp+'appApi/appUser/logOut',{
          loginName:this.loginName,
        }).then(
          (response)=>{
            if(response.data.resultCode=== 0){
              WeixinJSBridge.call('closeWindow');
            }else{
            }
          });
      },
      //隐藏密码
      hidePw(){
        console.log(44444);
        this.isActive= false;
      },
      //显示密码
      showPw(){
        console.log(3434343);
        this.isActive= true;
      },
      //跳转套餐信息
      goTaocan(){
        console.log(this.bindDevFlag);
        if(this.bindDevFlag==='Y'){
          this.$router.push('/taocanInfo');
        }else{
          Toast({
            message: '无套餐'
          });
        }
      },
      //跳转设备信息
      goDeviceInfo(){
        if(this.bindDevFlag==='Y'){
          this.$router.push('/deviceInfo?phoneNo='+this.phoneNo+'&loginName='+this.loginName);
        }else{
          Toast({
            message: '未绑定设备'
          });
        }
      },
      //跳转套餐信息
      goPkgInfo(){
        this.$router.push('/pkgInfo');
      },
      //跳转订单详情
      goOrderInfo(){
        this.$router.push('/orderInfo');
      },
      //跳转流量记录
      goFlowRecord(){
        this.$router.push('/flowRecord');
      },
      goSetUp(){
        this.$router.push('/setUp?phoneNo='+this.phoneNo+'&loginName='+this.loginName+'&idxViFiID='+this.idxViFiID+'&imei='+this.imei+'&bindDevFlag='+this.bindDevFlag);
      },
      goModifyMiFi(){
        this.$router.push('/modifyMIFIpw?phoneNo='+this.phoneNo+'&loginName='+this.loginName+'&idxViFiID='+this.idxViFiID+'&imei='+this.imei);
      }
    },
    components: {},
    beforeCreate: function () {},
    created: function () {
    },
    beforeMount: function () {
      document.title="个人中心";
      var w = window.innerWidth*0.35;
      //
      var url = window.location.href;
      this.loginName = this.getQueryString('loginName',url);
      //用户信息
      this.yPost(this.yzxhttp+'appApi/appUser/userIndex',{
        reType:this.reType,
        loginName:this.loginName,
        referId:this.referId,
      }).then(
        (response)=>{
          if(response.data.resultCode== 0){
            this.data = response.data.data.userInfo;
            this.loginName= response.data.data.userInfo.loginName;
            this.phoneNo= response.data.data.userInfo.phoneNo;
            this.bindDevFlag= response.data.data.bindDevFlag
          }else{
            //错误提示
            /*  this.notice=response.data.message;*/
          }
        });
      //设备信息
      this.yPost(this.yzxhttp+'appApi/appDev/queryDev',{
        reType:this.reType,
        referId:this.referId,
      }).then(
        (response)=>{
          if(response.data.resultCode== 0){
            this.deviceDatas =response.data.data.list;
            // this.idxViFiID = response.data.data.idxViFiID;
            // this.imei = response.data.data.imei;
            //当前可用流量
            var totalFlow = 0,
                monthUsage = 0;
            for (var i = 0; i < this.deviceDatas.length; i++) {
              totalFlow = totalFlow + this.deviceDatas[i].totalFlow;
              monthUsage = monthUsage + this.deviceDatas[i].monthUsage;
            }
            this.flowA = totalFlow-monthUsage;
            //this.flowA = (this.flowA).toFixed(2)
            //当前已用流量
            if (this.flowA < 0 ){
              this.flowA = 0;
            }

            var rangeValue =((this.flowA/totalFlow))*100;
            rangeValue = rangeValue.toFixed(2);
            this.rangeValud=rangeValue;
            this.drawBall();
          }else{
            //错误提示
            /*  this.notice=response.data.message;*/
          }
        });
    },
    mounted: function () {
      this.drawBall();
    },
    beforeUpdate: function () {

    },
    updated: function () {

    },
    activated: function () {},
    deactivated: function () {},
    destroyed: function () {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
#userCenter{
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(245,245,245);
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
  .bgImg{
    position: relative;
    background: url("../assets/imgs/bgImg.png") no-repeat;
    height: auto;
    background-size: 100%;
    .user-name{
      color: #fff;
      font-size: 14px;
      position: relative;
      margin-top: 7vh;
      /*top: 50%;*/
     /* transform: translateY(-50%);*/
    }
    .bind-device{
      display: inline-block;
      padding: 8px 12px;
      background-color: rgba(255, 255, 255, 0.78);
      border-radius: 50px;
      color: #409eff;
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 14px;
    }
  }
  .lists{
    li{
      padding: 3px 20px;
      font-size: 14px;
      height: 40px;
      background-color: #fff;
      border-bottom: 0.5px solid #e1e1e1;
      .el-icon-arrow-right{
        font-size: 12px;
        color: #c2c2c2;
      }
      p{
        height: 40px;
        line-height: 40px;
        span{
          margin-right: 10px;
        }
      }
      .listImg{
        vertical-align: middle;
        display: inline-block;
        width: 16px;
        height: 16px;
      }
      .pkgInfo{
        background: url("../assets/imgs/icon_set-meal.png");
        background-size: 100%;
      }
      .deviceInfo{
        background: url("../assets/imgs/icon_equipment.png");
        background-size: 100%;
      }
      .order-img{
        background: url("../assets/imgs/icon_order.png");
        background-size: 100%;
      }
      .flow_icon{
        background: url("../assets/imgs/icon_flow.png");
        background-size: 100%;
      }
      .icon_setting{
        background: url("../assets/imgs/icon_setting.png");
        background-size: 100%;
      }
      .icon_pw{
        background: url("../assets/imgs/icon_password.png");
        background-size: 100%;
      }
      .icon_eye{
        background: url("../assets/imgs/icon_eye.png");
        background-size: 100%;
        margin-top: 12px;
        margin-left: 10px;

      }
      .icon_eyelash {
        background: url("../assets/imgs/icon_eyelash.png");
        background-size: 100%;
        margin-top: 12px;
        margin-left: 10px;
      }
      .eye_pw{
        display: none;
        &.active{
          display: block;
        }
      }
    }
  }
  .loginOut{
    display: inline-block;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    background-color: #fff;
    margin-top: 30px;
  }
}
</style>
