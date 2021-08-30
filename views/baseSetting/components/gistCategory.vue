<!--
 * @Author: 吴应
 * @Date: 2021年6月22日16:14:15
 * @LastEditTime: 2021年6月22日16:14:21
 * @LastEditors: Linbaochang
 * @Description: In User Settings Edit
 * @FileName: 分诊知识库
 * @FilePath: src\benchs\previewTriage\views\baseSetting\components\gistCategory.vue
-->
<template>
  <div id="gist-category">
    <p>
      <el-button type="primary" @click="editGistCategory">新增</el-button>
    </p>
    <div class="list-tabele">
      <el-table
        :data="tableData"
        border
        stripe
        :highlight-current-row="true"
        style="width: 100%"
      >
        <el-table-column prop="sort"  label="排序" width="55" align="center"></el-table-column>
        <el-table-column label="名称">
          <template slot-scope="scope">
            <div @click="categoryClick(scope.row, scope.$index)">
              {{ scope.row.itemName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="py" label="快捷提示语"> </el-table-column>
        <el-table-column label="启用" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isEnabled"
              active-color="#1BAD96"
              inactive-color="#DCDFE6"
              @change="enabledGistCategory(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="triageDeptName" label="对应科室">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="editGistCategory(scope.row)"
              >编辑</el-button
            >
            <el-button type="text" @click="deleteCategory(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-drawer
      :title="drawerTitle"
      :size="360"
      :visible.sync="showEditCategory"
      :wrapperClosable="false"
    >
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="名称" prop="itemName">
          <el-input v-model="form.itemName" maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="对应科室">
          <el-select v-model="form.triageDeptCode" placeholder="请选择">
            <el-option
              v-for="item in departments"
              :key="item.triageConfigCode"
              :label="item.triageConfigName"
              :value="item.triageConfigCode"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model.number="form.sort" type="number" min="0" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="启用">
          <el-switch
            v-model="form.isEnabled"
            active-color="#1BAD96"
            inactive-color="#DCDFE6"
          >
          </el-switch>
        </el-form-item>
        <el-form-item>
          <el-button @click="editCategoryClose()">取消</el-button>
          <el-button type="primary" @click="editSubmit">确认</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
import baseSettingApi from "../../../api/baseSettingApi";
import triageApi from "../../../api/triageApi";
export default {
  name: "scoreManage",
  props: ["tableData"],
  data() {
    return {
      drawerTitle: "",
      form: {},
      rules: {
        itemName: [{ required: true, message: "请输名称", trigger: "blur" }],
      },
      showEditCategory: false,
      departments: [],
    };
  },
  created() {
    this.initForm();
    this.triageConfigList();
  },
  methods: {
    initForm() {
      this.form = {
        isEnabled: true,
      };
    },
    //获取字典
    triageConfigList() {
      triageApi
        .triageConfigList({
          TriageConfigType: "1005",
        })
        .then((res) => {
          if (res.code == 200) {
            this.departments = res.data.TriageDepartment;
          } else {
            this.$message("获取字典失败原因：" + res.msg);
          }
        })
        .catch((err) => {
          console.error("获取字典失败原因：" + err);
        });
    },
    //点击控制列表切换
    categoryClick(row, index) {
      this.$emit("categoryClick", { row, index: index });
    },
    //删除
    deleteCategory(row) {
      this.$confirm("此操作将永久删除该判定依据类型, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        baseSettingApi
          .deleteCategory({ id: row.id })
          .then((res) => {
            if (res.code == 200) {
              this.showEditCategory = false;
              this.$message.success("删除判定依据类型成功");
              this.$emit("refreshTabel");
            } else {
              this.$message.error("删除判定依据类型失败" + res.msg);
            }
          })
          .catch((err) => {
            this.$message.error("删除判定依据类型失败" + err);
            console.error("删除判定依据类型失败" + err);
          });
      });
    },
    //启用禁用
    enabledGistCategory(row) {
      this.$emit("loadingState", true);
      baseSettingApi
        .editJudgmentType(row)
        .then((res) => {
          this.$emit("loadingState", false);
          if (res.code == 200) {
            this.showEditCategory = false;
            this.$message.success(
              row.isEnabled ? "启用判定依据类型成功" : "禁用判定依据类型成功"
            );
            this.$emit("refreshTabel");
          } else {
            row.isEnabled = !row.isEnabled;
            this.$message.error(
              row.isEnabled
                ? "启用判定依据类型失败" + res.msg
                : "禁用判定依据类型失败" + res.msg
            );
          }
        })
        .catch((err) => {
          this.$emit("loadingState", false);
          row.isEnabled = !row.isEnabled;
          console.error("启用/禁用判定依据类型失败" + err);
        });
    },
    //确认编辑
    editSubmit() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          delete this.form.judgmentMasters;
          delete this.form.py;
          delete this.form.triageDept;
          if(!this.form.sort) delete this.form.sort;
          if (this.form.id) {
            //编辑
            baseSettingApi
              .editJudgmentType(this.form)
              .then((res) => {
                if (res.code == 200) {
                  this.showEditCategory = false;
                  this.$message.success("编辑判定依据类型成功");
                  this.$emit("refreshTabel");
                } else {
                  this.$message.error("编辑判定依据类型失败" + res.msg);
                }
              })
              .catch((err) => {
                console.error("编辑判定依据类型理失败" + err);
              });
          } else {
            //新增
            baseSettingApi
              .addJudgmentType([this.form])
              .then((res) => {
                if (res.code == 200) {
                  this.showEditCategory = false;
                  this.$message.success("新增判定依据类型成功");
                  this.$emit("refreshTabel");
                } else {
                  this.$message.error("新增判定依据类型失败" + res.msg);
                }
              })
              .catch((err) => {
                console.error("新增判定依据类型失败" + err);
              });
          }
        } else {
          return false;
        }
      });
    },
    //编辑分类管理
    editGistCategory(item) {
      this.initForm();
      this.drawerTitle = "新增判定依据类型";
      if (item) {
        this.drawerTitle = "编辑判定依据类型";
        this.form = JSON.parse(JSON.stringify(item));
      }
      this.$nextTick(()=>{
        if(this.$refs["ruleForm"]){
          this.$refs["ruleForm"].clearValidate();
        }
      })
      this.showEditCategory = true;
    },
    //关闭编辑分类管理
    editCategoryClose() {
      this.initForm();
      this.showEditCategory = false;
    },
    //获取分类列表
    judgmentDetailList() {
      baseSettingApi
        .judgmentDetailList()
        .then((res) => {
          if (res.code == 200) {
            this.tableData = res.data;
          } else {
            this.$message.error("获取判定依据类型列表失败" + res.msg);
          }
        })
        .catch((err) => {
          console.error("获取判定依据类型列表失败" + err);
        });
    },
  },
};
</script>
<style lang="scss">
#gist-category {
  .list-tabele {
    margin-top: 10px;
  }
}
</style>
