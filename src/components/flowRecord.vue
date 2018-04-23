<template>
  <div id="flow-record">
    <div class='order-tab clearfix'>
      <span class='fl' :class='{ active: isActive=="当月流量记录" }' @click='goPay("当月流量记录")'>当月流量记录</span>
      <span class='fr historyRec' :class='{ active: isActive=="历史流量记录" }' @click='goPay("历史流量记录")'>今日流量记录</span>
      <!--@click='havePayed'-->
    </div>
    <!--当月流量记录-->
    <div class='lists-wrapper' :class='{ active: isActive=="当月流量记录" }'>
      <ul>
        <li class='clearfix' style='background-color: #f5f5f5;color: #666'>
          <div class='fl'>
            日期
          </div>
          <div class='fr'>
            流量（MB）
          </div>
        </li>
        <li class='clearfix' v-for="(item, key) in monthFlowList" :key="key">
          <div class='fl'>
           {{item.useTime}}
          </div>
          <div class='fr'>
            {{(item.flowTotal).toFixed(2)}}
          </div>
        </li>
      </ul>
    </div>
    <!--历史流量记录-->
    <div class='lists-wrapper' :class='{ active: isActive=="历史流量记录" }'>
      <ul>
  <!--      <li class='clearfix yearBg'>
          <div class='fl'>
           2017年11月
          </div>
          <div class='fr'>
            总计2.96GB
          </div>
        </li>-->
        <li class='clearfix' style='background-color: #f5f5f5;color: #666'>
          <div class='fl'>
            时间
          </div>
          <div class='fr'>
            流量（MB）
          </div>
        </li>
        <li class='clearfix' v-for="(value, key) in dayFlowList" :key="key">
          <div class='fl'>
           {{value.useTime}}
          </div>
          <div class='fr'>
            {{(value.flowTotal).toFixed(2)}}
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
        isActive:'当月流量记录',
        dayFlowList:[],
        monthFlowList:[],
      }
    },
    methods: {
      goPay(val){
        this.isActive=val;
      },
      //查看历史流量记录
      havePayed(){
        this.$router.push('/historyFlowRecord');
      },
    },
    beforeMount: function () {
      document.title="流量使用记录";
      var url = window.location.href;
      var idxViFiID = this.getQueryString('idxViFiID',url);
      this.yPost(this.yzxhttp+'appApi/appDev/queryDevDaily',{
        idxViFiId:idxViFiID
      }).then(
        (response)=>{
          if(response.data.resultCode== 0){
            var monthFlowList=response.data.data.monthFlowList;
            var dayFlowList=response.data.data.dayFlowList;
            for (var i = 0; i < monthFlowList.length; i++) {
              monthFlowList[i]['useTime'] =monthFlowList[i]['useTime'].split(' ')[0]
            };
            for (var i = 0; i < dayFlowList.length; i++) {
              dayFlowList[i]['useTime'] =dayFlowList[i]['useTime'].split(' ')[1].split(':')[0];
            };
            this.monthFlowList=response.data.data.monthFlowList;
            this.dayFlowList=response.data.data.dayFlowList;
            //   this.$router.push('/pwSuc');
          }else{
          }
        });

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #flow-record{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: #FFF;
    .order-tab{
      span{
        background-color: #fff;
        display: inline-block;
        width: 50%;
        text-align: center;
        line-height: 40px;
        border-bottom: 2px solid transparent;
        font-size: 14px;
        &.active{
          color: #409eff;
          border-color: #409eff;
        }
      }
      .historyRec{
        &:hover{
          color:#409eff;
        }
      }
    }
    .lists-wrapper{
      display: none;
      &.active{
        display: block;
      }
      li{
        background-color: #fff;
        padding: 16px 15px;
        color: #ccc;
        font-size: 14px;
        border-bottom: 0.5px solid #e1e1e1;
        &:first-child{
          border: none;
        }
        &.yearBg{
          background-color: #409eff;
          div{
            color: #fff;
          }
        }
        div{
          width: 50%;
          text-align: center;
          color: #000;
        }
        &.validless{
          background-color: rgb(173,173,173);
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
          color: #e1e1e1;
        }
      }
    }
  }
</style>
