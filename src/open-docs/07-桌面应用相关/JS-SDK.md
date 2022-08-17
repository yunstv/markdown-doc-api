## JS-SDK

#### 使用说明
 ```bash
1、在页面入口处引入etcSdk.js
开发环境：http://test.ebaas.com/etc/etcSdk.js
生产环境：https://cdn.ebaas.com/etcSdk.js
 ```

#### 方法和字段说明

##### 1. 初始化SDK

**请求方法**
> window.ETCSdk.init(token)

**请求参数**

|    参数    |  描述   |   类型   |
|:--------:|:-----:|:------:|
| token | etc的token | String |


**应答说明**

结果为true，初始化成功；其它情况，初始化失败


##### 2. 签名

**请求方法**
> window.ETCSdk.sign(data)

**请求参数**

|    参数    |  描述   |   类型   |
|:--------:|:-----:|:------:|
| data | 签名的对象 | Object |


**应答说明**

返回结果为签名后的字符串


