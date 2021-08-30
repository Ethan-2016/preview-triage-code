<template>
  <div id="triage-config" class="flex-block">
    <div class="block1">
      <div class="top-tool" style="display: none">
        <div class="tool-item">
          <el-button class="is-hide" type="primary"> 新增 </el-button>
        </div>
      </div>
      <div class="type-area">
        <el-table
          v-loading="tableLoading"
          :data="list"
          border
          :cell-style="typeTableCellStyle"
          @cell-click="typeTableCellClickHandle"
        >
          <el-table-column
            prop="triageConfigTypeName"
            label="名称"
            min-width="100"
          />
        </el-table>
      </div>
    </div>
    <div class="block2">
      <template v-if="list.length > 0">
        <div class="top-tool">
          <div class="tool-item">
            <el-button
              v-if="!isSpecialView"
              type="primary"
              @click="addHandle()"
            >
              新增
            </el-button>
            <el-button v-else type="primary" @click="directionUpdateHandle()">
              保存
            </el-button>
          </div>
        </div>
        <div class="sub-type-area" v-if="!isSpecialView">
          <el-table v-loading="loading" :data="subList" border stripe>
            <el-table-column
              prop="sort"
              label="排序"
              width="55"
              align="center"
            />
            <el-table-column
              prop="triageConfigCode"
              label="代码"
              align="center"
            />
            <el-table-column
              prop="triageConfigName"
              label="名称"
              align="center"
            />
            <el-table-column
              prop="remark"
              label="描述"
              align="center"
              show-overflow-tooltip
            />

            <el-table-column
              prop="isDisable"
              label="是否启用"
              width="100"
              align="center"
            >
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.isDisable"
                  :active-value="1"
                  :inactive-value="0"
                  active-color="#1BAD96"
                  inactive-color="#DCDFE6"
                  @change="switchChange(scope)"
                />
              </template>
            </el-table-column>
            <el-table-column label="操作" width="160" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="editHandle(scope.row)">
                  编辑
                </el-button>
                <el-button
                  type="text"
                  @click="removeHandle(scope.row)"
                  style="color: red"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="sub-type-area" v-else>
          <el-row v-loading="loading" :gutter="20" v-show="subList.length > 0">
            <el-col :span="2">
              <p class="triage-level is-hide" style="margin-bottom: 28px">
                等级
              </p>
              <p class="triage-level-select">分诊去向</p>
              <p class="triage-level-select">其他去向</p>
            </el-col>
            <el-col :span="4" v-for="item in subList" :key="item.id">
              <p
                class="triage-level level1"
                :style="{
                  'background-color': getTriageLevelBgColor(
                    item.triageConfigCode
                  ),
                }"
              >
                {{ item.remark }}
              </p>
              <el-select
                v-model="item.triageDirectionCode"
                :disabled="item.triageConfigCode === 'TriageLevel_005'"
                size="mini"
                class="triage-level-select"
                style="width: 100%"
                @change="selChange"
              >
                <el-option
                  v-for="option in TriageDirectionOptions"
                  :key="option.triageConfigCode"
                  :value="option.triageConfigCode"
                  :label="option.triageConfigName"
                >
                  {{ option.triageConfigName }}
                </el-option>
              </el-select>
              <el-select
                v-model="item.otherDirectionCode"
                :disabled="item.triageConfigCode === 'TriageLevel_005'"
                size="mini"
                class="triage-level-select"
                style="width: 100%"
                @change="selChange"
              >
                <el-option
                  v-for="option in TriageDirectionOptions"
                  :key="option.triageConfigCode"
                  :value="option.triageConfigCode"
                  :label="option.triageConfigName"
                >
                  {{ option.triageConfigName }}
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </div>
      </template>
    </div>

    <!-- 分诊设置子类编辑框 -->
    <el-drawer
      :title="selectedSubType.id ? '编辑' : '新增'"
      :visible.sync="editDialogVisible"
      :loading="loading"
      :size="'20%'"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :append-to-body="true"
      :wrapperClosable="false"
    >
      <el-form
        ref="form"
        :model="selectedSubType"
        :rules="TypeRules"
        size="mini"
        label-position="top"
        label-width="80px"
        style="margin: 0 25px"
      >
        <!-- <el-form-item label="代码" prop="triageConfigCode">
          <el-input
            :disabled="!!selectedSubType.id"
            v-model="selectedSubType.triageConfigCode"
          />
        </el-form-item> -->
        <el-form-item label="名称" prop="triageConfigName">
          <el-input v-model="selectedSubType.triageConfigName" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="selectedSubType.remark" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number
            v-model="selectedSubType.sort"
            :controls="false"
            :step="1"
            :min="0"
            :precision="0"
          />
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch
            v-model="selectedSubType.isDisable"
            :active-value="1"
            :inactive-value="0"
            active-color="#1BAD96"
            inactive-color="#DCDFE6"
          />
        </el-form-item>
      </el-form>
      <p class="drawer-footer" style="display: flex; justify-content: center">
        <el-button type="primary" @click="saveHandle(true)"> 确认 </el-button>
        <el-button @click="editDialogVisible = false">取消</el-button>
      </p>
    </el-drawer>
  </div>
</template>

<script>
import triageConfigApi from "../../../api/triageConfig";
import triageConfigTypeDescriptionApi from "../../../api/triageConfigTypeDescription";
import levelTriageRelationDirectionApi from "../../../api/levelTriageRelationDirection";
// import dataPager from "../../../components/dataPager";

export default {
  name: "triageConfig",
  // components: { dataPager },
  data() {
    return {
      list: [],
      subList: [],
      tableLoading: false,
      loading: false,
      isChange: false,
      selectedType: {},
      editDialogVisible: false,
      selectedSubType: {},
      TypeRules: {
        // triageConfigCode: {
        //   required: true,
        //   message: "代码必填",
        //   trigger: ["change", "blur"],
        // },
        triageConfigName: {
          required: true,
          message: "名称必填",
          trigger: ["change", "blur"],
        },
      },
      TriageDirectionOptions: [],
    };
  },
  computed: {
    isSpecialView: {
      get() {
        return this.selectedType.triageConfigTypeCode === "1007";
      },
    },
  },
  created() {
    this.getData();
    this.getTriageDirectionOptions();
  },
  methods: {
    selChange() {
      this.$forceUpdate();
    },
    getTriageDirectionOptions() {
      this.loading = true;
      triageConfigApi
        .triageConfigList({ TriageConfigType: "1006" })
        .then((res) => {
          if (res.code == 200) {
            this.TriageDirectionOptions = Object.values(res.data)[0];
           
          } else {
            this.$message.error("获取分诊设置子类集合失败" + res.msg);
          }
        })
        .catch((err) => {
          console.error("获取分诊设置子类集合失败原因：" + err);
        });
    },
    getTriageLevelBgColor(triageConfigCode) {
      var color = "#54fac8";
      switch (triageConfigCode) {
        case "TriageLevel_001":
          color = "#fc0100";
          break;
        case "TriageLevel_002":
          color = "#ff7638";
          break;
        case "TriageLevel_003":
          color = "#fec256";
          break;
        case "TriageLevel_004":
          color = "#429f4f";
          break;
        case "TriageLevel_005":
          color = "#54fac8";
          break;
      }
      return color;
    },
    typeTableCellStyle({ row}) {
      if (row.triageConfigTypeCode === this.selectedType.triageConfigTypeCode) {
        return { "background-color": "#ECF5FF", color: "#1BAD96" };
      }
    },
    addHandle() {
      this.selectedSubType = {
        isDisable: 1,
        py: "",
        remark: "",
        sort: 0,
        // triageConfigCode: "",
        triageConfigName: "",
        triageConfigType: this.selectedType.triageConfigTypeCode,
      };
      this.$nextTick(() => {
        this.$refs["form"].clearValidate();
      });
      this.editDialogVisible = true;
    },
    editHandle(row) {
      this.selectedSubType = JSON.parse(JSON.stringify(row));
      this.$nextTick(() => {
        this.$refs["form"].clearValidate();
      });
      this.editDialogVisible = true;
    },
    switchChange(scope) {
      //点击-是否启用
      console.log(scope);
      let _this = this;
      _this.loading = true;
      triageConfigApi
        .updateTriageConfig(scope.row)
        .then((res) => {
          _this.loading = false;
          if (res.code == 200) {
            _this.$message.success("状态更新成功");
            _this.getSubTypeTableHandle(_this.selectedType);
          } else {
            _this.subList[scope.$index].isDisable =
              _this.subList[scope.$index].isDisable === 0 ? 1 : 0;
            _this.$message.error("状态更新失败");
          }
        })
        .catch((err) => {
          _this.loading = false;
          _this.subList[scope.$index].isDisable =
            _this.subList[scope.$index].isDisable === 0 ? 1 : 0;
          console.error("状态更新失败" + err);
        });
    },
    removeHandle(row) {
      this.$confirm("确定要删除该项次吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.loading = true;
          triageConfigApi
            .deleteTriageConfig(row.id)
            .then((res) => {
              if (res.code == 200) {
                this.$message.success("删除成功");
                this.getSubTypeTableHandle(this.selectedType);
              } else {
                this.$message.error("删除分诊设置子类失败" + res.msg);
                this.loading = false;
              }
            })
            .catch((err) => {
              this.loading = false;
              console.error("删除分诊设置子类失败原因：" + err);
            });
        })
        .catch(() => {
          return false;
        });
    },
    typeTableCellClickHandle(row) {
      this.getSubTypeTableHandle(row);
    },
    directionUpdateHandle() {
      var input = this.subList.map((row) => {
        return {
          id: row.levelTriageRelationDirection,
          levelTriageDirectionCode: row.levelTriageDirectionCode,
          // triageLevelCode: row.triageConfigCode,
          triageDirectionCode: row.triageDirectionCode,
          otherDirectionCode: row.otherDirectionCode,
        };
      });
      this.loading = true;
      levelTriageRelationDirectionApi
        .updateLevelTriageRelationDirection(input)
        .then((res) => {
          if (res.code == 200) {
            this.$message.success("更新成功");
          } else {
            this.$message.error(
              "更新" + this.selectedType.triageConfigTypeName + "失败" + res.msg
            );
          }
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          console.error(
            "更新" + this.selectedType.triageConfigTypeName + "失败原因：" + err
          );
        });
    },
    dataHandle(list) {
      this.loading = true;
      levelTriageRelationDirectionApi
        .selectLevelTriageRelationDirection(null)
        .then((res) => {
          if (res.code == 200) {
            for (var i = 0; i < list.length; i++) {
              var item = res.data.find(
                (_) => _.triageLevelCode === list[i].triageConfigCode
              );
              list[i].levelTriageRelationDirection = item.id;
              list[i].levelTriageDirectionCode = item.levelTriageDirectionCode;
              list[i].triageDirectionCode = item.triageDirectionCode;
              list[i].otherDirectionCode = item.otherDirectionCode;
            }
            this.subList = list;
          } else {
            this.$message.error("获取分诊设置子类集合失败" + res.msg);
          }
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          console.error("获取分诊设置子类集合失败原因：" + err);
        });
      this.subList = list;
    },
    getSubTypeTableHandle(row) {
      //更新表格数据
      this.selectedType = row;
      this.subList = [];
      this.loading = true;
      triageConfigApi
        .searchTriageConfigDetail({
          TriageConfigType: row.triageConfigTypeCode,
          SkipCount: 1,
          MaxResultCount: 10000,
        })
        .then((res) => {
          this.loading = false;
          if (res.code == 200) {
            var list = res.data.items;
            this.totalCount = res.data.totalCount;
            if (this.isSpecialView) {
              this.dataHandle(list);
            } else {
              this.subList = list;
            }
          } else {
            this.$message.error("获取分诊设置子类集合失败" + res.msg);
          }
        })
        .catch((err) => {
          this.loading = false;
          console.error("获取分诊设置子类集合失败原因：" + err);
        });
    },
    saveHandle(isShowConfirmDialog) {
      let _this = this;
      _this.$refs["form"].validate((valid) => {
        if (valid) {
          let operation = function () {
            var input = _this.selectedSubType;
            var action = triageConfigApi.updateTriageConfig;
            if (!input.id) {
              action = triageConfigApi.saveTriageConfig;
            }
            _this.loading = true;
            action(input)
              .then((res) => {
                if (res.code == 200) {
                  _this.editDialogVisible = false;
                  _this.$message.success("保存成功");
                  _this.getSubTypeTableHandle(_this.selectedType);
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
                operation();
              })
              .catch(() => {
                return false;
              });
          } else {
            operation();
          }
        }
      });
    },
    getData() {
      this.tableLoading = true;
      this.loading = true;
      triageConfigTypeDescriptionApi
        .triageConfigTypeDescriptionList()
        .then((res) => {
          this.tableLoading = false;
          if (res.code == 200) {
            this.list = res.data;
            if (this.list.length > 0) {
              this.getSubTypeTableHandle(this.list[0]);
            }
          } else {
            this.loading = false;
            this.tableLoading = false;
            this.$message.error("获取分诊设置类别集合失败" + res.msg);
          }
        })
        .catch((err) => {
          this.loading = false;
          this.tableLoading = false;
          console.error("获取分诊设置类别集合失败原因：" + err);
        });
    },
  },
};
</script>
<style lang="scss">
#triage-config {
  height: 100%;
  .block1 {
    .el-table .el-table__header-wrapper th {
      text-align: left;
      font-size: 16px;
      background-color: #ffffff;
      .cell {
        padding-left: 20px;
      }
      &::before {
        content: "";
        width: 4px;
        height: 16px;
        background: #1bad96;
        border-radius: 2px;
        position: absolute;
        top: 12px;
        left: 10px;
      }
    }
    .el-table .cell,
    .el-table--border td:first-child .cell {
      padding-left: 40px;
    }
  }
  .el-row,
  .el-col {
    height: 100%;
  }
  .is-hide {
    opacity: 0;
  }
  // .type-area,
  .sub-type-area {
    margin-top: 15px;
  }
  .type-area {
    height: 100%;
    .el-table {
      height: 100%;
      border: none;
      border-radius: 5px;
      box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
      
    }
  }

  .triage-level {
    width: 100%;
    height: 80px;
    text-align: center;
    line-height: 80px;
    border-radius: 5px;
  }
  .triage-level-select {
    margin-top: 20px;
  }
  .block2 {
    .el-input {
      width: 100%;
    }
  }
}
</style>