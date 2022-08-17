## 权限－根据Token获取用户权限

#### 接口说明

* 适用对象 : 管理中台
* 请求类型 : GET
* 请求路径 : /mgt/gateway/api/token/queryUserAuths

#### 请求参数
无

#### 请求头
| 参数           | 是否必填 | 类型   | 参数描述    | 示例值                    |
| :------------- | :------: | :----- | :---------- | :------------------------ |
| X-Access-Token |    是    | String | token       |                           |
| etc-sys-id     |    是    | String | ETC系统标识 | 管理中台:E01，电子签：E02 |


#### 应答报文

| 参数 | 是否必填 | 类型         | 参数描述 | 示例值 |
| :--- | :------: | :----------- | :------- | :----- |
| data |    是    | List<String> | 权限列表 |        |

#### 应答样例

```
{
    "requestId": "42dd6c6e-247e-487f-87e8-dd97067b877b",
    "responseCode": "000",
    "responseMsg": "成功",
    "data": [
        "user:add",
        "user:sex",
        "user:edit",
        "user:form:birthday",
        "user:form:phone"
    ]
}
```

