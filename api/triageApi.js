/*  公共接口 */

import request from "@/utils/request";

const triageApi = {}

// 获取患者病历号
triageApi.getPatientRecord = function (params) {
    return request({
        method: 'GET',
        url: '/api/TriageService/patientInfo/patientRecordByHl7Msg',
        params
    })
}
// 创建患者病历号
triageApi.postPatientRecord = function (data) {
    return request({
        method: 'POST',
        url: '/api/TriageService/patientInfo/patientRecordByHl7Msg',
        data: {
            ...data,
            intercept: true
        }
    })
}
// 确认分诊
triageApi.saveTriageRecord = function (data) {
    return request({
        method: 'POST',
        url: '/api/TriageService/patientInfo/saveTriageRecord',
        data: {
            ...data,
            intercept: true
        }
    })
}
// 获取分诊字典
triageApi.saveGroupInjuryTriageRecord = function (data) {
    return request({
        method: 'POST',
        url: '/api/TriageService/groupInjury/saveGroupInjuryTriageRecord',
        data: {
            ...data,
            intercept: true
        }
    })
}
// 获取分诊字典
triageApi.triageConfigList = function (params) {
    return request({
        method: 'GET',
        url: '/api/TriageService/triageConfig/triageConfigList',
        params
    })
}
// 获取分诊列表
triageApi.patientInfoList = function (params) {
    return request({
        method: 'GET',
        url: '/api/TriageService/patientInfo/patientInfoBySettingList',
        params
    })
}
// 获取分诊详情
triageApi.patientInfoByInput = function (params) {
    return request({
        method: 'GET',
        url: '/api/TriageService/patientInfo/patientInfoByInput',
        params
    })
}
// 获取生命体征评分表达式
triageApi.vitalSignExpressionList = function (params) {
    return request({
        method: 'GET',
        url: '/api/TriageService/vitalSignExpression/vitalSignExpressionList',
        params
    })
}
// 获取生命体征评分
triageApi.selectMonitor = function (params) {
    return request({
        method: 'GET',
        url: '/api/TriageService/triageDevice/iotVitalSignsInfo',
        params
    })
}
//获取群伤关联列表
triageApi.groupInjuryRecordList = function (params) {
    return request({
        method: 'GET',
        url: '/api/TriageService/groupInjury/groupInjuryRecordList',
        params
    })
}
//挂号
triageApi.registerNoForPatient = function (data) {
    return request({
        method: 'POST',
        url: `/api/TriageService/patientRegister/registerNoForPatient/${data}`,
        data:{...data,intercept:true}
    })
}
//查询快速建档信息
triageApi.patientInfoListByInput = function (params) {
    return request({
        method: 'GET',
        url: `/api/TriageService/patientInfo/patientInfoListByInput`,
        params
    })
}
//导出文件
triageApi.patientInfoListExport = function (params) {
    return request({
        method: 'GET',
        headers: {
            'Content-Type': 'application/octet-stream'
        },
        responseType: 'arraybuffer',
        url: `/api/TriageService/patientInfo/patientInfoListExport`,
        params
    })
}
//患者关联群伤
triageApi.groupInjuryForPatient = function (data) {
    return request({
        method: 'POST',
        url: `/api/TriageService/groupInjury/groupInjuryForPatient`,
        data:{...data,intercept:true}
    })
}

//患者关联群伤
triageApi.cancelGroupInjuryRecord = function (data) {
    return request({
        method: 'DELETE',
        url: `/api/TriageService/groupInjury/groupInjuryRecord/${data.triagePatientInfoId}`,
        data:{...data,intercept:true}
    })
}
//修改群伤事件
triageApi.modifyGroupInjuryRecord = function (data) {
    return request({
        method: 'PATCH',
        url: `/api/TriageService/groupInjury/modifyGroupInjuryRecord/${ data.groupInjuryInfoId }`,
        data:{...data,intercept:true}
    })
}
////
//删除群伤
triageApi.deleteGroupInjury = function (data) {
    return request({
        method: 'POST',
        url: `/api/TriageService/groupInjury/deleteGroupInjury`,
        data:{...data,intercept:true}
    })
}
//获取统计图数据
triageApi.patientDataAnalysis = function (params) {
    return request({
        method: 'get',
        url: `api/TriageService/patientDataAnalysis/patientDataAnalysis`,
        params
    })
}
//获取快速通道患者详情
triageApi.getFastTrackRegisterInfo = function (params) {
    return request({
        method: 'get',
        url: `/api/TriageService/fastTrackRegisterInfo/${params.id}`,
    })
}
//获取快速通道患者列表
triageApi.getFastTrackRegisterList = function (params) {
    return request({
        method: 'get',
        url: `/api/TriageService/fastTrackRegisterInfo`,
        params
    })
}
//保存
triageApi.saveFastTrackRegisterInfo = function (data) {
    return request({
        method: 'POST',
        url: `/api/TriageService/fastTrackRegisterInfo/saveFastTrackRegisterInfo`,
        data:{...data,intercept:true}
    })
}
//快速通道导出
triageApi.fastTrackRegisterInfoExport = function (params) {
    return request({
        method: 'GET',
        headers: {
            'Content-Type': 'application/octet-stream'
        },
        responseType: 'arraybuffer',
        url: `/api/TriageService/FastTrackRegisterInfoApp/FastTrackRegisterInfoExport`,
        params
    })
}


export default triageApi