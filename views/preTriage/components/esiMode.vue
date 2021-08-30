<template>
  <div id="start">
    <div class="scoreCon">
      <div class="start-item">
        <div class="item-left">
          <span>1.病人是否濒危？</span>
        </div>
        <div class="item-right">
          <el-switch
            class="myInput"
            v-model="gistData.esiData.endangered"
            active-color="#1BAD97"
            inactive-color="#ccc"
            @change="changeVal"
          ></el-switch>
          <span style="margin-left: 10px">{{
            gistData.esiData.endangered == true ? "是" : "否"
          }}</span>
        </div>
      </div>
      <div class="start-item" v-show="!gistData.esiData.endangered">
        <div class="item-left">
          <span>2.病人是否不能等？</span>
        </div>
        <div class="item-right">
          <el-switch
            class="myInput"
            v-model="gistData.esiData.wait"
            active-color="#1BAD97"
            inactive-color="#ccc"
            @change="changeVal"
          ></el-switch>
          <span style="margin-left: 10px">{{
            gistData.esiData.wait == true ? "是" : "否"
          }}</span>
        </div>
      </div>
      <div
        class="start-item"
        v-show="!gistData.esiData.endangered && !gistData.esiData.wait"
      >
        <div class="item-left">
          <span>3.急症病人？</span>
        </div>
        <div class="item-right">
          <el-switch
            class="myInput"
            v-model="gistData.esiData.acute"
            active-color="#1BAD97"
            inactive-color="#ccc"
            @change="changeVal"
          ></el-switch>
          <span style="margin-left: 10px">{{
            gistData.esiData.acute == true ? "是" : "否"
          }}</span>
        </div>
      </div>
      <div
        class="start-item"
        v-show="
          gistData.esiData.acute &&
          !gistData.esiData.endangered &&
          !gistData.esiData.wait
        "
      >
        <div class="item-left">
          <span>4.生命体征有误异常？</span>
        </div>
        <div class="item-right">
          <el-switch
            class="myInput"
            v-model="gistData.esiData.abnormal"
            active-color="#1BAD97"
            inactive-color="#ccc"
            @change="changeVal"
          ></el-switch>
          <span style="margin-left: 10px">{{
            gistData.esiData.abnormal == true ? "是" : "否"
          }}</span>
        </div>
      </div>
      <div
        class="table-main"
        v-show="
          gistData.esiData.acute &&
          !gistData.esiData.endangered &&
          !gistData.esiData.wait
        "
      >
        <table align="center">
          <tr>
            <td rowspan="2"></td>
            <td rowspan="2"><3个月</td>
            <td colspan="3">4.生命体征有误异常？3个月-3岁</td>
            <td rowspan="2">3-8月</td>
            <td rowspan="2">>8月</td>
          </tr>
          <tr>
            <td>3-6月</td>
            <td>6-12月</td>
            <td>1-3岁</td>
          </tr>
          <tr>
            <td>心率</td>
            <td>>180或<100</td>
            <td>>160或<90</td>
            <td>>160或<80</td>
            <td>>160或<70</td>
            <td>>140或<60</td>
            <td>>120或<60</td>
          </tr>
          <tr>
            <td>呼吸</td>
            <td>>50或<3</td>
            <td colspan="3">>40或<25</td>
            <td>>30或<20</td>
            <td>>20或<14</td>
          </tr>
          <tr>
            <td>血压</td>
            <td>>85或<65</td>
            <td colspan="3">>90+年龄x2 或 <70+年龄x2</td>
            <td>>30或<20</td>
            <td>>140或<90</td>
          </tr>
          <td><span>指测脉搏血氧饱和度</span></td>
          <td colspan="6"><92%</td>
        </table>
      </div>

      <div
        class="start-item"
        v-show="
          !gistData.esiData.acute &&
          !gistData.esiData.endangered &&
          !gistData.esiData.wait
        "
      >
        <div class="item-left">
          <span
            >5.病人需要多少急诊医疗资源?（放射/实验室检查/专家会诊/心电图等）</span
          >
        </div>
        <div class="item-right">
          <span
            @click="
              gistData.esiData.resource = 'true';
              changeVal();
            "
            class="select-item"
            :class="{ active: gistData.esiData.resource=='true' }"
            >0-1</span
          >
          <span
            @click="
              gistData.esiData.resource = 'false';
              changeVal();
            "
            class="select-item"
            :class="{
              active:
                gistData.esiData.resource !== '' && gistData.esiData.resource=='false',
            }"
            >>=2</span
          >
        </div>
      </div>
      <div class="grade">
        <div class="grade-wrap">
          <div class="grade-title">当前评分分级为:</div>
          <div
            class="grade-con"
            :class="
              gistData.esiData.level == 'I级'
                ? 'grade-color_001'
                : gistData.esiData.level == 'II级'
                ? 'grade-color_002'
                : gistData.esiData.level == 'III级'
                ? 'grade-color_003'
                : gistData.esiData.level == 'IVa级'
                ? 'grade-color_004'
                : gistData.esiData.level == 'IVa级'
                ? 'grade-color_005'
                : ''
            "
          >
            <span>{{ gistData.esiData.level }}</span>
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
      esiData: {
        type: Object,
        scoreType: {
          type: String,
          default: "ESI",
        },
        level: {
          type: String,
          default: "",
        },
        value: {
          type: String,
          default: 0,
        },
        endangered: {
          type: Boolean,
          default: false,
        }, //濒危
        resource: {
          type: Number,
          default: "",
        }, //资源 >=2
        wait: {
          type: Boolean,
          default: false,
        }, //等待
        acute: {
          type: Boolean,
          default: false,
        }, //急症
        abnormal: {
          type: Boolean,
          default: false,
        }, //异常
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
    this.gistData.esiData.time = new Date().getTime();
    this.changeVal();
  },
  methods: {
    changeVal() {
      //濒危
      if (this.gistData.esiData.endangered) {
        this.gistData.esiData.level = "I级";
      } else {
        //等待
        if (this.gistData.esiData.wait) {
          this.gistData.esiData.level = "II级";
        } else {
          //气道
          if (this.gistData.esiData.acute) {
            console.log(this.gistData.esiData.abnormal);
            if (this.gistData.esiData.abnormal) {
              this.gistData.esiData.level = "II级";
            } else {
              this.gistData.esiData.level = "III级";
            }
          } else {
            if (this.gistData.esiData.resource != "") {
              if (this.gistData.esiData.resource=='true') {
                this.gistData.esiData.level = "IVa级";
              } else {
                this.gistData.esiData.level = "III级";
              }
            }
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
  .start-item:nth-of-type(1) {
    // margin-top: 30px;
  }
  .start-item {
    color: #1a1a1a;
    span {
      font-size: 16px;
    }
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 45px;
    border-radius: 8px;
    margin-bottom: 10px;
    .select-item {
      margin-left: 10px;
      display: inline-block;
      width: 40px;
      height: 25px;
      background: #eeeeee;
      border-radius: 5px;
      text-align: center;
      &.active {
        color: #fff;
        background: #1bad96;
      }
    }
  }
  .table-main {
    color: #1a1a1a;
    table {
      border-top: 1px solid #999;
      border-left: 1px solid #999;
      border-spacing: 0; /*去掉单元格间隙*/
      td {
        padding: 10px 10px;
        border-bottom: 1px solid #999;
        border-right: 1px solid #999;
      }
    }
  }
}
</style>