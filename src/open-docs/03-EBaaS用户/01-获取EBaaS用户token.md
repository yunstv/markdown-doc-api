## 获取EBaaS用户token

#### 接口说明

* 适用对象 : EBaaS用户
* 请求类型 : POST
* apiCode : ebaas.user.token

#### 请求参数
| 参数 | 是否必填 | 类型 | 最大长度 | 参数描述 |
|:----|:-------:|:-----|:-------|:--------|
| ebaas_user_no | 是 | String | 32 | EBaaS用户编号 |


#### 业务参数请求样例
```
{
    "ebaas_user_no":"E001P00002580"
}
```

#### 应答报文

| 参数 | 类型 | 最大长度 | 参数描述 | 示例值 |
|:----|:----|:--------|:--------|:------|
| etc-open-token | String | 500 | etc请求令牌 |  |


#### 应答样例

```
{
    "requestId":"eb053acf-66a0-4974-a7b4-2f2354460755",
    "code":"000",
    "msg":"成功",
    "data":{
        "etc-open-token":"eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI3NTYzZTdkMmNjODU0YWZlOGQyZDZlN2IzMjg0OGRmMyIsImlhdCI6MTYxNjY2MzUxMiwiaXNzIjoiRTAyIiwic3ViIjoiIn0.5UgYQtSr-8nUWsurZg3nFW4dUtUy4GXtsncM2vEJx88"
    }
}
```