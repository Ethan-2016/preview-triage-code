<template>
  <div id="triage-table" class="block-box">
    <div class="top-tool">
      <div class="tool-item">
        <el-button type="primary" @click="saveHandle(true)">保存</el-button>
        <el-button type="primary" @click="resetHandle">一键重置</el-button>
      </div>
    </div>
    <div class="list-main">
      <el-table v-loading="loading" :data="list" border>
        <el-table-column type="index" label="序号" width="80" align="center">
          <template slot-scope="scope">
            {{ list.indexOf(scope.row) + 1 }}
            <i
              v-if="list.indexOf(scope.row) !== 0"
              class="btn-up el-icon-top"
              @click="upHandle(scope.row)"
            />
            <i
              v-if="list.indexOf(scope.row) !== list.length - 1"
              class="btn-down el-icon-bottom"
              @click="downHandle(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="columnValue" label="绑定字段名" align="center" />
        <!-- <el-table-column prop="columnValue" label="绑定字段名" align="center">
          <template slot-scope="scope">
            <span
              class="lbl-edit-cell"
              v-if="!scope.row.isShowColumnValueInput"
              @click="showInputHandle(scope.row, 'ColumnValue')"
            >
              {{ scope.row.columnValue }}
            </span>
            <el-input
              v-else
              class="txt-edit-cell"
              :ref="'txtColumnValue' + list.indexOf(scope.row)"
              v-model="scope.row.columnValue"
              size="mini"
              @blur="hideInputHandle(scope.row, 'ColumnValue')"
              @change="changeInputHandle(scope.row, 'ColumnValue')"
            />
          </template>
        </el-table-column> -->
        <el-table-column prop="columnName" label="当前列名" align="center">
          <template slot-scope="scope">
            <span
              class="lbl-edit-cell"
              v-show="!scope.row.isShowColumnNameInput"
              @click="showInputHandle(scope.row, 'ColumnName')"
            >
              {{ scope.row.columnName }}
            </span>
            <el-input
              v-show="scope.row.isShowColumnNameInput"
              class="txt-edit-cell"
              :ref="'txtColumnName' + list.indexOf(scope.row)"
              v-model="scope.row.columnName"
              size="mini"
              @blur="hideInputHandle(scope.row, 'ColumnName')"
              @change="changeInputHandle(scope.row, 'ColumnName')"
            />
          </template>
        </el-table-column>
        <el-table-column prop="columnWidth" label="当前列宽" align="center">
          <template slot-scope="scope">
            <span
              class="lbl-edit-cell"
              v-if="!scope.row.isShowColumnWidthInput"
              @click="showInputHandle(scope.row, 'ColumnWidth')"
            >
              {{ scope.row.columnWidth }}
            </span>
            <el-input
              v-else
              class="txt-edit-cell"
              :ref="'txtColumnWidth' + list.indexOf(scope.row)"
              v-model="scope.row.columnWidth"
              size="mini"
              @blur="hideInputHandle(scope.row, 'ColumnWidth')"
              @change="changeInputHandle(scope.row, 'ColumnWidth')"
            />
          </template>
        </el-table-column>
        <el-table-column prop="visible" label="是否显示" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.visible"
              active-color="#1BAD96"
              inactive-color="#DCDFE6"
              @change="changeInputHandle(scope.row, 'Visible')"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="showOverflowTooltip"
          label="是否换行"
          align="center"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.showOverflowTooltip"
              active-color="#1BAD96"
              inactive-color="#DCDFE6"
              @change="changeInputHandle(scope.row, 'ShowOverflowTooltip')"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="defaultColumnName"
          label="默认列名"
          align="center"
        />
        <el-table-column
          prop="defaultColumnWidth"
          label="默认列宽"
          align="center"
        />
      </el-table>
    </div>
  </div>
</template>
<script>
import tableSettingApi from "../../../api/tableSetting";

export default {
  name: "triageTable",
  data() {
    return {
      tableCode: "TriageTable",
      list: [],
      loading: false,
      isChange: false,
    };
  },
  created() {
    this.getData();
  },
  beforeDestroy(to, from, next) {
    if (this.isChange) {
      this.$confirm("更新还未保存，确定是否要保存?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.saveHandle();
        })
        .catch(() => {
          return false;
        });
    }
  },
  methods: {
    saveHandle(isShowConfirmDialog) {
      var _this = this;
      var opeation = function () {
        var input = JSON.parse(JSON.stringify(_this.list));
        for (var i = 0; i < input.length; i++) {
          var item = input[i];
          item.isShowColumnValueInput = undefined;
          item.isShowColumnNameInput = undefined;
          item.isShowColumnWidthInput = undefined;
        }
        _this.loading = true;
        tableSettingApi
          .saveTableSetting(input)
          .then((res) => {
            if (res.code == 200) {
              _this.$message.success("保存成功");
              _this.getData();
            } else {
              _this.loading = false;
              _this.$message.error("保存分诊列表表格配置失败" + res.msg);
            }
          })
          .catch((err) => {
            _this.loading = false;
            console.error("保存分诊列表表格配置失败原因：" + err);
          });
      };
      if (isShowConfirmDialog) {
        this.$confirm("确定要保存配置吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            opeation();
          })
          .catch(() => {
            return false;
          });
      } else {
        opeation();
      }
    },
    resetHandle() {
      this.$confirm("确定要重置配置吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.loading = true;
          tableSettingApi
            .resetTableSetting({ tableCode: this.tableCode })
            .then((res) => {
              if (res.code == 200) {
                this.$message.success("重置成功");
                this.getData();
              } else {
                this.loading = false;
                this.$message.error("重置分诊列表表格配置失败" + res.msg);
              }
            })
            .catch((err) => {
              this.loading = false;
              console.error("重置分诊列表表格配置失败原因：" + err);
            });
        })
        .catch(() => {
          return false;
        });
    },
    changeInputHandle(row, type) {
      var index = this.list.indexOf(row) + 1;
      var width = parseInt(row.columnWidth);
      if (
        isNaN(width) ||
        width === null ||
        width === undefined ||
        width > 1000
      ) {
        row.columnWidth = row.defaultColumnWidth;
        this.$message.error(
          "第" + index + "行数据【当前列宽】 - 输入无效，请重新输入"
        );
        return;
      }
      this.isChange = true;
    },
    showInputHandle(row, type) {
      var index = this.list.indexOf(row);
      row["isShow" + type + "Input"] = true;
      var _this = this;
      this.$nextTick(function () {
        _this.$refs["txt" + type + index].focus();
      });
    },
    hideInputHandle(row, type) {
      row["isShow" + type + "Input"] = false;
    },
    upHandle(row) {
      this.sequenceChangeHandle(row, true);
    },
    downHandle(row) {
      this.sequenceChangeHandle(row, false);
    },
    sequenceChangeHandle(row, isUpOrDown) {
      var index = this.list.indexOf(row);
      var list = this.list.filter((_) => _.id !== row.id);
      if (isUpOrDown) {
        index = index - 1;
      } else {
        index = index + 1;
      }
      list.splice(index, 0, row);
      this.list = list;
    },
    getData() {
      this.loading = true;
      tableSettingApi
        .getTableSetting({ tableCode: this.tableCode })
        .then((res) => {
          if (res.code == 200) {
            var data = res.data;
            for (var i = 0; i < data.length; i++) {
              var item = data[i];
              item.isShowColumnValueInput = false;
              item.isShowColumnNameInput = false;
              item.isShowColumnWidthInput = false;
            }
            this.list = data;
          } else {
            this.$message.error("获取分诊列表表格配置失败" + res.msg);
          }
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          console.error("获取分诊列表表格配置失败原因：" + err);
        });
    },
  },
};
</script>
<style lang="scss">
#triage-table {
  .list-main {
    .btn-up,
    .btn-down {
      cursor: pointer;
      font-weight: bold;
      position: absolute;
      top: 12px;
      color: rgba(0, 0, 0, 0);
    }
    .btn-up:hover {
      color: #409eff;
    }
    .btn-down:hover {
      color: #f56c6c;
    }
    .btn-up {
      right: 16px;
      color: #409eff;
    }
    .btn-down {
      right: 2px;
      color: #f56c6c;
    }
    .lbl-edit-cell {
      display: block;
      width: 100%;
    }
    .txt-edit-cell .el-input__inner {
      height: 22px;
      text-align: center;
    }
  }
}
</style>