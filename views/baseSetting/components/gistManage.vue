<!--
 * @Author: 吴应
 * @Date: 2021年6月22日16:14:15
 * @LastEditTime: 2021年6月22日16:14:21
 * @LastEditors: Linbaochang
 * @Description: In User Settings Edit
 * @FileName: 分诊知识库
 * @FilePath: src\benchs\previewTriage\views\baseSetting\components\gistManage.vue
-->
<template>
  <div id="gist-manage" v-loading="loading">
    <el-tabs
      v-model="activeName"
      type="border-card"
      :before-leave="tabHandleClick"
    >
      <el-tab-pane label="分类" name="category">
        <gist-category
          :tableData="tableData"
          @categoryClick="categoryClick"
          @refreshTabel="judgmentDetailList()"
          @loadingState="loadingState"
        ></gist-category>
      </el-tab-pane>
      <el-tab-pane label="主诉" name="complained">
        <gist-complained
          :complainedData="complainedData"
          :judgmentTypeId="judgmentTypeId"
          @complainedClick="complainedClick"
          @refreshTabel="judgmentDetailList()"
          @loadingState="loadingState"
        ></gist-complained>
      </el-tab-pane>
      <el-tab-pane label="判定依据" name="gist">
        <gist-reason
          :judgmentMasterId="judgmentMasterId"
          :gistReasonData="gistReasonData"
          @refreshTabel="judgmentDetailList()"
          @loadingState="loadingState"
        ></gist-reason>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import baseSettingApi from "../../../api/baseSettingApi";
import gistCategory from "./gistCategory.vue";
import gistComplained from "./gistComplained.vue";
import gistReason from "./gistReason.vue";
export default {
  name: "gistManage",
  components: {
    gistReason,
    gistComplained,
    gistCategory,
  },
  data() {
    return {
      loading: true,
      activeName: "category",
      tableData: [],
      judgmentTypeId: "",
      judgmentMasterId: "",
      complainedIndex: 0, //选择的主诉列表索引
      categoryIndex: 0, //选择的分类列表索引
      complainedData: [],
      gistReasonData: [],
    };
  },
  created() {
    this.judgmentDetailList();
  },
  methods: {
    loadingState(state) {
      this.loading = state;
    },
    //没有主诉禁止跳转到依据
    tabHandleClick(activeName) {
      //console.log(activeName,'主诉数据：',this.complainedData,this.complainedIndex,'分类数据：',this.tableData,this.categoryIndex)
      if (activeName === "gist") {
        if (this.complainedData) {
          if (this.complainedData.length == 0) {
            this.$message("请先添加主诉");
            return false;
          }
        } else {
          this.$message("请先添加主诉");
          return false;
        }
      } else if (this.complainedData[this.complainedIndex]) {
        this.judgmentMasterId = this.complainedData[this.complainedIndex].id;
      }
      if (activeName === "complained" && this.tableData[this.categoryIndex]) {
        this.judgmentTypeId = this.tableData[this.categoryIndex].id;
        console.log(this.judgmentTypeId);
      }
    },
    //分类列表点击事件
    categoryClick(obj) {
      //console.log('分类列表点击',obj,this.complainedIndex)
      this.categoryIndex = obj.index; //点击分类第几行
      this.complainedData = []; //主诉数据
      this.gistReasonData = []; //判定依据
      this.judgmentTypeId = obj.row.id;
      if (obj.row.children && obj.row.children.length) {
        this.complainedData = obj.row.children; //默认主诉数据
        if (
          this.complainedData[0].children &&
          this.complainedData[0].children.length
        ) {
          this.gistReasonData = this.complainedData[0].children; //默认判定依据数据
        }
      }
      this.activeName = "complained";
    },
    //主诉列表点击事件
    complainedClick(obj) {
      //console.log('主诉列表点击',obj);
      this.judgmentMasterId = obj.row.id || 0;
      this.complainedIndex = obj.index;
      this.gistReasonData = obj.row.children || [];
      this.activeName = "gist";
    },
    //获取分类列表
    judgmentDetailList() {
      this.loading = true;
      baseSettingApi
        .judgmentDetailList()
        .then((res) => {
          this.loading = false;
          //console.log('获取分类列表',res.data,this.categoryIndex)
          if (res.code == 200) {
            this.tableData = res.data;
            //设置默认数据
            if (res.data && res.data.length) {
              this.complainedData = res.data[this.categoryIndex].children || []; //主诉
              if (this.complainedData.length) {
                this.gistReasonData =
                  this.complainedData[this.complainedIndex].children || []; //判定依据
                this.judgmentTypeId =
                  this.complainedData[this.complainedIndex].judgmentTypeId;
                if (this.gistReasonData.length) {
                  this.judgmentMasterId =
                    this.gistReasonData[0].judgmentMasterId;
                }
              }
            }
          } else {
            this.$message.error("获取分类列表失败" + res.msg);
          }
        })
        .catch((err) => {
          this.loading = false;
          console.error("获取分类列表失败" + err);
        });
    },
  },
};
</script>
<style lang="scss" scope>
#gist-manage {
  .el-tabs__header {
    box-shadow: none !important;
    border-radius: 0 !important;
    .el-tabs__item.is-active::after {
      width: 0;
    }
    .el-tabs__item.is-active {
      border-top: 2px solid #dcdfe6;
      border-bottom: 0;
      color: #fff;
      background-color: #1bad96;
    }
    .el-tabs__item {
      border-bottom: 0;
      color: #000;
      font-size: 16px;
      background: #f2f7fa;
      border: 1px solid #dcdfe6;
      border-radius: 5px 5px 0px 0px;
    }
  }
  .el-tabs--border-card {
    border: 0;
    box-shadow: none !important;
    > .el-tabs__content {
      padding: 0;
      padding-top: 10px;
    }
  }
}
</style>
