import api from './index'
// axios
import request from '@/utils/request'

// 登录
export function ceeTesterList(data) {
  return request({
    url: api.CeeTesterList,
    method: 'get',
    data
  })
}

export function ceeTesterWorkType() {
  return request({
    url: api.CeeTesterWorkTypeList,
    method: 'get'
  })
}
