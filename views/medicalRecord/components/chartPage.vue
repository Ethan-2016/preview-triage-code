<template>
  <div v-if="chartEmpty">
    <img src="../../../static/img/noData.png" alt="暂无数据">
    <p style="text-align: center;padding-top: 40px;">暂无数据</p>
  </div>
  <div v-else class="chart-sty" :id="chartId"></div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "chartPage",
  props: {
    chartId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      chartEmpty:false,
      chart: null,
      option: null,
    };
  },
  // watch: {
  //   option: {
  //     handler() {
  //       this.initChart();
  //     },
  //     deep: true,
  //   },
  // },
  beforeDestroy() {
    if (this.chart) {
      this.chart.clear();
    }
  },
  methods: {
    isEmpty(){
      this.chartEmpty=true;
    },
    isChart(){
      this.chartEmpty=false;
    },
    initChart(option) {
      let e_this = this;
      e_this.option = option;
      let chartDom = document.getElementById(e_this.chartId)
      if(chartDom){
        e_this.chart = echarts.init(chartDom);
        e_this.option && e_this.chart.setOption(e_this.option);
        window.addEventListener("resize", function () {
          e_this.chart.resize();
        });
      }
    },
    //下载图片到本地
    exportImg() {
      let url = this.chart.getDataURL({
        pixelRatio: 2,
        backgroundColor: "#fff",
      });
      var a = document.createElement("a");
      a.setAttribute("href", url);
      a.setAttribute("download", this.option.series.name);
      a.setAttribute("target", "_blank");
      let clickEvent = document.createEvent("MouseEvents");
      clickEvent.initEvent("click", true, true); //模拟点击
      a.dispatchEvent(clickEvent);
    },
  },
};
</script>
<style lang="scss">
.chart-sty {
  width: calc(49vw);
  height: 450px;
}
</style>