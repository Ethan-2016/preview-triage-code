<!--
 * @Author: 吴应
 * @Date: 2021年4月18日10:13:25
 * @LastEditTime: 2021年4月18日10:13:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FileName: 快速通道记录
 * @FilePath: src\benchs\preHospital\views\medicalRecordSearch\triageFind.vue
-->
<template>
  <div id="fast-channel-page">
    <div class="top-tool">
      <div class="tool-item">
        <span class="demonstration">创建时间: </span>
        <el-date-picker
          v-model="timeBucket"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
        >
        </el-date-picker>
      </div>
      <div class="tool-item">
        <span class="demonstration">接诊护士: </span>
        <el-select
          v-model="form.ReceptionNurse"
          placeholder="请选择"
          @change="selectChang"
        >
          <el-option label="全部" value=""> </el-option>
          <el-option
            v-for="o in nursesres"
            :key="o.id"
            :label="o.name"
            :value="o.userName"
          ></el-option>
        </el-select>
      </div>
      <div class="tool-item">
        <span class="demonstration">病人检索： </span>
        <el-input
          placeholder="输入患者姓名"
          v-model="form.PatientName"
          clearable
          maxlength="50"
        >
        </el-input>
      </div>
      <div class="tool-item">
        <span class="demonstration">所属派出所： </span>
        <el-select v-model="form.PoliceStationCode" placeholder="请选择">
          <el-option label="全部" value=""> </el-option>
          <el-option
            v-for="item in fastTrackNames"
            :key="item.id"
            :label="item.fastTrackName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="tool-item">
        <span class="demonstration">警务人员： </span>
        <el-input
          placeholder="输入警务人员警号/姓名"
          v-model="form.PoliceInfo"
          clearable
          maxlength="50"
        >
        </el-input>
      </div>
      <div class="tool-item">
        <el-button
          type="primary"
          @click="
            form.SkipCount = 1;
            getFastTrackRegisterList();
          "
          >查询</el-button
        >
        <el-button type="primary" @click="initForm()">重置</el-button>
        <el-button type="primary" @click="exportFile">导出</el-button>
      </div>
    </div>
    <div class="list-main">
      <el-table :data="tableData" border v-loading="laoding">
        <el-table-column type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column
          prop="patientName"
          :show-overflow-tooltip="true"
          label="姓名"
        >
        </el-table-column>
        <el-table-column prop="sex" :show-overflow-tooltip="true" label="性别">
        </el-table-column>
        <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column prop="policeStationName" label="所属派出所">
        </el-table-column>
        <el-table-column
          prop="policeStationPhone"
          :show-overflow-tooltip="true"
          label="派出所电话"
        >
        </el-table-column>
        <el-table-column
          prop="policeCode"
          :show-overflow-tooltip="true"
          label="警务人员警号"
        >
        </el-table-column>
        <el-table-column prop="policeName" label="警务人员姓名">
        </el-table-column>
        <el-table-column prop="receptionNurseName" label="接诊护士">
        </el-table-column>
        <el-table-column
          prop="remark"
          :show-overflow-tooltip="true"
          label="备注"
        >
        </el-table-column>
        <el-table-column prop="creationTime" label="创建时间">
        </el-table-column>
        <el-table-column prop="rfid" label="操作" width="80" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="viewDetails(scope.row)"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <data-pager
          :MaxResultCount="form.MaxResultCount"
          :totalCount="totalCount"
          :SkipCount="form.SkipCount"
          @paginationForm="paginationForm"
        ></data-pager>
      </div>
    </div>
    <el-drawer title="详情" :visible.sync="drawer">
      <fast-channel></fast-channel>
    </el-drawer>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import triageApi from "../../api/triageApi";
import commenApi from "../../api/commenApi";
import baseSettingApi from "../../api/baseSettingApi";
import dataPager from "../../components/dataPager";
import fastChannel from "../../layout/components/fastChannel.vue";
export default {
  components: {
    dataPager,
    fastChannel,
  },
  data() {
    return {
      fastTrackNames: [], //派出所
      nursesres: [], //接诊护士
      drawer: false,
      form: {},
      laoding: true,
      totalCount: 0,
      timeBucket: [], //创建时间
      tableData: [],
    };
  },
  computed: {
    ...mapGetters(["showDrawerModel"]),
  },
  watch: {
    //监听弹窗类型
    showDrawerModel: {
      immediate: true,
      handler(newvue,oldval) {
        if(newvue == '' && oldval=='fastChannel'){
          this.initForm();
        }
      },
    },
  },
  created() {
    this.initForm();
    this.getFastTrackRegisterList(); //快速通道记录列表
    this.getFastTrackSetting(); //派出所信息列表
    this.getPagedUsers(); //护士列表
  },
  methods: {
    initForm() {
      this.form = {
        MaxResultCount: 15, //页容量
        SkipCount: 1, //当前页数
        StartTime: "", //查询开始时间
        EndTime: "", //查询结束时间
        PatientName: "", //患者姓名
        ReceptionNurse: "", //接诊护士
        PoliceStationCode: "", //所属派出所
        PoliceInfo: "", //警务人员警号/姓名
      };
      this.timeBucket = [];
      this.getFastTrackRegisterList(); //快速通道记录列表
    },
    /**获取分页结果
     *
     */
    // 显示详情
    viewDetails(row) {
      console.log(row);
      this.$store.commit("previewTriage/showDrawerModel", "fastChannel");
      sessionStorage.setItem("fastChannelData", JSON.stringify(row));
    },
    paginationForm(obj) {
      this.form.MaxResultCount = obj.MaxResultCount;
      this.form.SkipCount = obj.SkipCount;
      this.getFastTrackRegisterList();
    },
    // 导出文件
    exportFile() {
      this.form.StartTime = "";
      this.form.EndTime = "";
      if (this.timeBucket && this.timeBucket.length) {
        this.form.StartTime = this.timeBucket[0];
        this.form.EndTime = this.timeBucket[1];
      }
      triageApi
        .fastTrackRegisterInfoExport(this.form)
        .then((res) => {
          // console.log(res);
          // if (res.code == 200) {
          // 此处有个坑。这里用content保存文件流，最初是content=res，但下载的test.xls里的内容如下图1，
          // 检查了下才发现，后端对文件流做了一层封装，所以将content指向res.data即可 // 另外，流的转储属于浅拷贝，所以此处的content转储仅仅是便于理解，并没有实际作用=_=
          // const content = res.data;
          const content = res;
          const blob = new Blob([content]);
          // 构造一个blob对象来处理数据
          const fileName = "快速通道列表.xls";
          // 导出文件名
          // 对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
          // IE10以上支持blob但是依然不支持download
          if ("download" in document.createElement("a")) {
            // 支持a标签download的浏览器
            const link = document.createElement("a");
            // 创建a标签
            link.download = fileName;
            // a标签添加属性
            link.style.display = "none";
            link.href = URL.createObjectURL(blob);
            document.body.appendChild(link);
            link.click();
            // 执行下载
            URL.revokeObjectURL(link.href);
            // 释放url
            document.body.removeChild(link);
            // 释放标签
          } else {
            // 其他浏览器
            navigator.msSaveBlob(blob, fileName);
          }
          // } else {
          //   this.$message.error("导出列表数据失败原因：" + res.msg);
          // }
        })
        .catch((err) => {
          console.error("导出列表数据失败原因：" + err);
        });
    },
    //获取派出所
    getFastTrackSetting() {
      baseSettingApi
        .getFastTrackSetting({ IsEnable: true })
        .then((res) => {
          if (res.code == 200) {
            this.fastTrackNames = res.data;
          } else {
            this.$message.error("获取派出所失败原因：" + res.msg);
          }
        })
        .catch((err) => {
          console.error("获取派出所失败原因：" + err);
        });
    },
    //护士选择赋值
    selectChang(e) {
      let obj = this.nursesres.find((o) => {
        return (o.userName = e);
      });
      this.form.ReceptionNurseName = obj.name;
    },
    //获取护士信息
    getPagedUsers() {
      commenApi
        .getPagedUsers({
          skipCount: 0,
          maxResultCount: 1000,
        })
        .then((res) => {
          this.nursesres = res.items;
        })
        .catch((err) => {
          console.error("获取护士信息失败原因：" + err);
        });
    },
    //查询列表
    getFastTrackRegisterList() {
      this.laoding = true;
      this.form.StartTime = "";
      this.form.EndTime = "";
      if (this.timeBucket && this.timeBucket.length) {
        this.form.StartTime = this.timeBucket[0];
        this.form.EndTime = this.timeBucket[1];
      }
      console.log(this.form);
      triageApi
        .getFastTrackRegisterList(this.form)
        .then((res) => {
          this.laoding = false;
          if (res.code == 200) {
            this.totalCount = res.data.totalCount;
            // console.log(this.totalCount);
            this.tableData = res.data.items;
          } else {
            this.$message.error("查询列表数据失败原因：" + res.msg);
          }
        })
        .catch((err) => {
          console.error("查询列表数据失败原因：" + err);
        });
    },
  },
};
</script>
<style lang="scss">
@import "../../assets/css/_handle.scss";
#fast-channel-page {
  padding: 12px;

  @include font_color("font_color2");
  .is-fullscreen {
    .el-dialog__body {
      padding: 0;
    }
  }

  .list-main {
    margin-top: 12px;
    .el-table {
      .el-table__body-wrapper {
      }
    }
  }
  .drawer-main {
    padding-left: 23px;
    .el-table {
      margin-top: 20px;
    }
  }
  .type-list {
    > span {
      margin-right: 20px;
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 3px 10px;
      background-color: #ccc;
      cursor: pointer;
      &.active {
        border-color: #1bcd96;
        background-color: #1bcd96;
        color: #fff;
      }
    }
  }
}
</style>
