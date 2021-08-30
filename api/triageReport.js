/*     分诊报表接口定义
******* 基础配置-->分诊设置-->分诊报表
*/
import request from "@/utils/request";

//报表目录保存接口
/*  triageConfig,js文件中
    triageConfigApi.saveTriageConfig = function (data) {
        return request({
            method: 'POST',
            url: '/api/TriageService/triageConfig/saveTriageConfig',
            data: data
        })
    }
    data:
    {
        "triageConfigCode": "string",
        "triageConfigName": "string",
        "isDisable": 1,默认启动
        "triageConfigType": 1016,
        "py": "string",
        "sort": 0,//排序
        "remark": "string"
    }
*/
/*  /api/TriageService/triageConfig/triageConfigList
    {
        "id": "2d87f01f-3de7-904c-09f2-39fd77384ccc",
        "triageConfigCode": "TriageReportType_002",
        "triageConfigName": "查询报表",
        "isDisable": 1,
        "triageConfigType": 1016,
        "py": "CXBB",
        "sort": 2,
        "remark": ""
    },
 */

      const TriageReport = {}

      /// 获取所有分诊报表列表
        TriageReport.getTriageReport = function (params) {
            return request({
                method: 'GET',
                url: '/api/TriageService/reportSetting',
                params:params
            })
        }
      ///保存报表
        TriageReport.saveTriageReport = function (data) {
            return request({
                method: 'POST',
                url: '/api/TriageService/reportSetting/saveReportSetting',
                data:data,
            })
        }
      ///根据id删除报表
        TriageReport.delTriageReport = function (id) {
            return request({
                method: 'POST',
                url: `/api/TriageService/reportSetting/${id}/delete`,
            })
        }
        //查询报表数据
        TriageReport.getTeportData = function (params) {
            return request({
                method: 'GET',
                url: `/api/TriageService/reportSetting/reportData`,
                params:params,
            })
        }
        //初始化报表数据
        TriageReport.getInitTable = function (reportId) {
            return request({
                method: 'GET',
                url: `/api/TriageService/reportSetting/initialReportSetting/${reportId}`,
            })
        }
        //导出excel
        TriageReport.importDataToExcel = function (data) {
            return request({
                method: 'POST',
                responseType: 'arraybuffer',
                url: `/api/TriageService/reportSetting/importDataToExcel`,
                data:data,
            })
        }

    export default TriageReport;