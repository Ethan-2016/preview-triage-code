<!--
 * @Author: 吴应
 * @Date: 2021年6月22日16:14:15
 * @LastEditTime: 2021年6月22日16:14:21
 * @LastEditors: Linbaochang
 * @Description: In User Settings Edit
 * @FileName: 分诊知识库
 * @FilePath: src\benchs\previewTriage\views\baseSetting\components\gistReason.vue
-->
<template>
  <div id="gist-reason">
    <p><el-button type="primary" @click="editGistReason">新增</el-button></p>
    <div class="list-tabele">
      <el-table
        :data="gistReasonData"
        border
        stripe
        :highlight-current-row="true"
        style="width: 100%"
      >
        <el-table-column prop="sort"  label="排序" width="55" align="center"></el-table-column>
        <el-table-column prop="itemName" label="名称"> </el-table-column>
        <el-table-column prop="emergencyLevel" label="分级"> </el-table-column>
        <el-table-column label="禁用">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isEnabled"
              active-color="#1BAD96"
              inactive-color="#DCDFE6"
              @change="enabledGistReason(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130">
          <template slot-scope="scope">
            <el-button type="text" @click="editGistReason(scope.row)"
              >编辑</el-button
            >
            <el-button type="text" @click="deleteGistReason(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-drawer :title="title" :size="360" :wrapperClosable="false" :visible.sync="showeditGistReason">
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
        <el-form-item label="分级">
          <el-input
            v-model.number="form.emergencyLevel"
            type="number"
            :min="1"
            :max="5"
            maxlength="1"
          ></el-input>
        </el-form-item>
        <el-form-item label="序号">
          <el-input v-model.number="form.sort"  type="number" :min="0" maxlength="10"></el-input>
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
          <el-button @click="editGistReasonClose()">取消</el-button>
          <el-button type="primary" @click="editSubmit">确认</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
import baseSettingApi from "../../../api/baseSettingApi";
export default {
  name: "scoreManage",
  props: {
    gistReasonData: {
      type: Array,
      default: () => [],
    },
    judgmentMasterId: {
      type: String,
    },
  },
  data() {
    return {
      title: "",
      form: {},
      rules: {
        itemName: [
          { required: true, message: "请输名称", trigger: "blur" },
        ],
      },
      showeditGistReason: false,
      tableData: [],
    };
  },
  methods: {
    initForm() {
      this.form = {
        itemName: "",
        emergencyLevel: 0,
        sort: 0,
        isEnabled: true,
      };
    },
    //启用禁用
    enabledGistReason(row) {
      this.$emit("loadingState", true);
      baseSettingApi
        .editJudgmentItem(row)
        .then((res) => {
          this.$emit("loadingState", false);
          if (res.code == 200) {
            this.showEditCategory = false;
            this.$message.success(
              row.isEnabled ? "启用判定依据项目成功" : "禁用判定依据项目成功"
            );
            this.$emit("refreshTabel");
          } else {
            row.isEnabled = !row.isEnabled;
            this.$message.error(
              row.isEnabled
                ? "启用判定依据项目失败" + res.msg
                : "禁用判定依据项目失败" + res.msg
            );
          }
        })
        .catch((err) => {
          this.$emit("loadingState", false);
          row.isEnabled = !row.isEnabled;
          console.error("启用/禁用判定依据项目失败" + err);
        });
    },
    //删除
    deleteGistReason(row) {
      this.$confirm("此操作将永久删除该判定依据项目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        baseSettingApi
          .deleteJudgmentItem(row)
          .then((res) => {
            if (res.code == 200) {
              this.showeditGistReason = false;
              this.$message.success("删除判定依据项目成功");
              this.$emit("refreshTabel");
            } else {
              this.$message.error("删除判定依据项目失败" + res.msg);
            }
          })
          .catch((err) => {
            console.error("删除判定依据项目失败" + err);
          });
      });
    },
    //确认编辑
    editSubmit() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          if(!this.form.sort) delete this.form.sort;
           this.form.judgmentMasterId = this.judgmentMasterId;
          if (this.form.id) {
            //编辑
            baseSettingApi.editJudgmentItem(this.form).then((res) => {
                if (res.code == 200) {
                  this.showeditGistReason = false;
                  this.$message.success("编辑判定依据项目成功");
                  this.$emit("refreshTabel");
                } else {
                  this.$message.error("编辑判定依据项目失败" + res.msg);
                }
              })
              .catch((err) => {
                console.error("编辑判定依据项目失败" + err);
              });
          } else {
            //新增
            baseSettingApi.addJudgmentItem([this.form]).then((res) => {
                if (res.code == 200) {
                  this.showeditGistReason = false;
                  this.$message.success("新增判定依据项目成功");
                  Object.keys(this.form).forEach(
                    (key) => (this.form[key] = "")
                  );
                  this.$emit("refreshTabel");
                } else {
                  this.$message.error("新增判定依据项目失败" + res.msg);
                }
              })
              .catch((err) => {
                console.error("新增判定依据项目失败" + err);
              });
          }
        } else {
          return false;
        }
      });
    },
    //编辑评分管理
    editGistReason(item) {
      this.initForm();
      this.title = "新增判定依据项目";
      if (item) {
        this.title = "编辑判定依据项目";
        this.form = JSON.parse(JSON.stringify(item));
      }
      this.$nextTick(()=>{
        if(this.$refs["ruleForm"]){
          this.$refs["ruleForm"].clearValidate();
        }
      })
      this.showeditGistReason = true;
    },
    //关闭编辑评分管理
    editGistReasonClose() {
      this.showeditGistReason = false;
      Object.keys(this.form).forEach((key) => (this.form[key] = ""));
    },
  },
};
</script>
<style lang="scss">
#gist-reason {
  .list-tabele {
    margin-top: 10px;
  }
}
</style>
