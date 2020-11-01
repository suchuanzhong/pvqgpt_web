<template >
  <div class="viewPDF">
    <MtHeader class="head-title" backPagePathName="measureRpt"></MtHeader>
    <div class="viewWrap">
      <div class="canvas">
        <canvas id="the-canvas"></canvas>
        <!-- <pdf src="http://114.116.102.217:4303/Content/大同报告测试（2019年4月）.pdf"></pdf> -->
        <!-- <iframe src="static/build/generic/web/viewer.html?file=http://114.116.102.217:4303/Content/大同报告测试（2019年4月）.pdf" style="width:100%;height:100%;"></iframe> -->
      </div>
      
      <!-- <div class="foot" v-if='pdfDoc'>
        <mt-button class='before' type="primary" size="small" v-if="pageNum>1" @click="onPrevPage">上一页</mt-button>
        <mt-button class='next' type="primary" size="small" v-if="pageNum<pdfDoc.numPages" @click="onNextPage">下一页</mt-button>
      </div> -->
      <div class="footwrap" v-if="pdfDoc">
        <span class="before" v-if="pageNum>1" @click="onPrevPage">上一页</span>
        <span class="next" v-if="pageNum<pdfDoc.numPages" @click="onNextPage">下一页</span>
      </div>
    </div>
  </div>
</template>
<script>
// import PDFJS from "pdfjs-dist";
import MtHeader from "@/components/public/MtHeader";
import { setTimeout } from "timers";
let PDFJS = require('pdfjs-dist');
// import pdf from 'vue-pdf'
export default {
  components: {
    // pdf,
    MtHeader,
  },
  
  data() {
    return {
      src: null,
      title: null,
      pdfData: {}, //路由跳转的数据
      pdfDoc: null,
      pageNum: 1,
      pageRendering: false,
      pageNumPending: null,
      scale: 0.9
    };
  },
  mounted() {
    // 有时候PDF文件地址会出现跨域的情况，这里最好处理一下
    this.pdfData = this.$route.query;
    // this.getPreviewUrl();
    // setTimeout(_ => {
      this.showPDF();
    // }, 500);
  },
  methods: {
    // 获取预览地址
    // getPreviewUrl() {
    //    this.$fetch("/AppApi/Base/PreviewRunReport",{reportId:this.pdfData.id}).then(res => {
    //     // debugger
    //   })
    //   window.open('static/build/generic/web/viewer.html?file='+webCommonApi+'/AppApi/Base/PreviewRunReport?reportId='+this.pdfData.id)
      
    // },
    // 展示当前的pdf预览文档
    showPDF() {
      let _this = this;

      PDFJS.getDocument('static/pdf/ruicheng0807.pdf').promise.then(function(pdf) {
        console.log(pdf)
        _this.pdfDoc = pdf;
        _this.renderPage(1);
      });
    },
    renderPage(num) {
      this.pageRendering = true;
      let _this = this;
      this.pdfDoc.getPage(num).then(function(page) {
        var viewport = page.getViewport(_this.scale);
        let canvas = document.getElementById("the-canvas");

        canvas.height = viewport.height - 30;
        canvas.width = viewport.width;

        // Render PDF page into canvas context
        var renderContext = {
          canvasContext: canvas.getContext("2d"),
          viewport: viewport
        };
        var renderTask = page.render(renderContext);

        // Wait for rendering to finish
        renderTask.promise.then(function() {
          _this.pageRendering = false;
          if (_this.pageNumPending !== null) {
            // New page rendering is pending
            this.renderPage(_this.pageNumPending);
            _this.pageNumPending = null;
          }
        });
      });
    },
    queueRenderPage(num) {
      if (this.pageRendering) {
        this.pageNumPending = num;
      } else {
        this.renderPage(num);
      }
    },
    onPrevPage() {
      if (this.pageNum <= 1) {
        return;
      }
      this.pageNum--;
      this.queueRenderPage(this.pageNum);
    },
    onNextPage() {
      if (this.pageNum >= this.pdfDoc.numPages) {
        return;
      }
      this.pageNum++;
      this.queueRenderPage(this.pageNum);
    }
  }
};
</script>
<style lang="less" scoped>
.footwrap {
  // display: flex;
  background: #fff;
  // justify-content: center;
  // align-items: center;
  text-align: center;
  font-size: 14px;
  height: 30px;
  .next {
    margin-left: 20px;
  }
}
.canvas {
  flex: 1;
}
canvas {
  height: 100%;
  width: 100%;
  display: block;
}
.viewPDF {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.viewWrap {
  position: relative;
  flex: 1;
  overflow-x: hidden;
  box-sizing: border-box;
  padding-bottom: 0.1rem;
  display: flex;
  flex-direction: column;
  background: #fff;
}
</style>
