import Api from './proxy'
import typeOf from 'typeof'

export default class Restful extends Api {
  _init (target) {
    return target
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _setPrefix (prefix, parameters, values, options) {
    return prefix
  }

  _setPath (methodName, parameters, values, options) {
    let path = ''

    if (options.path) {
      path = options.path
    } else if (options.path !== '') {
      path = methodName
    }

    path = (options.basepath === '' ? '' : '/' + options.basepath) + '/' + path
    if (values[parameters.indexOf('id')]) {
      return path + '/' + values[parameters.indexOf('id')]
    } else if (path.includes('?')) {
      return path
    } else {
      return path + '/'
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _setMethod (method, parameters, values, options) {
    return method
  }

  _setHeaders (headers, parameters, values, options) {
    const token = localStorage.getItem('access_token')
    if (token) {
      headers.Authorization = 'Bearer ' + token
    }
    return super._setHeaders(headers, parameters, values, options)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _setContentType (contentType, parameters, values) {
    if (this.__options.contentType === 'multipart/form-data') {
      return undefined
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _setData (methodName, parameters, values, options) {
    const data = {}
    /* for (const n in parameters) {
      if (parameters[n] === 'data') {
        return values[n]
      }
      if (undefined !== values[n] || values[n] !== null) {
        data[parameters[n]] = values[n]
      }
    }
    if (data.id) {
      delete data.id
    }
  */
    for (const n in parameters) {
      if (parameters[n] === 'data') {
        return values[n]
      }
      if (typeOf(parameters[n]) === 'object') {
        for (const k in parameters[n]) {
          if (![undefined, null, '', '-'].includes(parameters[n][k])) {
            data[parameters[n][k]] = values[n]
          }
        }
      } else {
        data[parameters[n]] = values[n]
      }
    }

    return data
  }

  _setResponse (promise, resolve, reject) {
    return promise.then(
      (response) => {
        if (response?.data?.status === true || response?.data?.message === 'Ok') {
          resolve(response.data.data)
        } else if (response.status === 204) {
          resolve(null)
        } else {
          reject(response.data)
        }
      }).catch((error) => {
      reject(error.response)
    }
    )
  }
}
