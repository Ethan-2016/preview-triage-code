<!--
 * @Author: 吴应
 * @Date: 2021年6月22日16:14:15
 * @LastEditTime: 2021年6月22日16:14:21
 * @LastEditors: Linbaochang
 * @Description: In User Settings Edit
 * @FileName: 快速通道设置
 * @FilePath: src\benchs\previewTriage\views\baseSetting\components\fastChannelSetting.vue
-->
<template>
  <div id="fast-channel-setting" class="block-box">
    <div class="top-action">
      <div>
        关键词：<el-input v-model="PhoneOrName" placeholder="派出所电话/名称" maxlength="50"></el-input>
      </div>
      <div class="btn-list">
        <el-button class="btn-ml active" @click="getFastTrackSetting()">查询</el-button>
        <el-button type="primary" @click="editFastTrackSetting()">新增</el-button>
      </div>
    </div>
    <div class="list-tabel">
      <el-table
        :data="tableData"
        v-loading="loading"
        border
        style="width: 100%"
      >
        <el-table-column prop="fastTrackName" label="派出所名称">
        </el-table-column>
        <el-table-column prop="fastTrackPhone" label="派出所电话">
        </el-table-column>
        <el-table-column label="启用" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="editFastTrackSetting(scope.row, scope.$index, true)"
              v-model="scope.row.isEnable"
              active-color="#1BAD96"
              inactive-color="#DCDFE6"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="editFastTrackSetting(scope.row, scope.$index)"
              >编辑</el-button
            >
            <el-button type="text" @click="deleteFastTrackSetting(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-drawer
      :title="title"
      :size="420"
      :visible.sync="showEditFastChannelManage"
      :wrapperClosable="false"
    >
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="派出所名称：" prop="fastTrackName">
          <el-input v-model="form.fastTrackName" maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="派出所电话：" prop="fastTrackPhone">
          <el-input v-model="form.fastTrackPhone" maxlength="50"></el-input>
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
          <el-button @click="editFastChannelManageClose()">取消</el-button>
          <el-button type="primary" @click="editSubmit">确认</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
import baseSettingApi from "../../../api/baseSettingApi";
export default {
  name: "fastChannelSetting",
  data() {
    return {
      isEnable: false,
      selectIndex: 0,
      PhoneOrName: "",
      loading: true,
      title: "",
      form: {},
      rules: {
        fastTrackName: [
          { required: true, message: "请输入派出所名称", trigger: 'blur' },
        ],
        fastTrackPhone: [
          { required: true, validator: (rule, value, callback) => {
            console.log(/\s+/.test(value))
            if (!value) {
                return callback(new Error('派出所电话必填'));
            }else if(/\s+/.test(value)){
                callback(new Error('不能有空格'));
            }else if(!/(^[0-9]+$)/.test(value)){
                callback(new Error('电话号码为纯数字'));
            }else{
                callback()
            }}, trigger:'blur' },
        ],
      },
      showEditFastChannelManage: false,
      tableData: [],
    };
  },
  created() {
    this.getFastTrackSetting();
  },
  methods: {
    initForm() {
      this.form = {
        isEnable: true,
        sort: 0,
      };
    },
    //删除
    deleteFastTrackSetting(row) {
      this.$confirm("此操作将永久删除该快速通道, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        baseSettingApi
          .deleteFastTrackSetting({ id: row.id })
          .then((res) => {
            if (res.code == 200) {
              this.showEditFastChannelManage = false;
              this.$message.success("删除快速通道成功");
              this.getFastTrackSetting();
            } else {
              this.$message.error("删除快速通道失败" + res.msg);
            }
          })
          .catch((err) => {
            this.$message.error("删除快速通道失败" + err);
            console.error("删除快速通道失败" + err);
          });
      });
    },
    //编辑接口调用
    putFastTrackSetting() {
      this.loading = true;
      baseSettingApi.putFastTrackSetting(this.form).then((res) => {
          this.loading = false;
          if (res.code == 200) {
            this.showEditFastChannelManage = false;
            this.$message.success("修改快速通道成功");
            this.getFastTrackSetting();
            this.tableData[this.selectIndex] = res.data;
          } else {
            this.tableData[this.selectIndex].isEnable =
              !this.tableData[this.selectIndex].isEnable;
            this.$message.error("修改快速通道失败" + res.msg);
          }
        })
        .catch((err) => {
          this.tableData[this.selectIndex].isEnable =
            !this.tableData[this.selectIndex].isEnable;
          this.loading = false;
          this.$message.error("修改快速通道失败" + err);
          console.error("修改快速通道失败" + err);
        });
    },
    //确认编辑
    editSubmit() {
      this.$refs["form"].validate((valid) => {
        console.log(this.form,valid,this.$refs["form"])
        if(!this.form.sort) delete this.form.sort;
        if (valid) {
          if (this.form.id) {
            //编辑
            this.putFastTrackSetting();
          } else {
            console.log('新增')
            //新增
            baseSettingApi.postFastTrackSetting(this.form).then((res) => {
                if (res.code == 200) {
                  this.showEditFastChannelManage = false;
                  this.$message.success("新增快速通道成功");
                  this.getFastTrackSetting();
                } else {
                  this.$message.error("新增快速通道失败" + res.msg);
                }
              }).catch((err) => {
                this.$message.error("新增快速通道失败" + err);
                console.error("新增快速通道失败" + err);
              });
          }
        } else {
          // this.initForm()
          return false;
        }
      });
    },
    //编辑快速通道
    editFastTrackSetting(item, index, isEnable) {
      this.initForm();
      if (isEnable) {
        this.isEnable = isEnable;
        this.selectIndex = index;
        this.form = JSON.parse(JSON.stringify(item));
        this.putFastTrackSetting();
        return;
      }
      if (item) {
        this.selectIndex = index;
        this.form = JSON.parse(JSON.stringify(item));
        this.title = "编辑";
      } else {
        this.title = "新增";
      }
      this.$nextTick(()=>{
        if(this.$refs["form"]){
          this.$refs["form"].clearValidate();
        }
      })
      this.showEditFastChannelManage = true;
    },
    //关闭编辑快速通道
    editFastChannelManageClose() {
      this.initForm()
      this.showEditFastChannelManage = false;
    },
    //获取快速通道列表
    getFastTrackSetting() {
      this.loading = true;
      baseSettingApi
        .getFastTrackSetting({ PhoneOrName: this.PhoneOrName })
        .then((res) => {
          if (res.code == 200) {
            this.loading = false;
            this.tableData = res.data;
          } else {
            this.$message.error("获取快速通道列表失败" + res.msg);
          }
        })
        .catch((err) => {
          this.loading = false;
          this.$message.error("程序运行异常,请联系管理员");
          console.error("获取快速通道列表失败" + err);
        });
    },
  },
};
</script>
<style lang="scss">
#fast-channel-setting {
  .top-action {
    display: flex;
    width: 100%;
    position: relative;
    align-items: center;
    padding-bottom: 12px;
    .btn-list {
      padding-left: 10px;
    }
  }
  
}
</style>
