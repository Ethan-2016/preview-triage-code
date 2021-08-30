<!--
 * @Author: 吴应
 * @Date: 2021年6月22日16:14:15
 * @LastEditTime: 2021年6月22日16:14:21
 * @LastEditors: Linbaochang
 * @Description: In User Settings Edit
 * @FileName: 分诊设备
 * @FilePath: src\benchs\previewTriage\views\baseSetting\components\scoreManage.vue
-->
<template>
  <div id="score-manage" class="block-box">
    <div class="top-action">
      <div>
        <el-input v-model="qualityDate" placeholder="编号/名称" maxlength="50"></el-input>
      </div>
      <div class="btn-list">
        <el-button class="btn-ml active" @click="triageDeviceList()"
          >查询</el-button
        >
        <el-button type="primary" @click="editFastChannelManage()"
          >新增</el-button
        >
      </div>
    </div>
    <div class="list-tabele" v-loading="loading">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="deviceCode" label="设备编号" width="290"> </el-table-column>
        <el-table-column prop="deviceName" label="设备名称" width="218"> </el-table-column>
        <el-table-column prop="factoryInfo" label="厂家信息" width="76"> </el-table-column>
        <el-table-column prop="deviceModel" label="设备型号" width="98"> </el-table-column>
        <el-table-column prop="accessMode" label="接入方式" width="76"> </el-table-column>
        <el-table-column prop="deviceIPOrCom" label="接入" width="120"> </el-table-column>
        <el-table-column prop="lastModificationTime" label="更新时间" width="160"></el-table-column>
        <el-table-column prop="creationTime" label="创建时间" width="152"></el-table-column>
        <el-table-column prop="remark" label="备注"> </el-table-column>
        <el-table-column label="操作" align="center" width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="editFastChannelManage(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="text"
              style="color: #f56c6c"
              @click="deleteTriageDevice(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-drawer
      :title="title"
      :size="420"
      :wrapperClosable="false"
      :visible.sync="showEditFastChannelManage"
      @click="editFastChannelManageClose()"
    >
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="设备名称：" prop="deviceName">
          <!-- <el-input v-model="form.deviceName"></el-input> -->
            <el-select v-model="form.deviceName" placeholder="请选择" @change="eqChange">
              <el-option
                v-for="item in equipments"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="设备编号：" prop="deviceCode" >
          <el-input v-model="form.deviceCode" disabled maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="厂家信息：" prop="factoryInfo" >
          <el-input v-model="form.factoryInfo" disabled maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="设备型号：" prop="deviceModel" >
          <el-input v-model="form.deviceModel" disabled maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="接入方式：" prop="accessMode">
          <el-radio v-model="form.accessMode" label="IP" maxlength="50">IP方式</el-radio>
          <!-- <el-radio-group
            v-model="form.accessMode"
            @change="form.deviceIPOrCom = ''"
          >
            <el-radio label="IP">IP方式</el-radio>
            <el-radio label="COM">串口方式</el-radio>
          </el-radio-group> -->
        </el-form-item>
        <el-form-item
          v-if="form.accessMode == 'IP'"
          label="IP："
          prop="deviceIPOrCom"
        >
          <el-input v-model="form.deviceIPOrCom" maxlength="50" disabled></el-input>
        </el-form-item>
        <el-form-item
          v-if="form.accessMode == 'COM'"
          label="串口"
          prop="deviceIPOrCom"
        >
          <el-select v-model="form.deviceIPOrCom" placeholder="请选择">
            <el-option
              v-for="item in comOptions"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注：" prop="remark">
          <el-input v-model="form.remark" type="textarea" rows="4" maxlength="500"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="editFastChannelManageClose()">取消</el-button>
          <el-button type="primary" @click="editSubmit">确认</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
import baseSettingApi from "../../../api/baseSettingApi";
export default {
  name: "scoreManage",
  data() {
    return {
      title: "新增",
      loading: true,
      comOptions: [
        {
          label: "COM1",
          value: "COM1",
        },
        { label: "COM2", value: "COM2" },
      ],
      qualityDate: "",
      form: {},
      rules: {
        deviceName: [
          { required: true, message: "请输设备名称", trigger: "blur" },
        ],
        deviceCode: [
          { required: true, message: "请输设备编码", trigger: "blur" },
        ],
        factoryInfo: [
          { required: true, message: "请输设备编码", trigger: "blur" },
        ],
        deviceModel: [
          { required: true, message: "请输设备编码", trigger: "blur" },
        ],
        accessMode: [
          { required: true, message: "选择接入方式", trigger: "blur" },
        ],
        deviceIPOrCom: [
          { required: true, message: "请完善设备信息", trigger: "blur" },
        ],
      },
      showEditFastChannelManage: false,
      tableData: [],
      equipments:[],//设备信息
    };
  },
  created() {
    this.initForm();
    this.triageDeviceList();
    this.getEquipments();
  },
  methods: {
    eqChange(e){
      let obj = this.equipments.find(item=>{return item.name==e})
      console.log(obj)
      if(obj){
        this.form.deviceCode = obj.id;
        this.form.factoryInfo = obj.vendor//厂家
        this.form.deviceIPOrCom = obj.netAddress//IP
        this.form.deviceModel  = obj.model//设备型号
        this.form.remark = obj.remark;
      }
    },
    //获取设备信息
    getEquipments(){
      baseSettingApi.deviceInfoByIot().then(res=>{
        this.equipments = [];
        if(res.code===200){
          this.equipments = res.data;
        }
      })
    },
    //初始化表单
    initForm() {
      this.form = {
        deviceCode: "",
        deviceName: "",
        factoryInfo: "",
        deviceModel: "",
        accessMode: "IP",
        deviceIPOrCom: "",
        remark: "",
      };
    },
    //删除
    deleteTriageDevice(row) {
      this.$confirm("此操作将永久删除该设备, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.loading = true;
        baseSettingApi.deleteTriageDevice(row).then((res) => {
            this.loading = false;
            if (res.code == 200) {
              this.showEditFastChannelManage = false;
              this.$message.success("删除设备成功");
              this.triageDeviceList();
              this.getEquipments();
            } else {
              this.$message.error("删除设备失败" + res.msg);
            }
          })
          .catch((err) => {
            this.loading = false;
            this.$message.error("删除设备失败" + err);
            console.error("删除设备失败" + err);
          });
      });
    },
    //确认编辑
    editSubmit() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.loading = true;
          if (this.form.id) {
            //编辑
            baseSettingApi.putTriageDevice(this.form).then((res) => {
                this.loading = false;
                if (res.code == 200) {
                  this.showEditFastChannelManage = false;
                  this.$message.success("编辑设备成功");
                  this.triageDeviceList();
                  this.getEquipments();
                } else {
                  this.$message.error("编辑设备失败" + res.msg);
                }
              }).catch((err) => {
                this.loading = false;
                this.$message.error("编辑设备失败" + err);
                console.error("编辑设备失败" + err);
              });
          } else {
            //新增
            baseSettingApi.postTriageDevice(this.form).then((res) => {
                this.loading = false;
                if (res.code == 200) {
                  this.showEditFastChannelManage = false;
                  this.$message.success("新增设备成功");
                  this.triageDeviceList();
                  this.getEquipments();
                } else {
                  this.$message.error("新增设备失败" + res.msg);
                }
              }).catch((err) => {
                this.loading = false;
                this.$message.error("程序运行异常,程序异常");
                console.error("新增设备失败" + err);
              });
          }
        } else {
          return false;
        }
      });
    },
    //编辑设备
    editFastChannelManage(item) {
      this.initForm();
      if (item) {
        this.form = JSON.parse(JSON.stringify(item));
        this.title = "编辑";
      } else {
        this.title = "新增";
      }
      this.$nextTick(()=>{this.$refs["ruleForm"].clearValidate()})
      this.showEditFastChannelManage = true;
    },
    //关闭编辑设备
    editFastChannelManageClose() {
      this.showEditFastChannelManage = false;
    },
    //获取设备列表
    triageDeviceList() {
      this.loading = true;
      baseSettingApi
        .triageDeviceList({ DeviceCodeOrName: this.qualityDate })
        .then((res) => {
          this.loading = false;
          if (res.code == 200) {
            
            this.tableData = res.data;
          } else {
            this.$message.error("获取设备列表失败" + res.msg);
          }
        })
        .catch((err) => {
          this.loading = false;
          this.$message.error("程序运行异常,程序异常");
          console.error("获取设备列表失败" + err);
        });
    },
  },
};
</script>
<style lang="scss">
#score-manage {
  .el-table .cell{
    padding: 0 5px;
  }
  .top-action {
    display: flex;
    width: 100%;
    position: relative;
    align-items: center;
    .btn-list {
      padding-left: 10px;
    }
  }
  .list-tabele {
    margin-top: 10px;
  }
}
</style>
