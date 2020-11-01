import Vue from 'vue'
import Router from 'vue-router'
import Lgoin from '@/components/login/Index'

Vue.use(Router)
export var router = new Router({
  linkActiveClass: 'active',
  mode: 'hash',
  routes: [{
      path: '/',
      name: 'guidePage',
      meta: {
        name: '引导页',
        index: 0
      },
      component: resolve => require(['@/components/public/GuidePage'], resolve),
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        name: '登录',
        // index:0
      },
      component: Lgoin
    },
    {
      path: '/homePage',
      name: 'mainNav',
      meta: {
        name: '主页面导航',
      },
      redirect: {
        name: 'stationBase'
      },
      component: resolve => require(['@/components/public/MainNav'], resolve),
      children: [{
        path: 'stationBase',
        name: 'stationBase',
        meta: {
          name: '基地概况',
          index: 0
        },
        component: resolve => require(['@/components/view/stationBase/Index'], resolve)
      }, {
        path: 'runAnalysis',
        name: 'runAnalysis',
        meta: {
          name: '运行分析',
          index: 0
        },
        component: resolve => require(['@/components/view/runAnalysis/Index'], resolve)

      }, {
        path: 'measureRpt',
        name: 'measureRpt',
        meta: {
          name: '监测月报',
          index: 0
        },
        component: resolve => require(['@/components/view/measureRpt/Index'], resolve)
      }, {
        path: 'userSet',
        name: 'userSet',
        meta: {
          name: '个人中心',
          index: 0
        },
        component: resolve => require(['@/components/view/userSet/Index'], resolve)
      }, ]
    }, {
      path: '/powerComp',
      name: 'powerComp',
      meta: {
        name: '发电量对比',
        index: 10
      },
      component: resolve => require(['@/components/view/runAnalysis/PowerComp'], resolve),
    }, {
      path: '/useHours',
      name: 'useHours',
      meta: {
        name: '利用小时数',
        index: 10
      },
      component: resolve => require(['@/components/view/runAnalysis/UseHours'], resolve),
    }, {
      path: '/powerEffectency',
      name: 'powerEffectency',
      meta: {
        name: '能效比',
        index: 10
      },
      component: resolve => require(['@/components/view/runAnalysis/PowerEffectency'], resolve),
    },
    {
      path: '/convertEfficiency',
      name: 'convertEfficiency',
      meta: {
        name: '组件转换效率',
        index: 10
      },
      component: resolve => require(['@/components/view/runAnalysis/ConvertEfficiency'], resolve),
    },
    {
      path: '/attenuationRate',
      name: 'attenuationRate',
      meta: {
        name: '组件衰减率',
        index: 10
      },
      component: resolve => require(['@/components/view/runAnalysis/AttenuationRate'], resolve),
    }, //
    {
      path: '/inverter',
      name: 'inverter',
      meta: {
        name: '逆变器转换效率',
        index: 10
      },
      component: resolve => require(['@/components/view/runAnalysis/InverterChangeRate'], resolve),
    },
    {
      path: '/sunRes',
      name: 'sunRes',
      meta: {
        name: '斜面辐射',
        index: 10
      },
      component: resolve => require(['@/components/view/runAnalysis/SunRes'], resolve),
    }, {
      path: '/analysis',
      name: 'analysis',
      meta: {
        name: '指标对标分析',
        index: 10
      },
      component: resolve => require(['@/components/view/runAnalysis/Analysis'], resolve),
    }, {
      path: '/stationDes',
      name: 'stationDes',
      meta: {
        name: '基地介绍',
        index: 10
      },
      component: resolve => require(['@/components/view/userSet/StationDes'], resolve),
    }, {
      path: '/documents',
      name: 'documents',
      meta: {
        name: '文档资料',
        index: 10
      },
      component: resolve => require(['@/components/view/userSet/Documents'], resolve),
    }, {
      path: '/changePwd',
      name: 'changePwd',
      meta: {
        name: '修改密码',
        index: 10
      },
      component: resolve => require(['@/components/view/userSet/ChangePwd'], resolve),
    },
    {
      path: '/viewPDF',
      name: 'viewPDF',
      meta: {
        name: '监测月报PDF预览',
        index: 10
      },
      component: resolve => require(['@/components/view/measureRpt/ViewPDF'], resolve),
    },
    {
      path: '/homePowEcon',
      name: 'homePowEcon',
      meta: {
        name: '各电站发电量',
        index: 10
      },
      component: resolve => require(['@/components/view/stationBase/homePowEcon'], resolve),
    },
    {
      path: '/indexComplianceRate',
      name: 'indexComplianceRate',
      meta: {
        name: '组件技术',
        index: 10
      },
      component: resolve => require(['@/components/view/stationBase/IndexComplianceRate'], resolve),
    },
    {
      path: '/economicBenefit',
      name: 'economicBenefit',
      meta: {
        name: '组件成本',
        index: 10
      },
      component: resolve => require(['@/components/view/stationBase/EconomicBenefit'], resolve),
    },
    {
      path: '/reduceCo2',
      name: 'reduceCo2',
      meta: {
        name: '领跑电价',
        index: 10
      },
      component: resolve => require(['@/components/view/stationBase/ReduceCo2'], resolve),
    }
  ]
});
