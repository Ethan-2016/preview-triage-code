<template>
  <div id="pain" ref="pain">
    <div class="pain-title">
      <div
        v-for="item in painList"
        :key="item.code"
        :class="{ active: item.code === gistData.acheData.titleCode }"
      >
        <p @click="gistData.acheData.titleCode = item.code">
          <span>{{ item.label }}</span>
          <span v-if="item.code === gistData.acheData.titleCode"></span>
        </p>
      </div>
    </div>

    <div v-if="gistData.acheData.titleCode == 0" class="pain-item">
      <div class="pain-wrap">
        <div class="color-block">
          <span v-for="i in 21" :key="i"></span>
        </div>
        <div class="item-title">
          <div
            :class="`font-color_${index}`"
            v-for="(item, index) in painRage"
            :key="item + index"
          >
            {{ item }}
          </div>
        </div>
        <div class="block">
          <el-slider
            v-model="gistData.acheData.valueNRS"
            :step="1"
            :max="10"
            show-stops
          ></el-slider>
        </div>
        <div class="scale">
          <div class="grades-val" v-for="i in 11" :key="i">
            <div>
              <span>{{ i - 1 }}</span>
            </div>
          </div>
        </div>
        <div class="fraction">
          <div>
            <span>适用对象大于7岁、意识清醒：能有效沟通完整表达的人。</span>
          </div>
          <div>
            分数:<el-input
              v-model="gistData.acheData.valueNRS"
              type="number"
              min="0"
              max="10"
              maxlength="2"
            ></el-input>
          </div>
        </div>
      </div>
    </div>

    <div v-if="gistData.acheData.titleCode == 1" class="pain-item2">
      <div class="pain-wrap">
        <div class="img-list">
          <div class="img-item">
            <img src="../../../static/img/small1.png" alt />
            <span style="color: #33c15f">无痛</span>
          </div>
          <div class="img-item">
            <img src="../../../static/img/small2.png" alt />
            <span style="color: #a2dd2b">微痛</span>
          </div>
          <div class="img-item">
            <img src="../../../static/img/small3.png" alt />
            <span style="color: #f4dc08">有些痛</span>
          </div>
          <div class="img-item">
            <img src="../../../static/img/small4.png" alt />
            <span style="color: #f4ac1e">很痛</span>
          </div>
          <div class="img-item">
            <img src="../../../static/img/small5.png" alt />
            <span style="color: #e7642c">疼痛剧烈</span>
          </div>
          <div class="img-item">
            <img src="../../../static/img/small6.png" alt />
            <span style="color: #dd3231">疼痛难忍</span>
          </div>
        </div>
        <!-- <div class="fps-list">
        <div class="fps-item">
          <div
            v-for="(item, index) in FPSList"
            :key="item + index"
            @click="changeFps(index)"
            :class="{ active: index === fpsIndex }"
          >
            <span>{{ item }}</span>
            <span>({{ index }}分)</span>
          </div>
        </div>
      </div> -->
        <div class="block">
          <el-slider
            v-model="gistData.acheData.valueFPS"
            :step="1"
            :max="10"
            show-stops
          ></el-slider>
        </div>
        <div class="scale">
          <div class="grades-val" v-for="i in 11" :key="i">
            <div>
              <span>{{ i - 1 }}</span>
            </div>
          </div>
        </div>
        <div class="fraction">
          <div>
            <span>大于7岁、意识清醒、不能有效沟通、语言表达困难的人。</span>
          </div>
          <div>
            分数:<el-input
              v-model="gistData.acheData.valueFPS"
              type="number"
              min="0"
              max="10"
              maxlength="2"
            ></el-input>
          </div>
        </div>
      </div>
    </div>
    <div v-if="gistData.acheData.titleCode == 2" class="pain-item3">
      <div class="pain-wrap">
        <div class="flacc-left">
          <div class="left-item">
            <p>面部表情Face</p>
            <div
              v-for="item in faceList"
              :key="item.value"
              :class="{
                active: item.value === gistData.acheData.valueFCItem.faceVal,
              }"
              @click="
                gistData.acheData.valueFCItem.faceVal = item.value;
                itemChange();
              "
            >
              <span>{{ item.label }}</span>
              <span>({{ item.value }}分)</span>
            </div>
          </div>
          <div class="left-item">
            <p>哭闹Cry</p>
            <div
              v-for="item in cryList"
              :key="item.value"
              :class="{
                active: item.value === gistData.acheData.valueFCItem.cryVal,
              }"
              @click="
                gistData.acheData.valueFCItem.cryVal = item.value;
                itemChange();
              "
            >
              <span>{{ item.label }}</span>
              <span>({{ item.value }}分)</span>
            </div>
          </div>
          <div class="left-item">
            <p>腿部活动</p>
            <div
              v-for="item in legActivityList"
              :key="item.value"
              :class="{
                active:
                  item.value === gistData.acheData.valueFCItem.legActivityVal,
              }"
              @click="
                gistData.acheData.valueFCItem.legActivityVal = item.value;
                itemChange();
              "
            >
              <span>{{ item.label }}</span>
              <span>({{ item.value }}分)</span>
            </div>
          </div>
        </div>
        <div class="flacc-right">
          <div class="right-item">
            <p>体位Active</p>
            <div
              v-for="item in positionList"
              :key="item.value"
              :class="{
                active: item.value === gistData.acheData.valueFCItem.posVal,
              }"
              @click="
                gistData.acheData.valueFCItem.posVal = item.value;
                itemChange();
              "
            >
              <span>{{ item.label }}</span>
              <span>({{ item.value }}分)</span>
            </div>
          </div>
          <div class="right-item">
            <p>可安慰度</p>
            <div
              v-for="item in comfortList"
              :key="item.value"
              :class="{
                active: item.value === gistData.acheData.valueFCItem.comVal,
              }"
              @click="
                gistData.acheData.valueFCItem.comVal = item.value;
                itemChange();
              "
            >
              <span>{{ item.label }}</span>
              <span>({{ item.value }}分)</span>
            </div>
          </div>
        </div>
      </div>
      <div class="fraction">
        <div class="remarks">
          <p>
            2个月至7岁、不能有效沟通者(意识障碍、痴呆、为重虚弱者、不能完全表达疼痛)。
          </p>
          <p>
            <span>0~3: 放松舒服</span> <span>4~5: 轻微不适</span>
            <span>6~7: 中度疼痛</span>
            <span>8~10: 严重疼痛，不适 或两者兼有</span>
          </p>
        </div>
        <div>
          分数:<el-input
            v-model="gistData.acheData.valueFC"
            type="number"
            min="0"
            max="10"
            disabled
            maxlength="2"
          ></el-input>
        </div>
      </div>
    </div>
    <div class="grade">
      <div class="grade-wrap">
        <div class="grade-title">当前评分分级为:</div>
        <div
          class="grade-con"
          :class="
            gistData.acheData.level == 'I级'
              ? 'grade-color_001'
              : gistData.acheData.level == 'II级'
              ? 'grade-color_002'
              : gistData.acheData.level == 'III级'
              ? 'grade-color_003'
              : gistData.acheData.level == 'IVa级'
              ? 'grade-color_004'
              : gistData.acheData.level == 'IVa级'
              ? 'grade-color_005'
              : ''
          "
        >
          <span>{{ gistData.acheData.level }}</span>
        </div>
      </div>
    </div>

    <!-- <div class="fraction-flacc" v-if="titleCode == 2"></div> -->
  </div>
</template>

<script>
export default {
  props: {
    scoreData: {
      type: Object,
      acheData: {
        scoreType: {
          type: String,
          default: "Ache",
        },
        type: Object,
        titleCode: {
          type: Number,
          default: 0,
        },
        value: {
          type: String,
          default: 0,
        },
        level: {
          type: String,
          default: "",
        },
        valueFPS: {
          type: Number,
          default: 0,
        },
        valueNRS: {
          type: Number,
          default: 0,
        },
        valueFC: {
          type: Number,
          default: 0,
        },
        valueFCItem: {
          faceVal: {
            type: Number,
            default: -1,
          },
          cryVal: {
            type: Number,
            default: -1,
          },
          posVal: {
            type: Number,
            default: -1,
          },
          comVal: {
            type: Number,
            default: -1,
          },
          legActivityVal: {
            type: Number,
            default: -1,
          },
        },
      },
    },
  },
  data() {
    return {
      gistData: {},
      //标题
      painList: [
        {
          label: "数字评价量表(NRS)",
          code: 0,
        },
        {
          label: "面部表情疼痛量表(FPS)",
          code: 1,
        },
        {
          label: "FLACC SCALE",
          code: 2,
        },
      ],
      //疼痛描述
      painRage: [
        "无痛",
        "有点痛",
        "轻微疼痛",
        "疼痛明显",
        "疼痛严重",
        "巨疼痛",
      ],
      faceList: [
        {
          label: "无特定表情或者笑容",
          value: 0,
        },
        {
          label: "偶尔面部扭曲或皱眉",
          value: 1,
        },
        {
          label: "持续颤抖下巴,紧缩下颚,紧皱眉头",
          value: 2,
        },
      ], //面部表情
      cryList: [
        {
          label: "不哭不闹",
          value: 0,
        },
        {
          label: "呻吟或缀泣,偶尔哭泣,叹息",
          value: 1,
        },
        {
          label: "不断哭泣,尖叫或抽泣,呻吟",
          value: 2,
        },
      ], //哭闹
      positionList: [
        {
          label: "安静平稳,体位正常可顺利移动",
          value: 0,
        },
        {
          label: "急促不安,来回移动紧张,移动犹豫",
          value: 1,
        },
        {
          label: "蜷曲或痉挛,来回摆动,头部左右摇动,搓揉身体某部位",
          value: 2,
        },
      ], //体位
      comfortList: [
        {
          label: "平稳,满足,放松,不要求安慰",
          value: 0,
        },
        {
          label: "可通过偶尔身体接触消除疑虑,分散注意力",
          value: 1,
        },
        {
          label: "安慰有困难",
          value: 2,
        },
      ], //可安慰程度
      legActivityList: [
        {
          label: "正常体委或放松状态",
          value: 0,
        },
        {
          label: "不适，无法休息，肌肉或神经紧张，肢体间断完全伸展",
          value: 1,
        },
        {
          label: "踢或拉直腿，高张力，扩大肢体弯曲/伸展，发抖",
          value: 2,
        },
      ], //腿部活动

      // FPSList: [
      //   "无痛",
      //   "介于无痛与微痛之间",
      //   "微痛",
      //   "介于微痛与有些痛之间",
      //   "有些痛",
      //   "介于有些痛和很痛之间",
      //   "很痛",
      //   "介于很痛与疼痛剧烈之间",
      //   "疼痛剧烈",
      //   "介于疼痛剧烈与疼痛难忍之间",
      //   "疼痛难忍",
      // ], //面部表情数据列表
    };
  },
  created() {
    this.gistData = JSON.parse(JSON.stringify(this.scoreData));
     this.gistData.acheData.time = new Date().getTime();
  },
  watch: {
    "gistData.acheData.valueNRS": function (newVal) {
      this.gistData.acheData.valueNRS = +newVal;
      if (newVal > 10) {
        this.gistData.acheData.valueNRS = 10;
      }
      this.setLevel(this.gistData.acheData.valueNRS);
    },
    "gistData.acheData.valueFPS": function (newVal) {
      this.gistData.acheData.valueFPS = +newVal;
      if (newVal > 10) {
        this.gistData.acheData.valueFPS = 10;
      }
      this.setLevel(this.gistData.acheData.valueFPS);
    },
    "gistData.acheData.titleCode": function (newVal) {
      this.dataManege(newVal);
    },
  },
  methods: {
    //评分变更事件
    itemChange() {
      this.gistData.acheData.valueFC =
        (this.gistData.acheData.valueFCItem.faceVal == -1
          ? 0
          : this.gistData.acheData.valueFCItem.faceVal) +
        (this.gistData.acheData.valueFCItem.cryVal == -1
          ? 0
          : this.gistData.acheData.valueFCItem.cryVal) +
        (this.gistData.acheData.valueFCItem.posVal == -1
          ? 0
          : this.gistData.acheData.valueFCItem.posVal) +
        (this.gistData.acheData.valueFCItem.legActivityVal == -1
          ? 0
          : this.gistData.acheData.valueFCItem.legActivityVal) +
        (this.gistData.acheData.valueFCItem.comVal == -1
          ? 0
          : this.gistData.acheData.valueFCItem.comVal);
      this.setLevelFC(this.gistData.acheData.valueFC);
    },
    //计算评级
    dataManege(val) {
      switch (val) {
        case 0:
          this.setLevel(this.gistData.acheData.valueNRS);
          break;
        case 1:
          this.setLevel(this.gistData.acheData.valueFPS);
          break;
        default:
          this.setLevelFC(this.gistData.acheData.valueFC);
          break;
      }
    },
    //提交数据
    putScoreData() {
      //只保留最后点击确认的评分项数据，还原其他数据，计算最终评级
      switch (this.gistData.acheData.titleCode) {
        case 0:
          this.resetFC();
          this.gistData.acheData.valueFPS = 0;
          this.setLevel(this.gistData.acheData.valueNRS);
          this.gistData.acheData.value = this.gistData.acheData.valueNRS;
          break;
        case 1:
          this.resetFC();
          this.gistData.acheData.valueNRS = 0;
          this.setLevel(this.gistData.acheData.valueFPS);
          this.gistData.acheData.value = this.gistData.acheData.valueFPS;
          break;
        default:
          this.gistData.acheData.valueFPS = 0;
          this.gistData.acheData.valueNRS = 0;
          this.setLevelFC(this.gistData.acheData.valueFC);
          this.gistData.acheData.value = this.gistData.acheData.valueFC;
          break;
      }
      this.$emit("putScoreData", this.gistData);
    },
    //计算特殊项等级
    setLevelFC(val) {
      if (val <= 3) {
        this.gistData.acheData.level = "IVa级";
      } else if (val <= 5) {
        this.gistData.acheData.level = "III级";
      } else if (val <= 7) {
        this.gistData.acheData.level = "II级";
      } else {
        this.gistData.acheData.level = "I级";
      }
    },
    //计算等级
    setLevel(val) {
      switch (val) {
        case 0:
          this.gistData.acheData.level = "IVa级";
          break;
        case 1:
          this.gistData.acheData.level = "IVa级";
          break;
        case 2:
          this.gistData.acheData.level = "IVa级";
          break;
        case 3:
          this.gistData.acheData.level = "IVa级";
          break;
        case 4:
          this.gistData.acheData.level = "III级";
          break;
        case 5:
          this.gistData.acheData.level = "III级";
          break;
        case 6:
          this.gistData.acheData.level = "II级";
          break;
        case 7:
          this.gistData.acheData.level = "II级";
          break;
        case 8:
          this.gistData.acheData.level = "I级";
          break;
        case 9:
          this.gistData.acheData.level = "I级";
          break;
        default:
          this.gistData.acheData.level = "I级";
          break;
      }
    },
    //还原FC
    resetFC() {
      this.gistData.acheData.valueFCItem.faceVal = -1;
      this.gistData.acheData.valueFCItem.cryVal = -1;
      this.gistData.acheData.valueFCItem.posVal = -1;
      this.gistData.acheData.valueFCItem.legActivityVal = -1;
      this.gistData.acheData.valueFCItem.comVal = -1;
      this.gistData.acheData.valueFC = 0;
    },
  },
};
</script>
<style  lang='scss'>
#pain {
  .el-slider__button {
    width: 22px;
    height: 22px;
  }
  color: #1a1a1a;
  font-size: 16px;
  .active {
    color: #1bad97 !important;
  }
  .pain-title {
    display: flex;
    font-size: bold;
    color: #000000;
    div p {
      margin-right: 21px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      span:nth-of-type(2) {
        transition: all 1s ease;
        margin-top: 6px;
        width: 87px;
        height: 2px;
        background: #1bad97;
        border-radius: 2px;
      }
    }
  }
  .pain-item {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .pain-wrap {
      width: 100%;
      padding: 10px 32px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      .color-block {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-top: 60px;
        width: 100%;
        height: 71px;
        background: linear-gradient(
          to right,
          #33c15f 0%,
          #f4e808 30%,
          #ef9825 70%,
          #dd3131 100%
        );
        span {
          width: 1px;
          height: 18px;
          background: #fff;
          &:nth-child(even) {
            height: 9px;
          }
          &:first-child {
            height: 0;
          }
          &:last-child {
            height: 0;
          }
        }
      }
      .item-title {
        margin-top: 10px;
        margin-bottom: 20px;
        font-size: 20px;
        font-size: bold;
        display: flex;
        justify-content: space-between;
        .font-color_0 {
          color: #33c15f;
        }
        .font-color_1 {
          color: #a2dd2b;
        }
        .font-color_2 {
          color: #f4dc08;
        }
        .font-color_3 {
          color: #f4ac1e;
        }
        .font-color_4 {
          color: #e7642c;
        }
        .font-color_5 {
          color: #dd3231;
        }
      }
    }
    .line {
      display: flex;
      justify-content: space-between;
      span {
        width: 2px;
        height: 8px;
        background: #000;
      }
    }
    .scale {
      margin-top: 13px;
      display: flex;
      justify-content: space-between;
      font-weight: bold;
      font-size: 20px;
      .grades-val {
        position: relative;
        width: 0px;
        span {
          position: absolute;
          width: 30px;
          left: -7px;
        }
        &:first-child {
          span {
            left: -3px;
          }
        }
        &:last-child {
          span {
            left: -20px;
          }
        }
      }
    }
    .fraction {
      width: 100%;
      padding-top: 80px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .grades {
        display: inline-block;
        margin-left: 10px;
        width: 80px;
        height: 30px;
        line-height: 30px;
        border: 1px solid #dfdfdf;
        border-radius: 8px;
        text-indent: 10px;
      }
      .el-input {
        margin-left: 10px;
        width: 60%;
      }
    }
  }
  .pain-item2 {
    .pain-wrap {
      width: 100%;
      padding: 10px 32px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      .img-list {
        display: flex;
        justify-content: space-between;
        .img-item {
          margin-top: 44px;
          img {
            width: 65px;
            height: 65px;
            margin-bottom: 10px;
          }
          width: 120px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
      }
      .block {
        padding: 30px;
        padding-bottom: 0;
      }
      .scale {
        padding: 0 30px;
        margin-top: 13px;
        display: flex;
        justify-content: space-between;
        font-weight: bold;
        font-size: 20px;
        .grades-val {
          position: relative;
          width: 0px;
          span {
            position: absolute;
            width: 30px;
            left: -7px;
          }
          &:first-child {
            span {
              left: -3px;
            }
          }
          &:last-child {
            span {
              left: -20px;
            }
          }
        }
      }
      // .fps-list {
      //   margin-top: 30px;
      //   font-size: 14px;
      //   .fps-item {
      //     display: flex;
      //     flex-wrap: wrap;
      //     box-sizing: border-box;
      //     div {
      //       width: 255px;
      //       height: 30px;
      //       border-radius: 6px;
      //       border: 1px solid #ccc;
      //       display: flex;
      //       justify-content: space-between;
      //       align-items: center;
      //       padding: 6px;
      //       margin-bottom: 10px;
      //       margin-right: 15px;
      //     }
      //     .active {
      //       color: #fff !important;
      //       background: #1bad97;
      //       border-color: #1bad97 !important;
      //     }
      //   }
      // }
      .fraction {
        width: 100%;
        padding-top: 80px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .grades {
          display: inline-block;
          margin-left: 10px;
          width: 80px;
          height: 30px;
          line-height: 30px;
          border: 1px solid #dfdfdf;
          border-radius: 8px;
          text-indent: 10px;
        }
        .el-input {
          margin-left: 10px;
          width: 60%;
        }
      }
    }
  }
  .pain-item3 {
    padding-top: 20px;
    .pain-wrap {
      display: flex;
      justify-content: space-around;
      .flacc-left {
        width: 100%;
        .left-item {
          margin-bottom: 16px;

          p {
            font-weight: bold;
            margin-bottom: 13px;
          }
          div {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 420px;
            height: 30px;
            border: 1px solid #ccc;
            border-radius: 6px;
            margin-bottom: 8px;
            padding: 8px;
            box-sizing: border-box;
            font-size: 14px;
          }
        }
      }
      .flacc-right {
        width: 100%;
        .right-item {
          margin-bottom: 16px;
          p {
            font-weight: bold;
            margin-bottom: 13px;
          }
          div {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 420px;
            height: 30px;
            border: 1px solid #ccc;
            border-radius: 6px;
            margin-bottom: 8px;
            padding: 8px;
            box-sizing: border-box;
            font-size: 14px;
          }
        }
      }
      .active {
        background: #1bad97;
        border-color: #1bad97;
        color: #fff !important;
      }
    }
    .fraction {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .remarks {
        span {
          margin-right: 10px;
        }
      }
      .grades {
        display: inline-block;
        margin-left: 10px;
        width: 80px;
        height: 30px;
        line-height: 30px;
        border: 1px solid #dfdfdf;
        border-radius: 8px;
        text-indent: 10px;
      }
      .el-input {
        margin-left: 10px;
        width: 60%;
      }
    }
  }
  .fraction-flacc {
    margin-top: 38px;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      margin-left: 10px;
      width: 80px;
      height: 30px;
      line-height: 30px;
      border: 1px solid #dfdfdf;
      border-radius: 8px;
      text-indent: 10px;
    }
  }
}
.el-dialog__footer {
  text-align: center;
}
</style>