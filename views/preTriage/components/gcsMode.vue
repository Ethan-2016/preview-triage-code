<template>
  <div id="gcs">
    <div class="scoreCon">
      <div class="score-wrap">
        <div class="con-item one">
          <h3>睁眼</h3>
          <div class="item-detail">
            <div
              :class="{ active: gistData.gcsData.eyesVal === item.value }"
              @click="
                gistData.gcsData.eyesVal = item.value;
                changeClick();
              "
              v-for="item in openEyes"
              :key="item.value"
            >
              <span>{{ item.label }}</span>
              <span>({{ item.value }}分)</span>
            </div>
          </div>
          <div class="integral">
            <span>积分:</span>
            <span>{{ gistData.gcsData.eyesVal }}</span>
          </div>
        </div>
        <div class="line"></div>
        <div class="con-item two">
          <h3>语言</h3>
          <div class="item-detail">
            <div
              :class="{ active: gistData.gcsData.langVal === item.value }"
              @click="
                gistData.gcsData.langVal = item.value;
                changeClick();
              "
              v-for="item in languages"
              :key="item.value"
            >
              <span>{{ item.label }}</span>
              <span>({{ item.value }}分)</span>
            </div>
          </div>
          <div class="integral">
            <span>积分:</span>
            <span>{{ gistData.gcsData.langVal }}</span>
          </div>
        </div>
        <div class="line"></div>
        <div class="con-item three">
          <h3>动作</h3>
          <div class="item-detail">
            <div
              :class="{ active: gistData.gcsData.motionVal === item.value }"
              @click="
                gistData.gcsData.motionVal = item.value;
                changeClick();
              "
              v-for="item in motions"
              :key="item.value"
            >
              <span>{{ item.label }}</span>
              <span>({{ item.value }}分)</span>
            </div>
          </div>
          <div class="integral">
            <span>积分:</span>
            <span>{{ gistData.gcsData.motionVal }}</span>
          </div>
        </div>
      </div>
      <div class="des">
        <div class="des-left">
          <span
            >昏迷程度以睁眼．语言．运动三者分数加总来评估，正常人的昏迷指数是满分15分，
            昏迷程度越重者的昏迷指数越低分轻度昏迷:13分到14分。中度昏迷:9-12分。重度昏迷:3-8分。低于3分:因插管气切无法发声的重度昏迷者会有2T的评分。</span
          >
        </div>

        <div class="integral">
          <span>积分:</span>
          <span>{{ gistData.gcsData.value }}</span>
        </div>
      </div>
      <div class="grade">
        <div class="grade-wrap">
          <div class="grade-title">当前评分分级为:</div>
          <div
            class="grade-con"
            :class="
              gistData.gcsData.level == 'I级'
                ? 'grade-color_001'
                : gistData.gcsData.level == 'II级'
                ? 'grade-color_002'
                : gistData.gcsData.level == 'III级'
                ? 'grade-color_003'
                : gistData.gcsData.level == 'IVa级'
                ? 'grade-color_004'
                : gistData.gcsData.level == 'IVa级'
                ? 'grade-color_005'
                : ''
            "
          >
            <span> {{ gistData.gcsData.level }} </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    scoreData: {
      type: Object,
      gcsData: {
        scoreType: {
          type: String,
          default: "GCS",
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
        type: Object,
      },
      traumaData: {
        type: Object,
      },
    },
  },
  data() {
    return {
      gistData: {},
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
    };
  },
  created() {
    this.gistData = JSON.parse(JSON.stringify(this.scoreData));
     this.gistData.gcsData.time = new Date().getTime();
    //gcs未评分，优先回显rems评分中GCS,其次回显创伤评分中GCS
    if (this.gistData.gcsData.level == '') {
      if (this.gistData.remsData.level) {
        this.gistData.gcsData.eyesVal =
          this.gistData.remsData.remsGcsData.eyesVal;
        this.gistData.gcsData.langVal =
          this.gistData.remsData.remsGcsData.langVal;
        this.gistData.gcsData.motionVal =
          this.gistData.remsData.remsGcsData.motionVal;
        this.changeClick();
      } else if (this.gistData.traumaData.level) {
        this.gistData.gcsData.eyesVal =
          this.gistData.traumaData.traumaGcsData.eyesVal;
        this.gistData.gcsData.langVal =
          this.gistData.traumaData.traumaGcsData.langVal;
        this.gistData.gcsData.motionVal =
          this.gistData.traumaData.traumaGcsData.motionVal;
        this.changeClick();
      }
    }
  },
  methods: {
    changeClick() {
      this.gistData.gcsData.value =
        (this.gistData.gcsData.eyesVal == -1
          ? 0
          : this.gistData.gcsData.eyesVal) +
        (this.gistData.gcsData.langVal == -1
          ? 0
          : this.gistData.gcsData.langVal) +
        (this.gistData.gcsData.motionVal == -1
          ? 0
          : this.gistData.gcsData.motionVal);
      this.setLevel(this.gistData.gcsData.value);
    },
    //计算分诊等级
    setLevel(val) {
      if (val == 15) {
        this.gistData.gcsData.level = "IVa级";
      } else if (val >= 13) {
        this.gistData.gcsData.level = "III级";
      } else if (val >= 9) {
        this.gistData.gcsData.level = "II级";
      } else if (val < 3) {
        this.gistData.gcsData.level = "IVa级";
      } else {
        this.gistData.gcsData.level = "I级";
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
      padding-left: 17px;
      padding-right: 47px;
      .con-item {
        height: 370px;

        h3 {
          display: flex;
          justify-content: center;
          width: 100%;
          color: #1a1a1a;
          font-weight: bold;
        }
        .item-detail {
          position: relative;
          div {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            padding: 5px 10px;
            border: 1px solid #ccc;
            border-radius: 6px;
          }
        }
        .integral {
          position: absolute;
          bottom: 10px;
          height: 30px;
          line-height: 30px;
          span:nth-of-type(2) {
            border: 1px solid #d2d2d2;
            padding-left: 5px;
            margin-left: 5px;
            border: 1px solid #d2d2d2;
            width: 76px;
            height: 30px;
            border-radius: 6px;
            line-height: 30px;
            display: inline-block;
          }
        }
      }
      .line {
        height: 263px;
        width: 1px;
        margin-top: 15px;
        background: #e5e5e5;
      }
    }
  }

  .one {
    width: 170px;
    .integral {
      display: flex;
      justify-content: center;
    }
  }
  .two {
    width: 230px;
    .integral {
      display: flex;
      justify-content: center;
    }
  }
  .three {
    width: 230px;
    .integral {
      display: flex;
      justify-content: center;
    }
  }
  .active {
    color: #fff;
    border: none;
    background: #1bad97;
  }
  .des {
    border: 1px solid #d2d2d2;
    padding: 10px;
    margin-top: 17px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 6px;
    padding: 15px;
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