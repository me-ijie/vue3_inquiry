import ajax from './index'

export default {
  login: (data) => { return ajax('post', '/user/login', data)},
  addInquiry: (data) => { return ajax('post', '/inquiry/add', data)},
  getInquiry: (data) => { return ajax('get', '/inquiry/get', data)}
}