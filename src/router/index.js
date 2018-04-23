import Vue from 'vue'
import Router from 'vue-router'

/*import Home from '@/components/home'*/
//登录
import login from '@/components/login'
import phoneLogin from '@/components/phoneLogin'
import successLogin from '@/components/successLogin'
import mallLogin from '@/components/mallLogin'
//密码
import pwSuc from '@/components/pwSuc'
import modifyPw from '@/components/modifyPw'
//注册
import register from '@/components/register'
import registerSuc from '@/components/registerSuc'
import registerProtocol from '@/components/registerProtocol'
//支付
import paySuc from '@/components/paySuc'
import payNetErro from '@/components/payNetErro'
import lessBalance from '@/components/lessBalance'
import accountAbnormal from '@/components/accountAbnormal'
import mallPaySuc from '@/components/mallPaySuc'

//流量商城
import flowMall from '@/components/flowMall'

//订单
import orderDetail from '@/components/orderDetail'
import confirmOrder from '@/components/confirmOrder'
import orderInfo from '@/components/orderInfo'


//流量使用记录
import flowRecord from '@/components/flowRecord'


//套餐
import taocanInfo from '@/components/taocanInfo'
import noTaocan from '@/components/noTaocan'

//设备
import bindDevice from '@/components/bindDevice'
import unbind from '@/components/unbind'
import unbindSuc from '@/components/unbindSuc'
import bindSuc from '@/components/bindSuc'

import deviceInfo from '@/components/deviceInfo'

//设置
import setUp from '@/components/setUp'

//修改密码
import modifyMIFIpw from '@/components/modifyMIFIpw'
import modifyLoginPw from '@/components/modifyLoginPw'
import modifyUserName from '@/components/modifyUserName'


//个人中心
import userCenter from '@/components/userCenter'
import modifySuc from '@/components/modifySuc'

//微信
import weixin from '@/components/weixin'
import referIdWaiting from '@/components/referIdWaiting'
import mallReferIdWaiting from '@/components/mallReferIdWaiting'


Vue.use(Router)

export default new Router({
  routes: [
 /*   {
      path: '/home',
      name: 'Home',
      component: Home
    },*/
    //登录
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/phoneLogin',
      name: 'phoneLogin',
      component: phoneLogin
    },
    {
      path: '/successLogin',
      name: 'successLogin',
      component: successLogin
    },
    {
      path: '/mallLogin',
      name: 'mallLogin',
      component: mallLogin
    },
    //密码
    {
      path: '/pwSuc',
      name: 'pwSuc',
      component: pwSuc
    },
    {
      path: '/modifyPw',
      name: 'modifyPw',
      component: modifyPw
    },
    //注册
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/registerSuc',
      name: 'registerSuc',
      component: registerSuc
    },
    {
      path: '/registerProtocol',
      name: 'registerProtocol',
      component: registerProtocol
    },
    //支付
    {
      path: '/paySuc',
      name: 'paySuc',
      component: paySuc
    },
    {
      path: '/payNetErro',
      name: 'payNetErro',
      component: payNetErro
    },
    {
      path: '/lessBalance',
      name: 'lessBalance',
      component: lessBalance
    },
    {
      path: '/accountAbnormal',
      name: 'accountAbnormal',
      component: accountAbnormal
    },
    {
      path: '/mallPaySuc',
      name: 'mallPaySuc',
      component: mallPaySuc
    },
    //流量商城
    {
      path: '/flowMall',
      name: 'flowMall',
      component: flowMall
    },
    //订单
    {
      path: '/orderDetail',
      name: 'orderDetail',
      component: orderDetail
    },
    {
      path: '/confirmOrder',
      name: 'confirmOrder',
      component: confirmOrder
    },
    {
      path: '/orderInfo',
      name: 'orderInfo',
      component: orderInfo
    },
    //流量使用记录
    {
      path: '/flowRecord',
      name: 'flowRecord',
      component: flowRecord
    },
    //套餐
    {
      path: '/taocanInfo',
      name: 'taocanInfo',
      component: taocanInfo
    },
    {
      path: '/noTaocan',
      name: 'noTaocan',
      component: noTaocan
    },
    //设备
    {
      path: '/deviceInfo',
      name: 'deviceInfo',
      component: deviceInfo
    },
    {
      path: '/bindDevice',
      name: 'bindDevice',
      component: bindDevice
    },
    {
      path: '/unbind',
      name: 'unbind',
      component: unbind
    },
    {
      path: '/unbindSuc',
      name: 'unbindSuc',
      component: unbindSuc
    },
    {
      path: '/bindSuc',
      name: 'bindSuc',
      component: bindSuc
    },
    //设置
    {
      path: '/setUp',
      name: 'setUp',
      component: setUp
    },
    //修改密码
    {
      path: '/modifyMIFIpw',
      name: 'modifyMIFIpw',
      component: modifyMIFIpw
    },
    {
      path: '/modifyLoginPw',
      name: 'modifyLoginPw',
      component: modifyLoginPw
    },
    {
      path: '/modifyUserName',
      name: 'modifyUserName',
      component: modifyUserName
    },
    //个人中心
    {
      path: '/userCenter',
      name: 'userCenter',
      component: userCenter
    },
    {
      path: '/modifySuc',
      name: 'modifySuc',
      component: modifySuc
    },
    //微信
    {
      path: '/weixin',
      name: 'weixin',
      component: weixin
    },
    {
      path: '/referIdWaiting',
      name: 'referIdWaiting',
      component: referIdWaiting
    },
    {
      path: '/mallReferIdWaiting',
      name: 'mallReferIdWaiting',
      component: mallReferIdWaiting
    },
  ]
})
