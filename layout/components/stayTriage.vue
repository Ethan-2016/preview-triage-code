<!--
 * @Author: 吴应
 * @Date: 2021年7月4日16:53:15
 * @LastEditTime: 2021年7月4日16:53:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: src\benchs\previewTriage\layout\components\stayTriage.vue
-->
<template>
  <div id="stay-triage">
    <div class="top-tool">
      <div class="tool-item">
        <span class="demonstration">分诊时间： </span>
        <el-date-picker
          v-model="timeBucket"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
      <div class="tool-item">
        <el-button type="primary" @click="patientInfoList()">查询</el-button>
      </div>
    </div>
    <div>
      <el-table
        :data="tableData"
        border
        :height="tableHeight"
        ref="simpleTable"
        v-loading="laoding"
      >
        <!-- <el-table-column type="selection" width="55" align="center"> -->
        <!-- </el-table-column> -->
        <el-table-column
          v-for="o in tableSteData"
          :key="o.id"
          :label="o.columnName"
          :width="o.columnWidth"
          :show-overflow-tooltip="o.showOverflowTooltip"
        >
          <template slot-scope="scope">
            <div
              :class="
                o.columnValue == 'actTriageLevel'
                  ? 'grade-sty grade-styTriageLevel_' + scope.row.level
                  : ''
              "
            >
              {{ scope.row[o.columnValue] }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="80" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="editPreTriage(scope.row.patientId, scope.row.taskInfoId)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="编辑分诊信息"
      :visible.sync="preTriageDialogVisible"
      :before-close="preTriageDialogClose"
      :fullscreen="true"
      :modal="false"
    >
      <preTriage
        @saveSuccess="preTriageDialogClose('edit')"
        @closeEdit="preTriageDialogVisible = false"
        :isEdit="true"
        :preTriagePatientId="preTriagePatientId"
        :key="timer"
      ></preTriage>
    </el-dialog>
  </div>
</template>
<script>
import triageApi from "../../api/triageApi";
import triageSettingApi from "../../api/tableSetting";
import preTriage from "../../views/preTriage/preTriage.vue";
export default {
  name: "stayTriage",
  components: {
    preTriage,
  },
  data() {
    return {
      tableHeight: document.body.clientHeight - 283,
      timer: "",
      preTriagePatientId: "",
      preTriageDialogVisible: false,
      tableData: [],
      laoding: true,
      timeBucket: [],
      form: {
        MaxResultCount: 10000, //页容量
        SkipCount: 1, //当前页数
        StartTime: "",
        EndTime: "",
        TriageStatus: "0", //待分诊0，已分诊1
      },
      tableSteData: [],
    };
  },
  created() {
    this.getTabelSet();
  },
  methods: {
    //获取列表设置参数
    getTabelSet() {
      triageSettingApi
        .getTableSetting({ tableCode: "TriageTable" })
        .then((res) => {
          if (res.code == 200) {
            let arr = res.data.filter(function (o) {
              return o.visible == true;
            });
            this.tableSteData = arr;
            this.patientInfoList();
          } else {
            this.$message.error("获取配置列表失败" + res.msg);
          }
        })
        .catch((err) => {
          console.error("获取配置列表失败" + err);
        });
    },
    // 打开编辑弹窗
    editPreTriage(patientId) {
      this.timer = new Date().getTime();
      this.preTriageDialogVisible = true;
      this.preTriagePatientId = patientId;
    },
    //关闭编辑弹窗
    preTriageDialogClose(type) {
      this.preTriageDialogVisible = false;
      if (type == "edit") {
        this.patientInfoList();
      }
    },
    //查询列表
    patientInfoList() {
      this.laoding = true;
      if (this.timeBucket.length) {
        this.form.StartTime = this.timeBucket[0] + " 00:00:00";
        this.form.EndTime = this.timeBucket[1] + " 23:59:59";
      }
      triageApi
        .patientInfoList(this.form)
        .then((res) => {
          this.laoding = false;
          if (res.code == 200) {
            this.totalCount = res.data.totalCount;
            res.data.items.forEach((o) => {
              o.birthday = o.birthday.slice(0, 10);
              if (o.actTriageLevel) {
                if (o.actTriageLevel.indexOf("Ⅰ") != -1) {
                  o.level = "001";
                } else if (o.actTriageLevel.indexOf("Ⅱ") != -1) {
                  o.level = "002";
                } else if (o.actTriageLevel.indexOf("Ⅲ") != -1) {
                  o.level = "003";
                } else if (o.actTriageLevel.indexOf("Ⅳa") != -1) {
                  o.level = "004";
                } else if (o.actTriageLevel.indexOf("Ⅳb") != -1) {
                  o.level = "005";
                } else {
                  o.level = "006";
                }
              } else {
                o.level = "006";
              }
            });
            this.tableData = res.data.items;
            if (this.tableData.length < 15) {
              this.tableHeight = 40 * this.tableData.length + 45;
            } else {
              this.tableHeight = document.body.clientHeight - 283;
            }
            this.$nextTick(() => {
              this.$refs.simpleTable.doLayout();
            });
          } else {
            this.$message.error("查询列表数据失败原因：" + res.msg);
          }
        })
        .catch((err) => {
          console.error("查询列表数据失败原因：" + err);
        });
    },
  },
};
</script>
<style lang="scss">
.el-drawer__header {
  margin-bottom: 20px;
}
#stay-triage {
  .top-tool {
    margin-bottom: 10px;
  }
}
</style>