<template>
  <div id="confirmOrder">
    <div class=' order-info'>
      <div>
        <p><span class='info-title'>购买套餐：</span>{{goodList.goodsName}}</p>
        <p><span class='info-title'>覆盖地区：</span>{{data.idxUUWiFiAreaDsc}}</p>
        <p><span class='info-title'>有效期：</span>{{goodList.expiryDay}}</p>
        <p><span class='info-title'>流量：</span>{{goodList.pkgValue}}</p>
        <p><span class='info-title'>售价：</span>￥{{((goodList.price)/100).toFixed(2)}}</p>
      </div>
    </div>
    <div class='order-num'>
      <p>订单编号：{{data.orderNo}}</p>
      <p>手机号码：{{data.phoneNo}}</p>
      <p>创建时间：{{data.createTime}}</p>
      <p v-if='data.payTime'>支付时间：{{data.payTime}}</p>
      <p v-if='data.flowNo'>支付流水号：{{data.flowNo}}</p>
    </div>
    <div class='login-wrapper' v-if="0 === status">
      <a href="javascript:;" class='login' @click='pay'>立即支付</a>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        orderNo:'',
        status:"",
        data:{},
        goodList:{},
        loginName:''
      }
    },
    methods: {
      pay(){
        //获取订单信息
        this.yPost(this.yzxhttp+'appApi/appOrder/orderPayInfo',{
          orderNo:this.orderNo
        }).then(
          (response)=>{
            if(response.data.resultCode== 0){
              //微信支付
              var timeStamp = response.data.data.trantInfo.timestamp,
                nonceStr = response.data.data.trantInfo.nonceStr,
                appId = response.data.data.trantInfo.appId,
                package_str = response.data.data.trantInfo.packageStr,
                signType = response.data.data.trantInfo.signType,
                paySign = response.data.data.trantInfo.paySign;
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
                    //成功回調
                    this.yPost(this.yzxhttp+'appApi/appOrder/payOrderConfirm',{
                      orderNo:this.orderNo
                    }).then(
                      (response)=>{
                        if(response.data.resultCode== 0){
                          //支付成功
                          this.$router.push('/paySuc?loginName='+this.loginName);
                        }else{
                          this.$router.push('/accountAbnormal?loginName='+this.loginName+'&orderNo='+this.orderNo);
                        }
                      });

                  }else if(res.err_msg=='get_brand_wcpay_request:fail'){
                    openErrorOptDiolag("支付失败","支付失败");
                    // Toast('网络异常，请重试')
                  }else if(res.err_msg === 'get_brand_wcpay_request:cancel'){
                    //用户取消支付
                  }
                }
              );
            };
          });
      }
    },
    beforeMount: function () {
      document.title="订单详情";
      var url = window.location.href;
      this.orderNo = this.getQueryString('orderNo',url);
      this.status = Number(this.getQueryString('status',url));
      this.yPost(this.yzxhttp+'appApi/appOrder/orderPayInfo',{
        orderNo:this.orderNo,
      }).then(
        (response)=>{
          if(response.data.resultCode== 0){
            var data = response.data.data,
              idxUUWiFiAreaId = data.goodsList[0].idxUUWiFiAreaId;
            if (idxUUWiFiAreaId== "u.as.cn"){
              data.idxUUWiFiAreaDsc = "中国";
            }else if(idxUUWiFiAreaId == "u.as.cn.guangzhou"){
              data.idxUUWiFiAreaDsc = "中国-广州";
            }else if(idxUUWiFiAreaId == "u.as.cn.beijing"){
              data.idxUUWiFiAreaDsc = "中国-北京";
            }else if(idxUUWiFiAreaId== "u.as.cn.shenzhen"){
              data.idxUUWiFiAreaDsc = "中国-深圳";
            }else if (idxUUWiFiAreaId == "u.as.cn.guangdong"){
              data.idxUUWiFiAreaDsc = "中国-广东";
            }else{
              data.idxUUWiFiAreaDsc = "中国";
            }
            if (data.goodsList[0].unlimitedFlow){
                data.goodsList[0].pkgValue = "不限流量";
            }else{
                data.goodsList[0].pkgValue = data.goodsList[0].pkgValue + "M";
            }

            if (data.goodsList[0].pkgType == 1){
              data.goodsList[0].expiryDay = data.goodsList[0].expiryDay + "天"
            }else if (data.goodsList[0].pkgType == 2){
              data.goodsList[0].expiryDay = data.goodsList[0].expiryDay + "月"
            }else {
              data.goodsList[0].expiryDay = data.goodsList[0].expiryDay + "年"
            }

            this.data = data;
            this.goodList = data.goodsList[0];

          }else{
            //错误提示
            /*  this.notice=response.data.message;*/
          }
        });
    },
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #confirmOrder{
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    background-color: rgb(245,245,245);
    .order-info{
      line-height: 30px;
      margin-top: 15px;
      padding: 10px 15px;
      background-color: #fff;
      border-bottom: 1px dashed #e1e1e1;
      .info-title{
        color: #c0b6b6;
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
      color: #c0b6b6;
    }
    .login-wrapper{
      padding: 0 15px;
      margin-top: 30px;
      .login{
        display: inline-block;
        width: 100%;
        height: 38px;
        line-height: 38px;
        text-align: center;
        background-color: #409eff;
        /*#86b8e6*/
        color: #fff;
        border-radius: 4px;
      }
    }
  }
</style>
