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
  <div id="triage-find">
    <div class="top-tool">
      <div class="tool-item">
        <div class="type-list">
          <span
            v-for="item in typeList"
            :key="item.code"
            :class="{ active: item.code == selectCode }"
            @click="typeSelect(item.code, item.name)"
            >{{ item.name }}</span
          >
        </div>
      </div>
      <div class="tool-item">
        <span class="demonstration">分诊时间： </span>
        <el-date-picker
          v-model="timeBucket"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
        >
          >
        </el-date-picker>
      </div>
      <div class="tool-item">
        <span class="demonstration">病人检索： </span>
        <el-input
          placeholder="姓名/编号"
          v-model="form.PatientSearch"
          clearable
          maxlength="50"
        >
        </el-input>
      </div>
      <div class="tool-item">
        <el-button type="primary" @click="searchList()">查询</el-button>
        <el-button
          type=""
          class="btn-sty"
          @click="advancedQuery = !advancedQuery"
          >高级查询</el-button
        >
        <el-button
          type=""
          class="btn-sty"
          @click="
            initForm();
            patientInfoList();
          "
          >重置</el-button
        >
        <el-button type="" class="btn-sty" @click="relevanceGroupInjury"
          >关联群伤</el-button
        >
        <el-button type="" class="btn-sty" @click="exportFile">导出</el-button>
      </div>
    </div>
    <el-collapse-transition>
      <div v-show="advancedQuery" class="top-tool more-list">
        <div class="tool-item">
          <span class="demonstration">分诊级别： </span>
          <el-select v-model="form.LevelCode" placeholder="请选择">
            <el-option label="全部" value=""> </el-option>
            <el-option
              v-for="item in options.TriageLevel"
              :key="item.triageConfigCode"
              :label="item.triageConfigName"
              :value="item.triageConfigCode"
            >
            </el-option>
          </el-select>
        </div>
        <div class="tool-item">
          <span class="demonstration">分诊去向： </span>
          <el-select v-model="form.DirectionCode" placeholder="请选择">
            <el-option label="全部" value=""> </el-option>
            <el-option
              v-for="item in options.TriageDirection"
              :key="item.triageConfigCode"
              :label="item.triageConfigName"
              :value="item.triageConfigCode"
            >
            </el-option>
          </el-select>
        </div>
        <div class="tool-item">
          <span class="demonstration">群伤事件： </span>
          <el-select v-model="form.GroupInjuryCode" placeholder="请选择">
            <el-option label="全部" value=""> </el-option>
            <el-option
              v-for="item in options.GroupInjuryType"
              :key="item.triageConfigCode"
              :label="item.triageConfigName"
              :value="item.triageConfigCode"
            >
            </el-option>
          </el-select>
        </div>
        <div class="tool-item">
          <span class="demonstration">分诊科室： </span>
          <el-select v-model="form.DeptCode" placeholder="请选择">
            <el-option label="全部" value=""> </el-option>
            <el-option
              v-for="item in options.TriageDepartment"
              :key="item.triageConfigCode"
              :label="item.triageConfigName"
              :value="item.triageConfigCode"
            >
            </el-option>
          </el-select>
        </div>
        <div class="tool-item">
          <span class="demonstration">分诊人员： </span>
          <el-select v-model="form.TriageUserCode" placeholder="请选择">
            <el-option label="全部" value=""> </el-option>
            <el-option
              v-for="o in nursesres"
              :key="o.id"
              :label="o.name"
              :value="o.userName"
            ></el-option>
          </el-select>
        </div>
        <div class="tool-item">
          <span class="demonstration">绿色通道： </span>
          <el-select v-model="form.GreenRoadCode" placeholder="请选择">
            <el-option label="全部" value=""> </el-option>
            <el-option
              v-for="item in options.GreenRoad"
              :key="item.triageConfigCode"
              :label="item.triageConfigName"
              :value="item.triageConfigCode"
            >
            </el-option>
          </el-select>
        </div>
        <div class="tool-item">
          <span class="demonstration">身份： </span>
          <el-select v-model="form.IdentityCode" placeholder="请选择">
            <el-option label="全部" value=""> </el-option>
            <el-option
              v-for="item in options.IdentityType"
              :key="item.triageConfigCode"
              :label="item.triageConfigName"
              :value="item.triageConfigCode"
            >
            </el-option>
          </el-select>
        </div>
        <div class="tool-item">
          <span class="demonstration">费别： </span>
          <el-select v-model="form.ChargeTypeCode" placeholder="请选择">
            <el-option label="全部" value=""> </el-option>
            <el-option
              v-for="item in options.Faber"
              :key="item.triageConfigCode"
              :label="item.triageConfigName"
              :value="item.triageConfigCode"
            >
            </el-option>
          </el-select>
        </div>
        <div class="tool-item">
          <span class="demonstration"> 重点病种： </span>
          <el-select v-model="form.DiseaseCode" placeholder="请选择">
            <el-option label="全部" value=""> </el-option>
            <el-option
              v-for="item in options.KeyDiseases"
              :key="item.triageConfigCode"
              :label="item.triageConfigName"
              :value="item.triageConfigCode"
            >
            </el-option>
          </el-select>
        </div>
        <div class="tool-item">
          <span class="demonstration"> 主诉： </span>
          <el-select v-model="form.NarrationCode" placeholder="请选择">
            <el-option label="全部" value=""> </el-option>
            <el-option
              v-for="item in options.Narration"
              :key="item.triageConfigCode"
              :label="item.triageConfigName"
              :value="item.triageConfigCode"
            >
            </el-option>
          </el-select>
        </div>
        <div class="tool-item">
          <span class="demonstration">来院方式：</span>
          <el-select v-model="form.ToHospitalWayCode" placeholder="请选择">
            <el-option label="全部" value=""> </el-option>
            <el-option
              v-for="item in options.ToHospitalWay"
              :key="item.triageConfigCode"
              :label="item.triageConfigName"
              :value="item.triageConfigCode"
            >
            </el-option>
          </el-select>
        </div>
        <div class="tool-item">
          <span class="demonstration">发热： </span>
          <el-select v-model="form.IsHot" placeholder="请选择">
            <el-option label="全部" value=""> </el-option>
            <el-option label="是" value="'true'"> </el-option>
            <el-option label="否" value="'false'"> </el-option>
          </el-select>
        </div>
      </div>
    </el-collapse-transition>
    <div class="list-main">
      <el-table
        :data="tableData"
        ref="simpleTable"
        border
        @selection-change="selectPatientIdChange"
        v-loading="laoding"
        :height="tableHeight"
        stripe
      >
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
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
        <el-table-column fixed="right" label="操作" width="80" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="editPreTriage(scope.row.patientId, scope.row.taskInfoId)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <data-pager
          :MaxResultCount="form.MaxResultCount"
          :totalCount="totalCount"
          :SkipCount="form.SkipCount"
          @paginationForm="paginationForm"
        ></data-pager>
      </div>
    </div>
    <el-drawer title="关联患者" :visible.sync="showDrawer" size="800px">
      <div class="drawer-main">
        <div class="top-tool">
          <div class="tool-item">
            <el-date-picker
              v-model="timeBucketWindos"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              :default-time="['00:00:00', '23:59:59']"
            >
              >
            </el-date-picker>
          </div>
          <div class="tool-item">
            <el-button type="primary" @click="groupInjuryRecordList"
              >查询</el-button
            >
          </div>
        </div>
        <div class="drawer-tabel">
          <el-table
            :data="windosList"
            highlight-current-row
            @current-change="windosListChange"
            border
          >
            <el-table-column
              prop="happeningTime"
              label="事件时间"
              width="160px"
            >
            </el-table-column>
            <el-table-column
              prop="groupInjuryTypeName"
              width="80px"
              label="事件类型"
            >
            </el-table-column>
            <el-table-column
              prop="description"
              width="158px"
              show-overflow-tooltip
              label="概要说明"
            >
            </el-table-column>
            <el-table-column
              prop="remark"
              show-overflow-tooltip
              label="详细说明"
            >
            </el-table-column>
          </el-table>
        </div>

        <div class="btn">
          <el-button size="small" @click="clearAdd">取消</el-button>
          <el-button
            size="small"
            type="primary"
            @click="groupInjuryForPatient()"
            >确定</el-button
          >
        </div>
      </div>
    </el-drawer>
    <el-dialog
      title="编辑分诊信息"
      :visible.sync="preTriageDialogVisible"
      :before-close="preTriageDialogClose"
      :fullscreen="true"
    >
      <preTriage
        @saveSuccess="preTriageDialogClose('edit')"
        @closeEdit="preTriageDialogVisible = false"
        :isEdit="true"
        :preTriagePatientId="preTriagePatientId"
        :preTriageTaskInfoId="preTriageTaskInfoId"
        :key="timer"
      ></preTriage>
    </el-dialog>
  </div>
</template>
<script>
import moment from "moment";
import triageApi from "../../api/triageApi";
import commenApi from "../../api/commenApi";
import triageSettingApi from "../../api/tableSetting";
import dataPager from "../../components/dataPager";
import preTriage from "../preTriage/preTriage.vue";
export default {
  components: {
    dataPager,
    preTriage,
  },
  data() {
    return {
      tableHeight: document.body.clientHeight - 243,
      options: {},
      timer: "",
      form: {},
      preTriageDialogVisible: false,
      preTriageTaskInfoId: "",
      preTriagePatientId: "",
      laoding: true,
      advancedQuery: false,
      selectCode: "-1",
      typeList: [
        {
          code: "-1",
          name: "全部",
        },
        {
          code: "001",
          name: "120",
        },
        {
          code: "002",
          name: "红区",
        },
        {
          code: "003",
          name: "黄区",
        },
        {
          code: "004",
          name: "绿区",
        },
      ],
      totalCount: 0,
      timeBucket: [],
      timeBucketWindos: [],
      showDrawer: false,
      tableData: [],
      selectPatientIds: "",
      windosList: [],
      selectGroupInjuryInfoId: "",
      tableSteData: [],
      nursesres: [],
    };
  },
  created() {
    this.initForm();
    this.triageConfigList();
    this.getPagedUsers();
    this.getTabelSet();
  },
  methods: {
    searchList() {
      this.form.SkipCount = 1;
      this.patientInfoList();
    },
    relevanceGroupInjury() {
      if (this.selectPatientIds == "") {
        this.$message.warning("请先选择需要关联的患者");
        return;
      }
      this.showDrawer = true;
      this.groupInjuryRecordList();
    },
    //获取护士信息
    getPagedUsers() {
      commenApi
        .getPagedUsers({
          skipCount: 0,
          maxResultCount: 1000,
        })
        .then((res) => {
          this.nursesres = res.items;
        })
        .catch((err) => {
          console.error("获取护士信息失败原因：" + err);
        });
    },
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
    //初始化查询条件
    initForm() {
      this.form = {
        MaxResultCount: 60, //页容量
        SkipCount: 1, //当前页数
        StartTime: "", //开始时间
        EndTime: "", //结束时间
        ToHospitalWayCode: "", //来院方式
        ToHospitalWayFrom120Code: "", //120选择
        LevelCode: "", //分诊级别代码
        LevelAreaCode: "", //分诊级别代码用于区域
        DirectionCode: "", //分诊去向代码
        DeptCode: "", //科室代码
        GroupInjuryCode: "", //群伤事件代码
        NarrationCode: "", //主诉
        IsHot: "", //是否发热
        GreenRoadCode: "", //绿通
        IdentityCode: "", //身份
        ChargeTypeCode: "", //费别
        DiseaseCode: "", //重点病种
        PatientSearch: "", //分诊检索，身份证，姓名等
        TriageStatus: "1", //待分诊0，已分诊1
        TriageUserCode: "", //分诊人
      };
      this.selectCode = "-1";
      this.timeBucket = [
        moment(new Date()).format("YYYY-MM-DD") + " 00:00:00",
        moment(new Date()).format("YYYY-MM-DD") + " 23:59:59",
      ];
    },
    //选择群伤事件
    windosListChange(val) {
      this.selectGroupInjuryInfoId = val.groupInjuryInfoId;
    },
    //提交群伤关联

    // 打开编辑弹窗
    editPreTriage(patientId, taskInfoId) {
      this.timer = new Date().getTime();
      this.preTriageDialogVisible = true;
      this.preTriagePatientId = patientId;
      this.preTriageTaskInfoId = taskInfoId;
    },
    //关闭编辑弹窗
    preTriageDialogClose(type) {
      this.preTriageDialogVisible = false;
      if (type == "edit") {
        this.patientInfoList();
      }
    },
    // 导出文件
    exportFile() {
      this.form.StartTime = this.timeBucket[0];
      this.form.EndTime = this.timeBucket[1];
      triageApi
        .patientInfoListExport(this.form)
        .then((res) => {
          // console.log(res);
          // if (res.code == 200) {
          // 此处有个坑。这里用content保存文件流，最初是content=res，但下载的test.xls里的内容如下图1，
          // 检查了下才发现，后端对文件流做了一层封装，所以将content指向res.data即可 // 另外，流的转储属于浅拷贝，所以此处的content转储仅仅是便于理解，并没有实际作用=_=
          // const content = res.data;
          const content = res;
          const blob = new Blob([content]);
          // 构造一个blob对象来处理数据
          const fileName = "分诊记录.xls";
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
    },
    //获取选择项code
    getSelectVal(name, arr) {
      console.log(name, arr);
      let codeArr = [];
      arr.forEach((o) => {
        if (o.remark.indexOf(name) != -1) {
          codeArr.push(o.triageConfigCode);
        }
      });
      console.log(codeArr.join(","));
      return codeArr.join(",");
    },
    //获取选择项code
    getSelect120Val(name, arr) {
      console.log(name, arr);
      let codeArr = [];
      arr.forEach((o) => {
        if (o.triageConfigName.indexOf(name) != -1) {
          codeArr.push(o.triageConfigCode);
        }
      });
      console.log(codeArr.join(","));
      return codeArr.join(",");
    },
    //头部类型参数选择
    typeSelect(code, name) {
      this.selectCode = code;
      this.form.SkipCount = 1;
      switch (code) {
        case "001":
          this.form.ToHospitalWayFrom120Code = this.getSelect120Val(
            name,
            this.options.ToHospitalWay
          );
          this.form.LevelAreaCode = "";
          break;
        case "002":
          this.form.LevelAreaCode = this.getSelectVal(
            name,
            this.options.TriageLevel
          );
          this.form.ToHospitalWayFrom120Code = "";
          break;
        case "003":
          this.form.LevelAreaCode = this.getSelectVal(
            name,
            this.options.TriageLevel
          );
          this.form.ToHospitalWayFrom120Code = "";
          break;
        case "004":
          this.form.LevelAreaCode = this.getSelectVal(
            name,
            this.options.TriageLevel
          );
          this.form.ToHospitalWayFrom120Code = "";
          break;
        default:
          this.form.LevelAreaCode = "";
          this.form.ToHospitalWayFrom120Code = "";
          break;
      }
      this.patientInfoList();
    },
    selectPatientIdChange(val) {
      let arr = [];
      val.forEach((o) => {
        arr.push(o.id);
      });
      this.selectPatientIds = arr.join(",");
    },
    /**获取分页结果
     *
     */
    paginationForm(obj) {
      this.form.MaxResultCount = obj.MaxResultCount;
      this.form.SkipCount = obj.SkipCount;
      this.patientInfoList();
    },
    //获取字典
    triageConfigList() {
      triageApi
        .triageConfigList({
          TriageConfigType: "1001,1002,1003,1004,1005,1006,1007,1008,1009,1017",
        })
        .then((res) => {
          if (res.code == 200) {
            this.options = res.data;
          } else {
            this.$message.error("获取字典失败原因：" + res.msg);
          }
        })
        .catch((err) => {
          console.error("获取字典失败原因：" + err);
        });
    },
    //查询列表
    patientInfoList() {
      this.laoding = true;
      this.form.StartTime = "";
      this.form.EndTime = "";
      if (this.timeBucket && this.timeBucket.length) {
        this.form.StartTime = this.timeBucket[0];
        this.form.EndTime = this.timeBucket[1];
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
            // if (this.tableData.length < 15) {
            //   this.tableHeight = 40 * this.tableData.length + 45;
            // } else {
            //   this.tableHeight = document.body.clientHeight - 283;
            // }
            this.$nextTick(() => {
              this.$refs.simpleTable.doLayout();
            });

            // let h = 40 * this.tableData.length + 45;
            // let clientHeight = document.body.clientHeight;
            // let maxH = clientHeight - 249;
            // h < maxH ? (this.tableHeight = h + 10) : (this.tableHeight = maxH);
            // this.$nextTick(() => {
            //   this.$refs.simpleTable.doLayout();
            // });

            // this.tableHeight = document.body.clientHeight - 283;
            // this.$nextTick(() => {
            //   this.$refs.simpleTable.doLayout();
            // });
          } else {
            this.$message.error("查询列表数据失败原因：" + res.msg);
          }
        })
        .catch((err) => {
          console.error("查询列表数据失败原因：" + err);
        });
    },
    //查询群伤列表
    groupInjuryRecordList() {
      let obj = {
        SkipCount: 1,
        MaxResultCount: 10000,
        IsIncludePatient: false,
      };
      if (this.timeBucketWindos && this.timeBucketWindos.length) {
        obj.StartTime = this.timeBucketWindos[0];
        obj.EndTime = this.timeBucketWindos[1];
      }

      triageApi
        .groupInjuryRecordList(obj)
        .then((res) => {
          if (res.code == 200) {
            this.windosList = res.data.items;
          } else {
            this.$message.error("查询群伤列表数据失败原因：" + res.msg);
          }
        })
        .catch((err) => {
          console.error("查询列群伤表数据失败原因：" + err);
        });
    },
    clearAdd() {
      this.showDrawer = false;
    },
    groupInjuryForPatient() {
      if (this.selectGroupInjuryInfoId == "") {
        this.$message.warning("请先选择需要关联的群伤事件");
        return;
      }
      triageApi
        .groupInjuryForPatient({
          triagePatientInfoIds: this.selectPatientIds,
          groupInjuryId: this.selectGroupInjuryInfoId,
        })
        .then((res) => {
          if (res.code == 200) {
            this.$message.success("群伤关联成功");
            this.showDrawer = false;
            this.patientInfoList();
          } else {
            this.$message.error("群伤关联失败原因：" + res.msg);
          }
        })
        .catch((err) => {
          console.error("群伤关联失败原因：" + err);
        });
    },
    handleSizeChange(val) {
      this.form.MaxResultCount = val;
      this.patientInfoList();
    },
    handleCurrentChange(val) {
      this.form.SkipCount = val;
      this.patientInfoList();
    },
  },
};
</script>
<style lang="scss">
@import "../../assets/css/_handle.scss";
#triage-find {
  .btn-sty:hover {
    background-color: #1bad96;
    color: #fff;
  }
  .el-drawer {
    z-index: 2021;
  }
  .more-list {
    height: 100px;
    padding-top: 10px;
    flex-wrap: wrap;
    .demonstration {
      width: 100px;
      text-align: right;
    }
  }
  .is-fullscreen {
    .el-dialog__body {
      padding: 0;
      height: 90vh;
    }
  }
  @include font_color("font_color2");
  padding: 12px;
  .list-main {
    margin-top: 12px;
  }
  .drawer-main {
    padding: 0;
    .drawer-tabel {
      margin-top: 10px;
    }
  }
  .type-list {
    > span {
      margin-right: 20px;
      border: 1px solid #e4e7ed;
      border-radius: 4px;
      padding: 3px 10px;
      background-color: #e4e7ed;
      cursor: pointer;
      &.active {
        border-color: #1bad96;
        background-color: #1bad96;
        color: #fff;
      }
    }
  }
}
</style>
