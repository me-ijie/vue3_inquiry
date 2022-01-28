/*
 * @Description: 用户接口
 * @Date: 2022-01-28 09:27:46
 * @LastEditors: meijie
 * @LastEditTime: 2022-01-28 16:30:03
 * @FilePath: \vue3_inquiry\src\api\ajax.js
 */
import ajax from './index'

export default {
  login: (data) => { return ajax('post', '/user/login', data)},
  register: (data) => { return ajax('post', '/user/regist', data)},
  create: (data) => { return ajax('post', '/inquiry/add', data)},
  getInquiryList: () => { return ajax('get', '/inquiry/user')}
}