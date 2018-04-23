<template>
  <div id="taocan">
    <div class='order-tab clearfix' style="padding-bottom: 10px;">
      <span class='fl' :class='{ active: isActive=="账号关联套餐" }' @click='goPay("账号关联套餐")'>账号关联套餐</span>
      <span class='fr historyRec' :class='{ active: isActive=="设备关联套餐" }' @click='goPay("设备关联套餐")'>设备关联套餐</span>
      <!--@click='havePayed'-->
    </div>
    <!--当月流量记录-->
    <div class='lists-wrapper' :class='{ active: isActive=="账号关联套餐" }'>
      <ul>
       <!-- 使用中-->
        <li class='lessHalf' v-for="(packListItem, key) in accountPackList" :key="key">
          <p class='flow-title'>{{packListItem.pkgName}}</p>
          <p class='valid-data'><span>有效日期：</span>{{(packListItem.effectDate).slice(0,10)}}至{{(packListItem.invalidDate).slice(0,10)}}</p>
          <div class='flow-info'>
            <span v-if='packListItem.unlimitedFlow == 0' class='fl'>共{{packListItem.pkgValue}}MB，已用{{packListItem.usedValue}}MB</span>
            <span v-if='packListItem.unlimitedFlow == 0' class='fr'>剩余<span>{{packListItem.remainValue}}MB</span></span>
            <span v-if='packListItem.unlimitedFlow == 1' class='fr'>不限流量</span></span>
          </div>
          <!--使用中-->
            <div  v-if="'使用中' === packListItem.statusName">
              <div class='progress-wrapper'>
                <el-progress v-if="packListItem.unlimitedFlow == 0" :text-inside="true" :stroke-width="8" :percentage="(packListItem.usedValue/packListItem.pkgValue)*100" status="exception"></el-progress>
              </div>
              <span class='status' style='color: #409eff' >{{packListItem.statusName}}</span>
            </div>
            <!-- 已用完-->
            <div v-else-if="'已用完' === packListItem.statusName">
              <div class='progress-wrapper passHalf'>
                <el-progress v-if="packListItem.unlimitedFlow == 0" :text-inside="true" :stroke-width="8" :percentage="(packListItem.usedValue/packListItem.pkgValue)*100" status="exception"></el-progress>
              </div>
              <span class='status' style='color: #666' >{{packListItem.statusName}}</span>
            </div>
            <!--未使用-->
            <div v-else-if="'未使用' === packListItem.statusName || '未开始' === packListItem.statusName">
              <div class='progress-wrapper lessTenth'>
                <el-progress v-if="packListItem.unlimitedFlow == 0" :text-inside="true" :stroke-width="8" :percentage="(packListItem.usedValue/packListItem.pkgValue)*100" status="exception"></el-progress>
              </div>
              <span class='status' style='color: #ff6c24'>{{packListItem.statusName}}</span>
            </div>
            <!--已过期-->
            <div v-else-if="'已失效' === packListItem.statusName">
              <div class='progress-wrapper expire'>
                <el-progress v-if="packListItem.unlimitedFlow == 0" :text-inside="true" :stroke-width="8" :percentage="(packListItem.usedValue/packListItem.pkgValue)*100" status="exception"></el-progress>
              </div>
              <span class='status' style='color: #666'>{{packListItem.statusName}}</span>
            </div>
        </li>
       <!-- 已用完-->
       <!-- <li class='passHalf'>
          <p class='flow-title'>4G流量套餐</p>
          <p class='valid-data'><span>有效日期：</span>2017-09-28</p>
          <div class='flow-info'>
            <span class='fl'>共1024MB，已用566.12MB</span>
            <span class='fr'>剩余<span>500.00MB</span></span>
          </div>
          <div class='progress-wrapper'>
            <el-progress :text-inside="true" :stroke-width="8" :percentage="0.3" status="exception"></el-progress>
          </div>
          <span class='status' style='color: #666'>已用完</span>
        </li>-->
        <!--未使用-->
    <!--    <li class='lessTenth'>
          <p class='flow-title'>4G流量套餐</p>
          <p class='valid-data'><span>有效日期：</span>2017-09-28</p>
          <div class='flow-info'>
            <span class='fl'>共1024MB，已用566.12MB</span>
            <span class='fr'>剩余<span>500.00MB</span></span>
          </div>
          <div class='progress-wrapper'>
            <el-progress :text-inside="true" :stroke-width="8" :percentage="100" status="exception"></el-progress>
          </div>
          <span class='status' style='color: #ff6c24'>未使用</span>
        </li>-->
        <!--已过期-->
     <!--   <li class='expire'>
          <p class='flow-title'>4G流量套餐</p>
          <p class='valid-data'><span>有效日期：</span>2017-09-28</p>
          <div class='flow-info'>
            <span class='fl'>共1024MB，已用566.12MB</span>
            <span class='fr'>剩余<span>500.00MB</span></span>
          </div>
          <div class='progress-wrapper'>
            <el-progress :text-inside="true" :stroke-width="8" :percentage="1" status="exception"></el-progress>
          </div>
          <span class='status' style='color: #666'>已过期</span>
        </li>-->
      </ul>
      <div id="noTaocan" v-if='accountPackList.length==0'>
        <div class='img-wrapper'>
          <img src="../assets/imgs/no-flow.png" alt="">
        </div>
        <p style='font-size: 14px;color: #ccc;'>一个套餐都没有，真扫兴</p>
      </div>
    </div>
    <!--历史流量记录-->
    <div class='lists-wrapper' :class='{ active: isActive=="设备关联套餐" }'>
      <div id="noTaocan" v-if='devicePackList.length==0'>
        <div class='img-wrapper'>
          <img src="../assets/imgs/no-flow.png" alt="">
        </div>
        <p style='font-size: 14px;color: #ccc;'>一个套餐都没有，真扫兴</p>
      </div>
      <ul>
       <!-- 使用中-->
        <li class='lessHalf' v-for="(packListItem, key) in devicePackList" :key="key">
          <p class='flow-title'>{{packListItem.pkgName}}</p>
          <p class='valid-data'><span>有效日期：</span>{{(packListItem.effectDate).slice(0,10)}}至{{(packListItem.invalidDate).slice(0,10)}}</p>
          <div class='flow-info'>
            <span v-if='packListItem.unlimitedFlow == 0' class='fl'>共{{packListItem.pkgValue}}MB，已用{{packListItem.usedValue}}MB</span>
            <span v-if='packListItem.unlimitedFlow == 0' class='fr'>剩余<span>{{packListItem.remainValue}}MB</span></span>
            <span v-if='packListItem.unlimitedFlow == 1' class='fr'>不限流量</span></span>
          </div>
          <!--使用中-->
            <div  v-if="'使用中' === packListItem.statusName">
              <div class='progress-wrapper'>
                <el-progress v-if="packListItem.unlimitedFlow == 0" :text-inside="true" :stroke-width="8" :percentage="(packListItem.usedValue/packListItem.pkgValue)*100" status="exception"></el-progress>
              </div>
              <span class='status' style='color: #409eff' >{{packListItem.statusName}}</span>
            </div>
            <!-- 已用完-->
            <div v-else-if="'已用完' === packListItem.statusName">
              <div class='progress-wrapper passHalf'>
                <el-progress v-if="packListItem.unlimitedFlow == 0" :text-inside="true" :stroke-width="8" :percentage="(packListItem.usedValue/packListItem.pkgValue)*100" status="exception"></el-progress>
              </div>
              <span class='status' style='color: #666' >{{packListItem.statusName}}</span>
            </div>
            <!--未使用-->
            <div v-else-if="'未使用' === packListItem.statusName || '未开始' === packListItem.statusName">
              <div class='progress-wrapper lessTenth'>
                <el-progress v-if="packListItem.unlimitedFlow == 0" :text-inside="true" :stroke-width="8" :percentage="(packListItem.usedValue/packListItem.pkgValue)*100" status="exception"></el-progress>
              </div>
              <span class='status' style='color: #ff6c24'>{{packListItem.statusName}}</span>
            </div>
            <!--已过期-->
            <div v-else-if="'已失效' === packListItem.statusName">
              <div class='progress-wrapper expire'>
                <el-progress v-if="packListItem.unlimitedFlow == 0" :text-inside="true" :stroke-width="8" :percentage="(packListItem.usedValue/packListItem.pkgValue)*100" status="exception"></el-progress>
              </div>
              <span class='status' style='color: #666'>{{packListItem.statusName}}</span>
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
        testPoll: false,
        forbiddenLoad: false,
        loadMoreLoading:true,
        accountPackList:[],
        devicePackList:[],
        isActive:'账号关联套餐',
      }
    },
    methods: {
      goPay(val){
        this.isActive=val;
        var ucpAccountType;
        if (val == "账号关联套餐"){
          ucpAccountType = 2;
        }else{
          ucpAccountType = 1
        }
        this.yPost(this.yzxhttp+'appApi/appDev/queryDevSuit',{
          ucpAccountType:ucpAccountType
        }).then(
          (response)=>{
            if(response.data.resultCode== 0){
            //  this.packList = response.data.data.packList;
              var pkg = response.data.data,
                  pkgList = [];
              for (var i = 0; i < pkg.length; i++) {
                //pkgList = pkgList.concat(pkg[i].suitList);
                for (var j = 0; j < pkg[i].suitList.length; j++) {
                  pkgList.push(pkg[i].suitList[j]);
                }
              }

              for (var i = 0; i < pkgList.length; i++) {
                if (pkgList[i].unlimitedFlow == undefined){
                  pkgList[i].unlimitedFlow = 0;
                }
              }
              if (ucpAccountType == 2){
                this.accountPackList = pkgList;
              }else{
                this.devicePackList = pkgList;
              }
            }else{
              //错误提示
            }
          });
      }
    },
    components: {},
    beforeCreate: function () {},
    created: function () {},
    beforeMount: function () {
      document.title="套餐信息";
      //套餐列表
      this.yPost(this.yzxhttp+'appApi/appDev/queryDevSuit',{
        ucpAccountType:2
      }).then(
        (response)=>{
          if(response.data.resultCode== 0){
          //  this.packList = response.data.data.packList;
              var pkg = response.data.data,
                  pkgList = [];
              for (var i = 0; i < pkg.length; i++) {
                //pkgList = pkgList.concat(pkg[i].suitList);
                for (var j = 0; j < pkg[i].suitList.length; j++) {
                  pkgList.push(pkg[i].suitList[j]);
                }
              }
              for (var i = 0; i < pkgList.length; i++) {
                if (pkgList[i].unlimitedFlow == undefined){
                  pkgList[i].unlimitedFlow = 0;
                }
              }
              this.accountPackList = pkgList;
          }else{
            //错误提示
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
  #taocan{
    /*position: absolute;*/
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    font-size: 14px;
    background-color: rgb(245,245,245);
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
    }
    .lists-wrapper.active{
      display: block;
    }
    .el-progress-bar__innerText{
      display: none;
    }
    .el-progress-bar__outer{
      background-color: #fff;
    }
    .lessHalf{
      .el-progress-bar__outer{
        border: 0.5px solid #f6692c;
      }
      .el-progress.is-exception .el-progress-bar__inner{
        background-color: #fa8334;
      }
    }
    .passHalf{
          .el-progress-bar__outer{
            border: 0.5px solid #f14646;
          }
          .el-progress.is-exception .el-progress-bar__inner{
            background-color: #ff6c6c;
          }
        }
    .lessTenth{
      .el-progress-bar__outer{
        border: 0.5px solid #36bd9c;
      }
      .el-progress.is-exception .el-progress-bar__inner{
        background-color: #36cf97;
      }
    }
    .expire{
      .el-progress-bar__outer{
        border: 0.5px solid #aaa;
      }
      .el-progress.is-exception .el-progress-bar__inner{
        background-color: #ccc;
      }
    }
    li{
      padding: 0 15px;
      background-color: #fff;
      margin-bottom: 10px;
      padding-bottom: 20px;
      position: relative;
      &.expire{
        background-color: rgb(237,237,237);
      }
      .status{
        position: absolute;
        font-size: 14px;
        top: 15px;
        right: 15px;
      }
      .flow-title{
        font-size: 16px;
        padding-top: 12px;
      }
      .valid-data{
        line-height: 40px;
        span{
          color: #ccc;
        }
      }
      .flow-info{
        font-size: 12px;
        padding-bottom: 25px;
      }
    }

  }
  #noTaocan{
    position: absolute;
    left: 0;
    right: 0;
    height: 100%;
    background-color: #fff;
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
