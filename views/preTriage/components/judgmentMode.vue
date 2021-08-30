<!--
 * @Author: 吴应
 * @Date: 2021年6月29日14:09:22
 * @LastEditTime: 2021年6月29日14:09:28
 * @LastEditors: Linbaochang
 * @Description: In User Settings Edit
 * @FileName: 预检分诊
 * @FilePath: src\benchs\previewTriage\views\preTriage\components\judgmentMode.vue
-->
<template>
  <div id="judgment-mode" v-loading="loading">
    <div class="table-main table_1">
      <el-table
        ref="categoryTable"
        :data="categoryData"
        :show-header="false"
        style="width: 100%"
        highlight-current-row
        @current-change="categoryCurrentChange"
      >
        <el-table-column width="180">
          <template slot-scope="scope">
            <div @click="getCategoryIndex(scope.$index)">
              {{ scope.row.itemName }}
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="table-main table_2">
      <el-table
        ref="complainedTable"
        :data="complainedData"
        :show-header="false"
        highlight-current-row
        style="width: 100%"
        @current-change="complainedCurrentChange"
      >
        <el-table-column width="180">
          <template slot-scope="scope">
            <div @click="getComplainedIndex(scope.$index)">
              {{ scope.row.itemName }}
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="table-main table_3">
      <el-table
        ref="multipleTable"
        :data="itemData"
        :reserve-selection="true"
        :row-key="
          (row) => {
            return row.id;
          }
        "
        :show-header="false"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="45"> </el-table-column>
        <el-table-column width="515">
          <template slot-scope="scope">
            <div class="item">
              <div
                class="item-left"
                :class="'grade-styTriageLevel_00' + scope.row.emergencyLevel"
              >
                {{
                  scope.row.emergencyLevel == 1
                    ? "I"
                    : scope.row.emergencyLevel == 2
                    ? "II"
                    : scope.row.emergencyLevel == 3
                    ? "III"
                    : scope.row.emergencyLevel == 4
                    ? "IVa"
                    : scope.row.emergencyLevel == 5
                    ? "IVb"
                    : ""
                }}
              </div>
              <div>
                {{ scope.row.itemName }}
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import baseSettingApi from "../../../api/baseSettingApi";
export default {
  props: {
    scoreData: {
      type: Object,
      judgmentData: {
        type: Object,
        level: {
          type: String,
          default: "",
        },
        categoryIndex: {
          type: Number,
          default: 0,
        },
        complainedIndex: {
          type: Number,
          default: 0,
        },
        categoryCurrentRow: {
          type: Object,
          default: function () {
            return {};
          },
        },
        complainedCurrentRow: {
          type: Object,
          default: function () {
            return {};
          },
        },
        multipleSelection: {
          type: Array,
          default: function () {
            return [];
          },
        },
      },
    },
  },
  data() {
    return {
      loading: false,
      categoryData: [],
      complainedData: [],
      itemData: [],
      gistData: {},
    };
  },
  created() {
    this.gistData = JSON.parse(JSON.stringify(this.scoreData));
    this.judgmentDetailList();
  },
  methods: {
    //获取点击的分类索引
    getCategoryIndex(i) {
      this.gistData.judgmentData.categoryIndex = i;
      //设置主诉数据
      if (this.categoryData[i].children && this.categoryData[i].children.length) {
        this.complainedData = this.categoryData[i].children;
        //设置判定项数据 默认第一项
        if (this.complainedData[0].children && this.complainedData[0].children.length) {
          this.itemData = this.complainedData[0].children;
        } else {
          this.itemData = [];
        }
        //设置默认选择高亮
        this.$refs.categoryTable.setCurrentRow(this.categoryData[i]);
        this.$refs.complainedTable.setCurrentRow(this.complainedData[0]);
      } else {
        this.complainedData = [];
        this.itemData = [];
      }
    },
    //获取点击的主诉索引
    getComplainedIndex(i) {
      this.gistData.judgmentData.complainedIndex = i;
      if (this.complainedData[i].children && this.complainedData[i].children.length) {
        this.itemData = this.complainedData[i].children;
      } else {
        this.itemData = [];
      }
      this.$refs.complainedTable.setCurrentRow(this.complainedData[i]);
    },
    //分类改变
    categoryCurrentChange(row) {
      //分类选择结果
      this.gistData.judgmentData.categoryCurrentRow = row;
    },
    //主诉改变
    complainedCurrentChange(row) {
      //主诉选择结果
      this.gistData.judgmentData.complainedCurrentRow = row;
      //设置判定项数据
    },
    handleSelectionChange(val) {
      this.gistData.judgmentData.multipleSelection = val;
    },
    //获取分类列表
    judgmentDetailList() {
      this.loading = true;
      baseSettingApi
        .judgmentDetailList({ isEnabled: 1 })
        .then((res) => {
          this.loading = false;
          if (res.code == 200) {
            //生成表格数据
            //分类
            this.categoryData = res.data.length > 0 ? res.data : [];
            //主诉

            if (
              this.categoryData.length > 0 &&
              this.categoryData[this.gistData.judgmentData.categoryIndex]
                .children
            ) {
              this.complainedData =
                this.categoryData[this.gistData.judgmentData.categoryIndex]
                  .children.length > 0
                  ? this.categoryData[this.gistData.judgmentData.categoryIndex]
                      .children
                  : [];
            }
            //判定项
            if (
              this.complainedData.length > 0 &&
              this.complainedData[this.gistData.judgmentData.complainedIndex]
                .children
            ) {
              this.itemData =
                this.complainedData[this.gistData.judgmentData.complainedIndex]
                  .children.length > 0
                  ? this.complainedData[
                      this.gistData.judgmentData.complainedIndex
                    ].children
                  : [];
            }
            // 设置默认值
            //分类
            if (
              JSON.stringify(this.gistData.judgmentData.categoryCurrentRow) ==
              "{}"
            ) {
              this.gistData.judgmentData.categoryCurrentRow =
                this.categoryData[0];
            }
            //主诉
            if (
              JSON.stringify(this.gistData.judgmentData.complainedCurrentRow) ==
              "{}"
            ) {
              this.gistData.judgmentData.complainedCurrentRow =
                this.complainedData[0];
            }
            //设置回显

            this.$nextTick(() => {
              this.toggleSelection();
            });
          } else {
            this.$message.error("获取分类列表失败" + res.msg);
          }
        })
        .catch((err) => {
          this.loading = false;
          console.error("获取分类列表失败" + err);
        });
    },
    //回显
    toggleSelection() {
      this.$refs.categoryTable.setCurrentRow(
        this.categoryData.find((o) => {
          return o.id == this.gistData.judgmentData.categoryCurrentRow.id;
        })
      );
      this.$refs.complainedTable.setCurrentRow(
        this.complainedData.find((o) => {
          return o.id == this.gistData.judgmentData.complainedCurrentRow.id;
        })
      );
      let arr = [];
      this.itemData.forEach((o) => {
        this.gistData.judgmentData.multipleSelection.forEach((x) => {
          if (o.id == x.id) {
            arr.push(o);
          }
        });
      });
      arr.forEach((o) => {
        this.$refs.multipleTable.toggleRowSelection(o, true);
      });
    },
    //计算判定依据最大项等级
    setJudgmentLevel() {
      let i = 100;
      this.gistData.judgmentData.multipleSelection.forEach((o) => {
        if (o.emergencyLevel < i) {
          i = o.emergencyLevel;
        }
      });
      this.gistData.judgmentData.value = i;
      switch (i) {
        case 1:
          this.gistData.judgmentData.level = "I级";
          break;
        case 2:
          this.gistData.judgmentData.level = "II级";
          break;
        case 3:
          this.gistData.judgmentData.level = "III级";
          break;
        case 4:
          this.gistData.judgmentData.level = "IVa级";
          break;

        default:
          this.gistData.judgmentData.level = "IVb级";
          break;
      }
    },
    //提交数据
    putScoreData() {
      this.setJudgmentLevel();
      this.$emit("putScoreData", this.gistData);
    },
  },
};
</script>
<style lang="scss">
#judgment-mode {
  display: flex;
  .table_1 {
    .el-table {
      border-radius: 6px 0 0 6px;
    }
  }
  .table_2 {
    margin: 0 -1px;
    .el-table {
      border-radius: 0;
    }
  }
  .table_3 {
    .el-table {
      border-radius: 0 6px 6px 0;
      .item {
        display: flex;
        align-items: center;
        .item-left {
          border-radius: 50%;
          margin-right: 12px;
          width: 22px;
          display: inline-block;
          height: 22px;
          line-height: 22px;
          text-align: center;
          font-size: 12px;
          flex-shrink: 0;
        }
      }
    }
  }
  .el-table__body-wrapper::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }
}
</style>