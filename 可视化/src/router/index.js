import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'

Vue.use(VueRouter)
const routes = [{
    path: '/',
    name: 'home',
    component: Home,
    children: [{
        path: '/leftDetail',
        name: '产业升级左',
        component: resolve => {
            require(['@/views/leftDetail/detail'], resolve)
        }
    }, {
        path: '/rightDetail',
        name: '产业升级右',
        component: resolve => {
            require(['@/views/rightDetail/detail'], resolve)
        }
    },
        {
            path: '/leftoperation',
            name: '领跑左',
            component: resolve => {
                require(['@/views/leftDetail/operation'], resolve)
            }
        },
        {
            path: '/rightoperation',
            name: '领跑右',
            component: resolve => {
                require(['@/views/rightDetail/operation'], resolve)
            }
        },
        {
            path: '/leftMonitoring',
            name: '运行监测左',
            component: resolve => {
                require(['@/views/leftDetail/monitoring'], resolve)
            }
        },
        {
            path: '/rightMonitoring',
            name: '运行监测右',
            component: resolve => {
                require(['@/views/rightDetail/monitoring'], resolve)
            }
        },

        {
            path: '/leftechartPower',
            name: '综合分析左',
            component: resolve => {
                require(['@/views/leftDetail/echartPower'], resolve)
            }
        },
        // {
        //     path: '/rightechartPower',
        //     name: '综合分析右',
        //     component: resolve => {
        //         require(['@/views/rightDetail/echartPower'], resolve)
        //     }
        // },
        {
            path: '/leftstatistics',
            name: '统计左',
            component: resolve => {
                require(['@/views/leftDetail/Statistics'], resolve)
            }
        },
        {
            path: '/rightstatistics',
            name: '统计右',
            component: resolve => {
                require(['@/views/rightDetail/Statistics'], resolve)
            }
        },
        {
            path: '/statisticsStation',
            name: '统计弹窗',
            component: resolve => {
                require(['@/components/public/dialogStationTable'], resolve)
            }
        },
        {
            path: '/electrovalence',
            name: '领跑电价弹窗',
            component: resolve => {
                require(['@/components/public/dialogElectrovalence'], resolve)
            }
        },
        {
            path: '/yearcompinent',
            name: '年份选择组件',
            component: resolve => {
                require(['@/components/public/tabYear'], resolve)
            }
        },  {
            path: '/powerYear',
            name: '年份选择组件',
            component: resolve => {
                require(['@/components/public/powerYear'], resolve)
            }
        },
        {
            path: '/titleComponent',
            name: '产业升级标题',
            component: resolve => {
                require(['@/components/public/echarts/titleComponent'], resolve)
            }
        },{
            path: '/dayEffic',
            name: '光资源弹窗',
            component: resolve => {
                require(['@/components/public/EfficBar'], resolve)
            }
        },
        // {
        //     path:'/resource',
        //     name: '光资源标题',
        //     component: resolve => {
        //         require(['@/components/public/echarts/Resource'], resolve)
        //     }
        // },
        {
            path: '/tableEconomic',
            name: '经济效益弹窗',
            component: resolve => {
                require(['@/components/public/Economic'], resolve)
            }
        },{
            path: '/photovoltaic',
            name: '光伏+全景图',
            component: resolve => {
                require(['@/components/public/Photovoltaic'], resolve)
            }
        } ,{
            path: '/dalogEcharts',
            name: '当日运行功率弹框',
            component: resolve => {
                require(['@/components/public/dialog-echartsBarl'], resolve)
            }
        },{
            path: '/dayEfficBar',
            name: '当日辐射量弹框',
            component: resolve => {
                require(['@/components/public/dail-EfficBar'], resolve)
            }
        } ,{
            path: '/dayNumberBar',
            name: '当日发电量及利用小时数弹框',
            component: resolve => {
                require(['@/components/public/diao-EchartsBarday'], resolve)
            }
        },{
            path: '/componentMonitoring',
            name: '组件监测弹框',
            component: resolve => {
                require(['@/components/public/ComponentMonitoring'], resolve)
            }
        },
        {
            path: '/ComponentMain',
            name: '组件发展趋势分析标题',
            component: resolve => {
                require(['@/components/public/echarts/ComponentMain'], resolve)
            }
        },
        {
            path: '/ComponentMore',
            name: '组件价格趋势分析更多数据弹框',
            component: resolve => {
                require(['@/components/public/dialog-EchartAnaly'], resolve)
            }
        },

        {
            path: '/AccountedMore',
            name: '组件占比趋势分析更多数据弹框',
            component: resolve => {
                require(['@/components/public/dialog-AccountedMore'], resolve)
            }
        },
      
        {
            path: '/ConversionMore',
            name: '组件转换效率趋势分析更多数据弹框',
            component: resolve => {
                require(['@/components/public/dialog-ConversionMore'], resolve)
            }
        },

        {
            path: '/InverterMore',
            name: '逆变器分析更多弹框',
            component: resolve => {
                require(['@/components/public/dialog-InverterMore'], resolve)
            }
        },
        {
            path: '/ElectricityMore',
            name: '支架分析更多数据弹框',
            component: resolve => {
                require(['@/components/public/dialog-ElectricityMore'], resolve)
            }
        },

        {
            path: '/GenerationMore',
            name: '发电能效分析更多弹框',
            component: resolve => {
                require(['@/components/public/dialog-EnergyEffiMore'], resolve)
            }
        },

        {
            path:'/BenefitMore',
            name: '成本分析更多数据弹框',
            component: resolve => {
                require(['@/components/public/dialog-BenefitMore'], resolve)
            }
        }

    ]
},
    // {
    //     path: '/Map',
    //     name: 'mainmap',
    //     component: () =>
    //         import ('../views/MainMap.vue')
    // }
]
const router = new VueRouter({
    base: "/web/",
    mode: "history",
    routes
});
// const router = new VueRouter({
//     routes
// })

export default router