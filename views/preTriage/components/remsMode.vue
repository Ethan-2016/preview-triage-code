<template>
  <div id="rems">
    <!-- REMS模块 -->
    <div class="gcs-wrap">
      <div class="gcs-title">
        <span>GCS:</span>
      </div>
      <div class="gcs-con">
        <div class="item-left">
          <div class="left-title">
            <p>睁眼</p>
          </div>
          <div class="left-con">
            <div
              @click="
                gistData.remsData.remsGcsData.eyesVal = item.value;
                changeClick();
              "
              v-for="item in openEyes"
              :key="item.value"
              :class="{
                active: item.value === gistData.remsData.remsGcsData.eyesVal,
              }"
            >
              {{ item.label }}
            </div>
          </div>
        </div>
        <div class="item-right">
          得分:
          <span>{{ gistData.remsData.remsGcsData.eyesVal }}</span>
        </div>
      </div>
      <div class="gcs-con">
        <div class="item-left">
          <div class="left-title">
            <p>语言</p>
          </div>
          <div class="left-con">
            <div
              @click="
                gistData.remsData.remsGcsData.langVal = item.value;
                changeClick();
              "
              v-for="item in languages"
              :key="item.value"
              :class="{
                active: item.value === gistData.remsData.remsGcsData.langVal,
              }"
            >
              {{ item.label }}
            </div>
          </div>
        </div>
        <div class="item-right">
          得分:
          <span>{{ gistData.remsData.remsGcsData.langVal }}</span>
        </div>
      </div>
      <div class="gcs-con">
        <div class="item-left">
          <div class="left-title">
            <p>运动</p>
          </div>
          <div class="left-con">
            <div
              @click="
                gistData.remsData.remsGcsData.motionVal = item.value;
                changeClick();
              "
              v-for="item in motions"
              :key="item.value"
              :class="{
                active: item.value === gistData.remsData.remsGcsData.motionVal,
              }"
            >
              {{ item.label }}
            </div>
          </div>
        </div>
        <div class="item-right">
          得分:
          <span>{{ gistData.remsData.remsGcsData.motionVal }}</span>
        </div>
      </div>
    </div>
    <div class="gcs-allTotal">
      GCS积分:
      <span>{{ gcsVal }}</span>
    </div>
    <!-- 下面其他内容 -->
    <div class="other-list">
      <div class="gcs-con">
        <div class="item-left">
          <div class="left-title myWidth">
            <p>脉搏次/分</p>
          </div>
          <div class="left-con">
            <div
              @click="
                gistData.remsData.pulseVal = item.value;
                gistData.remsData.pulseCode = item.code;
                changeVal();
              "
              v-for="item in pulseList"
              :key="item.code"
              :class="{ active: item.code === gistData.remsData.pulseCode }"
            >
              {{ item.label }}
            </div>
          </div>
        </div>
        <div class="item-right">
          积分:
          <span>{{ gistData.remsData.pulseVal }}</span>
        </div>
      </div>
      <div class="gcs-con">
        <div class="item-left">
          <div class="left-title myWidth">
            <p>Spo2</p>
          </div>
          <div class="left-con">
            <div
              @click="
                gistData.remsData.spo2Val = item.value;
                gistData.remsData.spo2Code = item.code;
                changeVal();
              "
              v-for="item in Spo2List"
              :key="item.code"
              :class="{ active: item.code === gistData.remsData.spo2Code }"
            >
              {{ item.label }}
            </div>
          </div>
        </div>
        <div class="item-right">
          积分:
          <span>{{ gistData.remsData.spo2Val }}</span>
        </div>
      </div>
      <div class="gcs-con">
        <div class="item-left">
          <div class="left-title myWidth">
            <p>收缩压</p>
          </div>
          <div class="left-con">
            <div
              @click="
                gistData.remsData.shrinkVal = item.value;
                gistData.remsData.shrinkCode = item.code;
                changeVal();
              "
              v-for="item in shrinkList"
              :key="item.code"
              :class="{ active: gistData.remsData.shrinkCode === item.code }"
            >
              {{ item.label }}
            </div>
          </div>
        </div>
        <div class="item-right">
          积分:
          <span>{{ gistData.remsData.shrinkVal }}</span>
        </div>
      </div>
      <div class="gcs-con">
        <div class="item-left">
          <div class="left-title myWidth">
            <p>呼吸频率</p>
          </div>
          <div class="left-con">
            <div
              @click="
                gistData.remsData.breathingVal = item.value;
                gistData.remsData.breathingCode = item.code;
                changeVal();
              "
              v-for="item in breathingList"
              :key="item.code"
              :class="{
                active: item.code === gistData.remsData.breathingCode,
              }"
            >
              {{ item.label }}
            </div>
          </div>
        </div>
        <div class="item-right">
          积分:
          <span>{{ gistData.remsData.breathingVal }}</span>
        </div>
      </div>
      <div class="gcs-con">
        <div class="item-left">
          <div class="left-title myWidth">
            <p>年龄</p>
          </div>
          <div class="left-con">
            <div
              @click="
                gistData.remsData.ageVal = item.value;
                gistData.remsData.ageCode = item.code;
                changeVal();
              "
              v-for="item in agesList"
              :key="item.code"
              :class="{ active: item.code === gistData.remsData.ageCode }"
            >
              {{ item.label }}
            </div>
          </div>
        </div>
        <div class="item-right">
          积分:
          <span>{{ gistData.remsData.ageVal }}</span>
        </div>
      </div>
    </div>
    <div class="total">
      <div>{{ gistData.remsData.hazardRate }}</div>
      <div>
        <span>总积分:</span>
        <span>{{ gistData.remsData.value }}</span>
      </div>
    </div>
    <div class="grade">
      <div class="grade-wrap">
        <div class="grade-title">当前评分分级为:</div>
        <div
          class="grade-con"
          :class="
            gistData.remsData.level == 'I级'
              ? 'grade-color_001'
              : gistData.remsData.level == 'II级'
              ? 'grade-color_002'
              : gistData.remsData.level == 'III级'
              ? 'grade-color_003'
              : gistData.remsData.level == 'IVa级'
              ? 'grade-color_004'
              : gistData.remsData.level == 'IVa级'
              ? 'grade-color_005'
              : ''
          "
        >
          <span>{{ gistData.remsData.level }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    age: {
      type: String,
    },
    vitalSignInfo: {
      type: Object,
    },
    scoreData: {
      type: Object,
      gcsData: {
        type: Object,
        hazardRate: {
          type: String,
          default: "",
        },
        scoreType: {
          type: String,
          default: "GCS",
        },
        value: {
          type: Number,
          default: 0,
        },
        level: {
          type: String,
          default: "",
        },
        eyesVal: {
          type: Number,
          default: 0,
        },
        langVal: {
          type: Number,
          default: 0,
        },
        motionVal: {
          type: Number,
          default: 0,
        },
      },
      remsData: {
        scoreType: {
          type: String,
          default: "Rems",
        },
        type: Object,
        value: {
          type: Number,
          default: 0,
        },
        level: {
          type: String,
          default: "",
        },
        pulseVal: {
          type: Number,
          default: 0,
        },
        ageVal: {
          type: Number,
          default: 0,
        },
        spo2Val: {
          type: Number,
          default: 0,
        },
        shrinkVal: {
          type: Number,
          default: 0,
        },
        breathingVal: {
          type: Number,
          default: 0,
        },
        pulseCode: {
          type: Number,
          default: -1,
        },
        ageCode: {
          type: Number,
          default: -1,
        },
        spo2Code: {
          type: Number,
          default: -1,
        },
        shrinkCode: {
          type: Number,
          default: -1,
        },
        breathingCode: {
          type: Number,
          default: -1,
        },
        remsGcsData: {
          type: Object,
          value: {
            type: Number,
            default: 0,
          },
          eyesVal: {
            type: Number,
            default: 1,
          },
          langVal: {
            type: Number,
            default: 1,
          },
          motionVal: {
            type: Number,
            default: 1,
          },
        },
      },
    },
  },
  data() {
    return {
      gistData: {},
      gcsVal: 3,
      openEyes: [
        {
          label: "无睁眼",
          value: 1,
        },
        {
          label: "疼痛刺激睁眼",
          value: 2,
        },
        {
          label: "语言吩咐睁眼",
          value: 3,
        },
        {
          label: "自发睁眼",
          value: 4,
        },
      ],
      languages: [
        {
          label: "无发音",
          value: 1,
        },
        {
          label: "只能发音",
          value: 2,
        },
        {
          label: "只能说出(不适当)单词",
          value: 3,
        },
        {
          label: "语言错乱",
          value: 4,
        },
        {
          label: "正常交谈",
          value: 5,
        },
      ],
      motions: [
        {
          label: "无反应",
          value: 1,
        },
        {
          label: "异常伸展(去脑状态)",
          value: 2,
        },
        {
          label: "异常屈曲(去皮层状态)",
          value: 3,
        },
        {
          label: "对疼痛刺激屈曲反应",
          value: 4,
        },
        {
          label: "对疼痛刺激定位反应",
          value: 5,
        },
        {
          label: "按吩咐动作",
          value: 6,
        },
      ],
      pulseList: [
        {
          label: "<40次/分",
          code: 1,
          value: 4,
        },
        {
          label: "40-54次/分",
          code: 2,
          value: 3,
        },
        {
          label: "55-69次/分",
          code: 3,
          value: 2,
        },
        {
          label: "70-109次/分",
          code: 4,
          value: 0,
        },
        {
          label: "110-139次/分",
          code: 5,
          value: 2,
        },
        {
          label: "140-179次/分",
          code: 6,
          value: 3,
        },
        {
          label: ">179次/分",
          code: 7,
          value: 4,
        },
      ], //脉搏次数
      Spo2List: [
        {
          label: "<75%",
          code: 1,
          value: 4,
        },
        {
          label: "75-85%",
          code: 2,
          value: 3,
        },
        {
          label: "86-89%",
          code: 3,
          value: 1,
        },
        {
          label: ">89%",
          code: 4,
          value: 0,
        },
      ], //spo2
      shrinkList: [
        {
          label: "70-89nmHg",
          code: 1,
          value: 2,
        },
        {
          label: "90-129nmHg",
          code: 2,
          value: 0,
        },
        {
          label: "130-149nmHg",
          code: 3,
          value: 2,
        },
        {
          label: "150-179nmHg",
          code: 4,
          value: 3,
        },
        {
          label: ">179nmHg",
          code: 5,
          value: 4,
        },
      ], //收缩压
      breathingList: [
        {
          label: "6-9次/分",
          code: 1,
          value: 2,
        },
        {
          label: "10-11次/分",
          code: 2,
          value: 1,
        },
        {
          label: "12-24次/分",
          code: 3,
          value: 0,
        },
        {
          label: "25-34次/分",
          code: 4,
          value: 1,
        },
        {
          label: "35-49次/分",
          code: 5,
          value: 3,
        },
        {
          label: ">49次/分",
          code: 6,
          value: 4,
        },
      ], //呼吸频率
      agesList: [
        {
          label: "<45岁",
          code: 1,
          value: 0,
        },
        {
          label: "45-54岁",
          code: 2,
          value: 2,
        }, //年龄
        {
          label: "55-64岁",
          code: 3,
          value: 3,
        },
        {
          label: "65-74岁",
          code: 4,
          value: 5,
        },
        {
          label: ">74岁",
          code: 5,
          value: 6,
        },
      ],
    };
  },
  created() {
    this.gistData = JSON.parse(JSON.stringify(this.scoreData));
    this.gistData.remsData.time = new Date().getTime();
    this.vitalSignInfoSetValue();
    //若无创伤评分GCS评分，并且有GCS评分，则默认创伤GCS评分为GCS评分。若无GCS评分，则看创伤评分是否已评分，如已评分，回显创伤评分中GCS评分
    if (this.gistData.remsData.level == "") {
      if (this.gistData.gcsData.eyesVal) {
        this.gistData.remsData.remsGcsData.eyesVal =
          this.gistData.gcsData.eyesVal;
      } else if (this.gistData.traumaData.level != "") {
        this.gistData.remsData.remsGcsData.eyesVal =
          this.gistData.traumaData.traumaGcsData.eyesVal;
      }
      if (this.gistData.gcsData.langVal) {
        this.gistData.remsData.remsGcsData.langVal =
          this.gistData.gcsData.langVal;
      } else if (this.gistData.traumaData.level != "") {
        this.gistData.remsData.remsGcsData.langVal =
          this.gistData.traumaData.traumaGcsData.langVal;
      }
      if (this.gistData.gcsData.motionVal) {
        this.gistData.remsData.remsGcsData.motionVal =
          this.gistData.gcsData.motionVal;
      } else if (this.gistData.traumaData.level != "") {
        this.gistData.remsData.remsGcsData.motionVal =
          this.gistData.traumaData.traumaGcsData.motionVal;
      }
      if (this.gistData.gcsData.value) {
        this.gistData.remsData.remsGcsData.value = this.gistData.gcsData.value;
      } else if (this.gistData.traumaData.level != "") {
        this.gistData.remsData.remsGcsData.value =
          this.gistData.traumaData.traumaGcsData.value;
      }
    }

    this.changeVal();
  },
  methods: {
    // 生命体征关联
    vitalSignInfoSetValue() {
      //呼吸频率
      if (
        this.gistData.remsData.breathingCode == -1 &&
        this.vitalSignInfo.breathRate
      ) {
        if (this.vitalSignInfo.breathRate > 49) {
          this.gistData.remsData.breathingCode = 6;
          this.gistData.remsData.breathingVal = 4;
        } else if (this.vitalSignInfo.breathRate >= 35) {
          this.gistData.remsData.breathingCode = 5;
          this.gistData.remsData.breathingVal = 3;
        } else if (this.vitalSignInfo.breathRate >= 25) {
          this.gistData.remsData.breathingCode = 4;
          this.gistData.remsData.breathingVal = 1;
        } else if (this.vitalSignInfo.breathRate >= 12) {
          this.gistData.remsData.breathingCode = 3;
          this.gistData.remsData.breathingVal = 0;
        } else if (this.vitalSignInfo.breathRate >= 10) {
          this.gistData.remsData.breathingCode = 2;
          this.gistData.remsData.breathingVal = 1;
        } else if (
          this.vitalSignInfo.breathRate >= 6 &&
          this.vitalSignInfo.breathRate <= 9
        ) {
          this.gistData.remsData.breathingCode = 1;
          this.gistData.remsData.breathingVal = 2;
        }
      }
      //收缩压
      if (this.gistData.remsData.shrinkCode == -1 && this.vitalSignInfo.sbp) {
        if (this.vitalSignInfo.sbp > 179) {
          this.gistData.remsData.shrinkCode = 5;
          this.gistData.remsData.shrinkVal = 4;
        } else if (this.vitalSignInfo.sbp >= 150) {
          this.gistData.remsData.shrinkCode = 4;
          this.gistData.remsData.shrinkVal = 3;
        } else if (this.vitalSignInfo.sbp >= 130) {
          this.gistData.remsData.shrinkCode = 3;
          this.gistData.remsData.shrinkVal = 2;
        } else if (this.vitalSignInfo.sbp >= 90) {
          this.gistData.remsData.shrinkCode = 2;
          this.gistData.remsData.shrinkVal = 0;
        } else if (
          this.vitalSignInfo.sbp < 90 &&
          this.vitalSignInfo.sbp >= 70
        ) {
          this.gistData.remsData.shrinkCode = 1;
          this.gistData.remsData.shrinkVal = 2;
        }
      }
      //脉搏
      if (
        this.gistData.remsData.pulseCode == -1 &&
        this.vitalSignInfo.heartRate
      ) {
        if (this.vitalSignInfo.heartRate < 40) {
          this.gistData.remsData.pulseCode = 1;
          this.gistData.remsData.pulseVal = 4;
        } else if (this.vitalSignInfo.heartRate <= 54) {
          this.gistData.remsData.pulseCode = 2;
          this.gistData.remsData.pulseVal = 3;
        } else if (this.vitalSignInfo.heartRate <= 69) {
          this.gistData.remsData.pulseCode = 3;
          this.gistData.remsData.pulseVal = 2;
        } else if (this.vitalSignInfo.heartRate <= 109) {
          this.gistData.remsData.pulseCode = 4;
          this.gistData.remsData.pulseVal = 0;
        } else if (this.vitalSignInfo.heartRate <= 139) {
          this.gistData.remsData.pulseCode = 5;
          this.gistData.remsData.pulseVal = 2;
        } else if (this.vitalSignInfo.heartRate <= 179) {
          this.gistData.remsData.pulseCode = 6;
          this.gistData.remsData.pulseVal = 3;
        } else if (this.vitalSignInfo.heartRate > 179) {
          this.gistData.remsData.pulseCode = 7;
          this.gistData.remsData.pulseVal = 4;
        }
      }
      //SPO2
      if (this.gistData.remsData.spo2Code == -1 && this.vitalSignInfo.spO2) {
        if (this.vitalSignInfo.spO2 < 75) {
          this.gistData.remsData.spo2Code = 1;
          this.gistData.remsData.spo2Val = 4;
        } else if (this.vitalSignInfo.spO2 <= 85) {
          this.gistData.remsData.spo2Code = 2;
          this.gistData.remsData.spo2Val = 3;
        } else if (this.vitalSignInfo.spO2 <= 89) {
          this.gistData.remsData.spo2Code = 3;
          this.gistData.remsData.spo2Val = 1;
        } else if (this.vitalSignInfo.spO2 > 89) {
          this.gistData.remsData.spo2Code = 4;
          this.gistData.remsData.spo2Val = 0;
        }
      }
      //年龄
      if (this.age) {
        if (this.age.indexOf("岁")) {
          const age = this.age.split("岁")[0];
          if (this.gistData.remsData.ageCode == -1) {
            if (age < 45) {
              this.gistData.remsData.ageCode = 1;
              this.gistData.remsData.ageVal = 0;
            } else if (age < 54) {
              this.gistData.remsData.ageCode = 2;
              this.gistData.remsData.ageVal = 2;
            } else if (age <= 64) {
              this.gistData.remsData.ageCode = 3;
              this.gistData.remsData.ageVal = 3;
            } else if (age <= 74) {
              this.gistData.remsData.ageCode = 4;
              this.gistData.remsData.ageVal = 5;
            } else if (age > 74) {
              this.gistData.remsData.ageCode = 5;
              this.gistData.remsData.ageVal = 6;
            }
          }
        } else {
          this.gistData.remsData.ageCode = 1;
          this.gistData.remsData.ageVal = 0;
        }
      }
    },
    //rems其他值改变
    changeVal() {
      if (this.gistData.remsData.remsGcsData.value) {
        if (
          3 <= this.gistData.remsData.remsGcsData.value &&
          this.gistData.remsData.remsGcsData.value <= 4
        ) {
          this.gcsVal = 4;
        }
        if (
          5 <= this.gistData.remsData.remsGcsData.value &&
          this.gistData.remsData.remsGcsData.value <= 7
        ) {
          this.gcsVal = 3;
        }
        if (
          8 <= this.gistData.remsData.remsGcsData.value &&
          this.gistData.remsData.remsGcsData.value <= 10
        ) {
          this.gcsVal = 2;
        }
        if (
          11 <= this.gistData.remsData.remsGcsData.value &&
          this.gistData.remsData.remsGcsData.value <= 13
        ) {
          this.gcsVal = 1;
        }
        if (
          14 <= this.gistData.remsData.remsGcsData.value &&
          this.gistData.remsData.remsGcsData.value <= 15
        ) {
          this.gcsVal = 1;
        }
      }

      this.gistData.remsData.value =
        this.gistData.remsData.pulseVal +
        this.gistData.remsData.spo2Val +
        this.gistData.remsData.shrinkVal +
        this.gistData.remsData.breathingVal +
        this.gistData.remsData.ageVal +
        this.gcsVal;
      if (this.gistData.remsData.value) {
        this.setRemsLevel(this.gistData.remsData.value);
        this.setHazardRate(this.gistData.remsData.value);
      } else {
        this.gistData.remsData.level = "";
        this.gistData.remsData.hazardRate = "病死危险率为--";
      }
    },
    //计算rems等级
    setRemsLevel(val) {
      if (val <= 11) {
        this.gistData.remsData.level = "IVa级";
      } else if (val <= 17) {
        this.gistData.remsData.level = "II级";
      } else {
        this.gistData.remsData.level = "I级";
      }
    },
    //计算风险率
    setHazardRate(val) {
      if (val <= 11) {
        this.gistData.remsData.hazardRate = "病死危险率为10%";
      } else if (val <= 15) {
        this.gistData.remsData.hazardRate = "10%<病死危险率<50%";
      } else if (val <= 17) {
        this.gistData.remsData.hazardRate = "病死危险率为50%";
      } else if (val <= 24) {
        this.gistData.remsData.hazardRate = "50%<病死危险率<100%";
      } else {
        this.gistData.remsData.hazardRate = "病死危险率为100%";
      }
    },
    //GCS值改变
    changeClick() {
      this.gistData.remsData.remsGcsData.value =
        this.gistData.remsData.remsGcsData.eyesVal +
        this.gistData.remsData.remsGcsData.langVal +
        this.gistData.remsData.remsGcsData.motionVal;
      if (
        this.gistData.remsData.remsGcsData.value >= 1 &&
        this.gistData.remsData.remsGcsData.value <= 4
      ) {
        this.gistData.remsData.remsGcsData.value = 4;
      }
      this.changeVal();
    },
    //提交数据
    putScoreData() {
      this.$emit("putScoreData", this.gistData);
    },
  },
};
</script>
<style lang='scss' scoped>
#rems {
  font-size: 16px;
  .gcs-title {
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .gcs-con {
    margin-bottom: 10px;
    color: #1a1a1a;
    display: flex;
    justify-content: space-between;
    align-items: center;

    border-radius: 8px;
    .item-left {
      .left-title {
        p {
          color: #1a1a1a;
          font-weight: bold;
        }
      }
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-left: 20px;
      .left-con {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        div {
          box-sizing: border-box;
          margin-left: 15px;
          padding: 8px 10px;
          border-radius: 8px;
          border: 1px solid #d2d2d2;
          padding: 5px;
        }
      }
    }
    .item-right {
      display: flex;
      align-items: center;

      span {
        display: inline-block;
        width: 50px;
        height: 30px;
        line-height: 30px;
        border-radius: 6px;
        text-indent: 10px;
        border: 1px solid #d2d2d2;
        margin-left: 10px;
      }
    }
    .active {
      background: #1bad97;
      border-color: #1bad97 !important ;
      color: #fff;
    }
  }
  .myWidth {
    width: 74px;
    text-align: right;
  }
  .gcs-allTotal {
    margin-top: 17px;
    margin-bottom: 17px;
    text-align: right;

    span {
      display: inline-block;
      width: 50px;
      height: 30px;
      line-height: 30px;
      border-radius: 6px;

      text-align: left;
      border: 1px solid #d2d2d2;
      text-indent: 6px;
    }
  }
  .total {
    display: flex;
    justify-content: flex-end;
    margin-top: 27px;
    color: #000;
    > div {
      span:nth-of-type(2) {
        display: inline-block;
        width: 50px;
        height: 30px;
        line-height: 30px;
        border-radius: 6px;
        text-indent: 10px;
        border: 1px solid #d2d2d2;
        margin-left: 10px;
      }
    }
    > div:nth-of-type(1) {
      margin-right: 30px;
      font-size: 18px;
      line-height: 30px;
    }
  }
}
</style>