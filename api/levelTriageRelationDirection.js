import request from "@/utils/request";

const levelTriageRelationDirectionApi = {}

/// 修改分诊级别关联关联去向
levelTriageRelationDirectionApi.updateLevelTriageRelationDirection = function (data) {
  return request({
      method: 'PUT',
      url: '/api/TriageService/levelTriageRelationDirection/levelTriageRelationDirection',
      data:data,
      intercept:true,
  })
}

/// 获取分诊级别关联去向
levelTriageRelationDirectionApi.selectLevelTriageRelationDirection = function () {
  return request({
      method: 'GET',
      url: '/api/TriageService/levelTriageRelationDirection/selectLevelTriageRelationDirection'
  })
}

export default levelTriageRelationDirectionApi