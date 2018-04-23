<template>
  <div id="flow-mall">
    <div class="mask" id='mask'></div>
    <p class='alertNotice' id='alertNotice'>您已点击购买,请不要重复操作哦</p>
    <div class="ad-wrapper">
      <el-carousel trigger="click" height="150px">
        <el-carousel-item v-for="item in dataLists" :key="item.id">
          <a :href="item.forwardUrl">
            <img :src="item.img" alt="">
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class='item-wrapper'>
      <ul>
        <li class='clearfix item' v-for="(packageItem, packageIndex) in packageDatas" :key="packageItem.keyDataPkgID" @click='buyFlow(packageItem,packageIndex)'>
          <div class='fl imgWrapper' v-if='packageItem.img!=null'>
            <img :src="'http://' + packageItem.img" alt="" onerror="this.src='../../static/imgs/img_default.png'">
          </div>
          <div class='fl imgWrapper' v-else='packageItem.img'>
            <img src="../../static/imgs/img_default.png" alt="" >
          </div>
          <div class="fl" style='padding-top: 3px;'>
            <p class='flow-title'>{{packageItem.pkgName}}</p>
            <p>覆盖地区：{{packageItem.idxUUWiFiAreaDsc}}</p>
            <p>
              有效期：{{packageItem.expiryDay}}
              <span v-if="packageItem.pkgType === 1">天</span>
              <span v-else-if="packageItem.pkgType === 2">月</span>
              <span v-else>年</span>
            </p>
          </div>
          <div class="fr" style="text-align: right;padding-top: 10px;">
            <p class='flow-title' style='text-align: center'>￥{{packageItem.price/100}}</p>
            <span class='buyBtn' @click='buyFlow'>购买</span>
          </div>
        </li>
      </ul>
      <div id="noTaocan" v-if='packageDatas.length==0'>
        <div class='img-wrapper'>
          <img src="../assets/imgs/no-flow.png" alt="">
        </div>
        <p style='font-size: 14px;color: #ccc;'>一个套餐都没有，真扫兴</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  export default {
    data() {
      return {
        dataLists:[],
        notice:'',
        packageDatas:[],
        appId:"",
        timeStamp:'',
        nonceStr:'',
        package:'',
        signType:'',
        paySign:'',
        loginName:'',
        orderNo:''
      }
    },
    methods: {
      weixinPay:function(data){
        var vm= this;
        if (typeof WeixinJSBridge == "undefined"){//微信浏览器内置对象。参考微信官方文档
          if( document.addEventListener ){
            document.addEventListener('WeixinJSBridgeReady', vm.onBridgeReady(data), false);
          }else if (document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady', vm.onBridgeReady(data));
            document.attachEvent('onWeixinJSBridgeReady',vm.onBridgeReady(data));
          }
        }else{
          vm.onBridgeReady(data);
        }
      },
      onBridgeReady:function(data){
        var  vm = this;
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest',{
            "appId":data.appId,     //公众号名称，由商户传入
            "timeStamp":data.timeStamp, //时间戳，自1970年以来的秒数
            "nonceStr":data.nonceStr, //随机串
            "package":data.package,
            "signType":data.signType, //微信签名方式：
            "paySign":data.paySign //微信签名
          },
          function(res){
            // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            if(res.err_msg == "get_brand_wcpay_request：ok" ){
              /*vm.$router.push("/reservedBerth");*/
            }else{
              alert("支付失败,请跳转页面"+res.err_msg);
            }
          }
        );
      },
      buyFlow(val,index){
        if(this.packageDatas[index]){
          //限制重复点击
        /*  if(this.packageDatas[index]['hasClick']){
            $('#mask').fadeIn(100);
            $('#alertNotice').fadeIn(100);
            $('#alertNotice').fadeOut(3000);
            $('#mask').fadeOut(3000);
            return;
          };*/
            //預支付生成訂單接口
            this.packageDatas[index]['hasClick']=true;
            if(val.keyDataPkgID!==undefined){
              var keyDataPkgID = val.keyDataPkgID;
              this.yPost(this.yzxhttp+'appApi/appOrder/generatPayOrder',{
                payType:this.payType,
                keyDataPkgID:keyDataPkgID,
                access_token:this.accessToken,
                merchant_no:this.merchantNo,
                terminal_id:this.terminalId
              }).then(
                (response)=>{
                  var that = this;
                  if(response.data.resultCode== 0){
                    //微信支付
                    var timeStamp = response.data.data.timeStamp,
                      nonceStr = response.data.data.nonceStr,
                      appId = response.data.data.appId,
                      package_str = response.data.data.package_str,
                      signType = response.data.data.signType,
                      paySign = response.data.data.paySign;
                    this.orderNo = response.data.data.orderNo;
                    this.loginName = response.data.data.loginName;
                    WeixinJSBridge.invoke(
                      'getBrandWCPayRequest', {
                        "appId":appId,     //公众号名称，由商户传入
                        "timeStamp":timeStamp,         //时间戳，自1970年以来的秒数
                        "nonceStr":nonceStr, //随机串
                        "package":package_str,
                        "signType":signType,         //微信签名方式：
                        "paySign":paySign//微信签名
                      },
                      function(res){
                        if(res.err_msg=='get_brand_wcpay_request:ok'){//成功
                          //恢复限制
                          that.packageDatas[index]['hasClick']=false;
                          //成功回調
                          that.yPost(that.yzxhttp+'appApi/appOrder/payOrderConfirm',{
                            orderNo:that.orderNo
                          }).then(
                            (response)=>{
                              that.$router.push('/mallPaySuc?loginName='+that.loginName);
                              /*if(response.data.resultCode== 0){
                                //支付成功
                                that.$router.push('/paySuc?loginName='+that.loginName);
                              }else{
                                that.$router.push('/accountAbnormal?loginName='+that.loginName+'&orderNo='+that.orderNo);
                              }*/
                            });

                        }else if(res.err_msg=='get_brand_wcpay_request:fail'){
                          //恢复限制
                          that.packageDatas[index]['hasClick']=false;
                          openErrorOptDiolag("支付失败","支付失败");
                          // Toast('网络异常，请重试')
                        }else if(res.err_msg === 'get_brand_wcpay_request:cancel'){
                          //恢复限制
                          that.packageDatas[index]['hasClick']=false;
                          //用户取消支付
                          openErrorOptDiolag("已取消支付","已取消支付");
                        }
                      }
                    );
                  }else{
                    Toast({
                      message: response.data.message
                    });
                  }
                });
            };

        }
      }
    },
    beforeMount: function () {
      document.title="流量商城";
      //判断用户是否登录
      this.yPost(this.yzxhttp+'appApi/appUser/loginFlag',{
        reType:this.reType,
        referId:this.referId
      }).then(
        (response)=>{
          if(response.data.resultCode== 0&&response.data.data.bindDevFlag=='Y'){
             this.loginName = response.data.data.loginName;
          }else if(response.data.resultCode== 0&&response.data.data.bindDevFlag=='N'){
           //绑定设备
            this.$router.push('/bindDevice');
          }else{
            //跳转登录页
            this.$router.push('/mallLogin');
          }
        });
      //banner
      this.yPost(this.yzxhttp+'appApi/appAdver/searBanner',{
        reType:this.reType,
      }).then(
        (response)=>{
          if(response.data.resultCode== 0){
            var dataLists = response.data.data.list;
            for (var i = 0; i < dataLists.length; i++) {
              dataLists[i]['img']='http://'+dataLists[i]['img'];
            };
            this.dataLists = dataLists;
          }else{
            //错误提示
          }
        });
      //套餐
      this.yPost(this.yzxhttp+'appApi/appDev/queryPackage',{
        reType:this.reType,
      }).then(
        (response)=>{
          if(response.data.resultCode== 0){
            console.log(22222);
            var pkgs = response.data.data.list;
            for (var i = 0; i < pkgs.length; i++) {
              //增加限制多次点击事件
              pkgs[i]['hasClick'] = false;
              if (pkgs[i].idxUUWiFiAreaId == "u.as.cn"){
                pkgs[i].idxUUWiFiAreaDsc = "中国";
              }else if(pkgs[i].idxUUWiFiAreaId == "u.as.cn.guangzhou"){
                pkgs[i].idxUUWiFiAreaDsc = "中国-广州";
              }else if(pkgs[i].idxUUWiFiAreaId == "u.as.cn.beijing"){
                pkgs[i].idxUUWiFiAreaDsc = "中国-北京";
              }else if(pkgs[i].idxUUWiFiAreaId == "u.as.cn.shenzhen"){
                pkgs[i].idxUUWiFiAreaDsc = "中国-深圳";
              }else if (pkgs[i].idxUUWiFiAreaId == "u.as.cn.guangdong"){
                pkgs[i].idxUUWiFiAreaDsc = "中国-广东";
              }else{
                pkgs[i].idxUUWiFiAreaDsc = "中国";
              }
            }
            this.packageDatas = pkgs;
            console.log(this.packageDatas);
          }else{
            //错误提示
          }
        });
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
#flow-mall{
  .mask{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: .5;
    background: #000;
    z-index: 99;
    display: none;
  }
  .alertNotice{
    width: 80%;
    position: fixed;
    z-index: 999;
    background-color: #fff;
    text-align: center;
    height: 48px;
    line-height: 48px;
    border-radius: 4px;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    box-shadow:2px 2px 15px #000;
    display: none;
  }
  padding-bottom: 10px;
  background-color: rgb(245,245,245);
  .ad-wrapper{
    width: 100%;
    /*height: 150px;*/
    a{
      display: inline-block;
      width: 100%;
    }
    img{
      display: inline-block;
      width: 100%;
      height: 150px;
    }
  }
  .item-wrapper{
    /*position: absolute;*/
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  ul{
    li.item{
      padding: 8px 15px;
      font-size: 12px;
      color: #666;
      background-color: #fff;
      margin-top: 10px;
      .imgWrapper{
        margin-right: 15px;
        width: 60px;
        img{
          width: 60px !important;
          height: 60px !important;
          margin-top: 7px;
          margin-bottom: 5px;
        }
      }
      p{
        line-height: 20px;
      }
      .flow-title{
        font-size: 14px;
        color: #000;
        line-height: 28px;
      }
      .buyBtn{
        margin-top: 5px;
        color: #fff;
        display: inline-block;
        background-color: #409eff;
        padding: 5px 12px;
        border-radius: 40px;
      }
    }
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }
  .el-carousel__indicators{
    /*display: none;*/
    min-width: 190px;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
}
#noTaocan{
  text-align: center;
  font-size: 14px;
  .img-wrapper{
    text-align: center;
    margin-top: 50px;
    img{
      width: 99px;
      height: 99px;
    }
  }
  p{
    padding-top: 10px;
    &.btn-wrapper{
      font-size: 16px;
    }
    span.btn{
      color: #409eff;
      display: inline-block;
      border-radius: 4px;
      background-color: #fff;
      border: 1px solid #409eff;
      width: 40vw;
      padding: 6px;
      &.active{
        color:  #fff;
        background-color: #409eff;
      }
    }
  }
}
</style>
