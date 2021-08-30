<!--
 * @Author: 吴应
 * @Date: 2021年4月19日10:39:30
 * @LastEditTime: 2021年4月19日10:39:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FileName: 群伤事件
 * @FilePath: src\benchs\preHospital\layout\component\groupInjury.vue
-->
<template>
  <div class="group-main" v-loading="loading">
    <div class="input-content">
      <p><i class="required">*</i>事件类型：</p>
      <div class="info-content">
        <span
          v-for="item in injuryTypeOptions"
          :key="item.triageConfigCode"
          :class="{
            'is-type': patientData.groupInjuryTypeCode == item.triageConfigCode,
          }"
          @click="groupInjuryTypeClick(item)"
          >{{ item.triageConfigName }}</span
        >
      </div>
      <p class="info-title">
        <span><i class="required">*</i>事件发生时间：</span>
      </p>
      <div class="info-content">
        <el-date-picker
          class="input-item"
          v-model="patientData.happeningTime"
          type="datetime"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd HH:mm:ss"
        >
        </el-date-picker>
      </div>
      <p>概要说明：</p>
      <div>
        <el-input type="textarea" :rows="2" v-model="patientData.description" maxlength="500">
        </el-input>
      </div>
      <p>详细描述：</p>
      <div>
        <el-input type="textarea" :rows="4" v-model="patientData.remark" maxlength="500">
        </el-input>
      </div>
      <p>群伤患者人数：（人）</p>
      <div class="grade-sty_input info-content">
        <el-input
          v-model="patientData.stLevelCount"
          :disabled="isEdit"
           oninput="value=value.replace(/[^\d]/g,'')"
          min="0"
        >
          <i slot="prefix" class="el-input__icon grade1">I级</i>
        </el-input>
        <el-input
          v-model="patientData.ndLevelCount"
          :disabled="isEdit"
           oninput="value=value.replace(/[^\d]/g,'')"
          min="0"
          maxlength="3"
        >
          <i slot="prefix" class="el-input__icon grade2">II级</i>
        </el-input>
        <el-input
          v-model="patientData.rdLevelCount"
          :disabled="isEdit"
           oninput="value=value.replace(/[^\d]/g,'')"
          min="0"
          maxlength="3"
        >
          <i slot="prefix" class="el-input__icon grade3">III级</i>
        </el-input>
        <el-input
          v-model="patientData.thaLevelCount"
          :disabled="isEdit"
           oninput="value=value.replace(/[^\d]/g,'')"
          min="0"
          maxlength="3"
        >
          <i slot="prefix" class="el-input__icon grade4">IVa级</i>
        </el-input>
        <el-input
          v-model="patientData.thbLevelCount"
          :disabled="isEdit"
           oninput="value=value.replace(/[^\d]/g,'')"
          min="0"
          maxlength="3"
        >
          <i slot="prefix" class="el-input__icon grade5">IVb级</i>
        </el-input>
      </div>
    </div>
    <div class="submit-btn">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="onSubmit">确定</el-button>
    </div>
  </div>
</template>
<script>
import triageApi from "../../../api/triageApi";
import moment from "moment";
export default {
  name: "groupInjury",
  props: ["groupInjuryData"],
  data() {
    return {
      patientData: {
        groupInjuryTypeCode: "",
        happeningTime: "",
        description: "",
        remark: "",
        StartTriageTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"), //分诊开始时间
        TriageUserCode: this.$store.state.app.userInfo.userName,
        TriageUserName: this.$store.state.app.userInfo.name,
        stLevelCount: 0,
        ndLevelCount: 0,
        rdLevelCount: 0,
        thaLevelCount: 0,
        thbLevelCount: 0,
      },
      injuryTypeOptions: [],
      isEdit: false,
      loading: true,
    };
  },
  created() {
    this.triageConfigList();
  },
  mounted() {
    if (this.groupInjuryData) {
      this.patientData = {
        ...this.patientData,
        ...JSON.parse(JSON.stringify(this.groupInjuryData)),
      };
      this.isEdit = true;
    }
    console.log(this.isEdit);
  },
  watch: {
    "patientData.stLevelCount": {
      handler(newVal) {
        this.patientData.stLevelCount = Math.abs(newVal);
      },
    },
    "patientData.ndLevelCount": {
      handler(newVal) {
        this.patientData.ndLevelCount = Math.abs(newVal);
      },
    },
    "patientData.rdLevelCount": {
      handler(newVal) {
        this.patientData.rdLevelCount = Math.abs(newVal);
      },
    },
    "patientData.thaLevelCount": {
      handler(newVal) {
        this.patientData.thaLevelCount = Math.abs(newVal);
      },
    },
    "patientData.thbLevelCount": {
      handler(newVal) {
        this.patientData.thbLevelCount = Math.abs(newVal);
      },
    },
  },
  methods: {
    groupInjuryTypeClick(val) {
      this.patientData.groupInjuryTypeCode = val.triageConfigCode;
    },

    triageConfigList() {
      this.loading = true;
      triageApi
        .triageConfigList({ TriageConfigType: "1002" })
        .then((res) => {
          this.loading = false;
          this.injuryTypeOptions = res.data.GroupInjuryType;
          if (this.groupInjuryData) {
            let item = this.injuryTypeOptions.find((o) => {
              return this.patientData.groupInjuryTypeName == o.triageConfigName;
            });
            this.patientData.groupInjuryTypeCode = item.triageConfigCode;
          }
        })
        .catch((err) => {
          this.loading = false;
          console.log("获取字典失败" + err);
        });
    },
    backFN() {
      this.$emit("backMethod", 0);
    },
    onSubmit() {
      if (!this.patientData.groupInjuryTypeCode) {
        this.$message("请选择事件类型");
        return;
      }
      if (!this.patientData.happeningTime) {
        this.$message("请选择事件发生时间");
        return;
      }
      if (
        this.patientData.ndLevelCount +
          this.patientData.rdLevelCount +
          this.patientData.stLevelCount +
          this.patientData.thaLevelCount +
          this.patientData.thbLevelCount ==
        0
      ) {
        this.$message("请至少添加一位患者");
        return;
      }
      if (this.isEdit) {
        triageApi
          .modifyGroupInjuryRecord(this.patientData)
          .then((res) => {
            if (res.code == 200) {
              this.$message.success("群伤事件修改成功");
              this.$emit("updateMethod");
            } else {
              this.$message.error("群伤事件修改失败:" + res.msg);
            }
          })
          .catch((err) => {
            console.error("群伤事件修改失败" + err);
          });
        return;
      }
      triageApi
        .saveGroupInjuryTriageRecord(this.patientData)
        .then((res) => {
          if (res.code == 200) {
            this.$message.success("群伤事件创建成功");
            this.$emit("updateMethod");
          } else {
            this.$message.error("群伤事件创建失败:" + res.msg);
          }
        })
        .catch((err) => {
          console.log("群伤事件创建失败" + err);
        });
    },
    close() {
      this.$emit("drawerClose");
    },
  },
};
</script>
<style lang="scss">
.group-main {
  height: 100%;
  font-size: 16px;
  color: #000;
  width: 625px;
  .input-content {
    p {
      padding: 10px 0;
    }
    .info-title {
      display: flex;
      align-items: center;
      span {
        width: 50%;
      }
    }
    .info-content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      > span {
        width: 147px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        background: #f5f5f5;
        border-radius: 5px;
        cursor: pointer;
        margin-bottom: 10px;
      }
      > span:hover {
        background-color: #1bad96;
        color: #fff;
      }
      display: flex;
      align-items: center;
      justify-content: space-between;
      .input-item {
        width: 50%;
        .el-input__inner {
          width: 98%;
        }
      }

      .is-type {
        background: #1bad96;
        color: #fff;
      }
    }
    .grade-sty_input {
      > div {
        width: 110px;
      }
      .el-input__inner {
        padding-left: 60px;
      }
      .el-input__prefix {
        left: 0;
        .el-input__icon {
          display: inline-block;
          height: 35px;
          border-radius: 5px 0 0 5px;
          line-height: 35px;
          width: 54px;
          color: #fff;
        }
        .grade1 {
          background-color: #ff0000;
        }
        .grade2 {
          background-color: #ff7639;
        }
        .grade3 {
          background-color: #fec256;
        }
        .grade4 {
          background-color: #429f4f;
        }
        .grade5 {
          background-color: #53fac8;
        }
      }
    }
  }
  .submit-btn {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    .el-button {
      width: 96px;
    }
    .el-button + .el-button {
      margin-left: 20px;
    }
  }
}
.el-drawer__body {
  padding: 0 30px;
}
</style>
