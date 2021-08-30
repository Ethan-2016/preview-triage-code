<template>
  <div id="fall">
    <div class="first-item flex">
      <span>跌倒风险</span>
      <p>
        <el-switch
          v-model="value"
          active-color="#1BAD97"
          inactive-color="#ccc"
        ></el-switch>
        <span style="margin-left: 10px">{{ value == true ? "是" : "否" }}</span>
      </p>
    </div>
    <div class="first-item flex">
      <el-checkbox-group v-model="checkList">
        <el-checkbox
          class="myFont"
          v-for="item in fallState"
          :key="item"
          :label="item"
        ></el-checkbox>
      </el-checkbox-group>
    </div>

    <div class="des">
      <div class="title">预防跌倒措施:</div>
      <div class="des-con">
        <el-checkbox-group v-model="preventionStartList">
          <el-checkbox
            class="myFont"
            v-for="item in preventionList"
            :key="item"
            :label="item"
          ></el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    scoreData: {
      type: Object,
      fallData: {
        type: Object,
        scoreType: {
          type: String,
          default: "FALL",
        },
      },
    },
  },
  data() {
    return {
      gistData: {},
      value: "true",
      checked1: "2131",
      fallState: [
        "65岁以上虚弱老人",
        "孕产妇",
        "儿童",
        "步态不稳",
        "眼部疾患",
        "使用拐杖等助行器",
      ],
      preventionList: [
        "保持地面干燥整洁",
        "放置防跌倒警示标志",
        "家属陪同或者护士陪伴",
        "提供轮椅/平车",
        "指导行走/活动动作要慢",
        "指导行需要帮助时及时求助",
        "保持室内光线明亮",
      ],
      checkList: [], //跌倒风险
      preventionStartList: [], //防止跌倒
    };
  },
  created() {
    this.gistData = JSON.parse(JSON.stringify(this.scoreData));
     this.gistData.fallData.time = new Date().getTime();
  },
  methods: {
    //提交数据
    putScoreData() {
      this.$emit("putScoreData", this.gistData);
    },
  },
};
</script>

<style  lang='scss'>
#fall {
  font-size: 16px;
  .myFont {
    span:nth-of-type(1) {
      width: 16px;
      height: 16px;
    }
    span {
      font-size: 16px;
    }
  }
  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .first-item {
    margin-top: 16px;
    padding: 15px;
    height: 45px;
    border-radius: 8px;
    width: 809px;
    background: #f5f5f5;
  }

  .des .title {
    margin-top: 26px;
    margin-bottom: 12px;
  }
  .des-con {
    border-radius: 8px;
    padding: 2px 16px 16px 16px;
    display: flex;
    background: #f5f5f5;
    .myFont {
      margin-top: 14px;
    }
  }
}
</style>