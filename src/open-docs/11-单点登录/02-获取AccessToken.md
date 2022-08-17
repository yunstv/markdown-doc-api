## 获取AccessToken

#### 域名列表

| 序号  | 环境  | 请求地址           |
| :---: | :---: | :----------------- |
|   1   | 开发  | dev-etc.ebaas.com  |
|   2   | 测试  | test-etc.ebaas.com |
|   3   | 生产  |                    |

#### 接口说明

* 请求类型 : GET
* 请求地址 : /oauth/getAccessToken




#### 请求参数
| 参数          | 是否必填 | 类型   | 最大长度 | 参数描述   | 示例值 |
| :------------ | :------: | :----- | :------- | :--------- | :----- |
| client_id     |    是    | String |          | 客户端id   |        |
| client_secret |    是    | String |          | 客户端密码 |        |

#### 请求样例

```
GET dev-etc.ebaas.com/oauth/getAccessToken?client_id=aaa&client_secret=bbb
```

#### 应答报文

| 参数         | 是否必填 | 类型   | 最大长度 | 参数描述               | 示例值 |
| :----------- | :------: | :----- | :------- | :--------------------- | :----- |
| access_token |    是    | String |          | access_token，有效期为2小时           |        |
| expired      |    是    | String |          | access_token的有效期 |        |

#### 应答样例

```
{
  "request_id": "cc67513b-9b00-4283-a966-80153fd3ecfb",
  "code": "000",
  "msg": "成功",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJhY2NvdW50IiwiaWF0IjoxNjIzOTk4NjA1LCJpc3MiOiJvYXV0aF9hY2Nlc3NfdG9rZW4ifQ.0WcxU0kOj0D0TWd9XEaksvHYOu9oU78TgXbibo9kc3c",
    "expired": "2021-06-18 16:43:26"
  }
}

```

#### 错误样例1

```
{
  "request_id": "cc67513b-9b00-4283-a966-80153fd3ecfb",
  "code": "403006",
  "msg": "client_id不正确",
  "data": null
}

```

#### 错误样例2

```
{
  "request_id": "cc67513b-9b00-4283-a966-80153fd3ecfb",
  "code": "403007",
  "msg": "client_secret不正确",
  "data": null
}

```