<template>
  <div id="trauma">
    <div class="trauma-wrap">
      <div class="wrap-item myWidth1">
        <div>
          <div class="item-title">呼吸频率</div>
          <div class="item-con">
            <div
              v-for="item in respiratoryRate"
              :key="item.value"
              :class="{
                active: item.value === gistData.traumaData.resRateVal,
              }"
              @click="
                gistData.traumaData.resRateVal = item.value;
                changeVal();
              "
            >
              <span>{{ item.label }}</span>
              <span>({{ item.value }}分)</span>
            </div>
          </div>
        </div>
        <div class="fraction">
          积分:
          <span>{{
            gistData.traumaData.resRateVal == -1
              ? 0
              : gistData.traumaData.resRateVal
          }}</span>
        </div>
      </div>
      <div class="wrap-item myWidth1">
        <div>
          <!-- 加个空div，使上面与下面形成两个div，方便底部布局 -->
          <div class="item-title">呼吸幅度</div>
          <div class="item-con">
            <div
              v-for="item in resRadian"
              :key="item.value"
              :class="{
                active: item.value === gistData.traumaData.resRadianVal,
              }"
              @click="
                gistData.traumaData.resRadianVal = item.value;
                changeVal();
              "
            >
              <span>{{ item.label }}</span>
              <span>({{ item.value }}分)</span>
            </div>
          </div>
        </div>

        <div class="fraction">
          <!-- 分数 -->
          积分:
          <span>{{
            gistData.traumaData.resRadianVal == -1
              ? 0
              : gistData.traumaData.resRadianVal
          }}</span>
        </div>
      </div>
      <div class="wrap-item myWidth1">
        <div class="item-title">收缩压(nmHg)</div>
        <div class="item-con">
          <div
            v-for="item in systolicPressure"
            :key="item.value"
            :class="{
              active: item.value === gistData.traumaData.sysVal,
            }"
            @click="
              gistData.traumaData.sysVal = item.value;
              changeVal();
            "
          >
            <span>{{ item.label }}</span>
            <span>({{ item.value }}分)</span>
          </div>
        </div>

        <div class="fraction">
          <!-- 分数 -->
          积分:
          <span>{{
            gistData.traumaData.sysVal == -1 ? 0 : gistData.traumaData.sysVal
          }}</span>
        </div>
      </div>
      <div class="wrap-item myWidth1">
        <div>
          <div class="item-title">毛细血管充盈度</div>
          <div class="item-con">
            <div
              v-for="item in bloodList"
              :key="item.value"
              :class="{
                active: item.value === gistData.traumaData.bloodVal,
              }"
              @click="
                gistData.traumaData.bloodVal = item.value;
                changeVal();
              "
            >
              <span>{{ item.label }}</span>
              <span>({{ item.value }}分)</span>
            </div>
          </div>
        </div>

        <div class="fraction">
          <!-- 分数 -->
          积分:
          <span>{{
            gistData.traumaData.bloodVal == -1
              ? 0
              : gistData.traumaData.bloodVal
          }}</span>
        </div>
      </div>
      <div class="wrap-item myWidth2">
        <div>
          <div class="item-title">GCS</div>
          <div class="gcs-wrap">
            <div class="gcs-item">
              <div class="item-con-title">睁眼:</div>
              <div class="select">
                <el-select
                  v-model="gistData.traumaData.traumaGcsData.eyesVal"
                  placeholder="请选择"
                  size="medium"
                  @change="changeClick"
                >
                  <el-option
                    v-for="item in openEyes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <div class="fraction-small">
                积分:
                <span>{{ gistData.traumaData.traumaGcsData.eyesVal }}</span>
              </div>
            </div>
            <div class="gcs-item">
              <div class="item-con-title">语言:</div>
              <div class="select">
                <el-select
                  v-model="gistData.traumaData.traumaGcsData.langVal"
                  placeholder="请选择"
                  @change="changeClick"
                  size="medium"
                >
                  <el-option
                    v-for="item in languages"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <div class="fraction-small">
                积分:
                <span>{{ gistData.traumaData.traumaGcsData.langVal }}</span>
              </div>
            </div>
            <div class="gcs-item">
              <div class="item-con-title">运动:</div>
              <div class="select">
                <el-select
                  v-model="gistData.traumaData.traumaGcsData.motionVal"
                  placeholder="请选择"
                  size="medium"
                  @change="changeClick"
                >
                  <el-option
                    v-for="item in motions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <div class="fraction-small">
                积分:
                <span>{{ gistData.traumaData.traumaGcsData.motionVal }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="fraction">
          <!-- 分数 -->
          积分:
          <span>{{ gcsVal }}</span>
        </div>
      </div>
    </div>
    <div class="des">
      <div class="des-left">
        <span
          >总分越小，伤情越重；总分14-16分，生存率96%；总分3-13分，抢救效果显著；
          总分1-3分，死亡率>96%。一般以TS&lt;12分作为重伤标准</span
        >
      </div>

      <div class="integral">
        <span>积分:</span>
        <span>{{ gistData.traumaData.value }}</span>
      </div>
    </div>
    <div class="grade">
      <div class="grade-wrap">
        <div class="grade-title">当前评分分级为:</div>
        <div
          class="grade-con"
          :class="
            gistData.traumaData.level == 'I级'
              ? 'grade-color_001'
              : gistData.traumaData.level == 'II级'
              ? 'grade-color_002'
              : gistData.traumaData.level == 'III级'
              ? 'grade-color_003'
              : gistData.traumaData.level == 'IVa级'
              ? 'grade-color_004'
              : gistData.traumaData.level == 'IVa级'
              ? 'grade-color_005'
              : ''
          "
        >
          <span>{{ gistData.traumaData.level }}</span>
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
      gcsData: {
        type: Object,
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
      traumaData: {
        type: Object,
        value: {
          type: Number,
          default: 0,
        },
        level: {
          type: String,
          default: "",
        },
        resRateVal: {
          type: Number,
          default: -1,
        },
        sysVal: {
          type: Number,
          default: -1,
        },
        resRadianVal: {
          type: Number,
          default: -1,
        },
        bloodVal: {
          type: Number,
          default: -1,
        },
        traumaGcsData: {
          type: Object,
          value: {
            type: Number,
            default: 3,
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
      gcsVal: 1,
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
      respiratoryRate: [
        {
          label: "0",
          value: 0,
        },
        {
          label: "<10",
          value: 1,
        },
        {
          label: "10-24",
          value: 2,
        },
        {
          label: "25-35",
          value: 3,
        },
        {
          label: ">35",
          value: 4,
        },
      ], //呼吸频率
      systolicPressure: [
        {
          label: "0",
          value: 0,
        },
        {
          label: "<50",
          value: 1,
        },
        {
          label: "50-69",
          value: 2,
        },
        {
          label: "70-90",
          value: 3,
        },
        {
          label: ">90",
          value: 4,
        },
      ], //收缩压
      resRadian: [
        {
          label: "浅或困难",
          value: 0,
        },
        {
          label: "正常",
          value: 1,
        },
      ], //呼吸弧度
      bloodList: [
        {
          label: "无",
          value: 0,
        },
        {
          label: "迟缓",
          value: 1,
        },
        {
          label: "正常",
          value: 2,
        },
      ], //毛细血管充盈度
    };
  },
  created() {
    this.gistData = JSON.parse(JSON.stringify(this.scoreData));
     this.gistData.traumaData.time = new Date().getTime();
    this.vitalSignInfoSetValue();
    //若无创伤评分GCS评分，并且有GCS评分，则默认创伤GCS评分为GCS评分。若无GCS评分，则看REMS评分是否已评分，如已评分，回显Rems评分中GCS评分
    if (this.gistData.traumaData.level == "") {
      if (this.gistData.gcsData.eyesVal) {
        this.gistData.traumaData.traumaGcsData.eyesVal =
          this.gistData.gcsData.eyesVal;
      } else if (this.gistData.remsData.level != "") {
        this.gistData.traumaData.traumaGcsData.eyesVal =
          this.gistData.remsData.remsGcsData.eyesVal;
      }
      if (this.gistData.gcsData.langVal) {
        this.gistData.traumaData.traumaGcsData.langVal =
          this.gistData.gcsData.langVal;
      } else if (this.gistData.remsData.level != "") {
        this.gistData.traumaData.traumaGcsData.langVal =
          this.gistData.remsData.remsGcsData.langVal;
      }
      if (this.gistData.gcsData.motionVal) {
        this.gistData.traumaData.traumaGcsData.motionVal =
          this.gistData.gcsData.motionVal;
      } else if (this.gistData.remsData.level != "") {
        this.gistData.traumaData.traumaGcsData.motionVal =
          this.gistData.remsData.remsGcsData.motionVal;
      }
      if (this.gistData.gcsData.value) {
        this.gistData.traumaData.traumaGcsData.value =
          this.gistData.gcsData.value;
      } else if (this.gistData.remsData.level != "") {
        this.gistData.traumaData.traumaGcsData.value =
          this.gistData.remsData.remsGcsData.value;
      }
    }

    this.changeVal();
  },
  methods: {
    // 生命体征关联
    vitalSignInfoSetValue() {
      //呼吸频率
      if (
        this.gistData.traumaData.resRateVal == -1 &&
        this.vitalSignInfo.breathRate
      ) {
        if (this.vitalSignInfo.breathRate == 0) {
          this.gistData.traumaData.resRateVal = 0;
        } else if (this.vitalSignInfo.breathRate < 10) {
          this.gistData.traumaData.resRateVal = 1;
        } else if (this.vitalSignInfo.breathRate <= 24) {
          this.gistData.traumaData.resRateVal = 2;
        } else if (this.vitalSignInfo.breathRate <= 35) {
          this.gistData.traumaData.resRateVal = 3;
        } else if (this.vitalSignInfo.breathRate > 35) {
          this.gistData.traumaData.resRateVal = 4;
        }
      }

      //呼吸频率
      if (this.gistData.traumaData.sysVal == -1 && this.vitalSignInfo.sbp) {
        if (this.vitalSignInfo.sbp == 0) {
          this.gistData.traumaData.sysVal = 0;
        } else if (this.vitalSignInfo.sbp < 50) {
          this.gistData.traumaData.sysVal = 1;
        } else if (this.vitalSignInfo.sbp <= 69) {
          this.gistData.traumaData.sysVal = 2;
        } else if (this.vitalSignInfo.sbp <= 90) {
          this.gistData.traumaData.sysVal = 3;
        } else if (this.vitalSignInfo.sbp > 90) {
          this.gistData.traumaData.sysVal = 4;
        }
      }
    },
    changeVal() {
      if (this.gistData.traumaData.traumaGcsData.value) {
        if (
          this.gistData.traumaData.traumaGcsData.value &&
          this.gistData.traumaData.traumaGcsData.value <= 4
        ) {
          this.gcsVal = 1;
        }
        if (
          5 <= this.gistData.traumaData.traumaGcsData.value &&
          this.gistData.traumaData.traumaGcsData.value <= 7
        ) {
          this.gcsVal = 2;
        }
        if (
          8 <= this.gistData.traumaData.traumaGcsData.value &&
          this.gistData.traumaData.traumaGcsData.value <= 10
        ) {
          this.gcsVal = 3;
        }
        if (
          11 <= this.gistData.traumaData.traumaGcsData.value &&
          this.gistData.traumaData.traumaGcsData.value <= 13
        ) {
          this.gcsVal = 4;
        }
        if (
          14 <= this.gistData.traumaData.traumaGcsData.value &&
          this.gistData.traumaData.traumaGcsData.value <= 15
        ) {
          this.gcsVal = 5;
        }
      }
      this.gistData.traumaData.value =
        (this.gistData.traumaData.bloodVal == -1
          ? 0
          : this.gistData.traumaData.bloodVal) +
        (this.gistData.traumaData.resRadianVal == -1
          ? 0
          : this.gistData.traumaData.resRadianVal) +
        (this.gistData.traumaData.resRateVal == -1
          ? 0
          : this.gistData.traumaData.resRateVal) +
        (this.gistData.traumaData.sysVal == -1
          ? 0
          : this.gistData.traumaData.sysVal) +
        this.gcsVal;
      this.setTraumaLevel(this.gistData.traumaData.value);
    },
    //GCS值改变
    changeClick() {
      this.gistData.traumaData.traumaGcsData.value =
        this.gistData.traumaData.traumaGcsData.eyesVal +
        this.gistData.traumaData.traumaGcsData.langVal +
        this.gistData.traumaData.traumaGcsData.motionVal;
      this.changeVal();
    },
    //计算Trauma等级
    setTraumaLevel(val) {
      if (1 <= val && val <= 3) {
        this.gistData.traumaData.level = "I级";
      } else if (4 <= val && val <= 11) {
        this.gistData.traumaData.level = "II级";
      } else if (12 <= val && val <= 13) {
        this.gistData.traumaData.level = "III级";
      } else if (14 <= val && val <= 16) {
        this.gistData.traumaData.level = "IVa级";
      }
    },
    //提交数据
    putScoreData() {
      this.$emit("putScoreData", this.gistData);
    },
  },
};
</script>

<style lang='scss' scoped>
#trauma {
  font-size: 16px;
  color: #1a1a1a;
  .trauma-wrap {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    .wrap-item {
      .item-title {
        margin-bottom: 18px;
        text-align: center;
        font-weight: bold;
      }
      .item-con {
        div {
          border-radius: 6px;
          width: 120px;
          height: 30px;
          border: 1px solid #cccccc;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 6px 8px;
          margin-bottom: 8px;
        }
      }
      .active {
        border-color: #1bad97 !important;
        color: #fff;
        background: #1bad97;
      }
      .fraction {
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          width: 76px;
          height: 30px;
          line-height: 30px;
          border: 1px solid #d2d2d2;
          border-radius: 8px;
          text-indent: 10px;
          margin-left: 10px;
        }
      }

      .gcs-wrap {
        .gcs-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
          margin-bottom: 18px;
          .item-con-title {
            margin-right: 10px;
          }
          .select {
            width: 170px;

            .el-input {
              width: 180px;
            }
          }
        }
        .fraction-small {
          margin-left: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          span {
            width: 54px;
            height: 30px;
            line-height: 30px;
            border: 1px solid #d2d2d2;
            border-radius: 8px;
            text-indent: 10px;
            margin-left: 10px;
          }
        }
      }
    }

    .myWidth1 {
      width: 155px;
      border-right: 1px solid #e5e5e5;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: column;
    }
    .myWidth2 {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  .des {
    padding: 10px;
    margin-top: 17px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 6px;
    padding: 15px 0;
    .des-left {
      width: 640px;
    }
    .integral {
      margin-left: 30px;
      width: 160px;
      display: flex;
      align-items: center;
      span:nth-of-type(2) {
        margin-left: 20px;
        border: 1px solid #d2d2d2;
        text-indent: 5px;
        border: 1px solid #d2d2d2;
        width: 76px;
        height: 30px;
        line-height: 30px;
        border-radius: 6px;

        display: inline-block;
      }
    }
    margin-bottom: 40px;
  }
}
</style>