<template>
  <div id="triage-report" class="flex-block">
    <div class="block1 report1">
      <div class="btn-box">
        <el-button @click="menuAdd" type="primary" size="small">新增</el-button>
      </div>
      <ul class="list-box">
        <li v-for="(itemReport, index) in reportList" :key="index">
          <div
            class="sub-box"
            :class="{
              'isActive': itemReport.id == ActiveClassify.id && ActiveId === null,
            }"
          >
            <i
              @click="handleOpen(index)"
              :class="
                Opens[index] ? 'el-icon-caret-bottom' : 'el-icon-caret-right'
              "
            ></i>
            <span @click="TypeNameClick(itemReport, index)">{{
              itemReport.reportTypeName
            }}</span>
            <i class="el-icon-plus" @click="reportAdd(itemReport)"></i>
          </div>
          <ul v-show="Opens[index]">
            <li
              class="sub-line"
              v-for="(item, t) in itemReport.reportSettingDto"
              :key="item.id + t"
              :class="{ isActive: item.id == ActiveId }"
              @click="reportEidt(item, itemReport)"
            >
              {{ item.reportName }}
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="block2 report2">
      <template v-if="classShow !== null">
        <div class="btn-box">
          <el-button
            size="small"
            type="primary"
            @click="ReportSave"
            :disabled="saveDis"
            >保存</el-button>
          <el-button
            size="small"
            style="background-color: #f56c6c; color: #fff"
            @click="ReportDel"
          >
            {{ addedStatus ? "取消" : "删除" }}
          </el-button>
          <!-- <el-button type="primary">预览</el-button> -->
        </div>
        <div class="form-box">
          <!-- 分类 -->
          <el-form
            v-show="classShow"
            label-position="top"
            :inline="true"
            :model="classifyForm"
            ref="classifyForm"
          >
            <el-form-item
              class="form-line1"
              label="分类名称："
              prop="triageConfigName"
              :rules="[
                { required: true, message: '请输入分类名称', trigger: 'blur' },
              ]"
            >
              <el-input
                v-model="classifyForm.triageConfigName"
                placeholder="请输入"
                maxlength="50"
              ></el-input>
            </el-form-item>
            <el-form-item class="form-line1" label="排序号：" prop="sort">
              <el-input
                v-model="classifyForm.sort"
                placeholder="请输入"
                maxlength="10"
              ></el-input>
            </el-form-item>
          </el-form>
          <!-- 报表 -->
          <el-form
            class="report-form"
            v-show="!classShow"
            :inline="true"
            label-position="top"
            :rules="reportRules"
            :model="reportForm"
            ref="reportForm"
          >
            <el-form-item label="报表分类：" required class="form-line1">
              <el-input
                v-model="ActiveClassify.reportTypeName"
                disabled
                maxlength="50"
              ></el-input>
            </el-form-item>
            <el-form-item label="报表ID：" prop="id" class="form-line1">
              <el-input
                v-model="reportForm.id"
                disabled
                maxlength="50"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="报表名称："
              prop="reportName"
              class="form-line1"
            >
              <el-input
                v-model="reportForm.reportName"
                maxlength="50"
              ></el-input>
            </el-form-item>
            <el-form-item label="排序号：" prop="sort" class="form-line">
              <el-input v-model="reportForm.sort" maxlength="10"></el-input>
            </el-form-item>
            <el-form-item
              label="排序字段："
              prop="reportSortFiled"
              class="form-line1"
            >
              <el-input
                v-model="reportForm.reportSortFiled"
                maxlength="50"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="排序类型："
              prop="orderType"
              class="form-line1"
            >
              <el-radio-group v-model="reportForm.orderType">
                <el-radio :label="0">升序</el-radio>
                <el-radio :label="1">降序</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否启用" prop="isEnabled">
              <el-switch
                v-model="reportForm.isEnabled"
                active-color="#1BAD96"
                inactive-color="#DCDFE6"
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch>
            </el-form-item>
            <el-form-item
              label="查询条件:"
              prop="reportSettingQueryOption"
              class="form-line4"
            >
              <div class="query-box">
                <p
                  v-for="(item, t) in reportForm.reportSettingQueryOption"
                  :key="t"
                >
                  {{ t + 1 }}.{{ item.queryName }}
                  <i class="el-icon-edit" @click="queryEdit(item)"></i>
                  <i class="el-icon-delete" @click="queryDel(t)"></i>
                </p>
              </div>
              <div class="query-btn">
                <el-button @click="queryAdd" type="primary" size="small"
                  >新增</el-button
                >
              </div>
            </el-form-item>
            <el-form-item
              label="查询语句："
              prop="reportSql"
              class="form-line3"
            >
              <el-input
                type="textarea"
                :rows="4"
                v-model="reportForm.reportSql"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="报表表头："
              prop="reportHead"
              class="form-line4 form-line6"
            >
              <el-table
                :data="menus"
                style="width: 90%; display: inline-block"
                row-key="id"
                border
                default-expand-all
                :tree-props="{
                  children: 'children',
                  hasChildren: 'hasChildren',
                }"
                :default-sort="{ prop: 'date', order: 'headerSort' }"
              >
                <el-table-column
                  type="index"
                  label="序号"
                  width="80"
                  align="center"
                />
                <el-table-column prop="headerSort" label="排序" width="200" />
                <el-table-column
                  prop="headerName"
                  label="表头名称"
                  min-width="350"
                />
                <el-table-column prop="headerField" label="字段" width="200" />
                <el-table-column prop="headerWidth" label="宽度" width="80" />
                <el-table-column label="操作" min-width="200" align="center">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      size="mini"
                      @click="editMenuDia(scope, 'edit')"
                      >编辑</el-button
                    >
                    <el-button
                      type="text"
                      size="mini"
                      @click="editMenuDia(scope, 'sub')"
                      >添加子表头</el-button
                    >
                    <el-button
                      type="text"
                      style="color: red"
                      @click="deleteMenu(scope)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <div class="form-btn">
                <el-button
                  @click="editMenuDia({}, 'add')"
                  type="primary"
                  size="small"
                  >新增</el-button
                >
                <el-button
                  @click="HeaderDrawer.visible = true"
                  type="primary"
                  size="small"
                  >预览表头</el-button
                >
              </div>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </div>
    <!-- 新增/编辑查询条件 -->
    <el-drawer
      size="25%"
      :title="queryDrawer.title"
      :visible.sync="queryDrawer.visible"
    >
      <el-form
        v-show="!classShow"
        :inline="true"
        label-position="top"
        :rules="queryRules"
        :model="queryFrom"
        ref="queryFrom"
      >
        <el-form-item label="序号:" prop="sort" class="form-line1">
          <el-input v-model.number="queryFrom.sort" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="查询名称:" prop="queryName" class="form-line2">
          <el-input v-model="queryFrom.queryName" maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="查询字段:" prop="queryFiled" class="form-line3">
          <el-input
            v-model.trim="queryFrom.queryFiled"
            maxlength="500"
          ></el-input>
        </el-form-item>
        <el-form-item label="查询类型:" prop="queryType" class="form-line3">
          <el-radio-group v-model="queryFrom.queryType">
            <el-radio label="input">输入框</el-radio>
            <el-radio label="DateTime">日期</el-radio>
            <el-radio label="radio">单选</el-radio>
            <el-radio label="checkbox">多选</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="数据源：SQL" prop="dataSource" class="form-line3">
          <el-input
            type="textarea"
            :rows="2"
            v-model="queryFrom.dataSource"
          ></el-input>
        </el-form-item>
        <el-form-item label="显示名称：" prop="displayName" class="form-line3">
          <el-input v-model="queryFrom.displayName" maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="备注:" prop="remark" class="form-line3">
          <el-input
            type="textarea"
            :rows="2"
            v-model="queryFrom.remark"
            maxlength="500"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" size="mini" @click="querySave">保存</el-button>
      <el-button size="mini" @click="queryDrawer.visible = false"
        >取消</el-button
      >
    </el-drawer>
    <!-- 预览效果-->
    <el-drawer
      size="50%"
      :title="HeaderDrawer.title"
      :visible.sync="HeaderDrawer.visible"
      :wrapperClosable="false"
    >
      <el-table style="width: 100%; height: 100px" border>
        <template v-for="item in menus">
          <table-column
            v-if="item.children && item.children.length"
            :key="item.id"
            :coloumn-header="item"
          ></table-column>
          <el-table-column
            v-else
            :key="item.id"
            :label="item.headerName"
            :prop="item.headerField"
          ></el-table-column>
        </template>
      </el-table>
      <!-- <table id="tab" cellpadding="1" cellspacing="0" v-html="HeaderDrawer.data"> </table>  -->
      <!-- <el-button @click="HeaderDrawer.visible = false">取消</el-button> -->
      <!-- <el-button @click="HeaderDrawer.visible = false">确定</el-button> -->
    </el-drawer>
    <!-- 新增/编辑表头 -->
    <el-drawer
      size="15%"
      :title="menuDrawer.title"
      :visible.sync="menuDrawer.visible"
      :wrapperClosable="false"
    >
      <el-form
        :rules="menuRules"
        :model="menuForm"
        ref="menuForm"
        label-position="top"
      >
        <el-form-item label="表头名称:" prop="headerName">
          <el-input
            size="mini"
            placeholder="请输入表头名称："
            v-model="menuForm.headerName"
            maxlength="50"
          ></el-input>
        </el-form-item>
        <el-form-item label="字段:" prop="headerField">
          <el-input
            size="mini"
            placeholder="请输入字段："
            v-model.trim="menuForm.headerField"
            maxlength="50"
          ></el-input>
        </el-form-item>
        <el-form-item label="宽度:" prop="headerWidth">
          <el-input
            size="mini"
            placeholder="请输入显示宽度："
            v-model="menuForm.headerWidth"
            maxlength="50"
          ></el-input>
        </el-form-item>
        <el-form-item label="排序:" prop="headerSort">
          <el-input
            size="mini"
            placeholder="请输入表头排序"
            v-model="menuForm.headerSort"
            maxlength="50"
          ></el-input>
        </el-form-item>
      </el-form>
      <div style="padding-top: 25px">
        <el-button type="primary" size="mini" @click="addHeader"
          >保存</el-button
        >
        <el-button @click="menuDrawer.visible = false" size="mini"
          >取 消</el-button
        >
      </div>
    </el-drawer>
  </div>
</template>

<script>
import triageConfigApi from "../../../api/triageConfig";
import TriageReport from "../../../api/triageReport";
import tableColumn from "../../../components/tableColumn";
export default {
  name: "triageReport",
  components: {
    tableColumn,
  },
  data() {
    return {
      saveDis: false,
      addedStatus: false, //是否新增
      ActiveId: null,
      ActiveClassify: {}, //选中分类
      classShow: null, //控制显示内容
      classifyForm: {}, //分类表单
      reportList: [], //右侧列表
      reportForm: {
        //报表表单
        isEnabled: 1,
        orderType: 0,
      },
      reportRules: {
        //报表必填值
        reportName: [
          { required: true, message: "报表名称必填", trigger: "blur" },
        ],
        reportTypeCode: [
          { required: true, message: "报表分类必填", trigger: "blur" },
        ],
        reportSql: [
          { required: true, message: "查询语句必填", trigger: "blur" },
        ],
        reportHead: [
          { required: true, message: "报表表头必填", trigger: "blur" },
        ],
        reportSortFiled: [
          {
            required: true,
            message: "排序字段必填",
            trigger: ["blur", "change"],
          },
        ],
        isEnabled: [
          {
            required: true,
            message: "是否启用必填",
            trigger: ["blur", "change"],
          },
        ],
      },

      tableData: [], //报表表头数据
      HeaderDrawer: {
        //预览表头
        title: "预览表头",
        visible: false,
        data: "",
      },
      Opens: [], //控制报表列表展示隐藏
      //------------------------------------
      menus: [], //表头设置
      menuDrawer: {
        //新增/编辑表头弹框
        title: "新增表头",
        visible: false,
      },
      menuForm: {}, //新增/编辑表头表单
      menuRules: {
        //表头表单必填值
        headerName: [
          { required: true, message: "表头名称必填", trigger: "blur" },
        ],
        headerField: [
          // { required: true, message: '表头字段必填', trigger: 'blur' },
          {
            required: true,
            validator: (rule, value, callback) => {
              console.log(/\s+/.test(value));
              if (!value) {
                return callback(new Error("查询字段必填"));
              } else if (/\s+/.test(value)) {
                callback(new Error("不能有空格"));
              } else if (!/(^[a-z]+$)/.test(value)) {
                callback(new Error("只能输入小写英文字母"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        headerSort: [
          { required: true, message: "表头排序必填", trigger: "blur" },
        ],
      },
      //------------------------------------
      queryDrawer: {
        //查询弹框
        title: "",
        visible: false,
      },
      queryFrom: {}, //查询条件表单
      queryRules: {
        //查询条件表单必填值
        queryName: [
          { required: true, message: "查询名称必填", trigger: "blur" },
        ],
        queryFiled: [
          {
            required: true,
            validator: (rule, value, callback) => {
              console.log(/\s+/.test(value));
              if (!value) {
                return callback(new Error("查询字段必填"));
              } else if (/\s+/.test(value)) {
                callback(new Error("不能有空格"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        queryType: [
          { required: true, message: "查询字段必填", trigger: "blur" },
        ],
      },
    };
  },
  computed: {},
  mounted() {
    this.getReportClass(); //初始化查询报表目录
  },
  methods: {
    getId() {
      //生成唯一标识
      let d = new Date().getTime();
      if (window.performance && typeof window.performance.now === "function") {
        d += performance.now();
      }
      let id = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          let r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
      );
      return id;
    },
    //------报表表头----start----
    addHeader() {
      //添加表头--确定按钮
      let _this = this;
      _this.$refs["menuForm"].validate((valid) => {
        //console.log(valid,_this.menuForm,_this.menuDrawer.title)
        if (valid) {
          let i = _this.menuForm.headerSort;
          if (_this.menuDrawer.type == "add") {
            //新增
            _this.menuForm.id = _this.getId();
            //console.log(_this.menuForm.id)
            _this.menus.splice(i, 0, _this.menuForm);
          } else if (_this.menuDrawer.type == "edit") {
            //编辑
            // _this.menus.splice(i,0,this.menuForm)
            function replaceVal(menus, val) {
              menus.forEach((m, i) => {
                if (m.id == val.id) {
                  Object.assign(menus[i], val);
                  menus.sort((a, b) => {
                    return a.headerSort - b.headerSort;
                  }); //升序
                } else if (m.children && m.children.length > 0) {
                  replaceVal(m.children, val);
                }
              });
            }
            replaceVal(_this.menus, _this.menuForm);
          } else if (_this.menuDrawer.type == "sub") {
            //新增子表头
            let line = _this.menus[_this.menuDrawer.index];
            //console.log(line)
            if (line.children === undefined) line.children = [];
            _this.menuForm.id = _this.getId();
            //console.log(_this.menuForm.id)
            line.children.splice(i, 0, _this.menuForm); //添加位置,删除位置,添加元素
          }
          _this.menuDrawer.visible = false;
          _this.$forceUpdate();
          //console.log(_this.menus)
        }
      });
    },
    editMenuDia(scope, type) {
      //新增/编辑
      //console.log(scope)
      this.menuForm = {};
      if (type == "add") {
        this.menuDrawer = {
          title: "新增表头",
          visible: true,
          type: "add",
        };
      } else if (type == "edit") {
        //编辑
        this.menuDrawer = {
          title: "编辑表头",
          visible: true,
          type: "edit",
        };
        this.menuForm = JSON.parse(JSON.stringify(scope.row));
      } else if (type == "sub") {
        //添加子菜单
        this.menuDrawer = {
          title: "添加子表头",
          visible: true,
          type: "sub",
          index: scope.$index,
        };
      }
      this.$nextTick(() => {
        this.$refs["menuForm"].clearValidate();
      });
    },
    deleteMenu(scope) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        //删除
        let _this = this;
        function recursion(menus) {
          for (let i = 0; i < menus.length; i++) {
            if (menus[i].id == scope.row.id) {
              menus.splice(i, 1);
              _this.ActiveId = null;
            } else if (menus[i].children && menus[i].children.length > 0) {
              recursion(menus[i].children);
            }
          }
        }
        recursion(_this.menus);
        _this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
    },
    //------报表表头----end-----
    handleOpen(i) {
      //点击图标三角形控制报表列表显示隐藏
      if (this.Opens[i] === undefined) {
        this.Opens[i] = true;
      } else {
        this.Opens[i] = !this.Opens[i];
      }
      this.$forceUpdate();
      //console.log(this.Opens)
    },
    TypeNameClick(itemReport, i) {
      //点击分类
      this.Opens[i] = true;
      this.classShow = true;
      this.addedStatus = false;
      this.classifyForm = {
        triageConfigName: itemReport.reportTypeName,
        id: itemReport.id,
        triageConfigCode: itemReport.reportTypeCode,
        sort: itemReport.sort,
      };
      this.ActiveClassify = itemReport;
      this.ActiveId = null;
      this.$nextTick(() => {
        this.$refs["classifyForm"].clearValidate();
      });
    },

    getReportClass() {
      //查询列表
      TriageReport.getTriageReport().then((res) => {
        this.saveDis = false;
        this.reportList = [];
        this.menus = []; //报表表头数据
        if (res.code === 200) {
          this.reportList = res.data;
          if (Object.keys(this.ActiveClassify).length == 0) {
            this.ActiveClassify = this.reportList[0];
            this.Opens[0] = true;
          }else{
            this.ActiveClassify = this.reportList.find(item=>{
              return item.id==this.ActiveClassify.id
            })
          }
          console.log(this.ActiveClassify,'---------------------')
          //分类详情
          this.classifyForm = {            
            triageConfigName: this.ActiveClassify.reportTypeName,
            id: this.ActiveClassify.id,
            triageConfigCode: this.ActiveClassify.reportTypeCode,
            sort: this.ActiveClassify.sort,
          };
          if (
            this.ActiveClassify.reportSettingDto &&
            this.ActiveClassify.reportSettingDto.length == 0
          ){

            this.classShow = true;
            this.ActiveId = null;
          }
          if (
            this.ActiveClassify.reportSettingDto &&
            this.ActiveClassify.reportSettingDto.length > 0 &&
            this.ActiveId === null
          ) {
            this.reportForm = this.ActiveClassify.reportSettingDto[0];
            this.menus = JSON.parse(this.reportForm.reportHead);
            this.ActiveId = this.reportForm.id;
            this.classShow = false;
            this.addedStatus = false;
          }
        }
      });
    },
    ReportDel() {//点击删除/取消
      //console.log('this.classShow:'+this.classShow,this.ActiveClassify,this.classifyForm)     
        if (this.classShow) {//分类
          if (this.classifyForm.id) { //删除
            if (this.ActiveClassify.reportSettingDto.length == 0) {
              this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
              }).then(() => {
                triageConfigApi
                  .deleteTriageConfig(this.ActiveClassify.id)
                  .then((res) => {
                    //console.log(res,'删除目录')
                    if (res.code === 200) {
                      this.ActiveClassify = {};
                      this.getReportClass();
                      this.$message.success("删除成功！");
                    } else {
                      this.$message.error("删除失败~");
                    }
                  });
              });
            } else {
              this.$message.warning("不可删除,有具体报表存在~");
            }
          } else {//取消
            this.classifyForm = {};
          }
        } else {//报表
          if (this.ActiveId) {//删除
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }).then(() => {

              TriageReport.delTriageReport(this.ActiveId).then((res) => {
                //console.log(res,'删除报表')
                if (res.code === 200) {
                  this.$message.success("删除成功！");
                  this.ActiveId = null;
                  this.getReportClass();
                } else {
                  this.$message.error("删除失败~");
                }
              });
            });
          } else {//取消
            this.reportForm = {
              //报表表单
              isEnabled: 1,
              orderType: 0,
            };
          }
        }
      
    },
    menuAdd() {
      //新增----分类
      this.addedStatus = true;
      this.classShow = true;
      this.classifyForm = {};
      this.ActiveClassify = {};
      this.ActiveId = null;
      this.$nextTick(() => {
        if (this.$refs["classifyForm"]) {
          this.$refs["classifyForm"].clearValidate();
        }
      });
    },
    reportAdd(itemReport) {
      //新增报表
      this.addedStatus = true;
      this.classShow = false;
      this.ActiveId = null;
      if (itemReport.id != this.ActiveClassify.id)
        this.ActiveClassify = itemReport;
      this.reportForm = {
        reportTypeCode: this.ActiveClassify.reportTypeCode,
        isEnabled: 1,
        orderType: 0,
      };
      this.menus = [];
      this.$nextTick(() => {
        if (this.$refs["reportForm"]) {
          this.$refs["reportForm"].clearValidate();
        }
      });
    },
    reportEidt(item, itemReport) {
      //点击报表名
      this.classShow = false;
      this.addedStatus = false;
      //console.log(item);
      this.ActiveClassify = itemReport;
      this.ActiveId = item.id;
      this.reportForm = item;
      this.menus = JSON.parse(this.reportForm.reportHead);
      this.$nextTick(() => {
        this.$refs["reportForm"].clearValidate();
      });
    },
    ReportSave() {
      //保存按钮
      if (this.classShow) {
        //分类保存
        this.$refs["classifyForm"].validate((valid) => {
          if (valid) {
            this.classifyForm.triageConfigType = "1016";
            if (this.ActiveClassify.id) {
              //修改
              this.saveDis = true;
              this.classifyForm.isDisable = 1;
              triageConfigApi
                .updateTriageConfig(this.classifyForm)
                .then((res) => {
                  if (res.code === 200) {
                    this.getReportClass();
                    this.$message.success("分类名称修改成功！");
                  } else {
                    this.$message.error("分类名称修改失败~");
                    this.saveDis = false;
                  }
                })
                .catch((err) => {
                  this.saveDis = false;
                  console.error("分类名称修改失败~" + err);
                });
            } else {
              //新增
              this.saveDis = true;
              triageConfigApi
                .saveTriageConfig(this.classifyForm)
                .then((res) => {
                  if (res.code === 200) {
                    this.getReportClass();
                    this.$message.success("分类名称新增成功！");
                  } else {
                    this.$message.error("分类名称新增失败，原因:" + res.msg);
                    this.saveDis = false;
                  }
                })
                .catch((err) => {
                  this.saveDis = false;
                  console.error("分类名称新增失败~" + err);
                });
            }
          }
        });
      } else {
        //报表保存
        if (this.menus.length) {
          // this.menus.forEach((o, i) => {
          //   o.index = i + 1;
          // });
          this.reportForm.reportHead = JSON.stringify(this.menus);
          // console.log(JSON.parse(this.reportForm.reportHead));
        } else {
          this.reportForm.reportHead = "";
        }
        this.$refs["reportForm"].validate((valid) => {
          if (valid) {
            this.saveDis = true;
            TriageReport.saveTriageReport(this.reportForm)
              .then((res) => {
                //console.log(res,'保存报表')
                if (res.code === 200) {
                  this.getReportClass();
                  this.$message.success("保存报表成功！");
                } else {
                  this.$message.error("保存失败~");
                  this.saveDis = false;
                }
              })
              .catch((err) => {
                this.saveDis = false;
                console.error("保存失败~" + err);
              });
          }
        });
      }
    },

    queryEdit(item) {
      console.log(item);
      this.queryFrom = item;
      this.queryDrawer = {
        title: "编辑查询条件",
        visible: true,
      };
      this.$nextTick(() => {
        if (this.$refs["queryFrom"]) {
          this.$refs["queryFrom"].clearValidate();
        }
      });
    },
    queryAdd() {
      //查询条件---新增查询条件
      this.queryFrom = {};
      this.queryDrawer = {
        title: "新增查询条件",
        visible: true,
      };
      this.$nextTick(() => {
        if (this.$refs["queryFrom"]) {
          this.$refs["queryFrom"].clearValidate();
        }
      });
    },
    queryDel(t) {
      this.reportForm.reportSettingQueryOption.splice(t, 1);
    },
    querySave() {
      //查询条件---编辑保存
      console.log(this.queryFrom, "this.queryFrom");
      this.$refs["queryFrom"].validate((valid) => {
        if (valid) {
          if (!this.queryFrom.sort) this.queryFrom.sort = 0; //默认为0
          let list = this.reportForm.reportSettingQueryOption || [];
          if (this.queryFrom.id) {
            //保存--编辑
            list = list.map((t) => {
              return t.id === this.queryFrom.id ? this.queryFrom : t;
            });
          } else if (this.queryFrom.temporaryId) {
            //新增--编辑
            list = list.map((t) => {
              return t.temporaryId === this.queryFrom.temporaryId
                ? this.queryFrom
                : t;
            });
          } else {
            //新增
            this.queryFrom.temporaryId = this.getId(); //生成临时id
            list.push(this.queryFrom);
          }
          list.sort((a, b) => {
            return a.sort - b.sort;
          }); //升序
          this.reportForm.reportSettingQueryOption = list;
          this.queryDrawer.visible = false;
          console.log(this.reportForm, "查询条件");
          this.$forceUpdate();
        }
      });
    },
  },
};
</script>
<style lang="scss" >
#triage-report {
  width: 100%;
  display: flex;
  height: 100%;
  .btn-box {
    height: 35px;
    padding: 10px 0 0px 20px;
    margin-bottom: 10px;
  }
  .form-box,
  .query-box,
  .list-box,
  .el-table__body-wrapper,
  .el-table__header-wrapper {
    // overflow-x: hidden;
    overflow: auto;
    &::-webkit-scrollbar {
      display: block;
      width: 10px;
      height: 10px;
      border-radius: 5px;
    }
    &::-webkit-scrollbar-track {
      background-color: #dcdfe6;
      border-radius: 3px;
    }
    /*定义滑块颜色、内阴影及圆角*/
    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: #bfbfbf;
    }
  }
  .el-form-item {
    //form表单样式
    margin-bottom: 12px;
    .el-textarea {
      width: 100%;
    }
    .el-input {
      width: 100%;
    }
    .el-form-item__label {
      line-height: 1;
      padding: 0 0 5px;
    }
    .el-form-item__content {
      line-height: normal;
    }
    .el-form-item__error {
      padding-top: 1px;
    }
  }
  .el-form--inline .el-form-item {
    margin-right: 25px;
  }
  .form-line {
    width: 10%;
  }
  .form-line1 {
    width: 25%;
  }
  .form-line2 {
    width: 60%;
  }
  .form-line3 {
    width: 90%;
  }
  .form-line4 {
    width: 100%;
    margin-right: 0 !important;
  }
  .form-line6 {
    margin-bottom: 0 !important ;
  }
  .report1 {
    .list-box {
      .sub-box {
        // width: 100%;
        // display: flex;
        // justify-content:center;
        // justify-items: center;
        width: 100%;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        cursor: pointer;
        position: relative;
        span {
          display: inline-block;
          width: calc(100% - 32px);
          padding-left: 20px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .el-icon-caret-bottom,
        .el-icon-caret-right {
          position: absolute;
          left: 18px;
          top: 30%;
        }
        .el-icon-plus {
          color: #1bad96;
          font-weight: bold;
          position: absolute;
          right: 10px;
          top: 35%;
        }
      }
      li.sub-line {
        height: 40px;
        line-height: 40px;
        padding-left: 50px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .isActive {
    background: #ecf5ff;
    color: #1bad96;
  }

  .report2 {
    .btn-box {
      height: 35px;
      padding: 0;
      margin-bottom: 10px;
    }
    .form-box {
      width: 100%;
      overflow: auto;
      .form-btn {
        display: inline-flex;
        flex-direction: column;
        position: absolute;
        .el-button {
          margin-left: 10px;
        }
        .el-button + .el-button {
          margin-top: 10px;
        }
      }
      // .query-content{
      //     width:100%;
      // }
      .query-box {
        display: inline-block;
        width: 90%;
        height: 100px;
        overflow: auto;
        border: 1px solid #dcdfe6;
        p {
          display: inline-block;
          padding-left: 15px;
          height: 25px;
          line-height: 25px;

          i + i {
            margin-left: 10px;
          }
          .el-icon-edit {
            color: #1bad96;
            margin-left: 15px;
            cursor: pointer;
          }
          .el-icon-delete {
            color: #f56c6c;
            cursor: pointer;
          }
        }
      }
      .query-btn {
        position: absolute;
        left: 90%;
        top: 0px;
        margin-left: 10px;
      }
    }
  }
  thead {
    width: 100%;
    height: 30px;
    background-color: #e4e7ed;
    color: #000;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    font-size: 16px;
    td {
      background-color: #e4e7ed;
      white-space: nowrap;
    }
    td:last-child {
      border-top-right-radius: 5px;
    }
    td:first-child {
      border-top-left-radius: 5px;
    }
  }
  tr {
    box-sizing: border-box;
    min-height: 30px;
    border-bottom: 1px solid #d2d5dd;
    width: 100%;
    td {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>