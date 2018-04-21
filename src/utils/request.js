/**
 * request.utility
 * 使用 axios 插件来支持发送 http 请求
 */
import axios from 'axios'

/**
 * 格式化http请求的相关配置项
 * @param request 请求配置对象
 */
function formatRequest (request) {
  if (request instanceof Object) {
    // 对params进行处理，默认添加appKey属性
    // if (request.params && typeof request.params === 'object') {
    //   if (request.params.appKey === undefined) {
    //     Object.assign(request.params, {
    //       appKey: webStoarge.$stoarge.get('APP_KEY')
    //     })
    //   }
    // } else {
    //   request.params = {
    //     appKey: webStoarge.$stoarge.get('APP_KEY')
    //   }
    // }
    if (request.token) {
      // 对token进行处理
      if (request.headers && typeof request.headers === 'object') {
        if (request.headers.accessToken === undefined) {
          Object.assign(request.headers, {
            accessToken: request.token
          })
        }
      } else {
        request.headers = {
          accessToken: request.token
        }
      }
      delete request.token
    }
  }
  console.log(request)
  return request
}

/**
 * 封装axios来发送http请求
 * @param request 部分参数被处理，参考 formatRequest 方法；
 * 注：其余选项参考 axios 的相关文档
 */
function httpRequest (request) {
  return new Promise((resolve, reject) => {
    axios.request(formatRequest(request))
      .then(function (response) {
        if (response.status === 200) {
          if (response.data.code === 0) {
            // 后端请求发送成功
            resolve(response.data.data)
          } else if (response.data.code === -1) {
            reject(response.data.data)
          }
        } else {
          // window.alert('response status error: ', response.status)
          reject(response.data.data)
        }
      })
      .catch(function (error) {
        // window.alert('request error: ', error)
        reject()
      })
  })
}

export default httpRequest
