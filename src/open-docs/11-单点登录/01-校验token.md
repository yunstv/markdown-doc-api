## 校验token

#### 域名列表

| 序号  | 环境  | 请求地址           |
| :---: | :---: | :----------------- |
|   1   | 开发  | dev-etc.ebaas.com  |
|   2   | 测试  | test-etc.ebaas.com |
|   3   | 生产  |                    |

#### 接口说明

* 请求类型 : GET
* 请求地址 : /oauth/checkToken




#### 请求参数
| 参数  | 是否必填 | 类型   | 最大长度 | 参数描述              | 示例值 |
| :---- | :------: | :----- | :------- | :-------------------- | :----- |
| token |    是    | String |          | 登录成功获取到的token |        |

#### 请求样例

```
GET /oauth/checkToken?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjQ3MTM1OTAsInVzZXJfbmFtZSI6IjE3NjIxOTIzMzQ2IiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdLCJqdGkiOiJkMGIyOTA3ZC1iOWZhLTRiODktOWQ1NS1mMWIzMmMyZjYwYmQiLCJjbGllbnRfaWQiOiJhY2NvdW50Iiwic2NvcGUiOlsiYWxsIl19.tqDkrI6s9mPwdZA-2WxO7Q6SUGhYGMKX1WhIRLm5VUA
```

#### 应答报文

无

#### 应答样例

```
{
  "request_id": "cc67513b-9b00-4283-a966-80153fd3ecfb",
  "code": "000",
  "msg": "成功",
  "data": null
}

```
#### 错误样例1
```
{
  "request_id": "cc67513b-9b00-4283-a966-80153fd3ecfb",
  "code": "400",
  "msg": "参数[token]不能为空",
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
  "code": "401004",
  "msg": "无效的token",
  "data": null
}

```