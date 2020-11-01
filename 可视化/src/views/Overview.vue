<template>
<div class="home">
    <div class="left-box">
        <div class="left-bg">
        <div class="seation">
             <Title title="十三五重点区域" ></Title>
              <el-row :gutter="24">
                <el-col :span="24" v-for="(item,index) in navData" :key="index">
                    <i class="box-nav"></i>
                    <div class="boxnav-title"><div class="nav-name">{{item.title}} </div></div>
                    <div class="dingwei" ><span class="miaoshu" >{{item.label}}</span></div>
                            <!-- <MyCard value="1" unit="个基地" title="第一批次" @click.native="showpcJd(1)" :class="{active:active=='1'}">{{active}}</MyCard> -->
                        </el-col>
                        <el-col :span="24" v-for="(item,index) in stative" :key="index">
                            <div >
                                <i class="box-nav"></i>
                                <div class="boxnav-title"><div class="nav-name">{{item.title}}</div> </div>
                                     <span class="lis">{{item.name}}</span>
                                     </div>
                                <div class="dingwei" ><span class="miaoshu" >{{item.label}}</span></div>
                            
                        </el-col>
            </el-row>
 
        </div>
          <div class="seations">
        <Title title="十三五光伏装机目标" ></Title>
        
        <div class="target">
            <span class="tar-title">2020年太阳能发电规模</span>
            <span class="tar-number">1.1</span>
            <span class="tar-ction">亿千瓦以上</span>
            
        </div>
            <i class="tar-bg"></i>
                <ul class="wan">
                    <li>6000 <span class="kws">万kW</span></li>
                    <li class="ws">4500 <span class="kws">万kW</span></li>
                    <li class="wls">500 <span class="kws">万kW</span></li>
                </ul>
                <ul class="bg-ms">
                    <li>分布式光伏</li>
                    <li class="gfz">光伏电站</li>
                    <li class="gr">光热发电</li>
                </ul>
                <div class="stations">
                    <i class="my-icon-left"></i>
                    <span class="stat-name">全国历年实际光伏装机统计</span>
                    <i class="my-icon-right"></i>
                </div>
   
    <div style="height:180px;width:100%;">
         <myBar ids="myBarEchart" :data="construData"  subText="装机量(MV)"></myBar>
        </div>

       
          </div>
            <div class="seation">
                <Title title="十三五光伏弃光率目标"  ></Title>
                <div class="scla">
                <span class="scla-title">2020年太阳能发电规模</span>
                    <span class="scla-number">5</span> 
                    <span class="scla-ti">%</span> 
                </div>
                 <div style="height:180px;width:100%;">
                <MyechartsBar ids="myscaleDatas"  subText="弃光率(%)" ></MyechartsBar>
                </div>
            </div>

            
    </div>
      </div>
      <div class="right-box">
        <div class="right-bg">
              <div class="seations">
                <Title title="市场规模"></Title>
            <ul class="market" v-for="(item,index) in navLists" :key="item.name" :index="index">
                <div class="my-icon" :class='[
                {"my-icon0": ( index=="0" ? true : false)},
                {"my-icon1": ( index=="1" ? true : false)},
                {"my-icon2": ( index=="2" ? true : false)}]'>{{item.name}} </div>
                <div class="my-icons" :class="item.icon"></div>
                <li class="mars-pl">
                    <div class="mar-paly">{{item.title}}</div>
                            <span class="mar-six">{{item.number}}</span>
                            <span class="mar-mw">{{item.mw}}</span>
                    
                    
                </li>
                    <li class="mars-qg">
                            <div class="mar-palys">全国占比(%)</div>
                            <span class="mar-iocn-tus" :class="item.icons"></span>
                            <span style="margin-left: 16px;"><span class="mar-bf">{{item.bf}}</span>%</span>
                            
                    </li>
                    <!-- <div class="mars-pls">
                    <div class="mar-qg">全国</div>
                    <i class="mar-icon-tu" :class="item.icons">ty</i>
                </div> -->
            </ul>
            </div>
             <div class="seation">
                <Title title="技术升级"></Title>
               <div class="pat-title">
                   <div class="my-icon-red" :class="{active:actTab=='gl'}"  @click="actTabTo('gl')" >国内</div>
                    
                   <div class="my-icon-blue" :class="{active:actTab=='gj'}"  @click="actTabTo('gj')"  >国际</div>
                 
                </div>   
                <div style="height:180px;width:100%;">
                <EchartsBars  ids="mypieData"  subText="%" v-if="refresh" ></EchartsBars>
                </div>
              </div>
              <div class="seation">
                <Title title="平价上网"></Title>
                <!-- <div style="height:180px"> -->
                    <echartsParity style="height:220px"  ids="myParity" subText="电价(元/kWh)"></echartsParity>
                <!-- <div> -->
              </div>
        </div>
    </div>
</div>
</template>



<script>
import Title from '@/components/public/TitleName'
import MyCard from '@/components/public/MyCardCopy'
import myBar from '@/components/public/echartLine'
import echartsParity from '@/components/public/echartsParity'
import MyechartsBar from '@/components/public/echarts/echartsBar'
import EchartsBars from '@/components/public/echarts/echartsBar2'

export default {
    name: 'Overview',
    data() {
        return {
            //  actTabs:'gj', 
              actTab:'', 
            navData:[{
                title:'五大国家综合能源基地',
                label:"山西、鄂尔多斯盆地、内蒙古东部地区、西南地区、新疆",
            },{
                title:'区域能源基地',
                label:"安徽两淮、贵州毕节、内蒙古呼伦贝尔、河北张家口等",
            }
            ],
            stative:[{
                title:'光伏电站项目',
                name:'中东部地区结合',
                label:"采煤沉陷区治理以及农业、林业、渔业综合利用等适度建设",
            }],
            refresh:true,
            active:'',
             dataArr1:[{
                name: '领跑者多晶标准',
                data: [14, 15, 25]
            },{
                name: '领跑者多晶标准',
                data: [14, 15, 25]
            },{
                name: '行业多晶标准',
                data: [ 5,48, 49],
            },{
                 name: '行业单晶标准',
                data: [1, 8, 35],
            }
            ],
            allDataBar:[{
                name: '领跑者多晶标准',
                data: [10, 11, 25]
            },{
                name: '领跑者多晶标准',
                data: [11, 10, 25]
            },{
                name: '行业多晶标准',
                data: [ 4,46, 49],
            },{
                 name: '行业单晶标准',
                data: [1, 8, 35],
            }
            ],
            construData: [{
                name: "新增",
                type: "bar",
                data: [256, 258, 252, 238, 247]
            },{
                name: "累计",
                type: "bar",
                data: [256, 258, 252, 238, 247]
            }
            ],
           navLists:[{
                name: "第一批次",
                icon: "my-icon-one",
                title:'装机量',
                number:'6000',
                icons:'mar-iocn-tu',
                mw:'MW',
                key: 1,
                bf:'23.4',
           },{
                name: "第二批次",
                icon: "my-icon-two",
                title:'装机量',
                number:'1300',
                icons:'mar-iocn-tu2',
                mw:'MW',
                bf:'40',
                key: 1,
           },{
                name: "第三批次",
                icon: "my-icon-three",
                icons:'mar-iocn-tu3',
                title:'装机量',
                number:'1490',
                bf:'52.7',
                mw:'MW',
                key: 1,
           }
           ],

            statistic: ""

        }
    },
    components: {
        Title,
        MyCard,
        echartsParity,
        MyechartsBar,
        EchartsBars,
        myBar
    },
    methods: {
        actTabTo(type){
        this.actTab=type;
        this.refresh=false;

        this.$nextTick(_=>{
          this.refresh=true;
        })
      },
        showpcJd(name) {
            this.active=(this.active&&this.active==name)?'':name
            if(this.active){
                switch (name) {
                    case 1:
                        showPC1();
                        break;
                    case 2:
                        showPC2();
                        break;
                    case 3:
                        showPC3();
                        break;
                }
            }else{
                showall()
            }

            },
            show3dBar() {
                if (this.$parent.$refs.map && this.$parent.$refs.map.show3dBar) {
                    this.$parent.$refs.map.show3dBar(this.tableDatas,getIndexRightBarColor,"MW",true);
                };
                this.$parent.showlegends(true);
                var viewer= this.$parent.$refs.map.getViewer();
                viewer.scene.camera.flyTo({"destination":{"x":-2792185.608039077,"y":9042849.795047296,"z":2035895.412303014},
                "orientation":{"pitch":-1.0471996350669408,"heading":0.08170551855672059,"roll":6.283185307179586}});
            }        
    },
    beforeDestroy () {
        //清除基地的图标和柱状图
        if (this.$parent.$refs.map && this.$parent.$refs.map.getViewer) {
                    var viewer= this.$parent.$refs.map.getViewer();
                    if(viewer)
                    clearDataSourcees(["base", "3dbars"],viewer);                  
        };
        this.$parent.showlegends(false);
        // this.$parent.$refs.map.showBaseInfo=false;
    },
    mounted () {
        if (this.$parent.$refs.map && this.$parent.$refs.map.flyToGaik) {
            this.$parent.$refs.map.flyToGaik();                    
        };
        
    },
}
</script>
<style scoped lang="scss">
.lis{
    display: inline-block;
    font-family: PingFang-SC-Regular;
	font-size: 14px;
	font-style: italic;
	line-height: 24px;
	color: #82c2eb;
}
.box-nav{
     width:16px;
    height: 22px;
    display: inline-block;
    background: url('/img/Location-orange.png')no-repeat;
    margin: 0px 0px 0 16px;
}
.nav-name{
    font-size: 16px;
    color: #ff9d00;
    line-height: 26px;
    text-align: center;
}
.boxnav-title{
    width: 200px;
    height: 28px;
    display: inline-block;
    background: url("/img/orange-bg.png")no-repeat;
    vertical-align: bottom;
    margin-top: 14px;
}
.dingwei{
    margin: 8px 0 0 16px;
}
.miaoshu{
    font-family: PingFang-SC-Regular;
    font-size: 14px;
    font-style: italic;
    color: #82c2eb;
}
.target{
    margin-left:16px;
    margin-top: 12px;
    
    .tar-title{
        font-family: PingFang-SC-Medium;
        font-size: 16px;
        line-height: 26px;
        color: #dcf4ff;
        text-align: left;
        padding-right: 27px;
    }
    .tar-number{
        font-family: DINCond-Bold;
        font-size: 36px;
        font-style: italic;
        line-height: 26px;
        color: #ff2066;
        text-align:center;
    }
    .tar-ction{
        padding-left: 6px;
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        line-height: 26px;
        color: #82c2eb;
        opacity: 0.5;
    }
   
}

.scla{
    margin-left:16px;
    margin-top: 12px;
    .scla-title{
        font-family: PingFang-SC-Medium;
        font-size: 16px;
        line-height: 24px;
        color: #dcf4ff;
    }
    .scla-number{
        font-family: DINCond-Bold;
        font-size: 36px;
        font-weight: normal;
        font-style: italic;
        font-stretch: normal;
        line-height: 24px;
        color: #ff2066;
        padding-left: 40px;
    }
    .scla-ti{
        padding-left: 10px;
    }
} 
.tar-bg{
        margin-left: 19px;
        width: 274px;
        height: 14px;
        display: inline-block;
        background: url('/img/line-segment.png')no-repeat;
        
    }
    .wan{
            display: flex;
            font-family: DINOT;
            font-size: 20px;
            line-height: 24px;
            letter-spacing: 0px;
            color: #ff9d00;
            margin-left: 16px;
        }
        
        .kws{
            font-family: PingFang-SC-Medium;
            font-size: 14px;
            line-height: 24px;
            color: #82c2eb;
            opacity: 0.5;
            
        }
        .ws{
                padding-left: 58px;
            }
            .wls{
                padding-left: 48px;
            }
        .bg-ms{
            display: flex;
            margin-left: 16px;
            font-family: PingFang-SC-Regular;
            font-size: 16px;
            line-height: 24px;
            color: #82c2eb;
        }
        .gfz{
          padding-left: 58px; 
        }
        .gr{
                padding-left: 68px;
            }
 .stations{
     text-align: center;
     .my-icon-left{
         width: 32px;
         height: 6px;
         display: inline-block;
         background: url('/img/left-line.png')no-repeat;
     }
     .stat-name{
         font-family: PingFang-SC-Medium;
        font-size: 16px;
        line-height: 24px;
        color: #dcf4ff;
        padding: 0 10px;
     }
     .my-icon-right{
         width: 32px;
         height: 6px;
         display: inline-block;
         background: url('/img/right-line.png')no-repeat;
         
     }
     
 }   
 .pat-title{
     margin-left:16px;
    margin-top: 10px;
    .my-icon-red{
        cursor: pointer;
        text-align: center;
        width: 57px;
        height: 24px;
        display: inline-block;
         font-size: 14px;
        line-height: 23px;
         color: #ff2066;
        background: url('/img/title-lines.png')no-repeat;
    }
 

    .my-icon-red:active{
         text-align: center;
         font-size: 14px;
        line-height: 23px;
        color: #82c2eb;
         text-align: center;
        width: 57px;
        height: 24px;
        display: inline-block;
        background: url('/img/title-blue.png')no-repeat;
    }

         .my-icon-blue.active{

            cursor: pointer;
             font-size: 14px;
            line-height: 23px;
            color: #ff2066;
             text-align: center;
            margin-left: 10px;
            width: 57px;
            height: 24px;
            display: inline-block;
            background: url('/img/title-lines.png')no-repeat;

        }
        .my-icon-blue{
            cursor: pointer;
            text-align: center;
            color: #82c2eb;
             font-size: 14px;
            line-height: 23px;
            margin-left: 10px;
            width: 57px;
            height: 24px;
            // opacity: 0.5;
           
            display: inline-block;
            background: url('/img/title-blue.png')no-repeat;
        }

 }   
 .market{
        margin-left:16px;
        margin-top: 18px;
        width: 385px;
        height: 69px;
        background: url('/img/First-batch.png') no-repeat;
        .my-icon{
          position: relative;
                left: 52px;
                top: -8px;  
                font-size: 16px;
                color: #ff6600;
        }
        .my-icon-one{
            width: 24px;
            height: 24px;
            display: inline-block;
            vertical-align: top;
            background: url('/img/InstalledCapacity-blue.png') no-repeat;
        }
        .my-icon-two{
            width: 24px;
            height: 24px;
            vertical-align: top;
            display: inline-block;
            background: url('/img/InstalledCapacity-green.png') no-repeat;
        }
        .my-icon-three{
            width: 24px;
            height: 24px;
            vertical-align: top;
            display: inline-block;
            background: url('/img/InstalledCapacity-orange.png') no-repeat;
        }
 }  
 .my-icons{
     display: inline-block;
     margin-left: 18px;
 } 
 .my-icon0{
   
	color: #2197cc !important;
 }
  .my-icon1{
    color:#62a514 !important;
 }
   .my-icon2{
        color: #ff6600,!important;
 }
 .mars-pl{
     display: inline-block;
     vertical-align: top;
 }  
 .mar-palys{
        // margin-left: 12px;
        font-size: 16px;
        color: #82c2eb;
 }
 .mar-paly{
        margin-left: 12px;
        font-size: 16px;
        color: #82c2eb;
 }
 .mars-qg{
     display: inline-block;
     margin-left: 16px;
 }
 .mar-six{
    margin-left: 12px;
    font-size: 16px;
    vertical-align: middle;
	color: #dcf4ff;
 }
 .mar-mw{
     vertical-align: bottom;
	font-size: 14px;
	color: #82c2eb;
	opacity: 0.5;
    margin-left:23px;
 }
 .mar-iocn-tus{
    //  margin-left: 16px;
 }
 .mar-iocn-tu{
     width: 138px;
     height: 6px;
     display: inline-block;
     background: url('/img/one.png')no-repeat;
 }
  .mar-iocn-tu2{
     width: 138px;
     height: 6px;
     display: inline-block;
     background: url('/img/two.png')no-repeat;
 }
  .mar-iocn-tu3{
     width: 138px;
     height: 6px;
     display: inline-block;
     background: url('/img/threes.png')no-repeat;
 }
 .mars-pls{
     display: inline-block;
     margin: 15px 0 0 16px;
 }

 .mar-qg{
    font-family: PingFang-SC-Medium;
	font-size: 16px;
	line-height: 24px;
	color: #82c2eb;
 }
 .mar-bf{
     font-family: DINOT;
	font-size: 20px;
	line-height: 24px;
	color: #ff2066;
 }
.active {
    cursor: pointer;
    color:#fff;
    background: linear-gradient(to bottom, #ff9600, #ff9800);
    -webkit-background-clip: text;
    font-weight: bolder;
    color: transparent;
    -webkit-text-fill-color: transparent;
    text-fill-color: transparent;
    text-shadow:0 0 20px rgba(5, 215, 236, 0.9);
    
}
.active1{
    cursor: pointer;
    color:#fff;
     background: linear-gradient(to bottom, #00d8ff, #01d6eb);
    
    -webkit-background-clip: text;
    font-weight: bolder;
    color: transparent;
    -webkit-text-fill-color: transparent;
    text-fill-color: transparent;
    text-shadow:0 0 20px rgba(5, 215, 236, 0.9);
}
.active2{
     cursor: pointer;
    color:#fff;
    background: linear-gradient(to bottom, #13f511, #00ff12);
    -webkit-background-clip: text;
    font-weight: bolder;
    color: transparent;
    -webkit-text-fill-color: transparent;
    text-fill-color: transparent;
    text-shadow:0 0 20px rgba(5, 215, 236, 0.9);
}
</style>

