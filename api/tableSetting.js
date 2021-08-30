import request from "@/utils/request";

const triageSettingApi = {}

/// 通过表格名称，查询单个表格配置
triageSettingApi.getTableSetting = function (data) {
  return request({
      method: 'POST',
      url: '/api/TriageService/tableSetting/QueryTableSetting',
      data:{...data,intercept:true}
  })
}

/// 保存表格配置集合
triageSettingApi.saveTableSetting = function (data) {
  return request({
      method: 'POST',
      url: '/api/TriageService/tableSetting/saveTableSetting',
      data:data
  })
}

/// 重置表格配置集合
triageSettingApi.resetTableSetting = function (data) {
  return request({
      method: 'POST',
      url: '/api/TriageService/tableSetting/resetTableSetting',
      data:{...data,intercept:true}
  })
}



export default triageSettingApi