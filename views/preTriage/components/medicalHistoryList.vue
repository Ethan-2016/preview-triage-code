<!--
 * @Author: 吴应
 * @Date: 2021年7月5日09:56:36
 * @LastEditTime: 2021年7月5日09:56:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FileName: 分诊查询
 * @FilePath: src\benchs\previewTriage\views\preTriage\components\medicalHistoryList.vue
-->
<template>
  <div>
    <el-table
      :data="medicalHistoryList"
      border
      :highlight-current-row="true"
      style="width: 100%"
      :row-click="rowClick"
    >
      <el-table-column prop="emergencyLevel" label="病历号"> </el-table-column>
      <el-table-column prop="emergencyLevel" label="患者姓名">
      </el-table-column>
      <el-table-column prop="emergencyLevel" label="出生日期">
      </el-table-column>
      <el-table-column prop="emergencyLevel" label="联系电话">
      </el-table-column>
      <el-table-column prop="emergencyLevel" label="身份证号">
      </el-table-column>
    </el-table>
    <div class="submit-btn">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="onSubmit">确定</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "contactsPerson",
  props: {
    medicalHistoryList: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  methods: {
    rowClick(row) {
      console.log(row);
    },
    onSubmit() {},
    close() {
      this.$emit("drawerClose");
    },
  },
};
</script>
<style lang="scss" scoped>
.submit-btn {
  display: flex;
  justify-content: center;
  .el-button {
    margin: 20px;
  }
}
</style>