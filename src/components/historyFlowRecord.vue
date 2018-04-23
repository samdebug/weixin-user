<template>
  <div id="historyFlowRecord">
    <!--历史流量记录-->
    <div class='lists-wrapper active'>
      <ul>
        <li class='clearfix yearBg'>
          <div class='fl'>
            2017年11月
          </div>
          <div class='fr'>
            总计2.96GB
          </div>
        </li>
        <li class='clearfix' style='background-color: #f5f5f5;color: #666;border: none;'>
          <div class='fl'>
            日期
          </div>
          <div class='fr'>
            流量（MB）
          </div>
        </li>
        <li class='clearfix'>
          <div class='fl'>
            2017-12-20
          </div>
          <div class='fr'>
            222.33
          </div>
        </li>
        <li class='clearfix'>
          <div class='fl'>
            2017-12-20
          </div>
          <div class='fr'>
            222.33
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
        isActive:'当月流量记录'
      }
    },
    methods: {
      goPay(val){
        this.isActive=val;
      },
      havePayed(val){
        this.isActive=val;
      },
    },
    components: {},
    beforeCreate: function () {},
    created: function () {},
    beforeMount: function () {
      document.title="流量使用记录";
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
  #historyFlowRecord{
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
    }
    .lists-wrapper{
      display: none;
      &.active{
        display: block;
      }
      li{
        background-color: #fff;
        padding: 16px 15px;
        color: #666;
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
