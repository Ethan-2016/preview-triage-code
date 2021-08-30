<!--
 * @Author: 吴应
 * @Date: 2021年7月4日16:53:15
 * @LastEditTime: 2021年7月4日16:53:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: src\benchs\previewTriage\layout\components\fastChannel.vue
-->
<template>
  <div id="fast-channel">
    <div v-loading="loading">
      <div class="title">宝安公安局特殊人群体检启用“快速通道”登记表</div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="150px"
        class="demo-ruleForm"
      >
        <el-form-item label="姓名" prop="patientName">
          <el-input v-model="ruleForm.patientName" maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio
              :label="o.triageConfigCode"
              v-for="o in options.Sex"
              :key="o.triageConfigCode"
              >{{ o.triageConfigName }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="患者年龄" prop="age">
          <el-input v-model="ruleForm.age" maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="所属派出所及电话"  prop="policeStationId">
          <el-select v-model="ruleForm.policeStationId" placeholder="请选择派出所">
            <el-option
              v-for="o in phoneAndNames"
              :key="o.id"
              :label="o.phoneAndName"
              :value="o.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="警务人员警号" prop="policeCode">
          <el-input v-model="ruleForm.policeCode" maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="警务人员姓名" prop="policeName">
          <el-input v-model="ruleForm.policeName" maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="接诊护士" prop="receptionNurse">
          <el-select
            v-model="ruleForm.receptionNurse"
            placeholder="请选择接诊护士"
            @change="selectChang"
          >
            <el-option
              v-for="o in nursesres"
              :key="o.id"
              :label="o.name"
              :value="o.userName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="ruleForm.remark" maxlength="500"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="close(false)">取消</el-button>
          <el-button type="primary" :disabled="submitDis" @click="submitForm('ruleForm')">{{
            showBtn == 1 ? "提交" : "保存"
          }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import triageApi from "../../api/triageApi";
import commenApi from "../../api/commenApi";
import baseSettingApi from "../../api/baseSettingApi";
export default {
  name: "fastChannel",
  data() {
    return {
      nursesres: [],
      loading: true,
      showBtn: 1,
      phoneAndNames: [],
      options: [],
      ruleForm: {},
      submitDis:false,
      rules: {
        patientName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
        ],
        sex: [
          { required: true, message: "请选择性别", trigger:'blur' },
        ],
        age: [
          { required: true, message: "请输入年龄", trigger: "blur" },
        ],
        policeStationId: [
          { required: true, message: "请选择派出所", trigger: "blur" },
        ],
        policeCode: [
          { required: true, message: "请输入警务人员警号", trigger: "blur" },
        ],
        policeName: [
          { required: true, message: "请输入警务人员姓名", trigger: "blur" },
        ],
        receptionNurse: [
          { required: true, message: "请选择接诊护士", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.triageConfigList();
    this.getFastTrackSetting();
    this.getPagedUsers();
  },
  mounted() {
    this.initRuleForm();
    this.showBtn = 1;
    if (sessionStorage.getItem("fastChannelData")) {
      this.showBtn = 2;
      this.ruleForm = {
        ...this.ruleForm,
        ...JSON.parse(sessionStorage.getItem("fastChannelData")),
      };
      // if (this.ruleForm.policeStationName) {
      //   this.ruleForm.phoneAndName =
      //     this.ruleForm.policeStationName +
      //     ":" +
      //     this.ruleForm.policeStationPhone;
      // }
    }
  },
  methods: {
    //护士选择赋值
    selectChang(e) {
      let obj = this.nursesres.find((o) => {
        return (o.userName = e);
      });
      this.ruleForm.ReceptionNurseName = obj.name;
    },
    //获取派出所
    getFastTrackSetting() {
      baseSettingApi.getFastTrackSetting({IsEnable:true}).then((res) => {
          if (res.code == 200) {
            this.phoneAndNames = res.data;
          } else {
            this.$message.error("获取派出所失败原因：" + res.msg);
          }
        })
        .catch((err) => {
          console.error("获取派出所失败原因：" + err);
        });
    },
    //初始化
    initRuleForm() {
      this.ruleForm = {
        patientName: "",
        sex: "",
        age: "",
        // policeStationName: "",
        // policeStationPhone: "",
        policeStationId:"",//派出所id
        policeName: "",
        policeCode: "",
        receptionNurse: "",
        remark: "",
      };
    },
    //获取护士信息
    getPagedUsers() {
      commenApi.getPagedUsers({
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
    //获取字典
    triageConfigList() {
      triageApi.triageConfigList({
        TriageConfigType: "1015",
      }).then((res) => {
          this.loading = false;
          if (res.code == 200) {
            this.options = res.data;
            let obj = this.options.Sex.find((o) => {
              return o.triageConfigName == this.ruleForm.sex;
            });
            if (obj) {
              this.ruleForm.sex = obj.triageConfigCode;
            }
          } else {
            this.$message.error("获取字典失败原因：" + res.msg);
          }
        })
        .catch((err) => {
          this.loading = false;
          console.error("获取字典失败原因：" + err);
        });
    },
    //提交患者快速通道登记信息
    submitForm(formName) {
      // if (this.ruleForm.phoneAndName) {
      //   this.ruleForm.policeStationName = this.ruleForm.phoneAndName.split(":")[0];
      //   this.ruleForm.policeStationPhone = this.ruleForm.phoneAndName.split(":")[1];
      // }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          
          this.submitDis = true;
          baseSettingApi.saveFastTrackRegisterInfo(this.ruleForm).then((res) => {
              this.submitDis = false;
              if (res.code == 200) {
                console.log(res);
                this.ruleForm = {};
                let path = '/medicalRecord/fastChannelPage'
                if(this.$route.path!=path){
                  this.$router.push({path:path})
                }
                this.$message.success( this.showBtn == 1 ? "提交成功" : "保存成功");
                this.close(true);
                
              } else {
                this.$message.error(this.showBtn == 1 ? "保存失败，原因："+ res.msg : "保存失败，原因：" + res.msg);
              }
            })
            .catch((err) => {
              
              console.error("提交失败原因：" + err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    close(state) {
      this.$emit("drawerClose",state);
    },
  },
};
</script>
<style lang="scss">
#fast-channel {
  display: flex;
  justify-content: center;
  .title {
    text-align: center;
    line-height: 48px;
    color: #1a1a1a;
    font-size: 24px;
    margin-bottom: 20px;
    margin-top: 60px;
  }
  .el-form {
    .el-form-item__content {
      width: 220px;
    }
  }
}
</style>