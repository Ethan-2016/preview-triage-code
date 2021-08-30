import request from "@/utils/request";

const triageConfigTypeDescriptionApi = {}

/// 新增院前分诊设置类型描述
triageConfigTypeDescriptionApi.saveTriageConfigTypeDescription = function (data) {
  return request({
      method: 'POST',
      url: '/api/TriageService/triageConfigTypeDescription/saveTriageConfigTypeDescription',
      data:{...data,intercept:true}
  })
}

/// 修改院前分诊设置类型描述
triageConfigTypeDescriptionApi.triageConfigTypeDescription = function (data) {
  return request({
      method: 'PUT',
      url: '/api/TriageService/triageConfigTypeDescription/triageConfigTypeDescription',
      data:{...data,intercept:true}
  })
}

/// 删除院前分诊设置类型描述
triageConfigTypeDescriptionApi.saveTableSetting = function (id) {
  return request({
      method: 'DELETE',
      url: `/api/TriageService/triageConfigTypeDescription/${id}/triageConfigTypeDescription`,
  })
}

/// 获取院前分诊设置类型描述集合
triageConfigTypeDescriptionApi.triageConfigTypeDescriptionList = function () {
  return request({
      method: 'GET',
      url: '/api/TriageService/triageConfigTypeDescription/triageConfigTypeDescriptionList'
  })
}

/// 获取院前分诊设置类型描述详情
triageConfigTypeDescriptionApi.triageConfigTypeDescriptionDetail = function (id) {
  return request({
      method: 'GET',
      url: `/api/TriageService/triageConfigTypeDescription/${id}/triageConfigTypeDescriptionDetail`,
  })
}

export default triageConfigTypeDescriptionApi