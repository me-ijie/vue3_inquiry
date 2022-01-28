import axios from 'axios'
import { ElNotification } from 'element-plus'

const app = axios.create({
  baseURL: process.env.VUE_APP_URL,
  timeout: 60000
})

export default function ajax (type, url, data = {}) {

  return new Promise(function (res, rej) {
    let promise
    if (type === 'get') {
      // 准备url query参数数据
      let dataStr = '' //数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      promise = app.get(url)
    } else {
      // post 请求
      promise = app.post(url, data)
    }

    promise.then(function (response) {
        // 成功了，调用resolve()
        if (response.data.code !== 0) {
          ElNotification({
            title: '操作失败',
            message: response.data.msg || '请求错误',
            type: 'error',
          })
          throw new Error()
        }
        res(response.data.data)
      })
      .catch(function (error) {
        // 失败了，调用reject()
        rej(error)
      })
  })
}