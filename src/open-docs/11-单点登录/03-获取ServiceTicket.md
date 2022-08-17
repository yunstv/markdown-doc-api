## 获取ServiceTicket

#### 域名列表

| 序号  | 环境  | 请求地址           |
| :---: | :---: | :----------------- |
|   1   | 开发  | dev-etc.ebaas.com  |
|   2   | 测试  | test-etc.ebaas.com |
|   3   | 生产  |                    |

#### 接口说明

* 请求类型 : POST
* 请求地址 : /oauth/getServiceTicket




#### 请求参数
| 参数         | 是否必填 | 类型   | 最大长度 | 参数描述                   | 示例值 |
| :----------- | :------: | :----- | :------- | :------------------------- | :----- |
| access_token |    是    | String |          | access_token               |        |
| token        |    是    | String |          | token(登录成功获取的token) |        |

#### 请求样例

```
{
  "access_token": "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJhY2NvdW50IiwiaWF0IjoxNjIzOTk4NjA1LCJpc3MiOiJvYXV0aF9hY2Nlc3NfdG9rZW4ifQ.0WcxU0kOj0D0TWd9XEaksvHYOu9oU78TgXbibo9kc3c",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjQ3MTM1OTAsInVzZXJfbmFtZSI6IjE3NjIxOTIzMzQ2IiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdLCJqdGkiOiJkMGIyOTA3ZC1iOWZhLTRiODktOWQ1NS1mMWIzMmMyZjYwYmQiLCJjbGllbnRfaWQiOiJhY2NvdW50Iiwic2NvcGUiOlsiYWxsIl19.tqDkrI6s9mPwdZA-2WxO7Q6SUGhYGMKX1WhIRLm5VUA"
}
```

#### 应答报文

| 参数           | 是否必填 | 类型   | 最大长度 | 参数描述                  | 示例值 |
| :------------- | :------: | :----- | :------- | :------------------------ | :----- |
| access_token   |    是    | String |          | access_token，有效期为60s |        |
| expired        |    是    | String |          | service_ticket的有效期    |        |
| number_of_uses |    是    | int    |          | service_ticket可用的次数  |        |

#### 应答样例

```
{
  "request_id": "cc67513b-9b00-4283-a966-80153fd3ecfb",
  "code": "000",
  "msg": "成功",
  "data": {
    "expired": "2021-06-18 15:00:34",
    "service_ticket": "ST-AkUr4e4HGmMesHA8p5vrUFM9bMn1xvwagYLBFuYZg9EJSW18NlbuqlAdLm7wrLU0OVrWju0aQO3+hdrT043EXw==",
    "number_of_uses": 1
  }
}

```

#### 错误样例1
```
{
  "request_id": "cc67513b-9b00-4283-a966-80153fd3ecfb",
  "code": "400",
  "msg": "参数[access_token]不能为空",
  "data": null
}

```
#### 错误样例2
```
{
  "request_id": "cc67513b-9b00-4283-a966-80153fd3ecfb",
  "code": "400003",
  "msg": "入参解析异常",
  "data": null
}

```
#### 错误样例3
```
{
  "request_id": "cc67513b-9b00-4283-a966-80153fd3ecfb",
  "code": "401003",
  "msg": "无效的access_token",
  "data": null
}

```