<!--
 * @Author: 吴应
 * @Date: 2021年6月22日16:14:15
 * @LastEditTime: 2021年6月22日16:14:21
 * @LastEditors: Linbaochang
 * @Description: In User Settings Edit
 * @FileName: 分诊知识库
 * @FilePath: src\benchs\previewTriage\views\baseSetting\components\scoreManage.vue
-->
<template>
  <div id="score-manage">
    <p><el-button type="primary" @click="editScoreManage">新增</el-button></p>
    <div class="list-tabele">
      <el-table
        :data="tableData"
        v-loading="loading"
        border
        style="width: 100%"
      >
        <el-table-column prop="scoreName" label="名称"> </el-table-column>
        <el-table-column prop="scoreType" label="类型"> </el-table-column>
        <el-table-column label="启用" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isEnable"
              active-color="#1BAD96"
              inactive-color="#DCDFE6"
              @change="enableScoreManage(scope)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="editScoreManage(scope.row)"
              >编辑</el-button
            >
            <el-button type="text" @click="deleteScoreManage(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-drawer
      :title="title"
      :size="360"
      :visible.sync="showEditScoreManage"
      :wrapperClosable="false"
    >
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="名称" prop="scoreName">
          <el-input v-model="form.scoreName" maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="form.scoreType" placeholder="请选择">
            <el-option
              v-for="item in scoreTypeOption"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="启用">
          <el-switch
            v-model="form.isEnable"
            active-color="#1BAD96"
            inactive-color="#DCDFE6"
          >
          </el-switch>
        </el-form-item>
        <el-form-item>
          <el-button @click="editScoreManageClose()">取消</el-button>
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
  data() {
    return {
      title: "",
      loading: true,
      scoreTypeOption: [
        {
          value: "Ache",
        },
        {
          value: "Mews",
        },
        {
          value: "Rems",
        },
        {
          value: "GCS",
        },
        {
          value: "Trauma",
        },
        {
          value: "Start",
        },
        {
          value: "ESI",
        },
        {
          value: "FALL",
        },
      ],
      form: {},
      rules: {
        scoreName: [{ required: true, message: "请输名称", trigger: "blur" }],
      },
      showEditScoreManage: false,
      tableData: [],
    };
  },
  created() {
    this.getScoreManageList();
    this.initForm();
  },
  methods: {
    initForm() {
      this.form = { scoreName: "", scoreType: "", isEnable: true };
    },
    //启用禁用评分
    enableScoreManage(scope) {
      this.loading = true;
      let row = scope.row;
      let index = scope.$index;
      baseSettingApi
        .enableScoreManage({ id: row.id, isEnable: row.isEnable })
        .then((res) => {
          this.loading = false;
          if (res.code == 200) {
            this.getScoreManageList();
            this.$message.success(row.isEnable ? "启用成功" : "禁用成功");
          } else {
            this.$message.error(
              row.isEnable ? "启用失败" + res.msg : "禁用失败" + res.msg
            );
            // row.isEnable = !row.isEnable;
            this.tableData[index].isDisable = !row.isEnable;
          }
        })
        .catch((err) => {
          this.loading = false;
          this.$message.error(
            row.isEnable ? "启用失败" + err : "禁用失败" + err
          );
          this.tableData[index].isDisable = !row.isEnable;
          // row.isEnable = !row.isEnable;
          console.error("启用失败" + err);
        });
    },
    //删除
    deleteScoreManage(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        baseSettingApi
          .deleteScoreManage(row)
          .then((res) => {
            if (res.code == 200) {
              this.showEditScoreManage = false;
              this.$message.success("删除评分管理成功");
              this.getScoreManageList();
            } else {
              this.$message.error("删除评分管理失败" + res.msg);
            }
          })
          .catch((err) => {
            this.$message.error("删除评分管理失败" + err);
            console.error("删除评分管理失败" + err);
          });
      });
    },
    //确认编辑
    editSubmit() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          if (this.form.id) {
            //编辑
            baseSettingApi
              .editScoreManage(this.form)
              .then((res) => {
                if (res.code == 200) {
                  this.showEditScoreManage = false;
                  this.$message.success("编辑评分管理成功");
                  this.initForm();
                  this.getScoreManageList();
                } else {
                  this.$message.error("编辑评分管理失败" + res.msg);
                }
              })
              .catch((err) => {
                console.error("编辑评分管理失败" + err);
              });
          } else {
            //新增
            baseSettingApi
              .addScoreManage(this.form)
              .then((res) => {
                if (res.code == 200) {
                  this.showEditScoreManage = false;
                  this.$message.success("新增评分管理成功");
                  this.initForm();
                  this.getScoreManageList();
                } else {
                  this.$message.error("新增评分管理失败" + res.msg);
                }
              })
              .catch((err) => {
                console.error("新增评分管理失败" + err);
              });
          }
        } else {
          return false;
        }
      });
    },
    //编辑评分管理
    editScoreManage(item) {
      this.initForm();
      this.title = "新增";
      if (item) {
        this.title = "编辑";
        this.form = JSON.parse(JSON.stringify(item));
      }
      this.$nextTick(() => {
        if (this.$refs["ruleForm"]) {
          this.$refs["ruleForm"].clearValidate();
        }
      });
      this.showEditScoreManage = true;
    },
    //关闭编辑评分管理
    editScoreManageClose() {
      this.showEditScoreManage = false;
      this.initForm();
    },
    //获取评分管理列表
    getScoreManageList() {
      this.loading = true;
      baseSettingApi
        .getScoreManageList()
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
#score-manage {
  .class-list {
    padding: 0 25px;
  }
  .list-tabele {
    margin-top: 10px;
  }
}
</style>
