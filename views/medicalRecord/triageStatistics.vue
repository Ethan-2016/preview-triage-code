<!--
 * @Author: 吴应
 * @Date: 2021年4月18日10:13:25
 * @LastEditTime: 2021年4月18日10:13:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FileName: 分诊查询
 * @FilePath: src\benchs\preHospital\views\medicalRecordSearch\triageFind.vue
-->
<template>
  <div id="triage-statistics" v-loading="loading">
    <div class="top-action">
      <div>
        <p>
          <el-button :class="{ active: clickIndex == 0 }" @click="togelClick(0)"
            >今日</el-button
          ><el-button
            :class="{ active: clickIndex == 7 }"
            @click="togelClick(7)"
            >本周</el-button
          ><el-button
            :class="{ active: clickIndex == 30 }"
            @click="togelClick(30)"
            >本月</el-button
          >
        </p>
      </div>
      <div>
        <el-date-picker
          v-model="qualityDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
        >
        </el-date-picker>
        <el-button class="btn-ml active" @click="getChartData()"
          >查询</el-button
        >
      </div>
    </div>
    <div class="total-list">
      <div class="list-item">
        <p>分诊总人数</p>
        <p>{{ levelPersonAnalysis.totalTriagePerson }}</p>
      </div>
      <div class="list-item">
        <p>红区分诊数</p>
        <p>{{ levelPersonAnalysis.redTriagePerson }}</p>
      </div>
      <div class="list-item">
        <p>黄区分诊数</p>
        <p>{{ levelPersonAnalysis.yellowTriagePerson }}</p>
      </div>
      <div class="list-item">
        <p>绿区分诊数</p>
        <p>{{ levelPersonAnalysis.greenTriagePerson }}</p>
      </div>
      <div class="list-item">
        <p>未分级数</p>
        <p>{{ levelPersonAnalysis.noLevelPerson }}</p>
      </div>
    </div>
    <ul class="chart-list">
      <li v-for="(base, b) in baseData" :key="b">
        <div class="chart-title">
          <div>{{ base.name }}</div>
          <div>
            <i
              class="
                icon
                iconfont
                icon-a-jizhenlinchuangxinxixitongV20tubiao-01
              "
              @click="base.tableShow = false"
            ></i>
            <i
              class="
                icon
                iconfont
                icon-a-jizhenlinchuangxinxixitongV20tubiao-02
              "
              @click="showTabel(base)"
            ></i>
            <i
              class="
                icon
                iconfont
                icon-a-jizhenlinchuangxinxixitongV20tubiao-03
              "
              @click="exportFile(base)"
            ></i>
          </div>
        </div>
        <div class="chart-main" v-show="!base.tableShow">
          <chart-page :ref="base.logo" :chartId="base.logo"></chart-page>
        </div>
        <div class="chart-main" v-show="base.tableShow">
          <el-table
            style="width: 100%; height: 90%"
            border
            :data="base.tableData"
            :id="base.tabelLogo"
          >
            <el-table-column
              align="center"
              v-for="(h, i) in base.tableHeader"
              :key="i"
              :label="h.label"
              :prop="h.prop"
            ></el-table-column>
          </el-table>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import chartPage from "./components/chartPage.vue";
import triageApi from "../../api/triageApi";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import moment from "moment";
export default {
  name: "triageStatistics",
  components: {
    chartPage,
  },
  data() {
    return {
      tableShow: false,
      tableHeader: [],
      tableData: [],
      loading: true,
      clickIndex: 30,
      qualityDate: [],
      levelPersonAnalysis: {}, //
      form: {},
      baseData: [
        {
          name: "患者性别比例",
          logo: "traige-sex-analysis",
          tabelLogo: "traige-sex-analysis-tabel",
          tableShow: false,
          tableHeader: [
            { label: "性别", prop: "name" },
            { label: "人数", prop: "value" },
            { label: "比例", prop: "per" },
          ],
          tableData: [],
        },
        {
          name: "预检分诊分级分布",
          logo: "traige-level-analysis",
          tabelLogo: "traige-level-analysis-tabel",
          tableShow: false,
          tableHeader: [
            { label: "级别", prop: "name" },
            { label: "人数", prop: "value" },
            { label: "比例", prop: "per" },
          ],
          tableData: [],
        },
        {
          name: "分诊评分项分布",
          logo: "traige-score-analysis",
          tabelLogo: "traige-score-analysis-tabel",
          tableShow: false,
          tableHeader: [
            { label: "评分", prop: "name" },
            { label: "人数", prop: "value" },
            { label: "比例", prop: "per" },
          ],
          tableData: [],
        },
        {
          name: "分诊科室分布统计",
          logo: "traige-department-analysis",
          tabelLogo: "traige-department-analysis-tabel",
          tableShow: false,
          tableHeader: [
            { label: "科室", prop: "name" },
            { label: "人数", prop: "value" },
            { label: "比例", prop: "per" },
          ],
          tableData: [],
        },
        {
          name: "分诊年龄分布统计",
          logo: "traige-age-analysis",
          tabelLogo: "traige-age-analysis-tabel",
          tableShow: false,
          tableHeader: [
            { label: "年龄段", prop: "name" },
            { label: "人数", prop: "value" },
            { label: "比例", prop: "per" },
          ],
          tableData: [],
        },
        {
          name: "群伤统计统计",
          logo: "traige-groupInjury-analysis",
          tabelLogo: "traige-groupInjury-analysis-tabel",
          tableShow: false,
          tableHeader: [
            { label: "群伤类型", prop: "name" },
            { label: "人数", prop: "value" },
            { label: "比例", prop: "per" },
          ],
          tableData: [],
        },
        {
          name: "分诊准确率统计",
          logo: "level-modify-analysis",
          tabelLogo: "level-modify-analysis-tabel",
          tableShow: false,
          tableHeader: [
            { label: "统计项", prop: "name" },
            { label: "人数", prop: "value" },
            { label: "比例", prop: "per" },
          ],
          tableData: [],
        },
        {
          name: "科室修改率统计",
          logo: "dept-modify-analysis",
          tabelLogo: "dept-modify-analysis-tabel",
          tableShow: false,
          tableHeader: [
            { label: "统计项", prop: "name" },
            { label: "人数", prop: "value" },
            { label: "比例", prop: "per" },
          ],
          tableData: [],
        },
        {
          name: "分诊三无人员统计",
          logo: "no-threen-person-analysis",
          tabelLogo: "no-threen-person-analysis-tabel",
          tableShow: false,
          tableHeader: [
            { label: "统计项", prop: "name" },
            { label: "人数", prop: "value" },
            { label: "比例", prop: "per" },
          ],
          tableData: [],
        },
        {
          name: "分诊绿色通道人员统计",
          logo: "green-road-analysis",
          tabelLogo: "green-road-analysis-tabel",
          tableShow: false,
          tableHeader: [
            { label: "绿色通道", prop: "name" },
            { label: "人数", prop: "value" },
            { label: "比例", prop: "per" },
          ],
          tableData: [],
        },
        {
          name: "分诊去向分布统计",
          logo: "triage-target-analysis",
          tabelLogo: "triage-target-analysis-tabel",
          tableShow: false,
          tableHeader: [
            { label: "科室", prop: "name" },
            { label: "护士", prop: "nurse" },
            { label: "人数", prop: "value" },
            { label: "比例", prop: "per" },
          ],
          tableData: [],
        },
      ],
      pieOptions: {
        color: [
          "#FF7878",
          "#FDBF74",
          "#68C1B8",
          "#7197EE",
          "#C971EE",
          "#E84BA0",
          "#DF744F",
          "#A6E34E",
          "#F7EA14",
        ],
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c}人",
        },
        legend: {
          bottom: "5%",
        },
        series: {
          name: "患者性别比例",
          type: "pie",
          minShowLabelAngle: 1, //小于这个角度（0 ~ 360）的扇区，不显示标签（label 和 labelLine）
          stillShowZeroSum: false, //数据和为0，不显示
          radius: ["40%", "60%"],
          avoidLabelOverlap: false,
          label: {
            position: "outer",
            alignTo: "none",
            bleedMargin: 5,
            lineHeight: 18,
            align: "left",
            formatter: "{b}： {c}人",
          },
          labelLine: {
            show: true,
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "20",
              fontWeight: "bold",
            },
          },
          data: [],
        },
      },
      categoryOption: {
        //柱状图
        color: [
          "#68C1B8",
          "#FF7878",
          "#FDBF74",
          "#7197EE",
          "#C971EE",
          "#E84BA0",
          "#DF744F",
          "#A6E34E",
          "#F7EA14",
        ],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: "{b0}: {c0}人",
        },
        barMaxWidth: 80,
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          width: "100%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: [],
          axisTick: {
            alignWithLabel: true,
            show: false,
          },
        },
        yAxis: [
          {
            type: "value",
          },
        ],
        series: {
          name: "",
          type: "bar",
          // barWidth: "60%",
          data: [],
          itemStyle: {
            //上方显示数值
            normal: {
              label: {
                show: true, //开启显示
                position: "top", //在上方显示
                textStyle: {
                  //数值样式
                  color: "black",
                  fontSize: 16,
                },
              },
            },
          },
        },
      },
      categoryOption1: {
        //堆叠状图
        color: [
          "#68C1B8",
          "#FF7878",
          "#FDBF74",
          "#7197EE",
          "#C971EE",
          "#E84BA0",
          "#DF744F",
          "#A6E34E",
          "#F7EA14",
        ],
        tooltip: {
          trigger: "axis",
        },
        legend: {
          itemWidth: 15,
          itemHeight: 15,
          data: [],
        },
        xAxis: {
          data: [],
        },
        yAxis: {},
        series: [{}],
      },
    };
  },
  mounted() {
    this.setTime(0); //初始化时间
    // this.getChartData();
  },
  methods: {
    showTabel(base) {
      console.log(base.isE);
      if (!base.isE) {
        return;
      }
      base.tableShow = true;
    },
    //导出
    exportFile(base) {
      if (!base.isE) {
        this.$message("没有可导出的数据");
        return;
      }
      //当前为图表,导出图片
      if (!base.tableShow) {
        this.$refs[base.logo][0].exportImg();
      } else {
        //当前为表格,导出exsel
        this.exportExcel(base.tabelLogo, base.name);
      }
    },
    //定义导出Excel表格事件
    exportExcel(tabelLogo, name) {
      console.log(document.querySelector("#" + tabelLogo));
      /* 从表生成工作簿对象 */
      var wb = XLSX.utils.table_to_book(
        document.querySelector("#" + tabelLogo),
        { raw: true }
      );
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          //Blob 对象表示一个不可变、原始数据的类文件对象。
          //Blob 表示的不一定是JavaScript原生格式的数据。
          //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], { type: "application/octet-stream" }),
          //设置导出文件名称
          name + ".xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    //时间选择按钮切换
    togelClick(i) {
      this.clickIndex = i;
      this.setTime();
    },
    //计算时间
    setTime() {
      let startTime = null,
        endTime = null;
      let i = this.clickIndex;
      switch (i) {
        case 0: //今天
          startTime = moment().format("YYYY-MM-DD 00:00:00");
          endTime = moment().format("YYYY-MM-DD 23:59:59");
          break;
        case 7: //获取星期规则规定周日为起始日期，即周日为0
          startTime = moment()
            .week(moment().week())
            .startOf("week")
            .format("YYYY-MM-DD 00:00:00");
          endTime = moment()
            .week(moment().week())
            .endOf("week")
            .format("YYYY-MM-DD 23:59:59");
          break;
        case 30: //本月
          startTime = moment()
            .month(moment().month())
            .startOf("month")
            .format("YYYY-MM-DD 00:00:00");
          endTime = moment()
            .month(moment().month())
            .endOf("month")
            .format("YYYY-MM-DD 23:59:59");
          break;
      }
      this.qualityDate = [startTime, endTime];
      this.getChartData();
    },

    //获取统计数据
    getChartData() {
      this.loading = true;
      for (let key in this.$refs) {
        //初始化状态
        if (Array.isArray(this.$refs[key])) {
          this.$refs[key][0].isChart();
        } else {
          this.$refs[key].isChart();
        }
      }
      let refArr = (key, isE, chartData, tableData) => {
        this.baseData.forEach((o) => {
          o.isE = isE;
        });
        //true
        if (Array.isArray(this.$refs[key])) {
          if (isE) {
            if (tableData && tableData.length) {
              this.baseData.forEach((item) => {
                if (item.logo == key) {
                  item.tableData = tableData;
                }
              });
            }
            this.$refs[key][0].initChart(chartData);
          } else {
            this.$refs[key][0].isEmpty(); //f
          }
        } else {
          if (isE) {
            this.$refs[key].initChart(chartData);
          } else {
            this.$refs[key].isEmpty();
          }
        }
      };
      triageApi
        .patientDataAnalysis({
          SkipCount: 1,
          MaxResultCount: 10000,
          StartTime: this.qualityDate[0],
          EndTime: this.qualityDate[1],
        })
        .then((res) => {
          if (res.code == 200) {
            this.loading = false;
            //分诊分区
            this.levelPersonAnalysis = res.data.levelPersonAnalysis;
            //分诊去向布统计---堆叠状图
            if (res.data.triageTargetAnalysis.length) {
              let triageTargetAnalysisOption = JSON.parse(
                JSON.stringify(this.categoryOption1)
              );
              triageTargetAnalysisOption.series = [];
              let arr = [];
              let legendData = [];
              res.data.triageTargetAnalysis.forEach((o, i) => {
                let arrv = [];
                let arrn = [];
                legendData.push(o.itemName);
                o.itemList.forEach((x) => {
                  arrn.push(x.analysisItem);
                  arrv.push(x.personNum);
                  x.nurse = o.itemName;
                });
                arr.push(...o.itemList);
                triageTargetAnalysisOption.xAxis.data = arrn;
                triageTargetAnalysisOption.series.push({
                  name: o.itemName,
                  data: arrv,
                  stack: "业务",
                  type: "bar",
                });
              });
              triageTargetAnalysisOption.legend.data = legendData;
              console.log(triageTargetAnalysisOption);
              let total =
                arr.reduce((acc, cur) => {
                  return acc + cur.personNum;
                }, 0) || 0;
              let datas = [];
              arr.forEach((item) => {
                datas.push({
                  name: item.analysisItem,
                  nurse: item.nurse,
                  value: item.personNum,
                  per:
                    item.personNum <= 0
                      ? "0%"
                      : Math.round((item.personNum / total) * 10000) / 100.0 +
                        "%",
                });
              });

              refArr(
                "triage-target-analysis",
                true,
                triageTargetAnalysisOption,
                datas
              );
            } else {
              refArr("triage-target-analysis", false);
            }
            //--------------------------------------柱形图
            //预检分诊分级分布
            if (res.data.traigeLevelAnalysis) {
              let traigeLevelAnalysisOption = JSON.parse(
                JSON.stringify(this.categoryOption)
              );
              let total = res.data.traigeLevelAnalysis.itemData.reduce(
                (acc, cur) => {
                  return acc + cur;
                },
                0
              );
              if (total) {
                let arr = [];
                res.data.traigeLevelAnalysis.itemData.forEach((o, i) => {
                  arr.push({
                    value: o,
                    name: res.data.traigeLevelAnalysis.analysisItem[i],
                    per:
                      o <= 0
                        ? "0%"
                        : Math.round((o / total) * 10000) / 100.0 + "%",
                  });
                });
                traigeLevelAnalysisOption.series.data =
                  res.data.traigeLevelAnalysis.itemData;
                traigeLevelAnalysisOption.xAxis.data =
                  res.data.traigeLevelAnalysis.analysisItem;
                traigeLevelAnalysisOption.series.name = "预检分诊分级分布";
                // this.$refs["traige-level-analysis"][0].initChart(
                //   traigeLevelAnalysisOption
                // );
                refArr(
                  "traige-level-analysis",
                  true,
                  traigeLevelAnalysisOption,
                  arr
                );
              } else {
                refArr("traige-level-analysis", false);
                // this.$refs["traige-level-analysis"][0].isEmpty();
              }
            }
            //分诊评分项分布
            if (res.data.traigeScoreAnalysis) {
              let traigeScoreAnalysisOption = JSON.parse(
                JSON.stringify(this.categoryOption)
              );
              let total = res.data.traigeScoreAnalysis.itemData.reduce(
                (acc, cur) => {
                  return acc + cur;
                },
                0
              );
              if (total) {
                let arr = [];
                res.data.traigeScoreAnalysis.itemData.forEach((o, i) => {
                  arr.push({
                    value: o,
                    name: res.data.traigeScoreAnalysis.analysisItem[i],
                    per:
                      o <= 0
                        ? "0%"
                        : Math.round((o / total) * 10000) / 100.0 + "%",
                  });
                });
                traigeScoreAnalysisOption.series.data =
                  res.data.traigeScoreAnalysis.itemData;
                traigeScoreAnalysisOption.xAxis.data =
                  res.data.traigeScoreAnalysis.analysisItem;
                traigeScoreAnalysisOption.series.name = "分诊评分项分布";
                // this.$refs["traige-score-analysis"].initChart(
                //   traigeScoreAnalysisOption
                // );
                refArr(
                  "traige-score-analysis",
                  true,
                  traigeScoreAnalysisOption,
                  arr
                );
              } else {
                refArr("traige-score-analysis", false);

                // this.$refs["traige-score-analysis"].isEmpty();
              }
            }
            //分诊科室分布统计
            if (res.data.traigeDepartmentAnalysis) {
              let traigeDepartmentAnalysisOption = JSON.parse(
                JSON.stringify(this.categoryOption)
              );
              let total = res.data.traigeDepartmentAnalysis.itemData.reduce(
                (acc, cur) => {
                  return acc + cur;
                },
                0
              );
              if (total) {
                let arr = [];
                res.data.traigeDepartmentAnalysis.itemData.forEach((o, i) => {
                  arr.push({
                    value: o,
                    name: res.data.traigeDepartmentAnalysis.analysisItem[i],
                    per:
                      o <= 0
                        ? "0%"
                        : Math.round((o / total) * 10000) / 100.0 + "%",
                  });
                });
                traigeDepartmentAnalysisOption.series.data =
                  res.data.traigeDepartmentAnalysis.itemData;
                traigeDepartmentAnalysisOption.xAxis.data =
                  res.data.traigeDepartmentAnalysis.analysisItem;
                traigeDepartmentAnalysisOption.series.name = "分诊科室分布统计";
                // this.$refs["traige-department-analysis"].initChart(
                //   traigeDepartmentAnalysisOption
                // );
                refArr(
                  "traige-department-analysis",
                  true,
                  traigeDepartmentAnalysisOption,
                  arr
                );
              } else {
                refArr("traige-department-analysis", false);
                // this.$refs["traige-department-analysis"].isEmpty();
              }
            }
            //分诊年龄分布统计
            if (res.data.traigeAgeAnalysis) {
              let traigeAgeAnalysisOption = JSON.parse(
                JSON.stringify(this.categoryOption)
              );
              let total = res.data.traigeAgeAnalysis.itemData.reduce(
                (acc, cur) => {
                  return acc + cur;
                },
                0
              );
              if (total) {
                let arr = [];
                res.data.traigeAgeAnalysis.itemData.forEach((o, i) => {
                  arr.push({
                    value: o,
                    name: res.data.traigeAgeAnalysis.analysisItem[i],
                    per:
                      o <= 0
                        ? "0%"
                        : Math.round((o / total) * 10000) / 100.0 + "%",
                  });
                });
                traigeAgeAnalysisOption.series.data =
                  res.data.traigeAgeAnalysis.itemData;
                traigeAgeAnalysisOption.xAxis.data =
                  res.data.traigeAgeAnalysis.analysisItem;
                traigeAgeAnalysisOption.series.name = "分诊年龄分布统计";
                // this.$refs["traige-age-analysis"].initChart(
                //   traigeAgeAnalysisOption
                // );
                refArr(
                  "traige-age-analysis",
                  true,
                  traigeAgeAnalysisOption,
                  arr
                );
              } else {
                // this.$refs["traige-age-analysis"].isEmpty();
                refArr("traige-age-analysis", false);
              }
            }
            //群伤统计--pie
            if (res.data.groupInjuryTypeAnalysis) {
              let groupInjuryTypeAnalysisData = [];
              res.data.groupInjuryTypeAnalysis.itemData.forEach((o, i) => {
                groupInjuryTypeAnalysisData.push({
                  value: o,
                  name: res.data.groupInjuryTypeAnalysis.analysisItem[i],
                });
              });
              let total = groupInjuryTypeAnalysisData.reduce((acc, cur) => {
                return acc + cur.value;
              }, 0);
              if (total) {
                let groupInjuryTypeAnalysisOption = JSON.parse(
                  JSON.stringify(this.pieOptions)
                );
                let arr = [];
                groupInjuryTypeAnalysisData.forEach((o) => {
                  arr.push({
                    value: o.value,
                    name: o.name,
                    per:
                      o.value <= 0
                        ? "0%"
                        : Math.round((o.value / total) * 10000) / 100.0 + "%",
                  });
                });
                groupInjuryTypeAnalysisOption.series.data =
                  groupInjuryTypeAnalysisData;
                groupInjuryTypeAnalysisOption.series.name = "群伤统计";
                refArr(
                  "traige-groupInjury-analysis",
                  true,
                  groupInjuryTypeAnalysisOption,
                  arr
                );
              } else {
                refArr("traige-groupInjury-analysis", false);
              }
            } else {
              refArr("traige-groupInjury-analysis", false);
            }

            //科室修改率统计--pie
            if (res.data.deptModifyAnalysis) {
              let deptModifyAnalysisData = [];
              res.data.deptModifyAnalysis.itemData.forEach((o, i) => {
                deptModifyAnalysisData.push({
                  value: o,
                  name: res.data.deptModifyAnalysis.analysisItem[i],
                });
              });
              let total = deptModifyAnalysisData.reduce((acc, cur) => {
                return acc + cur.value;
              }, 0);
              if (total) {
                let deptModifyAnalysisOption = JSON.parse(
                  JSON.stringify(this.pieOptions)
                );
                let arr = [];
                deptModifyAnalysisData.forEach((o) => {
                  arr.push({
                    value: o.value,
                    name: o.name,
                    per:
                      o.value <= 0
                        ? "0%"
                        : Math.round((o.value / total) * 10000) / 100.0 + "%",
                  });
                });
                deptModifyAnalysisOption.series.data = deptModifyAnalysisData;
                deptModifyAnalysisOption.series.name = "科室修改率统计";
                refArr(
                  "dept-modify-analysis",
                  true,
                  deptModifyAnalysisOption,
                  arr
                );
              } else {
                refArr("dept-modify-analysis", false);
              }
            } else {
              refArr("dept-modify-analysis", false);
            }

            //分诊三无人员统计
            if (res.data.noThreenPersonAnalysis) {
              let noThreenPersonAnalysisData = [];
              res.data.noThreenPersonAnalysis.itemData.forEach((o, i) => {
                noThreenPersonAnalysisData.push({
                  value: o,
                  name: res.data.noThreenPersonAnalysis.analysisItem[i],
                });
              });
              let total = noThreenPersonAnalysisData.reduce((acc, cur) => {
                return acc + cur.value;
              }, 0);
              if (total) {
                let noThreenPersonAnalysisOption = JSON.parse(
                  JSON.stringify(this.pieOptions)
                );
                let arr = [];
                noThreenPersonAnalysisData.forEach((o) => {
                  arr.push({
                    value: o.value,
                    name: o.name,
                    per:
                      o.value <= 0
                        ? "0%"
                        : Math.round((o.value / total) * 10000) / 100.0 + "%",
                  });
                });
                noThreenPersonAnalysisOption.series.data =
                  noThreenPersonAnalysisData;
                noThreenPersonAnalysisOption.series.name = "分诊三无人员统计";

                refArr(
                  "no-threen-person-analysis",
                  true,
                  noThreenPersonAnalysisOption,
                  arr
                );
              } else {
                refArr("no-threen-person-analysis", false);
              }
            } else {
              refArr("no-threen-person-analysis", false);
            }
            //分诊准确率统计
            if (res.data.levelModifyAnalysis) {
              let levelModifyAnalysisData = [];
              res.data.levelModifyAnalysis.itemData.forEach((o, i) => {
                levelModifyAnalysisData.push({
                  value: o,
                  name: res.data.levelModifyAnalysis.analysisItem[i],
                });
              });
              let total = levelModifyAnalysisData.reduce((acc, cur) => {
                return acc + cur.value;
              }, 0);
              if (total) {
                let levelModifyAnalysisOption = JSON.parse(
                  JSON.stringify(this.pieOptions)
                );
                let arr = [];
                levelModifyAnalysisData.forEach((o) => {
                  arr.push({
                    value: o.value,
                    name: o.name,
                    per:
                      o.value <= 0
                        ? "0%"
                        : Math.round((o.value / total) * 10000) / 100.0 + "%",
                  });
                });
                levelModifyAnalysisOption.series.data = levelModifyAnalysisData;
                levelModifyAnalysisOption.series.name = "分诊准确率统计";
                refArr(
                  "level-modify-analysis",
                  true,
                  levelModifyAnalysisOption,
                  arr
                );
              } else {
                refArr("level-modify-analysis", false);
              }
            } else {
              refArr("level-modify-analysis", false);
            }
            //分诊绿色通道人员统计
            if (res.data.greenRoadAnalysis) {
              let greenRoadAnalysisData = [];
              res.data.greenRoadAnalysis.itemData.forEach((o, i) => {
                greenRoadAnalysisData.push({
                  value: o,
                  name: res.data.greenRoadAnalysis.analysisItem[i],
                });
              });
              let total = greenRoadAnalysisData.reduce((acc, cur) => {
                return acc + cur.value;
              }, 0);
              if (total) {
                let greenRoadAnalysisOption = JSON.parse(
                  JSON.stringify(this.pieOptions)
                );
                let arr = [];
                greenRoadAnalysisData.forEach((o) => {
                  arr.push({
                    value: o.value,
                    name: o.name,
                    per:
                      o.value <= 0
                        ? "0%"
                        : Math.round((o.value / total) * 10000) / 100.0 + "%",
                  });
                });
                greenRoadAnalysisOption.series.data = greenRoadAnalysisData;
                console.log(greenRoadAnalysisData);
                greenRoadAnalysisOption.series.name = "分诊绿色通道人员统计";
                refArr(
                  "green-road-analysis",
                  true,
                  greenRoadAnalysisOption,
                  arr
                );
              } else {
                refArr("green-road-analysis", false);
              }
            } else {
              refArr("green-road-analysis", false);
            }

            //患者性别比例--pie
            if (res.data.traigeSexAnalysis) {
              this.tableHeader = [
                { label: "性别", prop: "name" },
                { label: "人数", prop: "value" },
                { label: "比例", prop: "per" },
              ];
              let total = res.data.traigeSexAnalysis.itemData.reduce(
                (acc, cur) => {
                  return acc + cur;
                },
                0
              );
              if (total) {
                let traigeSexAnalysisData = [];
                res.data.traigeSexAnalysis.itemData.forEach((num, i) => {
                  traigeSexAnalysisData.push({
                    value: num,
                    name: res.data.traigeSexAnalysis.analysisItem[i],
                    per:
                      num <= 0
                        ? "0%"
                        : Math.round((num / total) * 10000) / 100.0 + "%",
                  });
                });
                let traigeSexAnalysisOption = JSON.parse(
                  JSON.stringify(this.pieOptions)
                );
                traigeSexAnalysisOption.series.data = traigeSexAnalysisData;
                traigeSexAnalysisOption.series.name = "患者性别比例";
                refArr(
                  "traige-sex-analysis",
                  true,
                  traigeSexAnalysisOption,
                  traigeSexAnalysisData
                );
              } else {
                refArr("traige-sex-analysis", false);
              }
            } else {
              refArr("traige-sex-analysis", false);
            }
          } else {
            this.$message.error("获取统计数据失败原因：" + res.msg);
          }
        });
      // .catch((err) => {
      //   this.loading = false;
      //   console.error("获取统计数据失败原因：" + err);
      // });
    },
  },
};
</script>
<style lang="scss">
#triage-statistics {
  background-color: #f2f7fa;
  .top-action {
    padding: 20px;
    display: flex;
    width: 100%;
    position: relative;
    align-items: center;
    padding-bottom: 15px;

    > div {
      margin-right: 23px;
      .el-button {
        width: 60px;
        height: 35px;
        padding: 0;
        color: #fff;
        background-color: #e4e7ed;
        border: 1px solid #e4e7ed;
        border-radius: 5px;
        color: #000;
      }
      .active {
        background-color: #1bad96;
        border: 1px solid #1bad96;
        color: #fff;
      }
      .look-btn {
        width: 100px;
      }
      .input {
        flex-grow: 1;
      }
      .el-input__inner {
        height: 35px;
      }
      .el-input__icon {
        line-height: 28px;
      }
      .el-date-editor .el-range-separator {
        line-height: 28px;
      }
      .btn-ml {
        margin-left: 9px;
      }
    }
    .position-r {
      position: absolute;
      right: 0;
    }
  }
  .total-list {
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    .list-item {
      width: 378px;
      height: 207px;
      color: #fff;
      &:nth-of-type(1) {
        background-image: url("../../static/img/triageBgBlue.png");
      }
      &:nth-of-type(2) {
        background-image: url("../../static/img/triageBgRed.png");
      }
      &:nth-of-type(3) {
        background-image: url("../../static/img/triageBgYellow.png");
      }
      &:nth-of-type(4) {
        background-image: url("../../static/img/triageBgGreen.png");
      }
      &:nth-of-type(5) {
        background-image: url("../../static/img/triageBgGray.png");
      }
      p {
        padding: 0 30px;
        &:nth-of-type(1) {
          font-size: 28px;
          font-weight: bold;
          line-height: 88px;
        }
        &:nth-of-type(2) {
          font-size: 56px;
          font-weight: bold;
        }
      }
    }
  }
  .chart-list {
    padding: 0 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      height: 517px;
      width: 46.5%;
      padding: 0 27px;
      background: #ffffff;
      border-radius: 10px;
      margin-bottom: 15px;
      box-shadow: 0px 5px 10px 0px rgba(210, 210, 210, 0.5);
      .chart-title {
        height: 62px;
        line-height: 62px;
        font-size: 20px;
        border-bottom: 1px solid #e5e5e5;
        > div:nth-of-type(1) {
          float: left;
        }
        > div:nth-of-type(2) {
          float: right;
          > i {
            margin-left: 15px;
            font-size: 20px;
            color: #bfbfbf;
            cursor: pointer;
          }
          > i:hover {
            color: #1bad96;
          }
        }
      }
      .chart-main {
        width: 100%;
        height: 460px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .el-table__body-wrapper {
    height: 367px;
  }
}
</style>
