<!--
 * @Author: 吴应
 * @Date: 2021-4-15 14:33:19
 * @LastEditTime: 2021-05-28 10:32:21
 * @LastEditors: Linbaochang
 * @Description: In User Settings Edit
 * @FileName: 预检分诊
 * @FilePath: src\benchs\preHospital\views\preTriage\preTriage.vue
-->
<template>
  <div id="preTriage" v-loading="loading">
    <div class="preTriageTop">
      <div class="topH">
        <h3>
          <span>基础信息</span>
          <span v-if="!isEdit">
            <el-button @click="selectFn('ReadIDCard')"
              ><i
                class="
                  icon
                  iconfont
                  icon-a-jizhenlinchuangxinxixitongV20tubiao-021
                "
              ></i
              >身份证</el-button
            >
            <el-button @click="selectFn('ReadSicard')"
              ><i
                class="
                  icon
                  iconfont
                  icon-a-jizhenlinchuangxinxixitongV20tubiao-13
                "
              ></i
              >医保卡</el-button
            >
            <el-button @click="createNormalPatient()"
              ><i
                class="
                  icon
                  iconfont
                  icon-a-jizhenlinchuangxinxixitongV20tubiao-041
                "
              ></i
              >三无</el-button
            >
            <el-button @click="componentSlect('groupInjury')"
              ><i
                class="
                  icon
                  iconfont
                  icon-a-jizhenlinchuangxinxixitongV20tubiao-051
                "
              ></i
              >群伤事件</el-button
            >
            <span class="creat-box">
              <el-button
                type="primary"
                @click="createPatient()"
                v-ripple="'rgba(0, 0, 0, 0.25)'"
                ><i
                  class="
                    icon-color icon
                    iconfont
                    icon-a-jizhenlinchuangxinxixitongV20tubiao-10
                  "
                ></i>
                建档</el-button
              >
            </span>
            <span class="icon-box" @click="clearForm()">
              <i
                class="
                  icon-color icon
                  iconfont
                  icon-a-jizhenlinchuangxinxixitongV20tubiao-06
                "
              ></i>
            </span>
          </span>
        </h3>
      </div>
      <div class="patientMsg">
        <el-form :model="form" :rules="triageRules" ref="triageRuleForm">
          <el-form-item label="患者编号" prop="patientId">
            <el-input
              v-model="form.patientId"
              placeholder="请刷身份证/医保卡"
              disabled
              maxlength="50"
            >
            </el-input>
            <i
              class="postion-lin-r icon iconfont icon-bianji"
              @click="componentSlect('medicalHistoryList')"
            ></i>
          </el-form-item>
          <el-form-item label="姓名" prop="patientName">
            <el-input v-model="form.patientName" placeholder maxlength="50"
              ><el-button
                @click="searchPatint"
                slot="append"
                icon="el-icon-search"
                style="min-width: 40px"
              ></el-button
            ></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="form.sex">
              <el-radio
                v-for="o in options.Sex"
                :key="o.triageConfigCode"
                :label="o.triageConfigCode"
                >{{ o.triageConfigName }}</el-radio
              >
              <!-- <el-radio :label="'女'">女</el-radio>
              <el-radio :label="'未知'">未知</el-radio> -->
            </el-radio-group>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-date-picker
              class="input-item"
              v-model="form.birthday"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="患者年龄">
            <el-input v-model="form.age" maxlength="15"></el-input>
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input
              v-model="form.identityNo"
              maxlength="18"
              placeholder
              @blur="idCardIdentification"
              ><el-button
                slot="append"
                @click="searchPatint"
                icon="el-icon-search"
                style="min-width: 40px"
              ></el-button
            ></el-input>
          </el-form-item>
          <el-form-item label="民族">
            <el-select v-model="form.nation" clearable placeholder="请选择">
              <el-option
                v-for="item in options.Nation"
                :key="item.triageConfigCode"
                :label="item.triageConfigName"
                :value="item.triageConfigCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="身份">
            <el-select v-model="form.identity" clearable placeholder="请选择">
              <el-option
                v-for="item in options.IdentityType"
                :key="item.triageConfigCode"
                :label="item.triageConfigName"
                :value="item.triageConfigCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地址" class="tow-width">
            <el-input
              v-model="form.address"
              placeholder
              maxlength="200"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系人员">
            <el-input
              v-model="form.contactsPerson"
              placeholder
              maxlength="50"
            ></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input
              v-model="form.contactsPhone"
              @click="searchPatint"
              placeholder
              maxlength="50"
              ><el-button
                slot="append"
                icon="el-icon-search"
                style="min-width: 40px"
              ></el-button
            ></el-input>
          </el-form-item>
          <el-form-item label="费别">
            <el-select v-model="form.chargeType" clearable placeholder="请选择">
              <el-option
                v-for="item in options.Faber"
                :key="item.triageConfigCode"
                :label="item.triageConfigName"
                :value="item.triageConfigCode"
              ></el-option>
            </el-select>
            <span class="postion-lin-r r-button" v-if="form.patientId"
              >医保</span
            >
          </el-form-item>
          <el-form-item
            label="入院情况"
            class="tow-width"
            prop="admissionInfo.isSoreThroatAndCough"
            :rules="[
              { required: true, message: '请完善入院情况', trigger: 'change' },
            ]"
          >
            <div
              class="contacts-person show-scroll"
              @click="componentSlect('contactsPerson')"
            >
              <p>
                现病史:<span>{{ form.admissionInfo.medicalHistory }}</span>
              </p>
              <p>
                既往史:<span>{{ form.admissionInfo.pastMedicalHistory }}</span>
              </p>
              <p>个人史</p>
              <p>
                是否咽痛咳嗽:<span>{{
                  form.admissionInfo.isSoreThroatAndCough == ""
                    ? ""
                    : form.admissionInfo.isSoreThroatAndCough == "true"
                    ? "是"
                    : "否"
                }}</span>
              </p>
              <p>
                是否发热:<span>{{
                  form.admissionInfo.isHot == ""
                    ? ""
                    : form.admissionInfo.isHot == "true"
                    ? "是"
                    : "否"
                }}</span>
              </p>
              <p>
                是否去过中高风险区:<span>{{
                  form.admissionInfo.isMediumAndHighRisk == ""
                    ? ""
                    : form.admissionInfo.isMediumAndHighRisk == "true"
                    ? "是"
                    : "否"
                }}</span>
              </p>

              <p>
                是否聚集性发病:<span>{{
                  form.admissionInfo.isAggregation == ""
                    ? ""
                    : form.admissionInfo.isAggregation == "true"
                    ? "是"
                    : "否"
                }}</span>
              </p>
              <p>
                2周内是否接触过中高风险区发热患者:<span>{{
                  form.admissionInfo.isContactHotPatient == ""
                    ? ""
                    : form.admissionInfo.isContactHotPatient == "true"
                    ? "是"
                    : "否"
                }}</span>
              </p>
              <p>
                2周内是否接触过确诊新冠阳性患者:<span>{{
                  form.admissionInfo.isContactNewCoronavirus == ""
                    ? ""
                    : form.admissionInfo.isContactNewCoronavirus == "true"
                    ? "是"
                    : "否"
                }}</span>
              </p>
              <p>
                最近14天内您是否在集中隔离医学观察场所留观:<span>{{
                  form.admissionInfo.isFocusIsolated == ""
                    ? ""
                    : form.admissionInfo.isFocusIsolated == "true"
                    ? "是"
                    : "否"
                }}</span>
              </p>
              <p>
                2周内是否有境外旅居史:
                <span>
                  {{
                    form.admissionInfo.isBeenAbroad == ""
                      ? ""
                      : form.admissionInfo.isBeenAbroad == "true"
                      ? "是"
                      : "否"
                  }}</span
                >
              </p>
              <p v-if="form.admissionInfo.isBeenAbroad">
                具体国家/地区:
                <span>{{ form.admissionInfo.countrySpecific }}</span>
              </p>
              <p v-if="form.admissionInfo.isBeenAbroad">
                境外起止日期:<span
                  >{{ form.admissionInfo.abroadStartTime }}至{{
                    form.admissionInfo.abroadEndTime
                  }}</span
                >
              </p>
              <p v-if="form.admissionInfo.isBeenAbroad">
                回国日期:<span>{{ form.admissionInfo.returnTime }}</span>
              </p>
            </div>
          </el-form-item>
          <el-form-item label="重点病种">
            <el-select
              v-model="form.diseaseCode"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in options.KeyDiseases"
                :key="item.triageConfigCode"
                :label="item.triageConfigName"
                :value="item.triageConfigCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发病时间">
            <el-date-picker
              class="input-item"
              v-model="form.onsetTime"
              type="datetime"
              placeholder="选择日期时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="RFID">
            <el-input v-model="form.rfid" maxlength="15" placeholder="手环读取">
              <template slot="append">
                <el-button @click="getFrid" class="r-btn">读取</el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item> </el-form-item>
          <el-form-item> </el-form-item>
        </el-form>
        <div class="complained-content">
          <div class="weight">
            <span>体重（KG）</span
            ><el-input
              v-model="form.weight"
              oninput="value=value.replace(/[^0-9.]/g,'')"
              placeholder
              maxlength="5"
            ></el-input>
          </div>
          <div class="narration">
            <p>主诉</p>
            <div class="show-scroll">
              <span
                v-for="item in options.Narration"
                :key="item.triageConfigCode"
                :class="{
                  bor: selectOptions.Narration.find((o) => {
                    return item.triageConfigCode == o;
                  }),
                }"
                @click="changeSelect(item.triageConfigCode, 'Narration')"
                >{{ item.triageConfigName }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="select-item">
        <div class="comStyle">
          <p>来院方式</p>
          <div class="comStyle-item">
            <span
              v-for="item in options.ToHospitalWay"
              :key="item.triageConfigCode"
              :class="{
                bor: selectOptions.ToHospitalWay.find((o) => {
                  return item.triageConfigCode == o;
                }),
              }"
              @click="
                changeSelect(
                  item.triageConfigCode,
                  'ToHospitalWay',
                  false,
                  true
                )
              "
              >{{ item.triageConfigName }}</span
            >
          </div>
        </div>
        <div class="comStyle">
          <p>绿色通道</p>
          <div class="comStyle-item">
            <span
              v-for="item in options.GreenRoad"
              :key="item.triageConfigCode"
              :class="{
                bor: selectOptions.GreenRoad.find((o) => {
                  return item.triageConfigCode == o;
                }),
              }"
              @click="
                changeSelect(item.triageConfigCode, 'GreenRoad', false, true)
              "
              >{{ item.triageConfigName }}</span
            >
          </div>
        </div>
        <div class="comStyle">
          <p>就诊类型</p>
          <div class="comStyle-item">
            <span
              v-for="item in options.TypeOfVisit"
              :key="item.triageConfigCode"
              :class="{
                bor: selectOptions.TypeOfVisit.find((o) => {
                  return item.triageConfigCode == o;
                }),
              }"
              @click="
                changeSelect(item.triageConfigCode, 'TypeOfVisit', false, true)
              "
              >{{ item.triageConfigName }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="preTriageMid">
      <div class="preTriageMid-top">
        <h3>生命体征</h3>
      </div>
      <div class="vitalSigns">
        <div class="Vsone">
          <i class="icon iconfont icon-tubiao-84"></i>
          <div class="vsMsg">
            <span :class="TempClass">
              <el-input
                v-model="form.vitalSignInfo.temp"
                oninput="value=value.replace(/[^0-9.]/g,'')"
                maxlength="4"
                placeholder="--"
              ></el-input>
            </span>
            <span>----------</span>
            <span>体温(℃)</span>
          </div>
        </div>
        <div class="Vsone">
          <i class="icon iconfont icon-tubiao-85"></i>
          <div class="vsMsg">
            <span :class="HeartRateClass">
              <el-input
                v-model="form.vitalSignInfo.heartRate"
                oninput="value=value.replace(/[^\d]/g,'')"
                placeholder="--"
                maxlength="3"
              ></el-input>
            </span>
            <span>----------</span>
            <span>心率(次/分)</span>
          </div>
        </div>
        <div class="Vsone">
          <i class="icon iconfont icon-tubiao-86"></i>
          <div class="vsMsg">
            <span :class="BreathClass">
              <el-input
                v-model="form.vitalSignInfo.breathRate"
                oninput="value=value.replace(/[^\d]/g,'')"
                placeholder="--"
                maxlength="3"
              ></el-input>
            </span>
            <span>----------</span>
            <span>呼吸(次/分)</span>
          </div>
        </div>
        <div class="Vsone">
          <i class="icon iconfont icon-tubiao-87"></i>
          <div class="vsMsg">
            <span :class="SBPClass">
              <el-input
                v-model="form.vitalSignInfo.sbp"
                oninput="value=value.replace(/[^\d]/g,'')"
                placeholder="--"
                maxlength="3"
              ></el-input>
            </span>
            <span>----------</span>
            <span>收缩压(mmHg)</span>
          </div>
        </div>
        <div class="Vsone">
          <i class="icon iconfont icon-tubiao-88"></i>
          <div class="vsMsg">
            <span :class="DBPClass">
              <el-input
                v-model="form.vitalSignInfo.sdp"
                oninput="value=value.replace(/[^\d]/g,'')"
                placeholder="--"
                maxlength="3"
              ></el-input>
            </span>
            <span>----------</span>
            <span>舒张压(mmHg)</span>
          </div>
        </div>
        <div class="Vsone">
          <i class="icon iconfont icon-tubiao-89"></i>
          <div class="vsMsg">
            <span :class="SPO2Class">
              <el-input
                v-model="form.vitalSignInfo.spO2"
                oninput="value=value.replace(/[^\d]/g,'')"
                placeholder="--"
                maxlength="3"
              ></el-input>
            </span>
            <span>----------</span>
            <span>SPO2(%)</span>
          </div>
        </div>

        <div class="Vsone">
          <i class="icon iconfont icon-naoke"></i>
          <div class="select-consciousness">
            <div style="color: #808080; padding-bottom: 6px">意识</div>
            <el-select
              v-model="form.consciousness"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in options.Mind"
                :key="item.triageConfigCode"
                :label="item.triageConfigName"
                :value="item.triageConfigCode"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="Vsone">
          <i
            class="icon iconfont icon-a-jizhenlinchuangxinxixitongV20tubiao-141"
          ></i>
          <div class="select-consciousness">
            <div style="color: #808080; padding-bottom: 6px">备注</div>
            <el-select
              v-model="form.vitalSignInfo.remark"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in options.VitalSignRemark"
                :key="item.triageConfigCode"
                :label="item.triageConfigName"
                :value="item.triageConfigCode"
              ></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="vital-signs-top">
        <div class="get-btn">
          <el-select
            v-model="form.vitalSignInfo.deviceCode"
            clearable
            placeholder="请选择"
            @change="changeDevice"
          >
            <el-option
              v-for="item in triageDeviceOptions"
              :key="item.deviceCode"
              :label="item.deviceName"
              :value="item.deviceCode"
            ></el-option>
          </el-select>
          <el-button type="primary" @click="selectMonitor()">
            <i class="icon iconfont icon-guanlian"></i>
            获取
          </el-button>
        </div>
        <span class="icon-box" @click="initVitalSignInfo()">
          <i
            class="
              icon-color icon
              iconfont
              icon-a-jizhenlinchuangxinxixitongV20tubiao-06
            "
          ></i>
        </span>
      </div>
    </div>
    <div class="preTriageLast">
      <div class="patientScore">
        <h3>病人评分</h3>
        <span
          v-for="item in gradeOption"
          :key="item.scoreType"
          :class="{
            bor1:
              scoreType == item.scoreType ||
              scoreData[item.scoreType.toLowerCase() + 'Data'].level != '',
          }"
          @click="
            scoreType = item.scoreType;
            changeDialogModel(item);
          "
          v-html="
            item.scoreName == '判定依据'
              ? `<i class='icon-color icon iconfont icon-a-jizhenlinchuangxinxixitongV20tubiao-10'></i>`
              : item.scoreName
          "
        ></span>
        <div class="text-sty show-scroll">
          <p v-if="vitalSignMsg.level">
            <span :class="'grade-sty' + vitalSignMsg.code">{{
              vitalSignMsg.level
            }}</span>
            <em> 生命体征评级：{{ vitalSignMsg.level }}级 </em>
            <!-- <i
              class="el-icon-error clear-icon"
              @click="initVitalSignInfo()"
            ></i> -->
          </p>
          <p
            v-for="(o, j) in scoreData.judgmentData.multipleSelection"
            :key="o.id"
          >
            <span :class="'grade-styTriageLevel_00' + o.emergencyLevel">
              {{
                o.emergencyLevel == 1
                  ? "I"
                  : o.emergencyLevel == 2
                  ? "II"
                  : o.emergencyLevel == 3
                  ? "III"
                  : o.emergencyLevel == 4
                  ? "IVa"
                  : o.emergencyLevel == 5
                  ? "IVb"
                  : ""
              }}
            </span>
            <em>
              {{
                "[" + scoreData.judgmentData.categoryCurrentRow.itemName + "]"
              }}
              {{
                "[" + scoreData.judgmentData.complainedCurrentRow.itemName + "]"
              }}
              {{ o.itemName }}</em
            >
            <i
              class="el-icon-error clear-icon"
              @click="clearMultipleSelection(j)"
            ></i>
          </p>
          <p
            v-for="i in dataLength -
            scoreData.judgmentData.multipleSelection.length"
            :key="i"
          >
            <template
              v-if="
                form.scoreInfo[i - 1] &&
                form.scoreInfo[i - 1].scoreType != 'Judgment'
              "
            >
              <span :class="'grade-sty' + form.scoreInfo[i - 1].levelCode">
                {{ form.scoreInfo[i - 1].scoreDescription.split("级")[0] }}
              </span>
              <em>
                {{
                  form.scoreInfo[i - 1]
                    ? form.scoreInfo[i - 1].scoreType +
                      "评分：" +
                      (form.scoreInfo[i - 1].scoreValue ||
                      form.scoreInfo[i - 1].scoreValue == 0
                        ? form.scoreInfo[i - 1].scoreValue
                        : form.scoreInfo[i - 1].scoreDescription)
                    : ""
                }}
              </em>
              <i
                class="el-icon-error clear-icon"
                @click="clearScore(form.scoreInfo[i - 1].scoreType)"
              ></i>
            </template>
          </p>
        </div>
      </div>
      <div class="separateTreatment">
        <h3>分诊处置</h3>
        <div class="triageGrade triageBox">
          <p><span class="required">*</span>分诊级别</p>
          <div class="span-box">
            <span
              v-for="item in options.TriageLevel"
              :key="item.triageConfigCode"
              :class="
                level == item.triageConfigCode
                  ? `grade-sty${item.triageConfigCode}`
                  : ''
              "
              @click="
                level = item.triageConfigCode;
                changeAotuLevel(item.triageConfigCode);
              "
              >{{ item.triageConfigName }}</span
            >
          </div>
        </div>
        <div class="triageDepartment triageBox">
          <p><span class="required">*</span>分诊科室</p>
          <div class="span-box">
            <span
              v-for="item in options.TriageDepartment"
              :key="item.triageConfigCode"
              :class="{
                bor: selectOptions.TriageDepartment.find((o) => {
                  return item.triageConfigCode == o;
                }),
              }"
              @click="
                changeSelect(
                  item.triageConfigCode,
                  'TriageDepartment',
                  false,
                  true
                )
              "
              >{{ item.triageConfigName }}</span
            >
          </div>
        </div>
        <div class="triageFrom triageBox">
          <p><span> </span>分诊去向</p>
          <div class="span-box">
            <span
              v-for="item in options.TriageDirection"
              :key="item.triageConfigCode"
              :class="{
                bor: selectOptions.TriageDirection.find((o) => {
                  return item.triageConfigCode == o;
                }),
              }"
              @click="
                changeSelect(
                  item.triageConfigCode,
                  'TriageDirection',
                  false,
                  true
                );
                changeAotuDept(item.triageConfigCode);
              "
              >{{ item.triageConfigName }}</span
            >
          </div>
        </div>
        <div class="sub-button">
          <el-button v-if="isEdit" @click="closeEdit">取消</el-button>
          <el-button v-else @click="saveTriageRecord(0)">暂存</el-button>
          <el-button type="primary" @click="saveTriageRecord(1)"
            >确认分诊</el-button
          >
        </div>
      </div>
    </div>
    <el-dialog
      :title="scoringModel.scoreName"
      :visible.sync="scoringWindowOpen"
      :width="dialogWidth"
      :close-on-click-modal="false"
      :before-close="scoringWindowClose"
      :append-to-body="isEdit ? true : false"
      v-dialogDrag
    >
      <component
        :is="scoreType"
        :age="form.age"
        :scoreData="scoreData"
        :vitalSignInfo="form.vitalSignInfo"
        @putScoreData="putScoreData"
        :ref="scoreType"
        :key="timer"
      ></component>
      <span slot="footer" class="dialog-footer">
        <el-button @click="scoringWindowClose">取消</el-button>
        <el-button
          type="primary"
          @click="
            scoringWindowOpen = false;
            getScoreData();
          "
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-drawer
      :title="componentTitle"
      :size="drawerSize"
      :visible.sync="drawerVisible"
      :before-close="drawerClose"
      :wrapperClosable="false"
      :destroy-on-close="true"
      :modal="false"
    >
      <component
        :is="componentType"
        :componentData="componentData[componentType]"
        @updateMethod="updateMethod"
        @drawerClose="drawerClose"
        :key="timer"
      ></component>
      <!-- <groupInjury
        @updateMethod="updateMethod"
        @groupInjuryDrawerClose="drawerClose"
      ></groupInjury> -->
    </el-drawer>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import triageApi from "../../api/triageApi";
import levelTriageRelationDirection from "../../api/levelTriageRelationDirection";
import baseSettingApi from "../../api/baseSettingApi";
import moment from "moment";
import Ache from "./components/painMode";
import ESI from "./components/esiMode";
import Trauma from "./components/traumaMode";
import GCS from "./components/gcsMode";
import Mews from "./components/mewsMode";
import Start from "./components/startMode";
import Rems from "./components/remsMode";
import FALL from "./components/fallMode";
import Judgment from "./components/judgmentMode";
import groupInjury from "./components/groupInjury";
import medicalHistoryList from "./components/medicalHistoryList";
import contactsPerson from "./components/contactsPerson";
export default {
  name: "preTriage",
  props: ["isEdit", "preTriagePatientId"],
  components: {
    Ache,
    ESI,
    Trauma,
    GCS,
    Mews,
    Start,
    Rems,
    FALL,
    Judgment,
    groupInjury,
    medicalHistoryList,
    contactsPerson,
  },
  data() {
    return {
      triageDept: "",
      drawerSize: 800,
      TempClass: "",
      HeartRateClass: "",
      SPO2Class: "",
      BreathClass: "",
      SBPClass: "",
      DBPClass: "",
      isNoAutoSet: false, //用于回处理显时自动分诊会覆盖手动分诊结果
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        },
      },
      remarkOption: [
        {
          label: "拒测",
          value: "拒测",
        },
        {
          label: "疫苗",
          value: "疫苗",
        },
        {
          label: "开药",
          value: "开药",
        },
        {
          label: "死亡",
          value: "死亡",
        },
      ],
      timer: "", //用于组件更新
      dataLength: 5,
      scoreData: {},
      componentType: "",
      componentTitle: "",
      componentData: {
        medicalHistoryList: [],
        contactsPerson: {},
        groupInjury: null,
      },
      loading: true,
      drawerVisible: false,
      dialogWidth: "980px",
      showModel: "",
      scoringWindowOpen: false,
      scoringModel: "",
      level: "",
      scoreType: "",
      form: {},
      gradeOption: [],
      options: {},
      selectOptions: {
        ToHospitalWay: [], //来院方式
        GreenRoad: [], //绿色通道
        TriageDepartment: [], //分诊科室
        TriageDirection: [], //分诊去向
        TypeOfVisit: [], //就诊类型
        Narration: [], //主诉
      },
      patientData: {},
      autoGradeType: "002", //自动计算级别
      vsExpressionList: [],
      vsExpressionVal: {
        SBP: "",
        SPO2: "",
        HeartRate: "",
        Temp: "",
        Breath: "",
        DBP: "",
      },
      websock: null,
      triageDeviceOptions: [],
      triageRules: {
        patientId: [
          { required: true, message: "患者未建档", trigger: "change" },
        ],
        patientName: [
          { required: true, message: "请输入患者姓名", trigger: "change" },
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
      },
      vitalSignMsg: {}, //体征评级结果对象
      levelTriageRelationDirectionArr: [],
    };
  },

  destroyed() {
    if (this.websock) {
      this.websock.onclose();
    }
  },
  computed: {
    ...mapGetters(["theme"]),
  },
  watch: {
    level: {
      handler(val) {
        if (val) {
          this.setDep(val);
        }
      },
    },
    "form.vitalSignInfo.sbp": function (val) {
      this.aoutSetLevel("SBP", val);
    },
    "form.vitalSignInfo.spO2": function (val) {
      this.aoutSetLevel("SPO2", val);
    },
    "form.vitalSignInfo.heartRate": function (val) {
      this.aoutSetLevel("HeartRate", val);
    },
    "form.vitalSignInfo.temp": function (val) {
      this.setValue(val);
      this.aoutSetLevel("Temp", val);
    },
    "form.vitalSignInfo.breathRate": function (val) {
      this.aoutSetLevel("Breath", val);
    },
    "form.vitalSignInfo.sdp": function (val) {
      this.aoutSetLevel("DBP", val);
    },
    "form.scoreInfo": function () {
      this.setScoreContent();
    },
    "form.birthday": function (val) {
      if (val) {
        this.form.age = this.formatDuration(val);
      }
    },
    "scoreData.judgmentData.multipleSelection": function () {
      this.setScoreContent();
    },
    deep: true,
    immediate: true,
  },
  created() {
    this.initForm();
    this.initScoreInfo();
    this.getScoreManageList();
    this.webSocketConnect();
    this.triageConfigList();
    this.selectLevelTriageRelationDirection();
  },
  mounted() {},

  methods: {
    ...mapActions({
      setTemporaryTotal: "previewTriage/temporaryTotal",
    }),
    changeDevice() {
      //记住选择的设备
      localStorage.setItem(
        "vitalSignDeviceCode",
        this.form.vitalSignInfo.deviceCode
      );
    },
    //手动变更分诊去向
    changeAotuDept(val) {
      this.form.consequenceInfo.changeDept = this.triageDept + "=>" + val;
    },
    //手动变更评分等级
    changeAotuLevel(val) {
      this.form.consequenceInfo.changeLevel = this.level + "=>" + val;
    },
    //格式化年龄
    formatDuration(val) {
      let duration = moment.duration(moment().diff(val));
      let years = duration.years();
      let months = duration.months();
      let days = duration.days();
      let hours = Math.ceil(duration.asHours());
      //小于1岁
      if (years == 0) {
        //小于1个月
        if (months == 0) {
          //小于1天计算小时
          if (days == 0) {
            if (hours == 0) {
              return `1天`;
            } else {
              return `${hours}小时`;
            }
          } else {
            return `${days}天`;
          }
        }
        //大于一个月
        else {
          //天数等于0
          if (days == 0) {
            return `${months}月1天`;
          }
          //天数大于0
          else {
            return `${months}月${days}天`;
          }
        }
      }
      //大于 1岁
      else {
        if (years < 6) {
          //小于0岁
          if (months < 1) {
            //
            return `${years}岁1月`;
          } else {
            return `${years}岁${months}月`;
          }
        } else {
          //大于6岁
          return `${years}岁`;
        }
      }
    },
    searchPatint() {},
    //获取分诊级别对应分诊去向列表
    selectLevelTriageRelationDirection() {
      levelTriageRelationDirection
        .selectLevelTriageRelationDirection()
        .then((res) => {
          if (res.code == 200) {
            this.levelTriageRelationDirectionArr = res.data;
          } else {
            this.$message("级别关联分诊去向列表失败原因：" + res.msg);
          }
        })
        .catch((err) => {
          console.error("级别关联分诊去向列表失败原因：" + err);
        });
    },
    componentSlect(type) {
      this.componentType = type;
      switch (type) {
        case "contactsPerson":
          this.componentTitle = "入院情况";
          this.componentData[type] = this.form.admissionInfo;
          this.drawerSize = 600;
          break;
        case "groupInjury":
          this.componentTitle = "创建群伤事件";
          this.drawerSize = 665;
          break;
        default:
          this.componentTitle = "选择病历";
          this.drawerSize = 800;
          break;
      }
      this.timer = new Date().getTime();
      this.drawerVisible = true;
    },
    //获取设备列表
    triageDeviceList() {
      baseSettingApi
        .triageDeviceList()
        .then((res) => {
          if (res.code == 200) {
            this.triageDeviceOptions = res.data;
            //回显上次选择设备
            if (!this.form.vitalSignInfo.deviceCode) {
              this.triageDeviceOptions.forEach((o) => {
                if (
                  localStorage.getItem("vitalSignDeviceCode") == o.deviceCode
                ) {
                  this.form.vitalSignInfo.deviceCode = o.deviceCode;
                }
              });
            }
          } else {
            this.$message("获取设备失败原因：" + res.msg);
          }
        })
        .catch((err) => {
          console.error("获取设备失败原因：" + err);
        });
    },
    //初始化form表单
    initForm() {
      this.form = {
        visitNo: "", //就诊次数
        patientId: "", //患者id
        patientName: "", //患者姓名
        sex: "", //患者性别
        birthday: "", //患者出生日期
        address: "", //患者住址
        identity: "", //患者身份
        identityNo: "", //身份证号
        contactsPerson: "", //紧急联系人
        contactsPhone: "", //联系人电话
        nation: "", //民族
        toHospitalWay: "", //来院方式
        typeOfVisitCode: "", //就诊类型
        chargeType: "", //费别
        onsetTime: "", //发病时间
        greenRoad: "", //绿色通道
        cardNo: "", //医保卡卡号
        rfid: "", //RFID
        age: "", //患者年龄
        weight: "", //体重
        diseaseCode: "", //重点病种
        startTriageTime: "", //分诊开始时间
        isNoThree: false, //是否三无
        narration: "", //主诉
        consciousness: "", //意识
        triageUserCode: "",
        triageUserName: "",
        vitalSignInfo: {
          sbp: "", //收缩压
          sdp: "", //舒张压
          spO2: "", //血氧饱和度
          breathRate: "", //呼吸
          temp: "", //体温
          heartRate: "", //心率
          deviceCode: "", //设备
          remark: "", //备注
        },
        consequenceInfo: {
          triageDept: "", //分诊科室编码
          changeDept: "", //分诊科室变更
          triageTarget: "", //分诊去向编码
          otherTriageTarget: "", //其他分诊去向：二次分诊
          actTriageLevel: "", //实际分诊级别
          autoTriageLevel: "", //自动分诊级别
          changeLevel: "", //分诊级别变更
        },
        scoreInfo: [],
        admissionInfo: {
          medicalHistory: "", //现病史
          pastMedicalHistory: "", //既往史
          isSoreThroatAndCough: "false", //是否咽痛咳嗽
          isHot: "false", //是否发热
          isMediumAndHighRisk: "false", //是否去过中高风险区
          isAggregation: "false", //是否聚集性发病
          isContactHotPatient: "false", //2周内是否接触过中高风险区发热患者
          isContactNewCoronavirus: "false", //2周内是否接触过确诊新冠阳性患者
          isFocusIsolated: "false", //最近14天内您是否在集中隔离医学观察场所留观
          isBeenAbroad: "false", //2周内是否有境外旅居史
          countrySpecific: "", //具体国家/地区
          abroadStartTime: "", //境外开始日期
          abroadEndTime: "", //境外结束日期
          returnTime: "", //回国日期
        },
      };
      this.selectOptions.ToHospitalWay = [];
      this.selectOptions.GreenRoad = [];
      this.selectOptions.TypeOfVisit = [];
      this.selectOptions.Narration = [];
    },
    //清除表单
    clearForm() {
      this.form.visitNo = ""; //就诊次数
      this.form.patientId = ""; //患者id
      this.form.patientName = ""; //患者姓名
      this.form.sex = ""; //患者性别
      this.form.birthday = ""; //患者出生日期
      this.form.address = ""; //患者住址
      this.form.identity = ""; //患者身份
      this.form.identityNo = ""; //身份证号
      this.form.contactsPerson = ""; //紧急联系人
      this.form.contactsPhone = ""; //联系人电话
      this.form.nation = ""; //民族
      this.form.toHospitalWay = ""; //来院方式
      this.form.typeOfVisitCode = ""; //就诊类型
      this.form.chargeType = ""; //费别
      this.form.onsetTime = ""; //发病时间
      this.form.greenRoad = ""; //绿色通道
      this.form.cardNo = ""; //医保卡卡号
      this.form.rfid = ""; //RFID
      this.form.age = ""; //患者年龄
      this.form.weight = ""; //体重
      this.form.diseaseCode = ""; //重点病种
      this.form.startTriageTime = ""; //分诊开始时间
      this.form.isNoThree = false; //是否三无
      this.form.narration = ""; //主诉
      this.form.consciousness = ""; //意识
      this.form.triageUserCode = "";
      this.form.triageUserName = "";
      this.form.admissionInfo = {
        medicalHistory: "", //现病史
        pastMedicalHistory: "", //既往史
        isSoreThroatAndCough: "false", //是否咽痛咳嗽
        isHot: "false", //是否发热
        isMediumAndHighRisk: "false", //是否去过中高风险区
        isAggregation: "false", //是否聚集性发病
        isContactHotPatient: "false", //2周内是否接触过中高风险区发热患者
        isContactNewCoronavirus: "false", //2周内是否接触过确诊新冠阳性患者
        isFocusIsolated: "false", //最近14天内您是否在集中隔离医学观察场所留观
        isBeenAbroad: "false", //2周内是否有境外旅居史
        countrySpecific: "", //具体国家/地区
        abroadStartTime: "", //境外开始日期
        abroadEndTime: "", //境外结束日期
        returnTime: "", //回国日期
      };
      this.selectOptions.ToHospitalWay = [];
      this.selectOptions.GreenRoad = [];
      this.selectOptions.TypeOfVisit = [];
      this.selectOptions.Narration = [];
    },
    initVitalSignInfo() {
      this.form.vitalSignInfo = {
        sbp: "", //收缩压
        sdp: "", //舒张压
        spO2: "", //血氧饱和度
        breathRate: "", //呼吸
        temp: "", //体温
        heartRate: "", //心率
        weight: "", //体重
        deviceCode: "", //设备
        remark: "", //备注
      };
      this.form.consciousness = "";
    },
    initSelectOptions() {
      this.selectOptions = {
        ToHospitalWay: [], //来院方式
        GreenRoad: [], //绿色通道
        TriageDepartment: [], //分诊科室
        TriageDirection: [], //分诊去向
        TypeOfVisit: [], //就诊类型
        Narration: [], //主诉
      };
    },
    //查询是否已存在
    findExist(obj) {
      if (!this.aidActivePatient.patientId) {
        obj.EmrPatientInfoId = this.aidActivePatient.emrPatientInfoId;
      }
      obj.taskInfoId = this.aidActivePatient.taskInfoId;
      triageApi
        .getPatientRecord(obj)
        .then((res) => {
          if (res.code == 200) {
            // 存储临时患者信息 考虑到浏览器缓存有限所以只能用sessionStorage
            let arr = JSON.parse(sessionStorage.getItem("temporaryPatient"));
            if (!arr) {
              arr = [res.data];
            } else {
              arr.push(res.data);
            }
            sessionStorage.setItem("temporaryPatient", JSON.stringify(arr));
            this.$router.push({ path: "/connectCar/preTriage" });
            this.$emit("updateMethod");
          } else {
            this.$emit("patientMsg", obj);
          }
        })
        .catch((err) => {
          console.error("查询患者档案是否存在失败：", err);
        });
    },
    //选择读取类型
    selectFn(type) {
      type == "ReadIDCard"
        ? (this.CardType = "身份证")
        : (this.CardType = "医保卡");
      if (!this.ws) {
        this.$message.error("连接读卡器设备失败");
        return;
      }
      this.ws.send(JSON.stringify({ tsCode: type }));
    },
    //读取rfid
    getFrid() {
      if (!this.ws) {
        this.$message.error("连接读卡器设备失败");
        return;
      }
      this.ws.send(JSON.stringify({ tsCode: "ReadM1" }));
    },
    //读取身份证/社保卡
    webSocketConnect() {
      let e_this = this;
      this.ws = new WebSocket("ws://127.0.0.1:23233");
      try {
        // this.ws.onopen = function (event) {
        //   // console.log(event);
        // };

        this.ws.onclose = function (event) {
          console.log(event);
          try {
            e_this.ws.close();
            e_this.ws = null;
          } catch (ex) {
            console.log(ex);
          }
        };

        this.ws.onerror = function () {
          // e_this.$message.error("连接读卡器设备失败");
          try {
            e_this.ws.close();
            e_this.ws = null;
          } catch (ex) {
            console.log(ex);
          }
          // WebSocketConnect();
        };
        this.ws.onmessage = function (res) {
          let data = JSON.parse(res.data);
          if (data.Code == 200) {
            if (data.Data.Birthday) {
              if (data.Data.CardNum) {
                e_this.form.cardNo = data.Data.CardNum;
              }
              e_this.form.identityNo = data.Data.IdCard;
              e_this.form.patientName = data.Data.PatientName;
              e_this.idCardIdentification();
            } else {
              e_this.form.rfid = data.Data.CardId;
            }
          } else {
            e_this.$message.error(data.Msg);
          }
        };
      } catch (ex) {
        alert("ws异常错误!");
      }
    },
    //drawer组件返回
    updateMethod(data) {
      this.drawerVisible = false;
      switch (this.componentType) {
        case "contactsPerson":
          this.form.admissionInfo = data;
          //触发校验
          this.$refs["triageRuleForm"].validate();
          break;
        case "groupInjury":
          this.$router.push({ path: "/medicalRecord/AOERecordFind" });
          break;
        default:
          this.getPatientInfo(data);
          break;
      }
    },
    //身份证识别
    idCardIdentification() {
      const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (reg.test(this.form.identityNo)) {
        if (this.form.identityNo[16] % 2 == 0) {
          //性别
          this.form.sex = this.options.Sex.find((o) => {
            return o.triageConfigName == "女";
          }).triageConfigCode;
        } else {
          this.form.sex = this.options.Sex.find((o) => {
            return o.triageConfigName == "男";
          }).triageConfigCode;
        }
        this.form.birthday = `${this.form.identityNo.substr(
          6,
          4
        )}-${this.form.identityNo.substr(10, 2)}-${this.form.identityNo.substr(
          12,
          2
        )}`; //生日
        console.log(this.form.birthday);
        let duration = moment.duration(moment().diff(this.form.birthday));
        const formatDuration = (duration) => {
          let years = duration.years();
          let months = duration.months();
          let days = duration.days();
          return `${years}岁${months}月${days}天`;
        };
        this.form.age = formatDuration(duration); //年龄
      }
    },
    //创建三无
    createNormalPatient() {
      if (this.form.sex == "") {
        this.$message("请选择性别");
        return;
      }
      let e_this = this;
      //性别
      let sex = this.options.Sex.find((o) => {
        return o.triageConfigCode == e_this.form.sex;
      }).triageConfigName;
      let markNum = moment(new Date()).format("YYYYMMDDHHmmss");
      this.form.patientName = `无名氏 ${sex}${markNum}`;
      this.form.isNoThree = true;
    },
    //建档
    createPatient() {
      if (this.form.patientName == "") {
        this.$message("输入姓名");
        return;
      }
      if (this.form.sex == "") {
        this.$message("请选择性别");
        return;
      }
      this.$confirm("确认建档?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.loading = true;
          let obj = JSON.parse(JSON.stringify(this.form));
          obj.birthday = this.form.birthday
            ? this.form.birthday + " 00:00:00"
            : ""; //患者出生日期
          triageApi
            .postPatientRecord(obj)
            .then((res) => {
              this.loading = false;
              if (res.code == 200) {
                // 存储临时患者信息 考虑到浏览器缓存有限所以只能用sessionStorage
                Object.keys(res.data).forEach((key) => {
                  if (!res.data[key]) {
                    delete res.data[key];
                  }
                });
                console.log(res.data, "建档返回的有值的字段");
                this.form = { ...this.form, ...res.data };
                this.form.startTriageTime = moment(new Date()).format(
                  "YYYY-MM-DD HH:mm:ss"
                );
                this.$message.success("建档成功");
              } else {
                this.$message.error("建档失败，原因：" + res.msg);
              }
            })
            .catch((err) => {
              this.loading = false;
              console.error("建档失败，原因：" + err);
            });
        })
        .catch(() => {});
    },
    //关闭群伤显示
    drawerClose() {
      this.drawerVisible = false;
    },
    //初始化scoreData
    initScoreInfo() {
      this.scoreData = {
        acheData: {
          scoreType: "Ache",
          titleCode: 0,
          value: 0,
          level: "",
          valueFPS: 0,
          valueNRS: 0,
          valueFC: 0,
          valueFCItem: {
            faceVal: -1, //face index
            cryVal: -1, //哭闹cry
            posVal: -1, //体位
            comVal: -1,
            legActivityVal: -1,
          },
        },
        mewsData: {
          scoreType: "Mews",
          value: 0,
          level: "",
          heartRateVal: 0,
          systolicVal: 0,
          respiratoryVal: 0,
          temperatureVal: 0,
          consciousnessVal: 0,
          heartRateCode: -1,
          systolicCode: -1,
          respiratoryCode: -1,
          temperatureCode: -1,
          consciousnessCode: -1,
        },
        gcsData: {
          scoreType: "GCS",
          value: 0,
          level: "",
          eyesVal: 0,
          langVal: 0,
          motionVal: 0,
        },
        remsData: {
          scoreType: "Rems",
          value: 0,
          level: "",
          pulseVal: 0, //当前脉搏脉搏
          spo2Val: 0, //当前spo2
          shrinkVal: 0, //当前收缩压
          breathingVal: 0, //当前呼吸频率
          ageVal: 0, //当前年龄
          pulseCode: -1, //当前脉搏脉搏选择
          spo2Code: -1, //当前spo2选择
          shrinkCode: -1, //当前收缩压选择
          breathingCode: -1, //当前呼吸频率选择
          ageCode: -1, //当前年龄选择
          remsGcsData: {
            value: 3,
            eyesVal: 1,
            langVal: 1,
            motionVal: 1,
          },
        },
        traumaData: {
          scoreType: "Trauma",
          value: 0,
          level: "",
          resRateVal: -1, //呼吸频率
          sysVal: -1, //收缩压
          resRadianVal: -1, //呼吸弧度
          bloodVal: -1, //毛细血管
          traumaGcsData: {
            value: 3,
            eyesVal: 1,
            langVal: 1,
            motionVal: 1,
          },
        },
        startData: {
          scoreType: "Start",
          level: "",
          walkVal: false, //行走
          pulseVal: false, //脉搏
          breatheVal: true, //呼吸
          breatheHVal: false, //呼吸大于30
          awarenessVal: true, //意识
          airwayVal: true, //气道
        },
        esiData: {
          scoreType: "ESI",
          level: "",
          endangered: false, //濒危
          resource: "", //资源
          wait: false, //等待
          acute: false, //急症
          abnormal: true, //异常
        },
        judgmentData: {
          scoreType: "Judgment",
          level: "",
          categoryIndex: 0,
          complainedIndex: 0,
          categoryCurrentRow: {},
          complainedCurrentRow: {},
          multipleSelection: [],
        },
        fallData: {
          scoreType: "FALL",
          level: "",
        },
      };
      this.form.scoreInfo.forEach((o) => {
        Object.keys(this.scoreData).forEach((key) => {
          if (o.scoreType === this.scoreData[key].scoreType) {
            this.scoreData[key] = JSON.parse(o.scoreContent);
          }
        });
      });
    },
    //删除评分内容
    clearScore(type) {
      let index = this.form.scoreInfo.findIndex((o) => {
        return o.scoreType == type;
      });
      //删除项目
      this.form.scoreInfo.splice(index, 1);
      //重新赋值
      this.scoreType = "";
      this.initScoreInfo();
      this.putScoreData(this.scoreData);
    },
    //删除判定依据
    clearMultipleSelection(i) {
      this.scoreData.judgmentData.multipleSelection.splice(i, 1);
      if (this.scoreData.judgmentData.multipleSelection.length == 0) {
        this.scoreType = "";
        this.scoreData.judgmentData = {
          scoreType: "Judgment",
          level: "",
          categoryIndex: 0,
          complainedIndex: 0,
          categoryCurrentRow: {},
          complainedCurrentRow: {},
          multipleSelection: [],
        };
      }
      this.setJudgmentLevel();

      this.putScoreData(this.scoreData);
    },
    // 设置评分虚线
    setScoreContent() {
      console.log(
        this.scoreData.judgmentData.multipleSelection.length +
          this.form.scoreInfo.length >
          5
      );
      if (
        this.scoreData.judgmentData.multipleSelection.length +
          this.form.scoreInfo.length >
        5
      ) {
        this.dataLength =
          this.scoreData.judgmentData.multipleSelection.length +
          this.form.scoreInfo.length;
      } else {
        this.dataLength = 5;
      }
    },
    //计算判定依据最大项等级
    setJudgmentLevel() {
      let i = 6;
      this.scoreData.judgmentData.multipleSelection.forEach((o) => {
        if (o.emergencyLevel < i) {
          i = o.emergencyLevel;
        }
      });
      this.scoreData.judgmentData.value = i;
      switch (i) {
        case 1:
          this.scoreData.judgmentData.level = "I级";
          break;
        case 2:
          this.scoreData.judgmentData.level = "II级";
          break;
        case 3:
          this.scoreData.judgmentData.level = "III级";
          break;
        case 4:
          this.scoreData.judgmentData.level = "IVa级";
          break;
        case 5:
          this.scoreData.judgmentData.level = "IVb级";
          break;
        default:
          this.scoreData.judgmentData.level = "";
          break;
      }
    },
    //根据等级设置分诊去向
    setDep(value) {
      if (this.levelTriageRelationDirectionArr.length) {
        let obj = this.levelTriageRelationDirectionArr.find((o) => {
          return o.triageLevelCode == value;
        });
        if (obj) {
          this.selectOptions.TriageDirection = [obj.triageDirectionCode];
        } else {
          this.selectOptions.TriageDirection = [];
        }
      }
      if (this.isNoAutoSet) {
        this.selectOptions.TriageDirection = [
          this.form.consequenceInfo.triageTarget,
        ];
      }
      this.triageDept = this.selectOptions.TriageDirection.join(",");
    },
    //子组件返回评分数据
    putScoreData(gistData) {
      this.scoreData = gistData;
      console.log(this.scoreData);
      this.form.scoreInfo = [];
      this.$forceUpdate();
      let arr = [];
      Object.keys(gistData).forEach((key) => {
        this.setScoreInfo(key, gistData);
        if (gistData[key].level) {
          arr.push(gistData[key].level);
        }
      });
      this.setScoreLevel(arr);
    },
    //设置提交内容中评分数据
    setScoreInfo(key, gistData) {
      if (gistData[key].level) {
        let levelCode = "";
        if (key != "judgmentData") {
          switch (gistData[key].level) {
            case "I级":
              levelCode = "TriageLevel_001";
              break;
            case "II级":
              levelCode = "TriageLevel_002";
              break;
            case "III级":
              levelCode = "TriageLevel_003";
              break;
            case "IVa级":
              levelCode = "TriageLevel_004";
              break;
            case "IVb级":
              levelCode = "TriageLevel_005";
              break;
            default:
              levelCode = "TriageLevel_000";
              9087;
              break;
          }
          this.form.scoreInfo.push({
            levelCode: levelCode, //评分等级code
            scoreType: gistData[key].scoreType, //评分类型
            scoreValue: gistData[key].value, //评分数值
            scoreDescription: gistData[key].level, //评分等级
            scoreContent: JSON.stringify(gistData[key]), //评分内容Json
            time: gistData[key].time, //时间，用于排序
          });
          //根据时间进行排序，实现当前提交评分显示在最后
          this.form.scoreInfo.sort(function (a, b) {
            //callback
            if (a.time > b.time) {
              return 1; //返回正数 ，b排列在a之前
            } else {
              return -1; //返回负数 ，a排列在b之前
            }
          });
        }
      }
      if (key == "judgmentData" && gistData[key].level != "") {
        //判定依据
        this.form.scoreInfo.push({
          levelCode: "TriageLevel_00" + gistData[key].value, //评分等级code
          scoreType: gistData[key].scoreType, //评分类型
          scoreValue: gistData[key].value, //评分数值
          scoreDescription: gistData[key].level, //评分等级
          scoreContent: JSON.stringify(gistData[key]), //评分内容Json
        });
      }
      console.log(this.form.scoreInfo, "this.form.scoreInfo");
    },
    //生命体征自动计算等级
    aoutSetLevel(type, value) {
      let obj = this.vsExpressionList.find((o) => {
        return o.itemName == type;
      });
      if (!obj) {
        return;
      }
      if (value === "") {
        this.vsExpressionVal[type] = 6;
      } else if (obj.stLevelExpression && eval(obj.stLevelExpression)) {
        this.vsExpressionVal[type] = 1;
      } else if (obj.ndLevelExpression && eval(obj.ndLevelExpression)) {
        this.vsExpressionVal[type] = 2;
      } else if (obj.rdLevelExpression && eval(obj.rdLevelExpression)) {
        this.vsExpressionVal[type] = 3;
      } else if (obj.thALevelExpression && eval(obj.thALevelExpression)) {
        this.vsExpressionVal[type] = 4;
      } else if (obj.thBLevelExpression && eval(obj.thBLevelExpression)) {
        this.vsExpressionVal[type] = 5;
      } else {
        this.vsExpressionVal[type] = 6;
      }
      this[type + "Class"] = `grade-sty_00${this.vsExpressionVal[type]}`;
      //动态添加类
      let arr = [];
      for (var j in this.vsExpressionVal) {
        if (this.vsExpressionVal[j]) {
          arr.push(this.vsExpressionVal[j]);
        }
      }
      this.vsArr = arr; //生命体征评级结果
      let s = 6;
      if (arr.length) {
        s = arr.reduce((a, b) => {
          return a > b ? b : a;
        });
      }

      let level = "";
      switch (s) {
        case 1:
          level = "I";
          break;
        case 2:
          level = "II";
          break;
        case 3:
          level = "III";
          break;
        case 4:
          level = "IVa";
          break;
        case 5:
          level = "IVb";
          break;
        default:
          break;
      }
      this.vitalSignMsg = {
        ...{
          code: "TriageLevel_00" + s,
          level,
        },
      };
      if (this.scoreArr) {
        arr = [...arr, ...this.scoreArr];
      }
      if (arr.length) {
        this.level =
          "TriageLevel_00" +
          arr.reduce((a, b) => {
            return a > b ? b : a;
          });
      } else {
        this.level = "TriageLevel_006";
      }
      if (this.isNoAutoSet) {
        this.level = this.form.consequenceInfo.actTriageLevel;
      }
    },
    //设置评分等级
    setScoreLevel(arr) {
      arr.forEach((o, i) => {
        switch (o) {
          case "I级":
            arr[i] = 1;
            break;
          case "II级":
            arr[i] = 2;
            break;
          case "III级":
            arr[i] = 3;
            break;
          case "IVa级":
            arr[i] = 4;
            break;
          case "IVb级":
            arr[i] = 5;
            break;
          default:
            arr[i] = 6;
            break;
        }
      });
      this.scoreArr = arr; //评分评级结果
      if (this.vsArr) {
        arr = [...arr, ...this.vsArr];
      }
      if (arr.length) {
        this.level =
          "TriageLevel_00" +
          arr.reduce((a, b) => {
            return a > b ? b : a;
          });
      } else {
        this.level = "TriageLevel_006";
      }
      if (this.isNoAutoSet) {
        this.level = this.form.consequenceInfo.actTriageLevel;
      }
    },
    //获取评分数据
    getScoreData() {
      this.$refs[this.scoreType].putScoreData();
    },
    //获取评分管理列表
    getScoreManageList() {
      baseSettingApi
        .getScoreManageList({ IsEnable: "true" })
        .then((res) => {
          this.vitalSignExpressionList();
          if (res.code == 200) {
            this.gradeOption = res.data;
          } else {
            this.$message.error("获取评分管理列表失败" + res.msg);
          }
        })
        .catch((err) => {
          this.vitalSignExpressionList();
          console.error("获取评分管理列表失败" + err);
        });
    },
    setValue(val) {
      if (parseFloat(val).toString() == "NaN") {
        return;
      }
      //体温自动显示两位数
      let i = `${val / 10}`.split(".")[0].length;
      if (i < 2) {
        return;
      }
      this.form.vitalSignInfo.temp = val / Math.pow(10, i - 1);
    },
    //选择评分模块
    changeDialogModel(model) {
      this.timer = new Date().getTime();
      if (this.scoreType === "Rems") {
        this.dialogWidth = "1150px";
      } else if (this.scoreType === "Trauma") {
        this.dialogWidth = "1030px";
      } else if (this.scoreType === "Mews") {
        this.dialogWidth = "820px";
      } else if (this.scoreType === "Ache") {
        this.dialogWidth = "888px";
      } else if (this.scoreType === "ESI" || this.scoreType === "Start") {
        this.dialogWidth = "780px";
      }
      if (this.scoringModel == model) {
        this.scoringWindowOpen = !this.scoringWindowOpen;
      } else {
        this.scoringModel = model;
        this.scoringWindowOpen = true;
      }
    },
    //关闭评分窗口
    scoringWindowClose() {
      this.scoringWindowOpen = false;
      this.scoreType = "";
    },

    /**选择逻辑
     * optionCode 选择的code
     * optionsName 当前操作的选择项
     * type 类型 true/false 是否为至少选中一个
     * only 是否为单选 true/false
     */
    changeSelect(optionCode, optionsName, type, only) {
      //获取索引
      let i = this.selectOptions[optionsName].findIndex((o) => {
        return optionCode == o;
      });
      if (i === -1 && only) {
        this.selectOptions[optionsName] = [optionCode];
        return;
      } else if (i === -1) {
        //不存在直接添加
        this.selectOptions[optionsName].push(optionCode);
        return;
      }
      if (this.selectOptions[optionsName].length > 1) {
        //如果数据大于1条直接删除
        this.selectOptions[optionsName].splice(i, 1);
        return;
      } else {
        //如果数据小于1条，判断是否必选一项
        if (type) {
          return;
        }
        //删除该项
        this.selectOptions[optionsName] = [];
      }
    },
    //获取生命体征计算规则
    vitalSignExpressionList() {
      triageApi
        .vitalSignExpressionList()
        .then((res) => {
          this.getPatientInfo();
          if (res.code == 200) {
            this.vsExpressionList = res.data;
          } else {
            this.$message.error("获取生命体征计算规则失败原因：" + res.msg);
          }
        })
        .catch((err) => {
          this.getPatientInfo();
          console.error("获取生命体征计算规则失败原因：" + err);
        });
    },
    //获取监护仪数据
    selectMonitor() {
      triageApi
        .selectMonitor({ deviceCode: this.form.vitalSignInfo.deviceCode })
        .then((res) => {
          if (res.code == 200) {
            this.$message.success("生命体征数据获取成功");
            // HR心率
            // RR呼吸频率
            // SpO2血氧饱和度
            // NIBP_PR无创脉率
            // NIBP_SYS无创收缩压
            // NIBP_DIA无创舒张压
            // NIBP_MAP无创平均压
            // P1_SYS 有创收缩压
            // P1_DIA有创舒张压
            // P1_MAP有创平均压
            // CVP中心静脉压
            // BIS 脑电图性成分
            // Temp体温
            //       sbp: "", //收缩压
            // sdp: "", //舒张压
            // spO2: "", //血氧饱和度
            // breathRate: "", //呼吸
            // temp: "", //体温
            // heartRate: "", //心率
            // weight: "", //体重
            // deviceCode: "", //设备
            // remark: "", //备注
            console.log();
            res.data.signs_data.ObservationDatas.forEach((o) => {
              switch (o.Category) {
                case "HR":
                  this.form.vitalSignInfo.heartRate = o.Result;
                  break;
                case "RR":
                  this.form.vitalSignInfo.breathRate = o.Result;
                  break;
                case "SpO2":
                  this.form.vitalSignInfo.spO2 = o.Result;
                  break;
                // case "NIBP_PR":this.form.vitalSignInfo.heartRate = o.Result
                //   break;
                // case "NIBP_SYS":this.form.vitalSignInfo.sbp = o.Result
                //   break;
                // case "NIBP_DIA":this.form.vitalSignInfo.sdp = o.Result
                //   break;
                case "NIBP_MAP":
                  this.form.vitalSignInfo.heartRate = o.Result;
                  break;
                case "P1_SYS":
                  this.form.vitalSignInfo.sbp = o.Result;
                  break;
                case "P1_DIA":
                  this.form.vitalSignInfo.sdp = o.Result;
                  break;
                // case "P1_MAP":this.form.vitalSignInfo.heartRate = o.Result
                //   break;
                // case "CVP":this.form.vitalSignInfo.heartRate = o.Result
                //   break;
                // case "BIS":this.form.vitalSignInfo.heartRate = o.Result
                //   break;
                case "Temp":
                  this.form.vitalSignInfo.temp = o.Result;
                  break;
                default:
                  break;
              }
            });
          } else {
            this.$message.error("获取监护仪数据失败原因：" + res.msg);
          }
        })
        .catch((err) => {
          console.error("获取监护仪数据失败原因：" + err);
        });
    },

    //获取字典
    triageConfigList() {
      triageApi
        .triageConfigList({
          TriageConfigType:
            "1001,1003,1004,1005,1006,1007,1008,1009,1011,1012,1015,1017,1018,1019",
        })
        .then((res) => {
          if (res.code == 200) {
            this.options = res.data;
          } else {
            this.$message("获取字典失败原因：" + res.msg);
          }
        })
        .catch((err) => {
          console.error("获取字典失败原因：" + err);
        });
    },
    //回显转换
    strToArr(val) {
      if (!val) {
        return [];
      }
      if (val.indexOf(",") != -1) {
        return val.split(",");
      } else {
        return [val];
      }
    },
    //获取档案
    getPatientInfo(preTriagePatientId) {
      this.initSelectOptions();
      this.initForm();
      this.triageDeviceList();
      this.level = "";
      if (this.preTriagePatientId) {
        //患者已建档直接读取档案
        this.loading = true;
        triageApi
          .patientInfoByInput({
            patientId: preTriagePatientId
              ? preTriagePatientId
              : this.preTriagePatientId,
          })
          .then((res) => {
            this.loading = false;
            this.isNoAutoSet = true;
            if (res.code == 200) {
              //TODO 后端调整后移除
              if (!res.data.vitalSignInfo) {
                delete res.data.vitalSignInfo;
              }
              if (!res.data.admissionInfo) {
                delete res.data.admissionInfo;
              }
              if (!res.data.consequenceInfo) {
                delete res.data.consequenceInfo;
              } else {
                this.selectOptions.TriageDepartment = this.strToArr(
                  res.data.consequenceInfo.triageDept
                );
                this.selectOptions.TriageDirection = this.strToArr(
                  res.data.consequenceInfo.triageTarget
                );
              }
              this.selectOptions.GreenRoad = this.strToArr(res.data.greenRoad);
              this.selectOptions.TypeOfVisit = this.strToArr(
                res.data.typeOfVisitCode
              );
              this.selectOptions.Narration = this.strToArr(res.data.narration);
              this.selectOptions.ToHospitalWay = this.strToArr(
                res.data.toHospitalWay
              );
              this.form = Object.assign(this.form, res.data);
              //回显评分数据
              this.initScoreInfo();
              this.putScoreData(this.scoreData);
            } else {
              this.$message("获取患者档案失败原因：" + res.msg);
            }
            let e_this = this;
            setTimeout(() => {
              e_this.isNoAutoSet = false;
              console.log("执行了");
            }, 50);
          })
          .catch((err) => {
            this.loading = false;
            console.error("获取患者档案失败原因：" + err);
          });
      } else {
        this.loading = false;
      }
    },
    //取消
    closeEdit() {
      this.$emit("closeEdit");
    },
    //保存分诊息
    saveTriageRecord(state) {
      console.log(state == 1, "state");
      this.$refs["triageRuleForm"].validate((valid) => {
        if (valid) {
          if (this.form.triageUserCode) {
            if (
              this.$store.state.app.userInfo.userName !=
              this.form.triageUserCode
            ) {
              this.$message.error("仅分诊人有修改权限");
              return;
            }
          }

          if (this.form.identityNo != "") {
            const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if (!reg.test(this.form.identityNo)) {
              this.$message.error("身份证号码不正确");
              return;
            }
          }

          if (state == 1 && !this.level) {
            this.$message.error("请选择分诊级别");
            return;
          }
          if (state == 1 && this.selectOptions.TriageDepartment.length == 0) {
            this.$message.error("请选择分诊科室");
            return;
          }
          this.form.triageUserCode = this.$store.state.app.userInfo.userName;
          this.form.triageUserName = this.$store.state.app.userInfo.name;
          //分诊去向
          this.form.consequenceInfo.triageTarget =
            this.selectOptions.TriageDirection.join(",");
          //分诊科室
          this.form.consequenceInfo.triageDept =
            this.selectOptions.TriageDepartment.join(",");

          //未填入院信息，删除入院对象
          if (this.form.isSoreThroatAndCough == "") {
            delete this.form.admissionInfo;
          }
          //分诊处置
          this.form.consequenceInfo.autoTriageLevel = this.autoGradeType;
          this.form.consequenceInfo.actTriageLevel = this.level;
          if (
            this.form.birthday &&
            this.form.birthday.indexOf("00:00:00") == -1
          ) {
            this.form.birthday = this.form.birthday + " 00:00:00";
          }

          //来院方式
          this.form.toHospitalWay = this.selectOptions.ToHospitalWay.join(",");
          //绿通
          this.form.greenRoad = this.selectOptions.GreenRoad.join(",");
          //就诊类型
          this.form.narration = this.selectOptions.Narration.join(",");
          //就诊主诉
          this.form.typeOfVisitCode = this.selectOptions.TypeOfVisit.join(",");
          this.form.triageStatus = state;
          this.loading = true;
          triageApi
            .saveTriageRecord(this.form)
            .then((res) => {
              this.loading = false;
              if (res.code == 200) {
                // 重新加载头部患者信息，获取新增的患者
                this.$message.success(state == 1 ? "确认分诊成功" : "暂存成功");

                if (state != 1) {
                  this.setTemporaryTotal();
                }
                if (this.isEdit) {
                  this.setTemporaryTotal();
                  this.$emit("saveSuccess");
                } else {
                  // //刷新页面
                  // location.reload();
                  //清空页面数据
                  this.level = "";
                  this.initForm();
                  this.initVitalSignInfo();
                  this.initScoreInfo();
                  this.initSelectOptions();
                  this.form.vitalSignInfo.deviceCode = localStorage.getItem(
                    "vitalSignDeviceCode"
                  );
                }
              } else {
                this.$message.error(
                  state == 1
                    ? "确认分诊失败,原因：" + res.msg
                    : "暂存失败,原因：" + res.msg
                );
              }
            })
            .catch((err) => {
              this.loading = false;
              console.error("保存分诊信息失败原因：" + err);
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss">
@import "../../assets/css/_handle.scss";
#preTriage {
  padding: 12px 14px 12px 16px;
  h3 {
    margin: 8px;
    font-size: 16px;
    font-weight: 700;
    color: #1bad96;
    margin-left: 10px;
    display: inline-block;
  }
  .preTriageTop {
    position: relative;
    padding: 0px 10px 8px 10px;
    background: rgb(255, 255, 255);
    border-radius: 5px;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
    .topH {
      display: flex;
      align-items: center;
      h3 {
        width: 100%;
        > span {
          padding-right: 30px;
        }
        .el-button {
          border-color: #1bad96;
          min-width: 85px;
          padding: 9px 8px;
          height: 35px;
          font-size: 16px;

          > span {
            position: relative;
            padding-left: 22px;
            .iconfont {
              margin-left: 0;
              padding-right: 3px;
              font-size: 24px;
              color: #1bad96;
              position: absolute;
              left: -4px;
              top: -4px;
            }
            .icon-color {
              color: #fff;
            }
          }
        }
        .creat-box {
          margin-left: 30px;
          .el-button {
            > span {
              .iconfont {
                font-size: 20px;
                top: -2px;
              }
            }
          }
        }
      }
      .icon-box {
        float: right;
        position: relative;
        top: 2px;
      }
    }
    .patientMsg {
      display: flex;
      position: relative;
      .el-form {
        height: 200px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .el-form-item {
          width: 20%;
          display: flex;
          margin-bottom: 10px;
          .el-form-item__error {
            top: 84%;
          }
          .el-form-item__label {
            width: 6em;
          }
          .el-form-item__content {
            width: 200px;
            line-height: 35px;
            .el-input__inner {
              padding: 0 8px;
            }
            .el-date-editor.el-input,
            .el-date-editor.el-input__inner {
              width: auto;
            }
            .el-input--prefix .el-input__inner {
              padding: 0 30px;
            }
            .el-input--suffix {
              width: 200px;
            }
            .r-btn {
              min-width: 40px;
            }
            .postion-lin-r {
              position: absolute;
              top: 0;
              right: -20px;
              cursor: pointer;
              color: #1bad96;
              font-size: 20px;
            }
            .r-button {
              height: 35px;
              line-height: 35px;
              text-align: center;
              right: -43px;
              top: 3px;
              width: 40px;
              background: #f2f7fa;
              border-radius: 5px;
              font-size: 14px;
              color: #000;
            }
          }
        }
        .tow-width {
          width: 40%;
          .el-form-item__content {
            width: 81.5%;
            position: relative;
            margin-right: -12%;
            .el-form-item__error {
              top: 218%;
            }
            .contacts-person {
              padding: 0 10px;
              width: 100%;
              border-radius: 5px;
              border: 1px solid #dcdfe6;
              height: 86px;
              overflow-y: auto;
              position: absolute;
              p {
                line-height: 22px;
                span {
                  padding-left: 20px;
                }
              }
            }
          }
          .el-input {
            width: 100%;
          }
        }
        .el-textarea {
          position: absolute;
          top: 5px;
          width: 90%;
        }
      }
      .complained-content {
        width: 40%;
        height: 328px;

        display: flex;
        flex-flow: column;
        .weight {
          height: 54px;
          > span {
            font-size: 14px;
            padding-right: 10px;
          }
          .el-input {
            width: 64%;
          }
        }
        .narration {
          width: 98%;
          border: 1px solid #d2d5dd;
          padding: 8px;
          border-radius: 5px;

          > p {
            margin-right: 10px;
            margin-bottom: 10px;
            color: #1bcd96;
          }
          > div {
            height: 230px;
            overflow-y: auto;
            span {
              margin-bottom: 10px;
              padding: 0 8px;
              display: inline-block;
              // min-width: 80px;
              height: 30px;
              line-height: 30px;
              margin-right: 7px;
              text-align: center;
              @include font_color("font_color2");
              @include background_color("background_color26");
              border-radius: 5px;
              cursor: pointer;
              font-size: 16px;
              font-weight: 400;
            }
          }
        }
      }
    }
    .select-item {
      position: absolute;
      top: 258px;
      width: 82%;
      padding-left: 15px;
    }
  }
  .comStyle {
    display: flex;
    > p {
      margin-right: 10px;
      width: 80px;
    }
    .comStyle-item {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      span {
        margin-bottom: 10px;
        padding: 0 8px;
        display: inline-block;
        min-width: 80px;
        height: 30px;
        line-height: 30px;
        margin-right: 7px;
        text-align: center;
        @include font_color("font_color2");
        @include background_color("background_color26");
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        font-weight: 400;
      }
    }
  }
  .text-sty {
    height: 180px;
    overflow-y: auto;
    > p {
      height: 35px;
      line-height: 35px;
      border-bottom: 1px dashed #cdcdcd;
      padding: 5px 10px;
      margin: 0 55px;
      display: flex;
      align-items: center;
      em {
        height: 35px;
        line-height: 35px;
        display: inline-block;
        font-style: normal;
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .clear-icon {
        cursor: pointer;
        float: right;
        line-height: 30px;
        font-size: 18px;
        color: #ebebeb;
      }
      span {
        display: inline-block;
        border-radius: 50%;
        margin-right: 2px;
        width: 22px;
        height: 22px;
        line-height: 22px;
        text-align: center;
        font-size: 12px;
        position: relative;
        top: 0;
      }
    }
  }
  .preTriageMid {
    border-radius: 5px;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
    padding: 8px 10px 12px 15px;
    margin-top: 10px;
    background: rgb(255, 255, 255);
    position: relative;
    .vitalSigns {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .Vsone {
        display: flex;
        align-items: center;
        padding: 0 10px;
        .select-consciousness {
          margin-left: 25px;
          .el-select {
            width: 120px;
          }
        }

        > i {
          font-size: 42px;
          color: #1bad96;
        }
        .vsMsg {
          margin-left: 20px;
          display: flex;
          flex-direction: column;
          span {
            color: #cdcdcd;
            .el-input {
              width: 80px;
              .el-input__inner {
                border: 0;
                font-size: 40px;
                padding: 0;
              }
            }
          }
          span:first-child {
            font-size: 39px;
            font-weight: 400;
            color: #464646;
            height: 35px;
          }
          span:last-child {
            color: #959595;
          }
        }
      }
    }
    .vital-signs-top {
      display: flex;
      position: absolute;
      justify-content: space-between;
      padding: 0 28px;
      width: 100%;
      top: 10px;
      left: 10px;
      .get-btn {
        margin-left: 64px;
        display: flex;
        .el-button {
          padding: 0 8px;
          border: 0;
          font-size: 16px;
          width: 85px;
          height: 35px;
          line-height: 20px;
          i {
            position: relative;
            top: 1px;
            color: #fff;
            font-size: 20px;
            cursor: pointer;
          }
        }
      }
      .el-select {
        width: 180px;
        margin: 0 10px;
      }
    }
  }
  .preTriageLast {
    height: 246px;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    .patientScore {
      border-radius: 5px;
      box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
      background: rgb(255, 255, 255);
      padding: 8px 10px 20px 15px;
      width: 49.7%;
      > i {
        padding-right: 15px;
      }
      > span {
        margin-bottom: 10px;
        display: inline-block;
        padding: 0 8px;
        height: 30px;
        line-height: 30px;
        margin-right: 10px;
        text-align: center;
        flex-shrink: 0;
        cursor: pointer;
        @include font_color("font_color2");
        @include background_color("background_color26");
        border-radius: 4px;
      }
      .el-button {
        color: #1bad96;
        padding: 6px 12px;
      }
    }
    .separateTreatment {
      border-radius: 5px;
      box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
      background: rgb(255, 255, 255);
      padding: 8px 10px 20px 15px;
      width: 49.7%;
      .triageBox {
        font-size: 16px;
        display: flex;
        color: #000000;
        font-weight: 400;
        p {
          flex-shrink: 0;
          margin-right: 10px;
          line-height: 30px;
          > span {
            padding-right: 4px;
            display: inline-block;
            width: 5px;
          }
        }
        .span-box {
          > span {
            margin-bottom: 10px;
            display: inline-block;
            padding: 0 8px;
            height: 30px;
            min-width: 90px;
            line-height: 30px;
            margin-right: 10px;
            text-align: center;
            flex-shrink: 0;
            cursor: pointer;
            @include font_color("font_color2");
            @include background_color("background_color26");
            border-radius: 4px;
          }
        }
      }
    }
    .sub-button {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      > button {
        width: 150px;
        height: 60px;
        font-size: 22px;

        > span {
          line-height: 30px;
        }
      }
      .el-button--primary {
        background: #1bad96;
        border-color: #1bad96;
      }
    }
  }
  .bor {
    background: #1bad96 !important;
    color: #fff !important;
    border-color: #1bad96 !important;
  }
  .bor1 {
    background: #1bc9ad !important;
    color: #fff !important;
    border-color: #1bad96;
  }
  .title-con {
    padding: 0;
    font-size: 16px;
    color: #1a1a1a;
    font-weight: bold;
  }
  .my-footer {
    text-align: left;
    color: #808080;
  }

  .icon-box {
    cursor: pointer;
    display: inline-block;
    line-height: 35px;
    text-align: center;
    margin-left: 10px;
    width: 35px;
    height: 35px;
    background: #f2f7fa;
    border-radius: 5px;
    .icon-color {
      color: #a6a6a6;
      position: relative;
      font-size: 24px;
      font-weight: 400;
    }
  }
  .el-drawer__body {
    overflow-y: auto;
    padding-left: 20px;
    padding-right: 10px;
  }
}
</style>
