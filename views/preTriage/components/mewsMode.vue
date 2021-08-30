<template>
  <div id="gcs">
    <div class="scoreCon">
      <div class="score-wrap">
        <div class="con-item one">
          <p>心率</p>
          <div class="item-detail">
            <div
              :class="{
                active: gistData.mewsData.heartRateCode === item.code,
              }"
              @click="
                gistData.mewsData.heartRateVal = item.value;
                gistData.mewsData.heartRateCode = item.code;
                changeVal();
              "
              v-for="item in heartRate"
              :key="item.code"
            >
              <span>{{ item.label }}</span>
            </div>
          </div>
          <div class="integral">
            <span>积分:</span>
            <span>{{ gistData.mewsData.heartRateVal }}</span>
          </div>
        </div>
        <div class="con-item one">
          <p>收缩压</p>
          <div class="item-detail">
            <div
              :class="{ active: gistData.mewsData.systolicCode === item.code }"
              @click="
                gistData.mewsData.systolicVal = item.value;
                gistData.mewsData.systolicCode = item.code;
                changeVal();
              "
              v-for="item in systolicPressure"
              :key="item.code"
            >
              <span>{{ item.label }}</span>
            </div>
          </div>
          <div class="integral">
            <span>积分:</span>
            <span>{{ gistData.mewsData.systolicVal }}</span>
          </div>
        </div>
        <div class="con-item one">
          <p>呼吸频率</p>
          <div class="item-detail">
            <div
              :class="{
                active: gistData.mewsData.respiratoryCode === item.code,
              }"
              @click="
                gistData.mewsData.respiratoryVal = item.value;
                gistData.mewsData.respiratoryCode = item.code;
                changeVal();
              "
              v-for="item in respiratoryRate"
              :key="item.code"
            >
              <span>{{ item.label }}</span>
            </div>
          </div>
          <div class="integral">
            <span>积分:</span>
            <span>{{ gistData.mewsData.respiratoryVal }}</span>
          </div>
        </div>
        <div class="con-item one">
          <p>体温</p>
          <div class="item-detail">
            <div
              :class="{
                active: gistData.mewsData.temperatureCode === item.code,
              }"
              @click="
                gistData.mewsData.temperatureVal = item.value;
                gistData.mewsData.temperatureCode = item.code;
                changeVal();
              "
              v-for="item in temperatures"
              :key="item.code"
            >
              <span>{{ item.label }}</span>
            </div>
          </div>
          <div class="integral">
            <span>积分:</span>
            <span>{{ gistData.mewsData.temperatureVal }}</span>
          </div>
        </div>
        <div class="con-item one">
          <p>意识</p>
          <div class="item-detail">
            <div
              :class="{
                active: gistData.mewsData.consciousnessCode === item.code,
              }"
              @click="
                gistData.mewsData.consciousnessVal = item.value;
                gistData.mewsData.consciousnessCode = item.code;
                changeVal();
              "
              v-for="item in consciousness"
              :key="item.code"
            >
              <span>{{ item.label }}</span>
            </div>
          </div>
          <div class="integral">
            <span>积分:</span>
            <span>{{ gistData.mewsData.consciousnessVal }}</span>
          </div>
        </div>
      </div>

      <div class="total">
        <span>总分:</span>
        <span>{{ gistData.mewsData.value }}</span>
      </div>

      <div class="grade">
        <div class="grade-wrap">
          <div class="grade-title">当前评分分级为:</div>
          <div
            class="grade-con"
            :class="
              gistData.mewsData.level == 'I级'
                ? 'grade-color_001'
                : gistData.mewsData.level == 'II级'
                ? 'grade-color_002'
                : gistData.mewsData.level == 'III级'
                ? 'grade-color_003'
                : gistData.mewsData.level == 'IVa级'
                ? 'grade-color_004'
                : gistData.mewsData.level == 'IVa级'
                ? 'grade-color_005'
                : ''
            "
          >
            <span>{{ gistData.mewsData.level }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    vitalSignInfo: {
      type: Object,
    },
    scoreData: {
      type: Object,
      mewsData: {
        type: Object,
        scoreType: {
          type: String,
          default: "Mews",
        },
        value: {
          type: Number,
          default: 0,
        },
        level: {
          type: String,
          default: "",
        },
        heartRateVal: {
          type: Number,
          default: 0,
        },
        systolicVal: {
          type: Number,
          default: 0,
        },
        respiratoryVal: {
          type: Number,
          default: 0,
        },
        temperatureVal: {
          type: Number,
          default: 0,
        },
        consciousnessVal: {
          type: Number,
          default: 0,
        },
        heartRateCode: {
          type: Number,
          default: -1,
        },
        systolicCode: {
          type: Number,
          default: -1,
        },
        respiratoryCode: {
          type: Number,
          default: -1,
        },
        temperatureCode: {
          type: Number,
          default: -1,
        },
        consciousnessCode: {
          type: Number,
          default: -1,
        },
      },
    },
  },
  data() {
    return {
      gistData: {},
      heartRate: [
        {
          label: "≤40次/分",
          value: 2,
          code: 0,
        },
        {
          label: "41-50次/分",
          value: 1,
          code: 1,
        },
        {
          label: "51-100次/分",
          value: 0,
          code: 2,
        },
        {
          label: "101-110次/分",
          value: 1,
          code: 3,
        },
        {
          label: "111-129次/分",
          value: 2,
          code: 4,
        },
        {
          label: "≥130次/分",
          value: 3,
          code: 5,
        },
      ], //心跳
      systolicPressure: [
        {
          label: "≤70mmHq",
          value: 3,
          code: 0,
        },
        {
          label: "71-80mmHq",
          value: 2,
          code: 1,
        },
        {
          label: "81-100mmHq",
          value: 1,
          code: 2,
        },
        {
          label: "101-199mmHq",
          value: 0,
          code: 3,
        },
        {
          label: "≥200mmHq",
          value: 2,
          code: 4,
        },
      ], //收缩压
      respiratoryRate: [
        {
          label: "<9次/分",
          value: 2,
          code: 0,
        },
        {
          label: "9-14次/分",
          value: 0,
          code: 1,
        },
        {
          label: "15-20次/分",
          value: 1,
          code: 2,
        },
        {
          label: "21-29次/分",
          value: 2,
          code: 3,
        },
        {
          label: "≥30次/分",
          value: 3,
          code: 4,
        },
      ], //呼吸频率
      temperatures: [
        {
          label: "<35℃",
          value: 2,
          code: 0,
        },
        {
          label: "35.0-38.4℃分",
          value: 0,
          code: 1,
        },
        {
          label: "≥38.5℃",
          value: 2,
          code: 2,
        },
      ], //体温
      consciousness: [
        {
          label: "清楚",
          value: 0,
          code: 0,
        },
        {
          label: "对声音有反应",
          value: 1,
          code: 1,
        },
        {
          label: "对疼痛有反应",
          value: 2,
          code: 2,
        },
        {
          label: "无反应",
          value: 3,
          code: 3,
        },
      ], //意识
    };
  },
  created() {
    this.gistData = JSON.parse(JSON.stringify(this.scoreData));
     this.gistData.mewsData.time = new Date().getTime();
    this.vitalSignInfoSetValue();
    this.changeVal();
  },
  methods: {
    // 生命体征关联
    vitalSignInfoSetValue() {
      //呼吸频率
      if (
        this.gistData.mewsData.respiratoryCode == -1 &&
        this.vitalSignInfo.breathRate
      ) {
        if (this.vitalSignInfo.breathRate < 9) {
          this.gistData.mewsData.respiratoryCode = 0;
          this.gistData.mewsData.respiratoryVal = 2;
        } else if (this.vitalSignInfo.breathRate <= 14) {
          this.gistData.mewsData.respiratoryCode = 1;
          this.gistData.mewsData.respiratoryVal = 0;
        } else if (this.vitalSignInfo.breathRate <= 20) {
          this.gistData.mewsData.respiratoryCode = 2;
          this.gistData.mewsData.respiratoryVal = 1;
        } else if (this.vitalSignInfo.breathRate <= 29) {
          this.gistData.mewsData.respiratoryCode = 3;
          this.gistData.mewsData.respiratoryVal = 2;
        } else if (this.vitalSignInfo.breathRate >= 30) {
          this.gistData.mewsData.respiratoryCode = 4;
          this.gistData.mewsData.respiratoryVal = 3;
        }
      }
      //收缩压
      if (this.gistData.mewsData.systolicCode == -1 && this.vitalSignInfo.sbp) {
        if (this.vitalSignInfo.sbp <= 70) {
          this.gistData.mewsData.systolicCode = 0;
          this.gistData.mewsData.systolicVal = 3;
        } else if (this.vitalSignInfo.sbp <= 80) {
          this.gistData.mewsData.systolicCode = 1;
          this.gistData.mewsData.systolicVal = 2;
        } else if (this.vitalSignInfo.sbp <= 100) {
          this.gistData.mewsData.systolicCode = 2;
          this.gistData.mewsData.systolicVal = 1;
        } else if (this.vitalSignInfo.sbp <= 199) {
          this.gistData.mewsData.systolicCode = 3;
          this.gistData.mewsData.systolicVal = 0;
        } else if (this.vitalSignInfo.sbp >= 200) {
          this.gistData.mewsData.systolicCode = 4;
          this.gistData.mewsData.systolicVal = 2;
        }
      }
      //脉搏
      if (
        this.gistData.mewsData.heartRateCode == -1 &&
        this.vitalSignInfo.heartRate
      ) {
        if (this.vitalSignInfo.heartRate <= 40) {
          this.gistData.mewsData.heartRateCode = 0;
          this.gistData.mewsData.heartRateVal = 2;
        } else if (this.vitalSignInfo.heartRate <= 50) {
          this.gistData.mewsData.heartRateCode = 1;
          this.gistData.mewsData.heartRateVal = 1;
        } else if (this.vitalSignInfo.heartRate <= 100) {
          this.gistData.mewsData.heartRateCode = 2;
          this.gistData.mewsData.heartRateVal = 0;
        } else if (this.vitalSignInfo.heartRate <= 110) {
          this.gistData.mewsData.heartRateCode = 3;
          this.gistData.mewsData.heartRateVal = 1;
        } else if (this.vitalSignInfo.heartRate <= 129) {
          this.gistData.mewsData.heartRateCode = 4;
          this.gistData.mewsData.heartRateVal = 2;
        } else if (this.vitalSignInfo.heartRate >= 130) {
          this.gistData.mewsData.heartRateCode = 5;
          this.gistData.mewsData.heartRateVal = 3;
        }
      }
      //体温
      if (
        this.gistData.mewsData.temperatureCode == -1 &&
        this.vitalSignInfo.temp
      ) {
        if (this.vitalSignInfo.temp < 35) {
          this.gistData.mewsData.temperatureCode = 0;
          this.gistData.mewsData.temperatureVal = 2;
        } else if (this.vitalSignInfo.temp <= 38.4) {
          this.gistData.mewsData.temperatureCode = 1;
          this.gistData.mewsData.temperatureVal = 0;
        } else if (this.vitalSignInfo.temp >= 38.5) {
          this.gistData.mewsData.temperatureCode = 2;
          this.gistData.mewsData.temperatureVal = 2;
        }
      }
    },
    //选项选择事件
    changeVal() {
      this.gistData.mewsData.value =
        this.gistData.mewsData.heartRateVal +
        this.gistData.mewsData.systolicVal +
        this.gistData.mewsData.respiratoryVal +
        this.gistData.mewsData.temperatureVal +
        this.gistData.mewsData.consciousnessVal;
      if (this.gistData.mewsData.value) {
        this.setLevel(this.gistData.mewsData.value);
      } else {
        this.gistData.mewsData.level = "";
      }
    },
    //计算分诊等级
    setLevel(val) {
      if (val <= 3) {
        this.gistData.mewsData.level = "IVa级";
      } else if (val == 4) {
        this.gistData.mewsData.level = "III级";
      } else if (val <= 9) {
        this.gistData.mewsData.level = "II级";
      } else {
        this.gistData.mewsData.level = "I级";
      }
    },
    //提交数据
    putScoreData() {
      this.$emit("putScoreData", this.gistData);
    },
  },
};
</script>

<style scoped lang='scss'>
#gcs {
  .scoreCon {
    color: #1a1a1a;
    font-size: 16px;
    .score-wrap {
      display: flex;
      justify-content: space-between;
      margin-top: 21px;
      position: relative;
      .con-item {
        padding-right: 8px;
        border-right: 1px solid #e5e5e5;
        height: 290px;
        position: relative;
        p {
          display: flex;
          justify-content: center;
          width: 100%;
          color: #1a1a1a;
          font-weight: bold;
          padding-bottom: 15px;
        }
        .item-detail {
          div {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 10px;
            width: 125px;
            height: 30px;
            border: 1px solid #cccccc;
            border-radius: 6px;
          }
        }
        .integral {
          position: absolute;
          bottom: -40px;
          left: 1px;
          display: flex;
          align-items: center;
          justify-content: center;
          span:nth-of-type(2) {
            padding-left: 5px;
            margin-left: 5px;
            border: 1px solid #d2d2d2;
            width: 76px;
            height: 30px;
            line-height: 30px;
            border-radius: 8px;
            display: inline-block;
          }
        }
      }
      .con-item:last-child {
        div {
          margin-right: 0px;
        }
        padding-right: 0px;

        border: none;
      }
    }
  }

  .one {
    width: 144px;
    .integral {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .active {
    color: #fff;
    background: #1bad97;
    border-color: #1bad97 !important ;
  }
  .total {
    text-align: right;
    margin-right: 20px;
    margin-top: 57px;
    span:nth-of-type(2) {
      border: 1px solid #d2d2d2;
      padding-left: 5px;
      margin-left: 5px;
      border: 1px solid #d2d2d2;
      width: 75px;
      height: 30px;
      line-height: 30px;
      text-align: left;
      border-radius: 8px;
      display: inline-block;
    }
  }
}
</style>