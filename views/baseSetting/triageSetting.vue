<template>
  <div id="triage-setting">
    <el-tabs v-model="activeTab" tab-position="left" @tab-click="TabClick">
      <el-tab-pane label="分诊设置" name="triageConfig">
          <span slot="label"><i class="icon iconfont icon-tubiao-68"></i> 分诊设置</span>
        <triage-config />
      </el-tab-pane>
      <el-tab-pane  name="triageTable">
         <span slot="label"><i class="icon iconfont icon-tubiao-69"></i> 分诊列表</span>
        <triage-table />
      </el-tab-pane>
      <el-tab-pane label="分诊报表" name="triageReport">
          <span slot="label"><i class="icon iconfont icon-tubiao-70"></i> 分诊报表</span>
        <triage-report />
      </el-tab-pane>
      <el-tab-pane label="分诊知识库" name="triageRepository">
          <span slot="label"><i class="icon iconfont icon-tubiao-71"></i> 分诊知识库</span>
        <triage-repository />
      </el-tab-pane>
      <el-tab-pane label="快速通道设置" name="fastChannelSetting">
          <span slot="label"><i class="icon iconfont icon-tubiao-102"></i> 快速通道设置</span>
        <fast-channel-setting />
      </el-tab-pane>
      <el-tab-pane label="分诊设备" name="triageDevice">
          <span slot="label"><i class="icon iconfont icon-guanlian"></i> 分诊设备</span>
        <triage-device />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import triageRepository from "./components/triageRepository.vue";
import triageTable from "./components/triageTable.vue";
import triageConfig from "./components/triageConfig.vue";
import triageReport from "./components/triageReport.vue";
import fastChannelSetting from "./components/fastChannelSetting.vue";
import triageDevice from "./components/triageDevice.vue";

export default {
  name: "triageSetting",
  components: {
    triageConfig,
    triageTable,
    triageRepository,
    triageReport,
    fastChannelSetting,
    triageDevice,
  },
  data() {
    return {
      list: [],
      loading: false,
      isChange: false,
      activeTab: "triageReport",
      selectedType: "",
    };
  },
  mounted(){
    
    this.activeTab = sessionStorage.getItem('triage-setting') || this.activeTab
  },
  computed: {
    
  },
  methods: {
    TabClick(){
      sessionStorage.setItem('triage-setting',this.activeTab)
    },
  },
};
</script>
<style lang="scss">
#triage-setting {
  width: 100%;
  height: 100%;
  padding: 16px 20px;
  background-color: #F2F7FA;
  .el-tabs__content,
  .el-tabs {
    height: 100%;
    
  }
  .el-tabs__header {
    // border: 1px solid #d2d5dd;
    background-color: #ffffff;
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.10); 
    border-radius: 5px;
  }
  .el-tabs__nav-wrap::after{
    background-color: transparent;
  }
  .el-tabs__active-bar {
    display: none;
  }
  .el-tabs__item {
    margin-left: 0;
    text-align: left;
    border-bottom: 1px solid #dcdfe6;
  }
  .el-tabs__item.is-active {
    // background-color: rgb(33, 183, 147);
    color: #1BAD96;
    &::after{
      content: "";
      height: 100%;
      width: 4px;
      background-color: #1BAD96;
      position: absolute;
      top: 0;
      right: 0;
    }
  }
  .el-tab-pane{
    height: 100%;
  }
  .list-main {
    margin-top: 10px;
  }
  .el-input {
    width: 218px;
  }
  .flex-block{//弹性布局
    width: 100%;
    height: 100%;
    display: flex;
    .block1,.block2{
      height: 100%;
      background-color: #ffffff;
      box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.10); 
      border-radius: 5px;
    }
    .block1{
      width: 14%;
      margin-right:10px;
    }
    .block2{
      width: 86%;
      padding:10px 20px;
    }
  }
  .block-box{
    width: 100%;
    height: 100%;
    padding:10px 20px;
    border-radius: 5px;
    background-color: #ffffff;
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.10); 
  }
}
</style>