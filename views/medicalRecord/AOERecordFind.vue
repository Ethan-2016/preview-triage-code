<!--
 * @Author: 吴应
 * @Date: 2021年4月18日19:12:50
 * @LastEditTime: 2021年4月18日19:12:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FileName: 群伤记录
 * @FilePath: src\benchs\preHospital\views\medicalRecordSearch\AOERecordFind.vue
-->
<template>
  <div id="aoe-record-find">
    <div class="top-tool">
      <div class="tool-item">
        <span class="demonstration">群伤时间： </span>
        <el-date-picker
          v-model="timeBucket"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
        >
        </el-date-picker>
      </div>
      <div class="tool-item">
        <span class="demonstration">事件类型： </span>
        <el-select v-model="form.GroupInjuryTypeCode" placeholder="请选择">
          <el-option label="全部" value=""> </el-option>
          <el-option
            v-for="item in injuryTypeOptions"
            :key="item.triageConfigCode"
            :label="item.triageConfigName"
            :value="item.triageConfigCode"
          >
          </el-option>
        </el-select>
      </div>
      <div class="tool-item">
        <el-button type="primary" @click="form.SkipCount = 1;groupInjuryRecordList()"
          >查询</el-button
        >
      </div>
    </div>
    <div class="list-main">
      <!-- :max-height="tableH" -->
      <el-table
        ref="refTable"
        v-loading="loading"
        :data="tableData"
        @row-click="clickTable"
        row-key="id"
        border
        stripe
        style="width: 100%"
        :span-method="arraySpanMethod"
        :tree-props="{ children: 'groupInjuryPatients' }"
        :cell-style="{ textAlign: 'center', borderColor: '#D2D5DD' }"
        :header-cell-style="{ borderColor: '#D2D5DD' }"
      >
        <el-table-column label="" width="1" class-name="description-lin">
          <template slot-scope="scope">
            <div class="description-column">
              <div class="description-column_1">
                <span class="title">{{ scope.row.groupInjuryTypeName }}</span>
              </div>
              <div class="description-column_2">
                <span>{{ scope.row.happeningTime }}</span>
              </div>
              <div class="description-column_3">
                <span>{{ scope.row.description }}</span>
              </div>
              <div class="description-column_4">
                <span>{{ scope.row.remark }}</span>
              </div>
              <div class="description-column_5">
                <span>共{{ scope.row.patientCount }}人</span>
              </div>
              <div class="action">
                <span
                  ><el-button
                    type="text"
                    @click="
                      editGroupInjury(scope.row);
                      showDrawer = !showDrawer;
                      timer = new Date().getTime();
                    "
                    >编辑</el-button
                  ><el-button
                    class="required"
                    type="text"
                    @click="deleteGroupInjury(scope.row.groupInjuryInfoId)"
                    >删除</el-button
                  >
                </span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="index" width="50px" label="序号">
        </el-table-column>
        <el-table-column prop="patientId" label="患者编号"> </el-table-column>
        <el-table-column prop="patientName" label="患者姓名"> </el-table-column>
        <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column prop="birthday" label="出生日期"> </el-table-column>
        <el-table-column prop="triageTime" label="分诊时间"> </el-table-column>
        <el-table-column label="分诊级别">
          <template slot-scope="scope">
            <div style="display: flex; justify-content: center">
              <div :class="'grade-sty grade-styTriageLevel_' + scope.row.level">
                {{ scope.row.triageLevel }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="分诊去向">
          <template slot-scope="scope">
            {{ scope.row.triageDirection }}
          </template>
        </el-table-column>
        <el-table-column label="分诊科室">
          <template slot-scope="scope">
            {{ scope.row.triageDept }}
          </template>
        </el-table-column>
        <el-table-column prop="greenRoad" label="绿色通道"> </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div style="text-align: center">
              <el-button
                type="text"
                @click="cancelGroupInjuryRecord(scope.row.triagePatientInfoId)"
                >取消关联</el-button
              >
            </div>
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
    <el-drawer
      title="编辑群伤"
      size="850"
      :wrapperClosable="false"
      :visible.sync="showDrawer"
    >
      <div class="groupInjury">
        <groupInjury
          :groupInjuryData="groupInjuryData"
          @updateMethod="updateMethod"
          @drawerClose="showDrawer = false"
          :key="timer"
        ></groupInjury>
      </div>
    </el-drawer>
  </div>
</template>
<script>
// import moment from "moment";
import triageApi from "../../api/triageApi";
import dataPager from "../../components/dataPager";
import groupInjury from "../preTriage/components/groupInjury.vue";
export default {
  components: {
    dataPager,
    groupInjury,
  },
  data() {
    return {
      timer: "",
      groupInjuryData: {},
      // timeBucket: [
      //   moment(new Date()).format("YYYY-MM-DD") + " 00:00:00",
      //   moment(new Date()).format("YYYY-MM-DD") + " 23:59:59",
      // ],
      timeBucket:[],
      form: {
        StartTime: "",
        EndTime: "",
        SkipCount: 1,
        MaxResultCount: 15,
        GroupInjuryTypeCode: "",
        IsIncludePatient: true,
      },
      injuryTypeOptions: [],
      totalCount: 0,
      showDrawer: false,
      currentPage: 1,
      input: "",
      textarea: "",
      value: "",
      tableData: [],
      loading: true,
    };
  },
  created() {
    this.triageConfigList();
    this.groupInjuryRecordList();
    // this.tableH = document.body.clientHeight-126;
  },
  methods: {
    clickTable(row) {
      this.$refs.refTable.toggleRowExpansion(row);
    },
    //修改群伤
    editGroupInjury(val) {
      this.groupInjuryData = val;
    },
    updateMethod() {
      this.groupInjuryRecordList();
      this.showDrawer = false;
    },
    //修改群伤成功
    editSuccess() {
      this.groupInjuryRecordList();
    },
    //删除群伤
    deleteGroupInjury(groupInjuryId) {
      this.$confirm("此操作将永久该删除该群伤事件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        triageApi
          .deleteGroupInjury({ groupInjuryId })
          .then((res) => {
            if (res.code == 200) {
              this.$message.success("删除成功");
              this.groupInjuryRecordList();
            } else {
              this.$message.error("删除成功失败原因：" + res.msg);
            }
          })
          .catch((err) => {
            console.error("删除成功失败原因：" + err);
          });
      });
    },
    //取消关联
    cancelGroupInjuryRecord(triagePatientInfoId) {
      let e_this = this;
      this.$confirm("此操作将取消关联该群伤事件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        triageApi
          .cancelGroupInjuryRecord({ triagePatientInfoId })
          .then((res) => {
            if (res.code == 200) {
              e_this.$message.success("取消关联成功");
              e_this.groupInjuryRecordList();
            } else {
              e_this.$message.error("取消关联失败原因：" + res.msg);
            }
          })
          .catch((err) => {
            console.error("取消关联失败原因：" + err);
          });
      });
    },
    //表格操作相关
    arraySpanMethod({ row }) {
      if (row.patientCount) {
        return {
          rowspan: 1,
          colspan: 13,
        };
      }
    },
    /**获取分页结果
     *
     */
    paginationForm(obj) {
      this.form.MaxResultCount = obj.MaxResultCount;
      this.form.SkipCount = obj.SkipCount;
      this.groupInjuryRecordList();
    },
    //查询列表
    groupInjuryRecordList() {
      this.loading = true;
      this.form.StartTime = "";
      this.form.EndTime = "";
      if (this.timeBucket && this.timeBucket.length) {
        this.form.StartTime = this.timeBucket[0];
        this.form.EndTime = this.timeBucket[1];
      }
      triageApi
        .groupInjuryRecordList(this.form)
        .then((res) => {
          this.loading = false;
          if (res.code == 200) {
            this.totalCount = res.data.totalCount;
            res.data.items.forEach((o, i) => {
              o.id = i + 1;
              o.groupInjuryPatients.forEach((x, j) => {
                x.id = i + 1 + "_" + j + 1;
                x.index = j + 1;
                if (x.triageLevel) {
                  if (x.triageLevel.indexOf("Ⅰ") != -1) {
                    x.level = "001";
                  } else if (x.triageLevel.indexOf("Ⅱ") != -1) {
                    x.level = "002";
                  } else if (x.triageLevel.indexOf("Ⅲ") != -1) {
                    x.level = "003";
                  } else if (x.triageLevel.indexOf("Ⅳa") != -1) {
                    x.level = "004";
                  } else if (x.triageLevel.indexOf("Ⅳb") != -1) {
                    x.level = "005";
                  } else {
                    x.level = "006";
                  }
                } else {
                  x.level = "006";
                }
              });
            });
            this.tableData = res.data.items;
          } else {
            this.$message.error("查询列表数据失败原因：" + res.msg);
          }
        })
        .catch((err) => {
          this.loading = false;
          console.error("查询列表数据失败原因：" + err);
        });
    },
    //获取事件类型列表
    triageConfigList() {
      triageApi
        .triageConfigList({ TriageConfigType: "1002" })
        .then((res) => {
          if (res.code == 200) {
            this.injuryTypeOptions = res.data.GroupInjuryType;
          } else {
            this.$message.error("获取字典失败原因：" + res.msg);
          }
        })
        .catch((err) => {
          console.error("获取字典失败原因：" + err);
        });
    },
    clearAdd() {
      this.showDrawer = false;
    },
    submitAdd() {
      this.showDrawer = false;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>
<style lang="scss">
#aoe-record-find {
  padding: 12px;
  .list-main {
    margin-top: 12px;
    .el-table {
      .el-table__body-wrapper {
        el-table__body {
          tbody {
            width: 100%;
            tr {
              width: 100%;
              td {
                width: 100%;
                .cell {
                  width: 100%;
                  padding: 0;
                }
              }
            }
          }
        }
      }
      .description-lin {
        cursor: pointer;
        padding: 0;
        margin: 0;
        .cell {
          height: 40px;
          line-height: 40px;
          padding: 0 20px;
          background-color: #e0f6f3;
          .el-table__expand-icon {
            float: right;
            line-height: 35px;
            height: 35px;
          }
        }
      }
      .el-table__row--level-1 {
        .description-lin {
          .cell {
            background-color: #fff;
          }
        }
      }

      .description-column {
        width: 98%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: left;
        > div {
          width: 40%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          > span {
            font-size: 16px;
            color: #000;
          }
          .title {
            font-size: 16px;
            font-weight: 700;
            color: #1bad96;
          }
        }
        .description-column_1 {
          width: 120px;
        }
        .description-column_2 {
          width: 180px;
        }
        .description-column_3 {
          width: 200px;
        }
        .description-column_5 {
          width: 100px;
        }
        .action {
          width: 120px;
        }
      }
    }
  }
  .groupInjury {
    padding: 30px;
    padding-top: 0;
  }
  .el-table .cell {
    padding: 0;
  }
}
</style>
