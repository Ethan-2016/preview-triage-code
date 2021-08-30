<!--
 * @Author: 吴应
 * @Date: 2021年7月8日16:14:23
 * @LastEditTime: 2021年7月8日16:14:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FileName: 分诊查询
 * @FilePath: src\benchs\previewTriage\views\preTriage\components\contactsPerson.vue
-->
<template>
  <div id="contacts-person">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm"
    >
      <el-form-item class="set-lin" label="现病史">
        <el-input type="textarea" v-model="ruleForm.medicalHistory" rows="3" maxlength="500"></el-input>
      </el-form-item>
      <el-form-item class="set-lin" label="既往史">
        <el-input
          type="textarea"
          v-model="ruleForm.pastMedicalHistory"
           rows="3"
           maxlength="500"
        ></el-input>
      </el-form-item>
      <el-form-item class="set-lin" label="个人史">
        <el-checkbox v-model="check" @change="checkboxChange"
          >全选否</el-checkbox
        >
      </el-form-item>
      <el-form-item
        class="set-lin"
        prop="isSoreThroatAndCough"
        label="1、是否咽痛咳嗽？"
      >
        <el-radio-group
          v-model="ruleForm.isSoreThroatAndCough"
          @change="radioChange"
        >
          <el-radio label="true">是</el-radio>
          <el-radio label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="isHot" class="set-lin" label="2、是否发热？">
        <el-radio-group v-model="ruleForm.isHot" @change="radioChange">
          <el-radio label="true">是</el-radio>
          <el-radio label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        prop="isMediumAndHighRisk"
        class="set-lin"
        label="3、是否去过中高风险区？"
      >
        <el-radio-group
          v-model="ruleForm.isMediumAndHighRisk"
          @change="radioChange"
        >
          <el-radio label="true">是</el-radio>
          <el-radio label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        prop="isAggregation"
        class="set-lin"
        label="4、是否聚集性发病？"
      >
        <el-radio-group v-model="ruleForm.isAggregation" @change="radioChange">
          <el-radio label="true">是</el-radio>
          <el-radio label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        class="set-lin"
        label="5、2周内是否接触过中高风险区发热患者？"
        prop="isContactHotPatient"
      >
        <el-radio-group
          v-model="ruleForm.isContactHotPatient"
          @change="radioChange"
        >
          <el-radio label="true">是</el-radio>
          <el-radio label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        class="set-lin"
        label="6、2周内是否接触过确诊新冠阳性患者？"
        prop="isContactNewCoronavirus"
      >
        <el-radio-group
          v-model="ruleForm.isContactNewCoronavirus"
          @change="radioChange"
        >
          <el-radio label="true">是</el-radio>
          <el-radio label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        class="set-lin"
        label="7、最近14天内您是否在集中隔离医学观察场所留观？"
        prop="isFocusIsolated"
      >
        <el-radio-group
          v-model="ruleForm.isFocusIsolated"
          @change="radioChange"
        >
          <el-radio label="true">是</el-radio>
          <el-radio label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        class="set-lin"
        prop="isBeenAbroad"
        label="8、2周内是否有境外旅居史？"
      >
        <el-radio-group v-model="ruleForm.isBeenAbroad" @change="radioChange">
          <el-radio label="true">是</el-radio>
          <el-radio label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label-width="146px"
        v-if="ruleForm.isBeenAbroad === 'true'"
        prop="countrySpecific"
        label="9、具体国家/地区"
      >
        <el-input v-model="ruleForm.countrySpecific" maxlength="200"></el-input>
      </el-form-item>
      <el-form-item
        label-width="146px"
        v-if="ruleForm.isBeenAbroad === 'true'"
        prop="abroadStartTime"
        label="10、境外起止日期"
      >
        <el-date-picker
          v-model="time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          @change="tiemSelect"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item
        label-width="146px"
        v-if="ruleForm.isBeenAbroad === 'true'"
        prop="returnTime"
        label="11、回国日期"
      >
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="ruleForm.returnTime"
          style="width: 100%"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <div class="brn-list">
      <el-button @click="close()">取消</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "contactsPerson",
  props: {
    componentData: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      check: true,
      contactsPersonData: {},
      time: [],
      ruleForm: {},
      rules: {
        isMediumAndHighRisk: [
          { required: true, message: "是否去过中高风险区", trigger: "blur" },
        ],
        isHot: [{ required: true, message: "是否发热", trigger: "blur" }],
        isSoreThroatAndCough: [
          { required: true, message: "是否咽痛咳嗽", trigger: "blur" },
        ],
        isAggregation: [
          { required: true, message: "是否聚集性发病", trigger: "blur" },
        ],
        isContactNewCoronavirus: [
          {
            required: true,
            message: "2周内是否接触过确诊新冠阳性患者",
            trigger: "blur",
          },
        ],
        isContactHotPatient: [
          {
            required: true,
            message: "2周内是否接触过中高风险区发热患者",
            trigger: "blur",
          },
        ],

        isFocusIsolated: [
          {
            required: true,
            message: "最近14天内您是否在集中隔离医学观察场所留观",
            trigger: "blur",
          },
        ],
        isBeenAbroad: [
          {
            required: true,
            message: "2周内是否有境外旅居史",
            trigger: "blur",
          },
        ],
        countrySpecific: {
          required: true,
          message: "具体国家/地区",
          trigger: "blur",
        },
        returnTime: {
          required: true,
          message: "回国日期",
          trigger: "blur",
        },
        abroadStartTime: {
          required: true,
          message: "境外起止日期",
          trigger: "blur",
        },
      },
    };
  },
  watch: {
    "ruleForm.isSoreThroatAndCough": {
      handler(val) {
        if (val == "true") {
          this.check = false;
        }
      },
    },
    "ruleForm.isHot": {
      handler(val) {
        if (val == "true") {
          this.check = false;
        }
      },
    },
    "ruleForm.isMediumAndHighRisk": {
      handler(val) {
        if (val == "true") {
          this.check = false;
        }
      },
    },
    "ruleForm.isAggregation": {
      handler(val) {
        if (val == "true") {
          this.check = false;
        }
      },
    },
    "ruleForm.isContactHotPatient": {
      handler(val) {
        if (val == "true") {
          this.check = false;
        }
      },
    },
    "ruleForm.isContactNewCoronavirus": {
      handler(val) {
        if (val == "true") {
          this.check = false;
        }
      },
    },
    "ruleForm.isFocusIsolated": {
      handler(val) {
        if (val == "true") {
          this.check = false;
        }
      },
    },
    "ruleForm.isBeenAbroad": {
      handler(val) {
        if (val == "true") {
          this.check = false;
        }
      },
    },
    time: {
      handler(val) {
        if (val.length) {
          this.ruleForm.returnTime = this.time[1];
        }
      },
    },
    deep: true,
    immediate: true,
  },
  mounted() {
    this.initRuleForm();
    if (JSON.stringify(this.componentData) !== "{}") {
      this.ruleForm = JSON.parse(JSON.stringify(this.componentData));
      if (this.ruleForm.abroadStartTime) {
        this.time = [
          this.ruleForm.abroadStartTime,
          this.ruleForm.abroadEndTime,
        ];
      }
    }
  },
  methods: {
    initRuleForm() {
      this.ruleForm = {
        medicalHistory: "", //现病史
        pastMedicalHistory: "", //既往史
        isSoreThroatAndCough: "", //是否咽痛咳嗽
        isHot: "", //是否发热
        isMediumAndHighRisk: "", //是否去过中高风险区
        isAggregation: "", //是否聚集性发病
        isContactHotPatient: "", //2周内是否接触过中高风险区发热患者
        isContactNewCoronavirus: "", //2周内是否接触过确诊新冠阳性患者
        isFocusIsolated: "", //最近14天内您是否在集中隔离医学观察场所留观
        isBeenAbroad: "", //2周内是否有境外旅居史
        countrySpecific: "", //具体国家/地区
        abroadStartTime: "", //境外开始日期
        abroadEndTime: "", //境外结束日期
        returnTime: "", //回国日期
      };
    },
    //单选选择事件，处理全选否自动勾选
    radioChange(e) {
      if (e=="false") {
        let obj = JSON.parse(JSON.stringify(this.ruleForm));
        delete obj.medicalHistory;
        delete obj.pastMedicalHistory;
        delete obj.countrySpecific;
        delete obj.returnTime;
        delete obj.abroadStartTime;
        delete obj.abroadEndTime;
        let arr = Object.values(obj);
        let i = arr.findIndex((o) => {
          return o == "true";
        });
        if (i == -1) {
          this.check = true;
        }
      }
    },
    //全否
    checkboxChange() {
      if (this.check) {
        this.ruleForm.isSoreThroatAndCough = "false";
        this.ruleForm.isHot = "false";
        this.ruleForm.isMediumAndHighRisk = "false";
        this.ruleForm.isAggregation = "false";
        this.ruleForm.isContactHotPatient = "false";
        this.ruleForm.isContactNewCoronavirus = "false";
        this.ruleForm.isFocusIsolated = "false";
        this.ruleForm.isBeenAbroad = "false";
      } else {
        this.ruleForm.isSoreThroatAndCough = "";
        this.ruleForm.isHot = "";
        this.ruleForm.isMediumAndHighRisk = "";
        this.ruleForm.isAggregation = "";
        this.ruleForm.isContactHotPatient = "";
        this.ruleForm.isContactNewCoronavirus = "";
        this.ruleForm.isFocusIsolated = "";
        this.ruleForm.isBeenAbroad = "";
      }
    },
    tiemSelect() {
      this.ruleForm.abroadStartTime = this.time[0];
      this.ruleForm.abroadEndTime = this.time[1];
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit("updateMethod", this.ruleForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    close() {
      if (!JSON.stringify(this.contactsPerson) == "{}") {
        this.initRuleForm();
      }
      this.$emit("drawerClose");
    },
  },
};
</script>
<style lang="scss" >
#contacts-person {
  .el-form-item {
    .el-form-item__label {
      text-align: left;
    }
    margin-bottom: 14px;
    .el-input {
      width: 350px;
    }
    .el-date-editor {
      width: 350px !important;
    }
  }
  .set-lin {
    .el-form-item__label,
    .el-form-item__content {
      line-height: 18px;
    }
  }
  .brn-list {
    display: flex;
    justify-content: center;
  }
}
</style>