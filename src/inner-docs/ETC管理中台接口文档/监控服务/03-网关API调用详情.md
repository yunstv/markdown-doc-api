## 网关API调用详情

#### 域名列表

| 序号  | 环境  | 请求地址           |
| :---: | :---: | :----------------- |
|   1   | 开发  | dev-gateway.ejuetc.com  |
|   2   | 测试  | test-gateway.ejuetc.com |
|   3   | 生产  | gateway.ejuetc.com  |

#### 接口说明
* 适用对象 : ETC
* 请求类型 : GET
* 请求路径 : /monitor/api/requestLogInfo/query

#### 请求头
| 参数           | 是否必填 | 类型   | 参数描述    | 示例值                    |
| :------------- | :------: | :----- | :---------- | :------------------------ |
| X-Access-Token |    是    | String | token       |                           |
| etc-sys-id     |    是    | String | ETC系统标识   | // 管理中台:E01，电子签：E02，联盟中心：E03|


#### 请求参数
| 参数       | 是否必填 | 类型   | 最大长度 | 参数描述 | 示例值 |
| :--------- | :------: | :----- | :------- | :------- | :----- |
| request_id |    是    | String |          | 请求id |        |

#### 请求样例

```
{
   "request_id":"0000"
}
```


#### 应答报文
| 参数              | 是否必传 | 类型    |      参数描述        | 示例值     |
| :---------------- | :------: | :------ | :------------------- | :--------- |
| request_id        |    是    | String    |      请求id          |            |
| app_id            |    是    | String  |      应用id        |            |
| api_code          |    是    | String  |      接口编码    |            |
| request_occur_time  |    是    | String  |      请求发生时间    |            |
| response_code    |    是    | String  |      响应状态码        |            |  
| app_type         |    是    | String  |      应用类型        |            |
| user_no          |    是    | String  |      机构编码             |            |
| user_name        /    是    | String  |      机构名称        |       |
| api_name         |    是    | String  |      接口名称        |            |
| api_url          |    是    | String  |      url        |            |
| exec_time        |    是    | Long    |      业务请求耗时        |            |
| request_body     |    是    | String  |      请求参数        |            |
| response_body    |    是    | String  |      响应参数        |            |
| ip_address       |    是    | String  |      客户端IP        |            |


#### 应答样例
```
{
    "requestId": "42dd6c6e-247e-487f-87e8-dd97067b877b",
    "responseCode": "000",
    "responseMsg": "成功",
    "data": {
        "request_id": "f3022afc-469a-40ec-a449-527eaf20329b",
        "app_id": "VY9XET01O5RT6HTH",
        "api_code": "ecode-ac.case.add",
        "request_occur_time": "2021-08-04 16:53:40",
        "response_code": "0",
        "user_no": "88SGOSATHK4XBN8D",
        "exec_time": 155,
        "request_body": "{\"api_code\":\"ecode-ac.case.add\",\"request_content\":\"{\\\"company_id\\\":\\\"222\\\",\\\"open_id\\\":\\\"111\\\",\\\"source\\\":\\\"1\\\"}\",\"sign\":\"amdbAvQHd8uCYnFzqPaOHcdBOyXN5VnEQoRTXy7PYbUqdTE+W/aIt4P0eS3hlSET9YJ1E3oSUWr4XtIqpqzXSLxtysGt5ads4wi7qU6+CuSeZRMHIMh1kbGOHJ9yfS/1jDR3FQKr6H0MLq8ILueQKWFk+Syb0bELzLLkHOiZiMY=\",\"app_id\":\"VY9XET01O5RT6HTH\",\"nonce\":\"400247\",\"timestamp\":1628067217644}",
        "response_body": "{\"code\":\"0\",\"data\":null,\"msg\":\"For input string: \\\"EO003\\\"\",\"request_id\":\"f3022afc-469a-40ec-a449-527eaf20329b\"}",
        "ip_address": "172.30.25.44"
    }
}
```