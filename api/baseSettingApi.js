/*  公共接口 */

import request from "@/utils/request";

const baseSettingApi = {}


// 获取评分管理列表
baseSettingApi.getScoreManageList = function (params) {
    return request({
        method: 'GET',
        url: '/api/TriageService/scoreManage/scoreManageList',
        params
    })
}
// 新增评分管理
baseSettingApi.addScoreManage = function (data) {
    return request({
        method: 'POST',
        url: '/api/TriageService/scoreManage/scoreManage',
        data:data//{...data,intercept:true}
    })
}
// 新增评分管理
baseSettingApi.editScoreManage = function (data) {
    return request({
        method: 'PUT',
        url: `/api/TriageService/scoreManage/${data.id}/scoreManage`,
        data:data//{...data,intercept:true}
    })
}
// 删除评分管理
baseSettingApi.deleteScoreManage = function (data) {
    return request({
        method: 'DELETE',
        url: `/api/TriageService/scoreManage/${data.id}/scoreManage`,
        data:data//{...data,intercept:true}
    })
}
// 新增评分管理
baseSettingApi.judgmentDetailList = function (params) {
    return request({
        method: 'GET',
        url: `/api/TriageService/judgment/judgmentDetailList`,
        params
    })
}
// 新增评分管理
baseSettingApi.addJudgmentType = function (data) {
    return request({
        method: 'GET',
        url: `/api/TriageService/judgment/judgmentType`,
        data:data//{...data,intercept:true}
    })
}
// 评分启用禁用
baseSettingApi.enableScoreManage = function (data) {
    return request({
        method: 'POST',
        url: `api/TriageService/scoreManage/enableScoreManage`,
        data:data//{...data,intercept:true}
    })
}
// 获取生命体征评分表达式列表
baseSettingApi.vitalSignExpressionList = function () {
    return request({
        method: 'GET',
        url: `/api/TriageService/vitalSignExpression/vitalSignExpressionList`,
    })
}
// 编辑评分表达式
baseSettingApi.putVitalSignExpression = function (data) {
    return request({
        method: 'PUT',
        url: `/api/TriageService/vitalSignExpression/${data.id}/vitalSignExpression`,
        data:data//{...data,intercept:true}
    })
}
// 重置单个评分表达式
baseSettingApi.resetVitalSignExpression = function (data) {
    return request({
        method: 'POST',
        url: `/api/TriageService/vitalSignExpression/resetVitalSignExpression`,
        data:data//{...data,intercept:true}
    })
}
// 重置单个评分表达式
baseSettingApi.resetAllVitalSignExpression = function (data) {
    return request({
        method: 'POST',
        url: `api/TriageService/vitalSignExpression/resetAllVitalSignExpression`,
        data
    })
}
// 新增新增判定依据类型
baseSettingApi.addJudgmentType = function (data) {
    return request({
        method: 'POST',
        url: `/api/TriageService/judgment/judgmentType`,
        data:data//{...data,intercept:true}
    })
}
//修改判定依据类型
baseSettingApi.editJudgmentType = function (data) {
    return request({
        method: 'PUT',
        url: `/api/TriageService/judgment/${data.id}/judgmentType`,
        data:data//{...data,intercept:true}
    })
}
// 删除判定依据类型
baseSettingApi.deleteCategory = function (data) {
    return request({
        method: 'DELETE',
        url: `/api/TriageService/judgment/${data.id}/judgmentType`,
    })
}
// 新增新增判定依据主诉
baseSettingApi.addJudgmentMaster = function (data) {
    return request({
        method: 'POST',
        url: `/api/TriageService/judgment/judgmentMaster`,
        data:data,
    })
}
// 修改判判定依据主诉
baseSettingApi.editJudgmentMaster = function (data) {
    return request({
        method: 'PUT',
        url: `/api/TriageService/judgment/${data.id}/judgmentMaster`,
        data:data//{...data,intercept:true}
    })
}
// 删除判定依据主诉
baseSettingApi.deleteJudgmentMaster = function (data) {
    return request({
        method: 'DELETE',
        url: `/api/TriageService/judgment/${data.id}/judgmentMaster`,
        data:data//{...data,intercept:true}
    })
}
// 新增新增判定依据项目
baseSettingApi.addJudgmentItem = function (data) {
    return request({
        method: 'POST',
        url: `/api/TriageService/judgment/judgmentItem`,
        data:data//{...data,intercept:true}
    })
}
// 修改判判定依据项目
baseSettingApi.editJudgmentItem = function (data) {
    return request({
        method: 'PUT',
        url: `/api/TriageService/judgment/${data.id}/judgmentItem`,
        data:data//{...data,intercept:true}
    })
}
// 删除判定依据项目
baseSettingApi.deleteJudgmentItem = function (data) {
    return request({
        method: 'DELETE',
        url: `/api/TriageService/judgment/${data.id}/judgmentItem`,
        data:data//{...data,intercept:true}
    })
}

//-----------------------------------分诊设备---------start
//获取设备信息
baseSettingApi.deviceInfoByIot = function (params) {
    return request({
        method: 'GET',
        url: `/api/TriageService/triageDevice/deviceInfoByIot`,
        params
    })
}
// 获取设备列表
baseSettingApi.triageDeviceList = function (params) {
    return request({
        method: 'GET',
        url: `api/TriageService/triageDevice/triageDeviceList`,
        params
    })
}
// 新增设备
baseSettingApi.postTriageDevice = function (data) {
    return request({
        method: 'POST',
        url: `/api/TriageService/triageDevice/triageDevice`,
        data:data//{...data,intercept:true}
    })
}
// 修改设备
baseSettingApi.putTriageDevice = function (data) {
    return request({
        method: 'PUT',
        url: `/api/TriageService/triageDevice/${data.id}/triageDevice`,
        data:data//{...data,intercept:true}
    })
}
// 删除设备
baseSettingApi.deleteTriageDevice = function (data) {
    return request({
        method: 'DELETE',
        url: `/api/TriageService/triageDevice/${data.id}/triageDevice`,
        data:data//{...data,intercept:true}
    })
}
//-----------------------------------分诊设备---------end
//-------------------------------快速通道设置-------------start
    // 根据输入项获取患者快速通道登记信息
    baseSettingApi.getFastTrackSetting = function (params) {
        return request({
            method: 'GET',
            url: `/api/TriageService/fastTrackSetting/fastTrackSettingList`,
            params
        })
    }
    // 新增快速通道设置
    baseSettingApi.postFastTrackSetting = function (data) {
        return request({
            method: 'POST',
            url: `/api/TriageService/fastTrackSetting/fastTrackSetting`,
            data:data//{...data,intercept:true}
        })
    }
    // 删除快速通道设置
    baseSettingApi.deleteFastTrackSetting = function (params) {
        return request({
            method: 'DELETE',
            url: `/api/TriageService/fastTrackSetting/fastTrackSetting`,
            // data:data//{...data,intercept:true}
            params:params,
        })
    }
    // 新增快速通道设置
    baseSettingApi.putFastTrackSetting = function (data) {
        return request({
            method: 'PUT',
            url: `/api/TriageService/fastTrackSetting/fastTrackSetting`,
            data:data//{...data,intercept:true}
        })
    }
    ///提交患者快速通道登记信息
    baseSettingApi.saveFastTrackRegisterInfo = function (data) {
        return request({
            method: 'POST',
            url: `/api/TriageService/fastTrackRegisterInfo/saveFastTrackRegisterInfo`,
            data:data//{...data,intercept:true}
        })
    }
//-------------------------------快速通道设置-------------end
export default baseSettingApi