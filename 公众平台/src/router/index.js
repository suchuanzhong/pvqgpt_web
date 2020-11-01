import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

let menuList =sessionStorage.getItem('routers')?JSON.parse(sessionStorage.getItem('routers'))[0].Children:null;

let routers = [];
if (menuList) {
  menuList.map((item) => {
    let child = {
      path: item.Attributes.data.MenuUrl,
      name: item.Text,
      iconCls: item.Icon,
      leaf: (item.Children !== null && item.Children.length > 0) ? false : true,
      hidden:!item.Attributes.data.Enable,
      component: item.Attributes.data.PathUrl ? resolve => { require(["@/"+(item.Attributes.data.PathUrl.slice(3)).trim()], resolve) } : null
    };
    getRouterChilds(child, item);
    routers.push(child);
   
  });
}


const routes = [
  {
    path: "/login",
    name: "登录",
    meta: {
      pMenuName: "登录"
    },
    component: resolve => {
      require(["../views/page/login/login"], resolve);
    }
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/",
        name: "首页",
        meta: {
          pMenuName: "首页"
        },
        component: resolve => {
          require(["../views/page/home"], resolve);
        }
      },
      {
        path: "/baseInfo",
        name: "数字领跑",
        meta: {
          pMenuName: "数字领跑"
        },
        redirect: "/allBaseInfoView",
        component: resolve => {
          require(["../views/page/baseView"], resolve);
        },
        children: [
          // {
          //   path: "",
          //   name: "数字领跑",
          //   meta: {
          //     pMenuName: "数字领跑"
          //   },
          //   component: resolve => {
          //     require(["../views/page/baseView"], resolve);
          //   }
          // },
          {
            path: "/baseInfo/:id",
            name: "基地详情",
            meta: {
              pMenuName: "基地详情"
            },
            component: resolve => {
              require(["../views/page/baseView/baseDetail"], resolve);
            }
          },
          {
            path: "/allBaseInfoView",
            name: "数字可视化",
            meta: {
              pMenuName: "数字领跑"
            },
            component: resolve => {
              require(["../views/page/baseView/allBaseDetail"], resolve);
            }
          }
        ]
      },
      {
        path: '/typical',
        name: '基地详情',
        meta: {
          pMenuName: "数字领跑",
          subMenuName: "数字档案馆"
        },
        // redirect:"/digitalArchives/information",
        component: resolve => { require(['../views/page/digitalArchives/companyDetail.vue'], resolve) },
        
      },
      {
        path: "/digitalArchives",
        name: "数字档案馆",
        meta: {
          pMenuName: "数字领跑"
        },
        redirect: "/digitalArchives/base",
        component: resolve => {
          require(["../views/page/digitalArchives/index.vue"], resolve);
        },
        children: [
          {
            path: "/digitalArchives/base",
            name: "基地档案馆",
            meta: {
              pMenuName: "数字领跑",
              subMenuName: "数字档案馆"
            },
            component: resolve => {
              require(["../views/page/digitalArchives/base.vue"], resolve);
            },

          },


          {
            path: "/digitalArchives/company",
            name: "企业档案馆",
            meta: {
              pMenuName: "数字领跑",
              subMenuName: "数字档案馆"
            },

            component: resolve => {
              require(["../views/page/digitalArchives/company.vue"], resolve);
            },

          },
          {
            path: "/digitalArchives/factor",
            name: "厂家档案馆",
            meta: {
              pMenuName: "数字领跑",
              subMenuName: "数字档案馆"
            },
            component: resolve => {
              require(["../views/page/digitalArchives/factor.vue"], resolve);
            }
          },
          // {
          //   path: "/digitalArchives/equipment",
          //   name: "设备档案馆",
          //   meta: {
          //     pMenuName: "数字领跑",
          //     subMenuName: "数字档案馆"
          //   },
          //   component: resolve => {
          //     require(["../views/page/digitalArchives/equipment.vue"], resolve);
          //   }
          // }
        ],

      },
      {
        path: "/information/",
        name: "领跑资讯",
        meta: {
          pMenuName: "领跑资讯"
        },
        component: resolve => {
          require(["../views/page/information"], resolve);
        },
        children: [
          {
            path: "list/:id",
            meta: {
              pMenuName: "领跑资讯"
            },
            name: "资讯列表",
            component: resolve => {
              require(["../views/page/information/list"], resolve);
            }
          },
          {
            path: "detail/:id",
            meta: {
              pMenuName: "领跑资讯"
            },
            name: "资讯详情",
            component: resolve => {
              require(["../views/page/information/detail"], resolve);
            }
          }
        ]
      },
      {
        path: "/synthetical",
        name: "综合查询",
        meta: {
          pMenuName: "综合查询"
        },
        redirect: "/synthetical/indicators",
        component: resolve => {
          require(["../views/page/synthetical/index.vue"], resolve);
        },
        children: [
          {
            path: "/synthetical/indicators",
            name: "监测指标查询",
            meta: {
              pMenuName: "综合查询"
            },
            component: resolve => {
              require(["../views/page/synthetical/indicators.vue"], resolve);
            }
          },
          {
            path: "/synthetical/efficiency",
            name: "运行效率查询",
            meta: {
              pMenuName: "综合查询"
            },
            component: resolve => {
              require(["../views/page/synthetical/efficiency.vue"], resolve);
            }
          },
          {
            path: "/synthetical/contrast",
            name: "对标查询",
            meta: {
              pMenuName: "综合查询"
            },
            component: resolve => {
              require(["../views/page/synthetical/contrast.vue"], resolve);
            }
          }
        ]
      },
      {
        path: "/monitorReport/",
        name: "监测报告",
        meta: {
          pMenuName: "监测报告"
        },
        component: resolve => {
          require(["../views/page/monitorReport"], resolve);
        },
        children: [
          {
            path: "list/:id",
            name: "监测报告列表",
            meta: {
              pMenuName: "监测报告"
            },
            component: resolve => {
              require(["../views/page/monitorReport/list"], resolve);
            }
          },
          {
            path: "detail/:id",
            name: "监测报告详情",
            meta: {
              pMenuName: "监测报告"
            },
            component: resolve => {
              require(["../views/page/monitorReport/detail"], resolve);
            }
          }
        ]
      },
      {
        path: "/sharedServices",
        name: "共享服务",
        meta: {
          pMenuName: "共享服务"
        },
        component: resolve => {
          require(["../views/page/sharedServices"], resolve);
        }
      },
      {
        path: "/sharedlist",
        name: "共享列表",
        meta: {
          pMenuName: "共享服务"
        },
        component: resolve => {
          require(["../views/page/sharedServices/sharedServiceslist"], resolve);
        }
      },
      {
        path: "/myShared",
        name: "我的共享",
        meta: {
          pMenuName: "共享服务"
        },
        component: resolve => {
          require(["../views/page/sharedServices/mySharedServices"], resolve);
        }
      }
    ]
  },
  {
    path: "/homeindex",
    name: "homes",
    meta: {
      pMenuName: "综合管理"
    },
    component: resolve => {
      require(["../components/HomeIndex"], resolve);
    },
    children: routers
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
// 菜单路由的拼接
function getRouterChilds(parent, chidrenList) {

  if (chidrenList.Children && chidrenList.Children.length > 0) {
    let C_routeName = [];
    parent.redirect = {
      path: chidrenList.Children[0].Attributes.data.MenuUrl
    };
    chidrenList.Children.map((C) => {
      let childData = {
        path: C.Attributes.data.MenuUrl,
        name: C.Text,
        iconCls: C.Icon,
        leaf: (C.Children !== null && C.Children.length > 0) ? false : true,
        hidden:!C.Attributes.data.Enable,
        component: C.Attributes.data.PathUrl ? resolve => {require(['@/'+(C.Attributes.data.PathUrl.slice(3)).trim()], resolve) } : null,
      };

      C_routeName.push(childData);
      getRouterChilds(childData, C);

    });
    parent.children = C_routeName;
  }
}
/**
 * 页面刷新路由处理；
 * 拦截离散率分析页面，后续页面需要展示，删除掉else if
 */
//官方页面路由添加进homerouter数组
function monitorhome(url){

  let  homerouter = ["/","baseInfo","typical","allBaseInfoView","digitalArchives","information","synthetical","monitorReport","sharedServices","myShared","sharedlist"]
  let urlarr=[]
  if(url!== '/'){
    urlarr = url.split('/')
  }else{
    urlarr = ['/','/']
  }
  let urlbol= false
  homerouter.map(item=>{
    if(item == urlarr[1]){
      urlbol =true
    }
  })
  return urlbol
}
router.beforeEach((to, from, next) => {
  if(monitorhome(to.path)){
    next()
    return
  }
  if (!sessionStorage.getItem("routers") && to.path !== '/login' && !sessionStorage.token) {
    next('/');
  }
  else{
    let menuRoutes = JSON.parse(sessionStorage.getItem("routers"));
    if(to.path == "/index"){
      if(sessionStorage.getItem("currentRoleType") == 1){
        let jumpPath = "";
        if(menuRoutes && menuRoutes.length>0){
          if(menuRoutes[0].Children && menuRoutes[0].Children.length>0){
            jumpPath = menuRoutes[0].Children[0].Attributes.data.MenuUrl;
          }else{
            jumpPath = menuRoutes[0].Attributes.data.MenuUrl;
          }
          next(jumpPath)
        }
      }else{
        next()
      }
    }
    next()
  }
})
