<template>
  <div id="orderDetail">
    <div class='clearfix order-info'>
      <div class='fl'>
        <p><span class='info-title'>购买套餐：</span>{{goodList.goodsName}}</p>
        <p><span class='info-title'>覆盖地区：</span>{{datas.idxUUWiFiAreaDsc}}</p>
        <p><span class='info-title'>有效期：</span>{{goodList.expiryDay}}</p>
        <p><span class='info-title'>流量：</span>{{goodList.pkgValue}}</p>
        <p><span class='info-title'>售价：</span>￥{{(goodList.price/100).toFixed(2)}}</p>
      <!--  <p><span class='info-title'>实付：</span><span class='info-important'>￥9.90</span></p>-->
      </div>
     <!-- <div class='fr info-important'>未使用</div>-->
    </div>
    <div class='order-num'>
      <p>订单编号：{{datas.orderNo}}</p>
      <p>手机号码：{{datas.phoneNo}}</p>
      <p>创建时间：{{datas.createTime}}</p>
      <p>支付时间：{{datas.payTime}}</p>
      <p>支付流水号：{{datas.flowNo}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        orderNo:'',
        datas:{},
        goodList:{}
      }
    },
    methods: {
    },
    components: {},
    beforeCreate: function () {},
    created: function () {},
    beforeMount: function () {
      document.title="订单详情";
      var url = window.location.href;
      this.orderNo = this.getQueryString('orderNo',url);
      //
      this.yPost(this.yzxhttp+'appApi/appOrder/orderDetail',{
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

            this.datas = data;
            this.goodList = data.goodsList[0];
          }else{
            //错误提示
            /*  this.notice=response.data.message;*/
          }
        });

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
#orderDetail{
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
  }
}
</style>
