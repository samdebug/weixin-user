<template>
  <div id="order-info">
    <div class='order-tab clearfix'>
      <span class='fl' :class='{ active: isActive=="待付款" }' @click='goPay("待付款")'>待付款</span>
      <span class='fr' :class='{ active: isActive=="已付款" }' @click='havePayed("已付款")'>已付款</span>
    </div>
    <!--待付款-->
    <div class='lists-wrapper paying' :class='{ active: isActive=="待付款" }'>
      <ul>
        <li class='clearfix'  v-for="(unPayListItem, unPayListKey) in unPayList" :key="unPayListItem.orderId" @click='goOrder(unPayListItem)' :class="{ validless: 0 != unPayListItem.status}">
          <div class='fl'>
            <p class='item-title'>{{unPayListItem.goodsName}}</p>
            <p>覆盖地区：{{unPayListItem.idxUUWiFiAreaDsc}}</p>
            <p>有效期：{{unPayListItem.expiryDay}}</p>
            <p>订单号：{{unPayListItem.orderNo}}</p>
          </div>
          <div class='fr'>
            <p class='item-title'>￥{{(unPayListItem.price/100).toFixed(2)}}</p>
            <!--去支付-->
            <p class='no-pay pay' v-if="0 === unPayListItem.status">去支付</p>
            <!--支付中-->
            <p class='paying pay' v-else-if="5 === unPayListItem.status">支付中</p>
            <!--已失效-->
            <p class='pay-failed pay' v-else>已失效</p>
          </div>
        </li>
        <!--支付中-->
 <!--       <li class='clearfix' @click='goOrder'>
          <div class='fl'>
            <p class='item-title'>2G流量套餐</p>
            <p>覆盖地区：深圳</p>
            <p>有效期：30天</p>
          </div>
          <div class='fr'>
            <p class='item-title'>￥9.90</p>
            <p class='paying pay'>支付中</p>
          </div>
        </li>-->
        <!--已失效-->
      <!--  <li class='clearfix validless' @click='goOrder'>
          <div class='fl'>
            <p class='item-title'>2G流量套餐</p>
            <p>覆盖地区：深圳</p>
            <p>有效期：30天</p>
          </div>
          <div class='fr'>
            <p class='item-title'>￥9.90</p>
            <p class='pay-failed pay'>已失效</p>
          </div>
        </li>-->
      </ul>
    </div>
    <!--已付款-->
    <div class='lists-wrapper payed' :class='{ active: isActive=="已付款" }'>
      <ul>
        <li class='clearfix'  v-for="(payLisItem, key) in payList" :key="payLisItem.orderId" @click='goOrderInfo(payLisItem)' :class="{ validless: 0||5 !== payLisItem.status}">
          <div class='fl'>
            <p class='item-title'>{{payLisItem.goodsName}}</p>
            <p>覆盖地区：{{payLisItem.idxUUWiFiAreaDsc}}</p>
            <p>有效期：{{payLisItem.expiryDay}}</p>
            <p>订单号：{{payLisItem.orderNo}}</p>
          </div>
          <div class='fr'>
            <p class='item-title'>￥{{(payLisItem.price/100).toFixed(2)}}</p>
            <!--<p class='no-pay pay'>未使用</p>-->
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isActive:'待付款',
        testPoll: false,
        forbiddenLoad: false,
        loadMoreLoading:true,
        unPayList:[],
        payList:[]
      }
    },
    methods: {
      goPay(val){
        this.isActive=val;
      },
      havePayed(val){
        this.isActive=val;
      },
      goOrder(val){
        this.$router.push('/confirmOrder?orderNo='+val.orderNo+'&status='+val.status);
      },
      goOrderInfo(val){
        this.$router.push('/orderDetail?orderNo='+val.orderNo);
      }
    },
    components: {},
    beforeCreate: function () {},
    created: function () {},
    beforeMount: function () {
      document.title="订单信息";
      //订单信息
      this.yPost(this.yzxhttp+'appApi/appOrder/queryOrderList',{
      }).then(
        (response)=>{
          if(response.data.resultCode== 0){
            var unpayList = response.data.data.unPayList,
            payList = response.data.data.payList;
            for (var i = 0; i < unpayList.length; i++) {
              if (unpayList[i].idxUUWiFiAreaId == "u.as.cn"){
                unpayList[i].idxUUWiFiAreaDsc = "中国";
              }else if(unpayList[i].idxUUWiFiAreaId == "u.as.cn.guangzhou"){
                unpayList[i].idxUUWiFiAreaDsc = "中国-广州";
              }else if(unpayList[i].idxUUWiFiAreaId == "u.as.cn.beijing"){
                unpayList[i].idxUUWiFiAreaDsc = "中国-北京";
              }else if(unpayList[i].idxUUWiFiAreaId == "u.as.cn.shenzhen"){
                unpayList[i].idxUUWiFiAreaDsc = "中国-深圳";
              }else if (unpayList[i].idxUUWiFiAreaId == "u.as.cn.guangdong"){
                unpayList[i].idxUUWiFiAreaDsc = "中国-广东";
              }else{
                unpayList[i].idxUUWiFiAreaDsc = "中国";
              }

              if (unpayList[i].pkgType == 1){
                unpayList[i].expiryDay = unpayList[i].expiryDay + "天"
              }else if (unpayList[i].pkgType == 2){
                unpayList[i].expiryDay = unpayList[i].expiryDay + "月"
              }else {
                unpayList[i].expiryDay = unpayList[i].expiryDay + "年"
              }
            };
            for (var i = 0; i < payList.length; i++) {
              if (payList[i].idxUUWiFiAreaId == "u.as.cn"){
                payList[i].idxUUWiFiAreaDsc = "中国";
              }else if(payList[i].idxUUWiFiAreaId == "u.as.cn.guangzhou"){
                payList[i].idxUUWiFiAreaDsc = "中国-广州";
              }else if(payList[i].idxUUWiFiAreaId == "u.as.cn.beijing"){
                payList[i].idxUUWiFiAreaDsc = "中国-北京";
              }else if(payList[i].idxUUWiFiAreaId == "u.as.cn.shenzhen"){
                payList[i].idxUUWiFiAreaDsc = "中国-深圳";
              }else if (payList[i].idxUUWiFiAreaId == "u.as.cn.guangdong"){
                payList[i].idxUUWiFiAreaDsc = "中国-广东";
              }else{
                payList[i].idxUUWiFiAreaDsc = "中国";
              }

              if (payList[i].pkgType == 1){
                payList[i].expiryDay = payList[i].expiryDay + "天"
              }else if (payList[i].pkgType == 2){
                payList[i].expiryDay = payList[i].expiryDay + "月"
              }else {
                payList[i].expiryDay = payList[i].expiryDay + "年"
              }
            };
            this.unPayList = unpayList;
            this.payList = payList;
          }else{
            //错误提示
          }
        });
/*      this.yPost(this.http+'appApi/appOrder/queryOrderList',{
        appKey:this.appkey,
        referType:this.referType,
        referId:this.referId,
        appId:this.appId,
      }).then(res=>{

       /!*this.itemsData = res.data.rows*!/
        this.loadMoreLoading=false;
      })
      var that = this;
      setTimeout(function poll() {
        let Wrapper = $(".mint-indexlist-content")[0];
        if (Wrapper) {
          Wrapper.addEventListener('scroll', function () {
            //判断上次是不是还没结束  防止反复刷新
            if (that.testPoll === true) return;
            let $this = $(this),
              viewH = $(this).height(), // 可见高度
              contentH = $(this).get(0).scrollHeight,// 内容高度
              scrollTop = $(this).scrollTop();
            //滚动高度
            if (contentH - viewH - scrollTop <= 50) { // 到达底部 50px 时,加载新内容
              that.testPoll = true;
              if (that.forbiddenLoad === true) {
                that.bottomTips=true
                that.$message('没有更多数据了');
              } else {
                that.loadMoreLoading=true;
                that.page++;
                that.yPost(that.http+'appApi/appOrder/queryOrderList', {
                  /!*rows: 40,
                  page: that.page*!/
                }).then(data => {
                  //接到数据了
                  that.testPoll = false;
                  that.loadMoreLoading=false;

                  if(data.data.success==true){
                    if(JSON.stringify(data.data.rows)==="{}"){
                      that.forbiddenLoad=true;
                      return;
                    }
                    for(var k  in data.data.rows){
                      if(that.itemsData[k]){
                        Vue.set(that.itemsData,k,that.itemsData[k].concat(data.data.rows[k]))

                      }else{
                        Vue.set(that.itemsData,k,data.data.rows[k])
                      }
                    }
                  };
                })
              }
            }
          }, true);
        } else {
          setTimeout(poll, 300);
        }
      }, 300);*/
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
#order-info{
  /*position: absolute;*/
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: rgb(245,245,245);
  padding-bottom: 10px;
  .order-tab{
    span{
      background-color: #fff;
      display: inline-block;
      width: 50%;
      text-align: center;
      line-height: 40px;
      border-bottom: 2px solid transparent;
      &.active{
        color: #409eff;
        border-color: #409eff;
      }
    }
  }
  .lists-wrapper.paying{
    display: none;
    &.active{
      display: block;
    }
    li{
      background-color: #fff;
      margin-top: 10px;
      padding: 10px 15px;
      color: #666;
      font-size: 12px;
      &.validless{
        background-color: rgb(237,237,237);
      }
      p{
        line-height: 20px;
      }
      .item-title{
        font-size: 14px;
        color: #000;
        font-weight: 600;
        line-height: 30px;
      }
      .pay{
        font-size: 14px;
        font-weight: 600;
        line-height: 30px;
        text-align: right;
      }
      .no-pay{
        color: rgb(255,108,36);
      }
      .paying{
        color: #409eff;
      }
      .pay-failed{
        color: #666;
      }
    }
  }
  .lists-wrapper.payed{
    display: none;
    &.active{
      display: block;
    }
    li{
      background-color: #fff;
      margin-top: 10px;
      padding: 10px 15px;
      color: #666;
      font-size: 12px;
      &.validless{
        background-color: rgb(237,237,237);
      }
      p{
        line-height: 20px;
      }
      .item-title{
        font-size: 14px;
        color: #000;
        font-weight: 600;
        line-height: 30px;
      }
      .pay{
        font-size: 14px;
        font-weight: 600;
        line-height: 30px;
      }
      .no-pay{
        color: rgb(255,108,36);
      }
      .paying{
        color: #409eff;
      }
      .pay-failed{
        color: #666;
      }
    }
  }
}
</style>
