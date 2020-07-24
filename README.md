# wand-axios
[![](https://img.shields.io/badge/nodejs-latest-red.svg)](https://github.com/nodejs/node) [![](https://img.shields.io/badge/npm-v0.0.4-red.svg)](https://www.npmjs.com/package/wand-axios) [![](https://img.shields.io/badge/axios-v0.19.2-green.svg)](https://github.com/axios/axios) 
## Background
Wand-axios is written for reducing some tedious process when we use axios to establish a http request. It configures some parameters for you in advance. If you only use some base usage in axios, you will establish a request without many codes by using wand-axios. Of course, if you have some complex logic and requirements in your project, it's no problem to achieve your purpose.  
Wand-axios is based on axios. it uses class launched in ES6. By using extends and decorator, we can easily change many useful configuration when we want to establish a http request. Wand-axios also use many features launched in ES6, like arrow functions and promise.
## Install
```shell script
# if you use yarn
$ yarn add wand-axios
# if you use npm
$ npm install wand-axios --save
```
## Usage
Wand-axios provides three functions, one for setting some default configuration named setDefaults and two for being decorator functions named RestfulApi and Request. One class is provided to initiate the request named Restful. The configurations in wand-axios are same as axios. 
### init a http request
```ecmascript 6
import { Restful, RestfulApi, Request } from '../../lib/wand-vue/src/api/restful'

@RestfulApi({
  name: 'TestSer',
  prefix: '',
  method: 'GET',
  contentType: 'application/json',
  returnType: 'json',
  path: 'test-service',
  fallback: () => {},
  headers: {}
})
class TestService extends Restful {
  @Request({
    //定义第一段api路径
    basepath: '',
    path: 'get-basic',
    parameters: ['ui_id', 'ui_name']
  })
  getBasic (ui_id, ui_name) {}
}

export default TestService
```
- in RestfulApi, you can configure the base configuration in this service. Configurations writing in RestfulApi will take effect in api where register in this class.
- In the Request decorator, if you write some configurations which already written in RestfulApi, the Request configurations will rewrite the http request configurations.
- If you don't set up the path, the name you set up will be the prefix.
```ecmascript 6
@Request({
    method: 'GET',
    path: 'models/${id}',
    parameters: [{ id: '-' }]
})
getType (id) {}
```
- If there are some parameters in your request url, you can write the parameters like this. The parameters written like this will add to the url, instead of being a request body.
### use the request function and receive the response
```ecmascript 6
// use async function
const data = await TestService.getBasic()
// use then
TestService.getBasic().then(
    (data) => {
        this.testData = data
    }
).catch(
    (err) => {
        this.error = err
    }   
)
```
- The function with Request decorator is the request function, it is a promise function, you can use then or await to get the response.
### set default configurations
```ecmascript 6
setDefaults((defaults) => {
  defaults.prefix = '/api'
  defaults.fallback = (error, resolve, reject) => {
    if (error?.status === 401 || error?.response?.status === 401) {
      if ($nuxt.$route.path !== '/account/login') {
        $nuxt.$router.push('/account/login')
        resolve(true)
      } else {
        reject(error)
      }
    } else {
      reject(error)
    }
  }
})
```
- In the setDefaults, you can change the defaults configuration which will take effect on all service. Based on this feature, you can configure global url prefix or logic which handle the error.
## To Do
- Improve the documentation
- rewrite by typescript
## Related Efforts
Wand-axios is used in our private projects, I'm sorry I can't show them to you. It's stable in our project, you can use it with no doubt.
## Maintainers
- [@duanchi](https://github.com/duanchi) code the whole project
- [@lasolitudey](https://github.com/lasolitudey) build the project and publish on npm
## License
[MIT](./LICENSE)



