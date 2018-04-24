// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//import echarts from "echarts"
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import './assets/common.css'
Vue.use(MintUI);

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import FastClick from 'fastclick'


//进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


FastClick.attach(document.body);


Vue.use(ElementUI)

import axios from 'axios'
/*import './assets/js/jweixin-1.2.0'*/


// cookie方法


Vue.prototype.lcookie = {
  setCookies:function (name,value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
  },
  getCookies: function (name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return unescape(arr[2]);
    else
      return null;
  },
  removeCookies: function (name) {
    this.setCookies(name, '', -1);
  }
}
//写死参数
/*Vue.prototype.appkey  = "123123"*/
/*Vue.prototype.appId=3*/
Vue.prototype.reType  = 1
//Vue.prototype.yzxhttp='http://mifi-test2.100hospital.club/api/weixin/'
//Vue.prototype.yzxhttp='http://test.duoduomao.mifi.ucpaas.com/api/weixin/'
//Vue.prototype.yzxhttp='http://172.16.4.167:99/api/weixin/'
//Vue.prototype.yzxhttp='http://wxmifi.06nmy.com/api/weixin/'
//Vue.prototype.yzxhttp='http://mifi.xian123.vip/api/weixin/'
//Vue.prototype.yzxhttp='http://mf.10086gg.cn/api/weixin/'
Vue.prototype.yzxhttp='http://mifi.onccop.com/api/weixin/'

Vue.prototype.accessToken = "4636972dce2a4331a57c0c3448e50abe"
Vue.prototype.merchantNo = "833100208000008"
Vue.prototype.terminalId = "10298254"
//这家伙只能后台给
Vue.prototype.payType  = 'saobei'


Vue.prototype.referId  = ''

Vue.prototype.yPost = function (url, prop) {0
  const data =prop || {};
  //写死
  data.reType = 1;
  data.referType = 0;
  //后台获取
//data.referId = 'ojTnr0-pHNyb7cVaMKK7vUKmyad0';

//data.referId = 'o8bIW03SNGi9dFwk1h6gmKN7q3tQ';
 /*data.referId = 'o8bIW08noCDphiW4bJX5zYWtoCjw';*/
 if(this.lcookie.getCookies("referId")){
     data.referId = this.lcookie.getCookies("referId");
   }else{
     data.referId = this.referId;
   }
  var qs = require('qs');
  return axios.post(url, qs.stringify(data), { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } }).then(res=>{
    return res;
  })
}

Vue.config.productionTip = false

// 返回
Vue.prototype.goBack = function () {
  history.go(-1);
}

// 获取地址栏中的参数
Vue.prototype.getQueryString = function (data, url) {
  var paramsReg = /^.*\?([^\?]*)$/;// 匹配最后一个？后面的内容
  var paramsMatch = url.match(paramsReg);
  var params = url;
  if ( paramsMatch&&paramsMatch.length == 2 ) {
    params = paramsMatch[1];
  }
  var regex = new RegExp('(^|&)' + data + '=([^&]*)(&|$)', 'i'), query = params;
  if (query) {
    let match = query.match(regex);
    return match && decodeURIComponent(match[2]);
  }
  return null;
}

router.beforeEach((to, from, next) => {
      NProgress.configure({ showSpinner: false });
      NProgress.start();
      next();
});

router.afterEach(transition => {
  NProgress.done();
});



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
