<!--
 * @Author: 吴应
 * @Date: 2021年4月19日10:39:30
 * @LastEditTime: 2021年4月19日10:39:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FileName: 身份信息识别
 * @FilePath: src\benchs\preHospital\layout\component\readerIdCard.vue
-->
<template>
  <div class="mode-main">
    <img src="../../../static/img/idCard.png" alt="" />
    <div class="btn-list">
      <!-- <el-button @click="selectFn('ReadIDCard')">读取</el-button> -->
      <!-- <el-button @click="selectFn('ReadSicard')">医保卡</el-button> -->
    </div>
  </div>
</template>
<script>
import moment from "moment";
import triageApi from "../../../api/triageApi";
import { mapGetters } from "vuex";
export default {
   name:'readerIdCard',
  data() {
    return {
      cardNum: "",
      PatientName: "",
      CardType: "",
      ws: null,
    };
  },
  computed: {
    ...mapGetters(["theme", "aidActivePatient"]),
  },
  created() {
    this.webSocketConnect();
  },
  destroyed() {
    if (this.ws) {
      this.ws.onclose();
    }
  },
  methods: {
      backFN(){
       this.$emit("backMethod",0);
    },
    //读取身份证/社保卡
    webSocketConnect() {
      let e_this = this;
      this.ws = new WebSocket("ws://127.0.0.1:23233");
      try {
        this.ws.onopen = function (event) {
          console.log(event);
        };

        this.ws.onclose = function (event) {
          console.log(event);
          try {
            this.ws.close();
            this.ws = null;
          } catch (ex) {
            console.log(ex);
          }
        };

        this.ws.onerror = function (event) {
           console.log(event);
          try {
            this.ws.close();
            this.ws = null;
          } catch (ex) {
            console.log(ex);
          }
          // WebSocketConnect();
        };
        this.ws.onmessage = function (res) {
          let data = JSON.parse(res.data).Data;
          e_this.cardNum = data.IdCard;
          e_this.PatientName = data.PatientName;

          //创建身份对象
          let obj = {};
          obj.IdentityNo = e_this.cardNum;
          obj.PatientName = e_this.PatientName; //姓名

          if (e_this.cardNum[16] % 2 == 0) {
            //性别
            obj.Sex = "女";
          } else {
            obj.Sex = "男";
          }
          obj.BirthDate = `${e_this.cardNum.substr(6, 4)}-${e_this.cardNum.substr(
            10,
            2
          )}-${e_this.cardNum.substr(12, 2)}`; //生日
          let duration = moment.duration(moment().diff(obj.BirthDate));
          const formatDuration = (duration) => {
            let years = duration.years();
            let months = duration.months();
            let days = duration.days();
            return `${years}岁${months}月${days}天`;
          };
          obj.Age = formatDuration(duration); //年龄
          obj.CardType = e_this.CardType;
          e_this.findExist(obj);
        };
      } catch (ex) {
        alert("ws异常错误!");
      }
    },
    //查询是否已存在
    findExist(obj) {
      obj.carNum = this.aidActivePatient.carNum;
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
             sessionStorage.setItem('selectPatient',res.data.patientId);
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
      type == "ReadIDCard" ? (this.CardType = "身份证") : (this.CardType = "医保卡");
      this.ws.send(JSON.stringify({ tsCode: type }));
    },
  },
};
</script>
<style lang="scss">
.mode-main {
}
</style>
