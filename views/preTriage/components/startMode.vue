<template>
  <div id="start">
    <div class="scoreCon">
      <div class="start-item">
        <div class="item-left">
          <span>伤员能否行走</span>
        </div>
        <div class="item-right">
          <el-switch
            class="myInput"
            v-model="gistData.startData.walkVal"
            active-color="#1BAD97"
            inactive-color="#ccc"
            @change="changeVal"
          ></el-switch>
          <span style="margin-left: 10px">{{
            gistData.startData.walkVal == true ? "是" : "否"
          }}</span>
        </div>
      </div>
      <div class="start-item" v-show="!gistData.startData.walkVal">
        <div class="item-left">
          <span>是否还有呼吸</span>
        </div>
        <div class="item-right">
          <el-switch
            class="myInput"
            v-model="gistData.startData.breatheVal"
            active-color="#1BAD97"
            inactive-color="#ccc"
            @change="changeVal"
          ></el-switch>
          <span style="margin-left: 10px">{{
            gistData.startData.breatheVal == true ? "是" : "否"
          }}</span>
        </div>
      </div>
      <div
        class="start-item"
        v-show="gistData.startData.breatheVal && !gistData.startData.walkVal"
      >
        <div class="item-left">
          <span>呼吸频率是否≥30/min</span>
        </div>
        <div class="item-right">
          <el-switch
            class="myInput"
            v-model="gistData.startData.breatheHVal"
            active-color="#1BAD97"
            inactive-color="#ccc"
            @change="changeVal"
          ></el-switch>
          <span style="margin-left: 10px">{{
            gistData.startData.breatheHVal == true ? "是" : "否"
          }}</span>
        </div>
      </div>
      <div
        class="start-item"
        v-show="!gistData.startData.breatheVal && !gistData.startData.walkVal"
      >
        <div class="item-left">
          <span>开放气道,是否有呼吸</span>
        </div>
        <div class="item-right">
          <el-switch
            class="myInput"
            v-model="gistData.startData.airwayVal"
            active-color="#1BAD97"
            inactive-color="#ccc"
            @change="changeVal"
          ></el-switch>
          <span style="margin-left: 10px">{{
            gistData.startData.airwayVal == true ? "是" : "否"
          }}</span>
        </div>
      </div>
      <div
        class="start-item"
        v-show="
          !gistData.startData.breatheHVal &&
          gistData.startData.breatheVal &&
          !gistData.startData.walkVal
        "
      >
        <div class="item-left">
          <span>是否触及脉搏</span>
        </div>
        <div class="item-right">
          <el-switch
            class="myInput"
            v-model="gistData.startData.pulseVal"
            active-color="#1BAD97"
            inactive-color="#ccc"
            @change="changeVal"
          ></el-switch>
          <span style="margin-left: 10px">{{
            gistData.startData.pulseVal == true ? "是" : "否"
          }}</span>
        </div>
      </div>
      <div
        class="start-item"
        v-show="
          gistData.startData.pulseVal &&
          !gistData.startData.walkVal &&
          gistData.startData.breatheVal &&
          !gistData.startData.breatheHVal
        "
      >
        <div class="item-left">
          <span>评估意识状态，能否听命令做简单动作</span>
        </div>
        <div class="item-right">
          <el-switch
            class="myInput"
            v-model="gistData.startData.awarenessVal"
            active-color="#1BAD97"
            inactive-color="#ccc"
            @change="changeVal"
          ></el-switch>
          <span style="margin-left: 10px">{{
            gistData.startData.awarenessVal == true ? "是" : "否"
          }}</span>
        </div>
      </div>
      <div class="grade">
        <div class="grade-wrap">
          <div class="grade-title">当前评分分级为:</div>
          <div
            class="grade-con"
            :class="
              gistData.startData.level == 'I级'
                ? 'grade-color_001'
                : gistData.startData.level == 'II级'
                ? 'grade-color_002'
                : gistData.startData.level == 'III级'
                ? 'grade-color_003'
                : gistData.startData.level == 'IVa级'
                ? 'grade-color_004'
                : gistData.startData.level == 'IVa级'
                ? 'grade-color_005'
                : ''
            "
          >
            <span>{{ gistData.startData.level }}</span>
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
      startData: {
        scoreType: {
          type: String,
          default: "Start",
        },
        type: Object,
        level: {
          type: String,
          default: "",
        },
        walkVal: {
          type: Boolean,
          default: false,
        }, //行走
        pulseVal: {
          type: Boolean,
          default: false,
        }, //脉搏
        breatheVal: {
          type: Boolean,
          default: false,
        }, //呼吸
        breatheHVal: {
          type: Boolean,
          default: false,
        }, //呼吸大于30
        awarenessVal: {
          type: Boolean,
          default: false,
        }, //意识
        airwayVal: {
          type: Boolean,
          default: false,
        }, //气道
      },
    },
  },
  data() {
    return {
      gistData: {},
    };
  },
  created() {
    this.gistData = JSON.parse(JSON.stringify(this.scoreData));
    this.gistData.startData.time = new Date().getTime();
    this.changeVal();
  },
  methods: {
    changeVal() {
      //行走
      if (this.gistData.startData.walkVal) {
        this.gistData.startData.level = "IVa级";
      } else {
        //呼吸
        if (this.gistData.startData.breatheVal) {
          //呼吸大于30/min
          if (this.gistData.startData.breatheHVal) {
            this.gistData.startData.level = "I级";
          } else {
            //脉搏
            if (this.gistData.startData.pulseVal) {
              //意识
              if (this.gistData.startData.awarenessVal) {
                this.gistData.startData.level = "III级";
              } else {
                this.gistData.startData.level = "I级";
              }
            } else {
              this.gistData.startData.level = "I级";
            }
          }
        } else {
          //气道
          if (this.gistData.startData.airwayVal) {
            this.gistData.startData.level = "I级";
          } else {
            this.gistData.startData.level = "死亡";
          }
        }
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
#start {
  color: #1a1a1a;
  .start-item:nth-of-type(1) {
    margin-top: 30px;
  }
  .start-item {
    span {
      font-size: 16px;
    }
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 740px;
    height: 45px;
    background: #f5f5f5;
    border-radius: 8px;
    margin-bottom: 10px;
    padding: 15px;
  }
}
</style>