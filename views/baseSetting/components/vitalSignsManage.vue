<!--
 * @Author: 吴应
 * @Date: 2021年6月22日16:14:15
 * @LastEditTime: 2021年6月22日16:14:21
 * @LastEditors: Linbaochang
 * @Description: In User Settings Edit
 * @FileName: 分诊知识库
 * @FilePath: src\benchs\previewTriage\views\baseSetting\components\vitalSignsManage.vue
-->
<template>
  <div id="vital-signs-manage">
    <el-table :data="tableData" border style="width: 100%" v-loading="loading">
      <el-table-column label="名称">
        <template slot-scope="scope">
          <div class="expression-div">
            <i
              class="el-icon-refresh"
              @click="resetAllExpression(scope.row)"
            ></i
            ><span> {{ scope.row.itemName }} </span>
          </div>
        </template>
      </el-table-column>
      <!-- 
        stLevelExpression I级
        ndLevelExpression II级
        rdLevelExpression III级
        thALevelExpression IVa级
        thBLevelExpression IVb级
       -->
      <el-table-column label="生命体征评级设置">
        <el-table-column label="I级（红区）">
          <template slot-scope="scope">
            <div
              class="expression-div"
              @click="editExpression(scope.row, 'StLevelExpression')"
            >
              {{ scope.row.stLevelExpression }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="II级（红区）">
          <template slot-scope="scope">
            <div
              class="expression-div"
              @click="editExpression(scope.row, 'NdLevelExpression')"
            >
              {{ scope.row.ndLevelExpression }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="III级（黄区）">
          <template slot-scope="scope">
            <div
              class="expression-div"
              @click="editExpression(scope.row, 'RdLevelExpression')"
            >
              {{ scope.row.rdLevelExpression }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="IVa级（绿区）">
          <template slot-scope="scope">
            <div
              class="expression-div"
              @click="editExpression(scope.row, 'ThALevelExpression')"
            >
              {{ scope.row.thALevelExpression }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="IVb级（绿区）">
          <template slot-scope="scope">
            <div
              class="expression-div"
              @click="editExpression(scope.row, 'ThBLevelExpression')"
            >
              {{ scope.row.thBLevelExpression }}
            </div>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <el-drawer :title="itemName" :visible.sync="showEditExpression" :wrapperClosable="false" destroy-on-close="true">
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="判断表达式" prop="levelExpression">
          <el-input
            v-model="form.levelExpression"
            type="textarea"
            :rows="4"
            maxlength="500"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="editExpressionClose()">取消</el-button>
          <el-button type="primary" @click="editSubmit">确认</el-button>
          <el-button @click="resetExpression()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
import baseSettingApi from "../../../api/baseSettingApi";
import ethanRules from "../../../commenJs/ethanRules";
export default {
  name: "scoreManage",
  data() {
    return {
      loading: true,
      form: {
        levelExpression: "",
      },
      saveForm: {},
      activeType: "",
      itemName: "",
      rules: {
        levelExpression: [
          {
            validator: ethanRules.expressionStr,
            trigger: "change",
          },
        ],
      },
      showEditExpression: false,
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
      ],
    };
  },
  created() {
    this.vitalSignExpressionList();
  },
  methods: {
    //点击表达式进行编辑
    editExpression(row, type) {
      console.log(row,type)
      this.showEditExpression = true;
      let str = "";
      switch (type) {
        case "StLevelExpression":
          str = "I级（红区）";
          break;
        case "NdLevelExpression":
          str = "II级（红区）";
          break;
        case "RdLevelExpression":
          str = "III级（黄区）";
          break;
        case "ThALevelExpression":
          str = "IVa级（绿区）";
          break;
        default:
          str = "IVb级（绿区）";
          break;
      }
      this.itemName = row.itemName + "： " + str;
      this.saveForm = row;
      this.activeType = type;
      let name = type.slice(0,1).toLocaleLowerCase() + type.slice(1);
      this.form.levelExpression = row[name];
      console.log(row[name],this.form.levelExpression)
    },
    //确认编辑
    editSubmit() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.saveForm[this.activeType] = this.form.levelExpression;
          baseSettingApi
            .putVitalSignExpression(this.saveForm)
            .then((res) => {
              if (res.code == 200) {
                this.showEditExpression = false;
                this.$message.success("编辑表达式成功");
                this.vitalSignExpressionList();
              } else {
                this.$message.error("编辑表达式失败" + res.msg);
              }
            })
            .catch((err) => {
              console.error("编辑表达式失败" + err);
            });
        } else {
          return false;
        }
      });
    },
    //重置表达式
    resetExpression() {
      this.$confirm("此操作将重置该表达式, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let obj = {
          id: this.saveForm.id,
          level: this.activeType,
        };
        baseSettingApi
          .resetVitalSignExpression(obj)
          .then((res) => {
            if (res.code == 200) {
              this.showEditExpression = false;
              this.$message.success("重置表达式成功");
              this.vitalSignExpressionList();
            } else {
              this.$message.error("重置表达式失败" + res.msg);
            }
          })
          .catch((err) => {
            this.$message.error("重置表达式失败" + err);
            console.error("重置表达式失败" + err);
          });
      });
    },
    //重置整行表达式
    resetAllExpression(row) {
      this.$confirm("此操作将重置"+row.itemName+"表达式, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        baseSettingApi
          .resetAllVitalSignExpression({id:row.id})
          .then((res) => {
            if (res.code == 200) {
              this.showEditExpression = false;
              this.$message.success("重置表达式成功");
              this.vitalSignExpressionList();
            } else {
              this.$message.error("重置表达式失败" + res.msg);
            }
          }).catch((err) => {
            this.$message.error("重置表达式失败" + err);
            console.error("重置表达式失败" + err);
          });
      });
    },
    //关闭编辑表达式管理
    editExpressionClose() {
      this.showEditExpression = false;
      // this.form = {
      //   scoreName: "",
      //   scoreType: "",
      //   dynamicLibraryName: "",
      //   className: "",
      //   isEnable: true,
      // };
    },
    //获取表达式列表
    vitalSignExpressionList() {
      this.loading = true;
      baseSettingApi
        .vitalSignExpressionList()
        .then((res) => {
          this.loading = false;
          if (res.code == 200) {
            this.tableData = res.data;
          } else {
            this.$message.error("获取评分管理列表失败" + res.msg);
          }
        })
        .catch((err) => {
          this.loading = false;
          console.error("获取评分管理列表失败" + err);
        });
    },
  },
};
</script>
<style lang="scss">
#vital-signs-manage {
  .el-table td .cell {
    height: 80px;
    .expression-div {
      width: 100%;
      height: 100%;
      cursor: pointer;
      display: flex;
      align-items: center;
      i {
        margin-right: 20px;
        font-size: 22px;
        color: #abcd96;
      }
    }
  }
}
</style>
