<template>

  <div class="navWrap">
    
      <ul class="mainNav">
        <li v-for="(item,index) in navList" :key="item.name" @click.stop="selNavItem(item,index)" :index="index">
      <div class="nav-box" :class="{active:actNav.key==item.key||(item.show&&item.children&&item.children.length>0)}">
        <i class="icon-nav" :class="item.icon"></i>
        <span class="label" :class="{active:actNav.key==item.key}">{{item.name}}</span>
      </div>
        </li>
      </ul>
      <div class="nav-bottom">
       </div>
  </div>
 
</template>
<script>
export default {
  data() {
    return {
      navList: [
         {
              name: "产业升级",
              icon: "icon-nav-regional",
              key: 1,
              href:"/",
              show: false
          },
          {
              name: "领跑基地",
              icon: "icon-nav-park",
              key: 2,
              href:"/Resources",
              show: false
          },
          {
              name: "运行监测",
              icon: "icon-nav-business",
              key: 3,
              href:"/Outward",
              show: false
          },{
              name: "统计分析",
              icon: "icon-nav-wisdom",
              key: 4,
              href:"/Economics",
              show: false
          },{
              name: "综合分析",
              icon: "icon-nav-schoolUse",
              key: 5,
              href:"/comprehensive",
              show: false
          },
      ],
      actNav:{},
      navItem: {}, //1级菜单选中
      NavChild: {} //2级菜单选中
    };
  },
  mounted() {
      var actKey=sessionStorage.getItem('routeKey');
      if(actKey){
          for(var i=0;i<this.navList.length;i++){
              if(actKey==this.navList[i].key){
                  this.selNavItem(this.navList[i])
              }
          }
      }else{
          this.selNavItem(this.navList[0])
      }


  },
  directives: {
    clickoutside: {
      bind: function(el, binding, vnode) {
        function haveChild(e) {
          if (el.contains(e.target)) return false;

          if (binding.expression) binding.value(e);
        }
        el.haveChild = haveChild;
        document.addEventListener("click", el.haveChild);
      },
      unbind: function(el) {
        document.removeEventListener("click", el.haveChild);
        delete el.haveChild;
      }
    }
  },

  methods: {
    hiddenItem() {
      this.navList.forEach(item => {
        item.show = false;
      });
    },
    selNav(nav, index) {
      this.navList.forEach(item => {
        item.show = false;
      });
      nav.show = true;
      if (!nav.children) {
        this.navItem = nav;
        this.$store.commit("UPDATE_LEFTNAME", nav.leftName);
        this.$store.commit("UPDATE_RIGHTNAME", nav.rightName);
        this.NavChild = {};
      }else{
				var childs={}
				for(var i=0;i<nav.children.length;i++){
					if(this.NavChild.name==nav.children[i].name){
						childs=nav.children[i];
						break;
					}
				}
				if(childs.name){

				}else{
					childs=nav.children[0]
				}
				this.selNavItem(childs,nav)
			}
    },
    selNavItem(data) {
      // debugger
        this.actNav=data;
        sessionStorage.setItem('routeKey',data.key);
        // if(this.$parent.$refs.map)
        //  this.$parent.$refs.map.clearvisible();
        if(data.key == 4 || data.key == 5){
            return
        }else{
          this.$router.push(data.href);        
        }
        this.checkRoutTo(data.name);//地图切换
    },
    checkRoutTo(path) {
      console.log("checkRoutTo: "+path);
      if(this.$parent.$refs.map)
      {
         if (this.$parent.$refs.map && this.$parent.$refs.map.releaseSelection) {
            this.$parent.$refs.map.releaseSelection();
             this.$parent.$refs.map.goHome();
        }
      }
    },
  }
};
</script>
<style lang="scss" scoped>
.nav-bottom{
  width: 818px;
  height: 3px;
  display: inline-block;
  background: url('/img/NextPoint.png') no-repeat;
}
.navItemWrap {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: -40px;
  height: 44px;
  box-sizing: border-box;
  background: url("/img/navbg.png") center center no-repeat;
  background-size: 100% 100%;
  color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  i {
    width: 10px;
    height: 8px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -8px;
    img {
      height: 100% !important;
      width: 100% !important;
    }
  }
  & > label {
    flex: 1;
    min-width: 100px;
    text-align: center;
    padding: 3px 0;
    // border-right: 1px solid #0fadff;
    background: url("/img/line04.png") right center no-repeat;
    cursor: pointer;
    &:hover {
      color: #0fadff;
    }
  }
  & > label:last-child {
    border-right: none;
  }
}
.nav-bg{
    content: '';
    height: 150px;
    width: 100%;
    position: fixed;
    display: block;
    bottom: 0;
    left: 0;
    background: url("/img/bottom1.png")no-repeat center bottom;
}
.navWrap {
    position: absolute;
    bottom: 0;
    padding-bottom: 20px;
    left: 50%;
    transform: translateX(-50%);

    .mainNav {
        display: flex;

        li {
            display: flex;
            position: relative;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center;
            padding: 12px 20px;

            .label {
                margin-top: 10px;
            }
        }
    }
}
span.active {
  // margin-top: 10px;
  color: #f8d7e1 !important;
	box-shadow: 0px 1px 1px 0px 
		#000000;
  // color: #41b0ff !important;
}
.nav-box {
    span {
        display: block;
        text-align: center;
        color: #d0d0d0;
    }
    &:hover,
    &.active {
        span {
            color: #f8d7e1 !important;
	box-shadow: 0px 1px 1px 0px 
		#000000;
        }
    }
}

.icon-nav {
    width: 120px;
    height: 89px;
    display: inline-block;
    vertical-align: middle;
    margin: 0 auto;
    cursor: pointer
}

.nav-box {
    i {
        display: inline-block;
        width: 120px;
        height: 89px;
    }
    .icon-nav-regional {
        background: url('/img/navlist.png') 0 169px;
    }
    &.active .icon-nav-regional,
    .icon-nav-regional:hover {
        background: url('/img/navlist.png') 0px -80px;
            margin-bottom: 11px;
    }
    .icon-nav-park {
        background: url('/img/navlist.png') -120px 0px;
    }
    &.active .icon-nav-park,
    .icon-nav-park:hover {
        background: url('/img/navlist.png') -120px -81px;
            margin-bottom: 11px;
    }
    .icon-nav-business {
        background: url('/img/navlist.png') -251px 0px;
    }
    &.active .icon-nav-business,
    .icon-nav-business:hover {
        background: url('/img/navlist.png') -251px -81px;
            margin-bottom: 11px;
    }
    .icon-nav-wisdom {
        background: url('/img/navlist.png') -375px 0px;
    }
    &.active .icon-nav-wisdom,
    .icon-nav-wisdom:hover {
        background: url('/img/navlist.png') -375px -81px;
            margin-bottom: 11px;
    }
    .icon-nav-schoolUse {
        background: url('/img/navlist.png') -504px 0px;
    }
    &.active .icon-nav-schoolUse,
    .icon-nav-schoolUse:hover {
        background: url('/img/navlist.png') -504px -81px;
            margin-bottom: 11px;
    }
}


</style>

