<!--
 * @Author: 吴应
 * @Date: 2021年6月22日16:14:15
 * @LastEditTime: 2021年6月22日16:14:21
 * @LastEditors: Linbaochang
 * @Description: In User Settings Edit
 * @FileName: 分诊知识库
 * @FilePath: src\benchs\previewTriage\views\baseSetting\components\triageRepository.vue
-->
<template>
  <div id="triage-repository" class="flex-block">
    <div class="class-list block1">
      <div>
        <p class="title">名称</p>
        <p
          class="item"
          :class="{ active: repositoryItem == 1 }"
          @click="repositoryItem = 1"
        >
          判定依据管理
        </p>
        <p
          class="item"
          :class="{ active: repositoryItem == 2 }"
          @click="repositoryItem = 2"
        >
          生命体征评级
        </p>
        <p
          class="item"
          :class="{ active: repositoryItem == 3 }"
          @click="repositoryItem = 3"
        >
          病人评分管理
        </p>
      </div>
    </div>
    <div class="block2">
      <div v-if="repositoryItem == 1">
        <!-- 判定依据管理 -->
        <gist-manage></gist-manage>
      </div>
      <div v-if="repositoryItem == 2">
        <!-- 生命体征评级 -->
        <vital-signs-manage></vital-signs-manage>
      </div>
      <div v-if="repositoryItem == 3">
        <!-- 病人评分管理 -->
        <score-manage></score-manage>
      </div>
    </div>
  </div>
</template>
<script>
import vitalSignsManage from "./vitalSignsManage.vue";
import scoreManage from "./scoreManage.vue";
import gistManage from "./gistManage.vue";
export default {
  name: "triageRepository",
  components: {
    gistManage,
    scoreManage,
    vitalSignsManage,
  },
  data() {
    return {
      repositoryItem: 1,
    };
  },
};
</script>
<style lang="scss">
#triage-repository {
  display: flex;
  .class-list {
    // min-width: 220px;
    // border: 1px solid #d2d5dd;
    // border-radius: 5px;
    // background: #FFF;
    p {
      line-height: 40px;
      padding: 0 20px;
      text-align: center;
      border-bottom: 1px solid #d2d5dd;
      &:last-child {
        border: 0;
      }
    }
    .title {
      background-color: #e4e7ed;
    }
    .item {
      cursor: pointer;
      &:hover {
        background-color: #fafafa;
      }
      &.active {
        background-color: #a4ded5;
      }
    }
  }
  .item-main {
    margin-left: 15px;
    width: 87%;
    background-color: #fff;
    padding: 5px 15px;
  }
}
</style>
