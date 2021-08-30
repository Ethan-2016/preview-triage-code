<template>
  <div id="record-report">
    <el-menu default-active="0-0" class="menu-box">
      <el-submenu
        v-for="(menu, m) in documentList"
        :key="m"
        :index="m.toString()"
      >
        <!-- <template slot="title"><i class="el-icon-folder"></i>{{ menu.reportTypeName }}</template> -->
        <template slot="title">
          <i class="icon iconfont icon-a-jizhenlinchuangxinxixitongV20tubiao-16" style="color:#e74b;margin-right: 5px;"></i>
          {{ menu.reportTypeName }}
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="(item, i) in menu.reportSettingDto"
            :key="i"
            :index="(m + '-' + i).toString()"
            @click="documentClick(item)"
            >{{ item.reportName }}</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
    <div class="triage-box">
      <h3 style="text-align: center; margin: 10px 0; font-size: 20px">
        {{ triageData.reportName || "" }}
      </h3>
      <template v-if="tableHeader.length > 0">
        <div class="handle-box">
          <el-form
            style="display: inline-block"
            :inline="true"
            :model="queryFrom"
          >
            <el-form-item
              v-for="q in initReportQuery"
              :key="q.id"
              :label="q.queryName"
              :prop="q.queryFiled"
            >
            
              <el-input
                size="small"
                v-if="q.queryType == 'input'"
                v-model="queryFrom[q.queryFiled]"
                maxlength="50"
              ></el-input>
              <el-date-picker
                size="small"
                v-else-if="q.queryType == 'DateTime'"
                v-model="queryFrom[q.queryFiled]"
                @change="daterangeChang($event, q.queryFiled)"
                type="daterange"
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                :default-time="['00:00:00', '23:59:59']"
              >
              </el-date-picker>
              <el-radio-group
                v-else-if="q.queryType === 'radio'"
                
                v-model="queryFrom[q.queryFiled]"
              >
                <el-radio
                  v-for="r in q.queryData"
                  :key="q.id + r.code"
                  :label="r.code"
                  >{{ r.name }}</el-radio
                >
              </el-radio-group>
              <el-checkbox-group 
              v-else-if="q.queryType === 'checkbox'"
              v-model="checkList" 
              @change="handleCheckChange($event,q.queryFiled)">
                <el-checkbox   
                v-for="item in q.queryData" :key="item.code" 
                :label="item.code"
                >{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getTeportData">查询</el-button>
            </el-form-item>
          </el-form>
          <div class="btn-box">
            <el-button
              v-show="initReportQuery.length > 0"
              size="small"
              type="primary"
              @click="resetBtn"
              >重置</el-button
            >
            <el-button size="small" type="primary" @click="exportCurrent"
              >导出</el-button
            >
          </div>
        </div>
        <!-- {{tableHeader}}{{tableData}} -->
        <el-table
          id="outTable"
          :data="tableData"
          style="width: 100%"
          row-key="id"
          border
        >
          <template v-for="item in tableHeader">
            <table-column
              v-if="item.children && item.children.length"
              :key="item.id"
              :coloumn-header="item"
            ></table-column>
            <el-table-column
              v-else
              :key="item.id"
              :label="item.headerName"
              :prop="item.headerField"
              :width="item.headerWidth"
            >
              <!-- <template slot-scope="scope">
                  {{item.headerField=='patientname'}}{{item.headerField}}
                </template> -->
            </el-table-column>
          </template>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[18, 100, 200, 300, 400]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
        >
        </el-pagination>
      </template>
    </div>
  </div>
</template>
<script>
// import FileSaver from "file-saver";
// import XLSX from "xlsx"; //导出
// import dataPager from "../../components/dataPager";
import TriageReport from "../../api/triageReport";
import tableColumn from "../../components/tableColumn";
// import triageApi from "../../api/triageApi";
// import triageConfigApi from "../../api/triageConfig";
// import { JsonHubProtocol } from "@aspnet/signalr";
export default {
  components: {
    // dataPager,
    tableColumn,
  },
  data() {
    return {
      queryFrom: {}, //筛选条件
      initReportQuery: [], //筛选内容
      documentList: [],
      triageData: {},
      tableHeader: [], //表头数据
      tableData: [], //表格数据
      currentPage: 1,
      pageSize: 18,
      totalCount: 18,
      checkList:[],
    };
  },
  created() {
    this.getReportClass();
  },
  methods: {
    // 导出当前表格到excel
    exportCurrent() {
      if (this.tableData.length > 0) {
        // var xlsxParam = { raw: true }; //转换成excel时，使用原始的格式
        // var wb = XLSX.utils.table_to_book(document.querySelector("#outTable"), xlsxParam);
        // var wbout = XLSX.write(wb, {
        //   bookType: 'xlsx',
        //   bookSST: true,
        //   type: 'array'
        // });
        // try {
        //   var fname =this.triageData.reportName +'.xlsx';//文件名
        //   FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream;charset=utf-8' }), fname);
        // }
        // catch(e) {
        //   if (typeof console !== 'undefined') console.log(e, wbout);
        // }
        TriageReport.importDataToExcel({
          reportId: this.triageData.id,
          queryData: JSON.stringify(this.queryFrom),
        })
          .then((res) => {
            // console.log(res);
            // if (res.code == 200) {
            // 此处有个坑。这里用content保存文件流，最初是content=res，但下载的test.xls里的内容如下图1，
            // 检查了下才发现，后端对文件流做了一层封装，所以将content指向res.data即可 // 另外，流的转储属于浅拷贝，所以此处的content转储仅仅是便于理解，并没有实际作用=_=
            // const content = res.data;
            const content = res;
            const blob = new Blob([content]);
            // 构造一个blob对象来处理数据
            const fileName = this.triageData.reportName + ".xls";
            // 导出文件名
            // 对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
            // IE10以上支持blob但是依然不支持download
            if ("download" in document.createElement("a")) {
              // 支持a标签download的浏览器
              const link = document.createElement("a");
              // 创建a标签
              link.download = fileName;
              // a标签添加属性
              link.style.display = "none";
              link.href = URL.createObjectURL(blob);
              document.body.appendChild(link);
              link.click();
              // 执行下载
              URL.revokeObjectURL(link.href);
              // 释放url
              document.body.removeChild(link);
              // 释放标签
            } else {
              // 其他浏览器
              navigator.msSaveBlob(blob, fileName);
            }
            // } else {
            //   this.$message.error("导出列表数据失败原因：" + res.msg);
            // }
          })
          .catch((err) => {
            console.error("导出列表数据失败原因：" + err);
          });
      } else {
        this.$message.warning("没有可导出的数据~");
      }
    },
    resetBtn() {
      //重置条件
      for (let key in this.queryFrom) {
        this.queryFrom[key] = "";
      }
      this.checkList = [];
      this.getTeportData();
    },
    daterangeChang(e, filed) {
      if (e) {
        let data = e[0] + "~" + e[1];
        this.queryFrom[filed] = data;
      }
    },
    handleCheckChange(e,queryFiled){
      this.queryFrom[queryFiled] = e;
    },
    getReportClass() {
      TriageReport.getTriageReport({ isEnabled: 1 }).then((res) => {
        this.documentList = [];
        if (res.code === 200 && res.data && res.data.length > 0) {
          this.documentList = res.data;
          if (this.documentList[0].reportSettingDto.length > 0) {
            if (Object.keys(this.triageData).length == 0) {
              //this.triageData为空时，默认取第一个
              this.triageData = this.documentList[0].reportSettingDto[0];
              this.initData();
            }
          }
        }
      });
    },
    initData() {
      //初始化数据
      this.currentPage = 1;
      this.pageSize = 18;
      this.tableHeader = []; //表头数据
      this.initReportQuery = []; //筛选条件
      this.tableData = []; //表格数据
      this.getInitTable();
    },
    documentClick(item) {
      if (this.triageData.id != item.id) {
        this.triageData = item;
        this.initData();
      }
    },
    getInitTable() {
      //初始化表格
      TriageReport.getInitTable(this.triageData.id).then((res) => {
        if (res.code === 200) {
          this.getTeportData();
          let data = res.data;
          this.tableHeader = JSON.parse(data.reportHead) || [];
          this.initReportQuery = data.initReportQuery || [];
        }
      });
    },
    handleSizeChange(e) {
      console.log(e, this.currentPage, this.pageSize);
      this.pageSize = e;
      this.getTeportData();
    },
    handleCurrentChange(e) {
      console.log(e, this.currentPage, this.pageSize);
      this.currentPage = e;
      this.getTeportData();
    },
    getTeportData() {
      //请求表格数据
      console.log(
        "请求参数：" + JSON.stringify(this.queryFrom),
        typeof JSON.stringify(this.queryFrom)
      );
      TriageReport.getTeportData({
        SkipCount: this.currentPage,
        MaxResultCount: this.pageSize,
        ReportId: this.triageData.id,
        QueryData: JSON.stringify(this.queryFrom),
      }).then((res) => {
        console.log(res, "表格数据");
        this.tableData = [];
        this.totalCount = 0;
        if (res.code === 200) {
          let data = res.data;
          this.tableData = data.dt || [];
          this.totalCount = data.totalCount;
        }
      });
    },
  },
};
</script>
<style lang="scss">
@import "../../assets/css/_handle.scss";
#record-report {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 10px 20px !important;
  background-color: #f2f7fa;
  .el-menu.menu-box {
    width: 15%;
    height: 100%;
    background-color: #ffffff;
    border: none;
    .el-submenu__title {
      padding-left: 10px !important;
    }
    .el-submenu__title,.el-menu-item{
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .el-submenu__icon-arrow{
      right: 6px;
    }
    .iconfont{
      margin-right: 5px;
    }
  }
  .triage-box {
    width: 85%;
    height: 100%;
    overflow: auto;
    background-color: #fff;
    margin-left: 10px;
    padding: 0 10px;
    .handle-box {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      .btn-box {
        text-align: right;
        .el-button+.el-button{
          margin-top: 10px;
        }
      }
    }
  }
  .el-table td {
    padding: 0;
  }
  .el-table .el-table__header-wrapper th {
    padding: 0;
  }
  .el-table .el-table__body-wrapper tr td {
    height: 30px;
  }
  .el-form .el-form--inline {
    display: inline-block;
  }
  .el-form-item {
    margin-bottom: 0px;
  }
  .el-date-editor--daterange.el-input__inner {
    width: 220px;
  }
}
</style>
