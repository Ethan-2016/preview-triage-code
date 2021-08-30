import request from "@/utils/request";

const triageConfigApi = {}

/// 新增院前分诊设置
triageConfigApi.saveTriageConfig = function (data) {
  return request({
      method: 'POST',
      url: '/api/TriageService/triageConfig/saveTriageConfig',
      data: data
  })
}

/// 修改院前分诊设置
triageConfigApi.updateTriageConfig = function (data) {
  return request({
      method: 'PUT',
      url: '/api/TriageService/triageConfig/triageConfig',
     data
  })
}

/// 删除院前分诊设置
triageConfigApi.deleteTriageConfig = function (id) {
  return request({
      method: 'DELETE',
      url: `/api/TriageService/triageConfig/${id}/triageConfig`,
  })
}

/// 获取院前分诊设置集合
triageConfigApi.triageConfigList = function (params) {
  return request({
      method: 'GET',
      url: '/api/TriageService/triageConfig/triageConfigList',
      params: params
  })
}

/// 获取院前分诊设置详情
triageConfigApi.triageConfigDetail = function (data) {
  return request({
      method: 'GET',
      url: '/api/TriageService/triageConfig/triageConfigDetail',
      data
  })
}

/// 根据分页获取分诊配置列表
triageConfigApi.searchTriageConfigDetail = function (params) {
  return request({
      method: 'GET',
      url: '/api/TriageService/triageConfig/triageConfigPageList',
      params: params
  })
}

export default triageConfigApi