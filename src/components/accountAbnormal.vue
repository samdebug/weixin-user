<template>
  <div id="abnormal">
    <div class='img-wrapper'>
      <img src="../assets/imgs/fail.png" alt="">
    </div>
    <p style='color: #666'>支付失败</p>
    <p class='btn-wrapper' style='margin-top: 30px'>
      <span class='btn' :class='{ active: isActive=="继续支付" }' @click='bindDevice("继续支付")'>继续支付</span>
    </p>
    <p class='btn-wrapper'>
      <span class='btn' :class='{ active: isActive=="以后再说" }' @click='bindLater("以后再说")'>以后再说</span>
    </p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isActive:'继续支付',
        loginName:'',
        orderNo:''
      }
    },
    methods: {
      bindDevice(val){
        this.isActive=val;
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
      },
      bindLater(val){
        this.isActive=val;
        this.$router.push('/userCenter?loginName='+this.loginName);
      },
    },
    beforeMount: function () {
      document.title="支付结果";
      var url = window.location.href;
      this.loginName = this.getQueryString('loginName',url);
      this.orderNo = this.getQueryString('orderNo',url);
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #abnormal{
    text-align: center;
    font-size: 14px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: #fff;
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
          color: #fff;
          background-color: #409eff;
        }
      }
    }
  }
</style>
