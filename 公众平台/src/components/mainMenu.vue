<template>
	<el-aside class="menus"  >
		<el-scrollbar style="height:calc(100% - 40px)">
			<el-menu :default-active="actPath" @select="menuClick" class="el-menu-vertical menuWrap"  unique-opened active-text-color="#0090ff" @open="handleOpen" @close="handleClose" :collapse="isCollapse"  router>
				<template v-for="(item,index) in menuList" :keys="index">
					<template  v-if="!item.hidden">
						<el-submenu :index="'first'+index" v-if="!item.leaf" class="first-menu" :key="'first'+index">
							<template slot="title"><i :class="item.iconCls||'iconfont icon-ziyuan'"></i><span>{{item.name}}</span></template>
							<template v-for="(child,indexs) in item.children"  :keys="indexs">
								<template v-if="!child.hidden&&item.children" >
								<el-submenu class="sec-menu" :index="'second'+indexs" v-if="child.children&&child.children.length>0" :key="'second'+indexs">
									<template slot="title"><span><i class="my-icon my-icon-dot"></i>{{child.name}}</span></template>
									<template v-for="(childthird,indexsthird) in child.children"   :keys="indexsthird">
										<template  v-if="!childthird.hidden&&child.children" >
											<el-submenu class="sec-menu" :index="'third'+indexsthird" v-if="childthird.children&&childthird.children.length>0" :key="'third'+indexsthird">
												<template slot="title"><span><i class="my-icon my-icon-dot"></i>{{childthird.name}}</span></template>
												<el-menu-item v-for="(childs,indexss) in childthird.children" :index="childs.path" :key="indexss" >
													<div class="clickMenu" @click="clickMenu(childs)"><span><i class="my-icon"></i>{{childs.name}}</span></div>
												</el-menu-item>
											</el-submenu>
											<el-menu-item class="sec-menu" v-else :index="childthird.path" :key="childthird.path">
												<div class="clickMenu" @click="clickMenu(childthird)"><span><i class="my-icon my-icon-dot"></i>{{childthird.name}}</span></div>
											</el-menu-item>
										</template>
									</template>
								</el-submenu>
								<el-menu-item class="sec-menu" v-else :index="child.path" :key="child.path">
									<div class="clickMenu" @click="clickMenu(child)"><span><i class="my-icon my-icon-dot"></i>{{child.name}}</span></div>
								</el-menu-item>
								</template>
							</template>
						</el-submenu>
						<el-menu-item v-else :index="item.path" :key="item.path">
							<div class="clickMenu" @click="clickMenu(item)"><i :class="item.iconCls||'iconfont icon-ziyuan'"></i><span>{{item.name}}</span></div>
						</el-menu-item>
					</template>
				</template>
			</el-menu>
		</el-scrollbar>
		<div class="menu-bar" :class="isCollapse?'iconArrDbR':'iconArrDbL'" @click="toggleMenu()"></div>
	</el-aside>
</template>
<script>
	export default {
		data() {
			return {
				isCollapse: false,
				menuWidth: '200px',
				menuList:[],
				actPath:"",
				showMenu:false,
				actData:{}
			}
		},
		methods: {
			handleOpen() {},
			toggleMenu(){
				this.isCollapse=!this.isCollapse
				this.$emit('refrash',this.isCollapse)
			},
			handleClose() {},
			addTab(data) {
				console.log(data)
			},
			clickMenu(data){
				this.$emit('menuClick',data)
			},
			menuClick(){
				// this.actPath=path
			}
		},
		watch: {
			isCollapse(value) {

				if(value) {
					this.menuWidth = "65px"
				} else {
					this.menuWidth = "200px"
				}
			},
			// menuList(){
			// },
			$route(to){
		    	this.actPath=to.path
		    	this.$emit('menuClick',to)
		 	}
		},
		created(){
			this.actPath=this.$route.path;
		},
		mounted() {
			// let routeMenu=[];
			var routeList=[];
			// console.log('router',this.$router)
			let routes=this.$router.options.routes[2];
			// let routes=this.$router.options.routes[2].children;
			// let routes = JSON.parse(localStorage.getItem('routers'))
		
			// try{

				// for(var items of routes){
				// 	if(items.name=='homes'){
				// 		routeList=items.children;
				// 		console.log(routeList)
				// 		// break
				// 	}
				// }
			// }catch(e){
			// 	console.log(e)
			// }
			routeList = routes.children
			this.menuList=routeList;
			// console.log(this.menuList)
			this.$nextTick(()=>{
				this.showMenu=true;
			})
		}
	}
</script>
<style lang="scss">
.el-menu{
	// background-color: #1c3352;
}
.el-menu-item:hover {
	outline: 0;
	color: #1bac6b !important;
    background-color: #daf1e7;
}
.el-submenu__title:hover {
	color: #1bac6b !important;
    background-color: #daf1e7;
}
.menuWrap {
	&>li{
		// border-top: 1px solid red
		background: url('/img/line02.png') center bottom no-repeat;padding-bottom: 2px;

	}
	.el-submenu__title{
		height: 70px!important;
		line-height: 70px!important;
	}
	// .el-submenu__title:hover {
    // 	background-color: #daf1e7;
	// }
	// .el-menu-item:hover {
	// 	outline: none;
	// 	background-color: #daf1e7;
	// }
}
	
</style>
