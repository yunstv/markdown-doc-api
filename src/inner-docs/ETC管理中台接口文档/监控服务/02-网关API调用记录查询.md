## 网关API调用记录查询

#### 域名列表

| 序号  | 环境  | 请求地址           |
| :---: | :---: | :----------------- |
|   1   | 开发  | dev-gateway.ejuetc.com  |
|   2   | 测试  | test-gateway.ejuetc.com |
|   3   | 生产  | gateway.ejuetc.com  |

#### 接口说明
* 适用对象 : ETC
* 请求类型 : POST
* 请求路径 : /monitor/api/requestLogList/query

#### 请求头
| 参数           | 是否必填 | 类型   | 参数描述    | 示例值                    |
| :------------- | :------: | :----- | :---------- | :------------------------ |
| X-Access-Token |    是    | String | token       |                           |
| etc-sys-id     |    是    | String | ETC系统标识   | // 管理中台:E01，电子签：E02，联盟中心：E03|


#### 请求参数
| 参数       | 是否必填 | 类型   | 最大长度 | 参数描述 | 示例值 |
| :--------- | :------: | :----- | :------- | :------- | :----- |
| request_id |    否    | String |          | 请求id |        |
| occur_start_time   |    是    | Date |          | 查询开始时间 |        |
| occur_end_time |    否    | Date |          | 查询结束时间 |        |
| api_code   |    否    | String |          | 接口编码 |        |
| app_id   |    否    | String |          | 应用id |        |
| response_code   |    否    | String |          | 响应状态码 |        |
| non_normal_code   |    否    | Boolean |          | 状态码非000 |    此字段为true且 与 响应状态码字段同时存在时，按响应状态码   |
| page_num   |    是    | int    |          | 页码     |        |
| page_size  |    是    | int    |          | 页大小   |        |

#### 请求样例

```
{
   "response_code":"0000",
   "occur_start_time":1627833600000,
   "occur_end_time":1628006399000,
   "page_num":1,
   "page_size":2
}
```



#### 应答报文
| 参数              | 是否必传 | 类型    |      参数描述        | 示例值     |
| :---------------- | :------: | :------ | :------------------- | :--------- |
| pageNum           |    是    | int     |      页码                |            |
| pageSize          |    是    | int     |      每页记录数                |            |
| totalPages        |    是    | int     |      总页数                |            |
| totalElements     |    是    | int     |      总记录数                |            |
| <b>list</b>       |    是    | List    |      结果列表                |            |
| request_id        |    是    | String    |      请求id          |            |
| app_id            |    是    | String  |      应用id        |            |
| api_code          |    是    | String  |      接口编码    |            |
| request_occur_time  |    是    | String  |      请求发生时间    |            |
| response_code    |    是    | String  |      响应状态码        |            |          |


#### 应答样例
```
{
    "requestId":"42dd6c6e-247e-487f-87e8-dd97067b877b",
    "responseCode":"000",
    "responseMsg":"成功",
    "data": {
            "pageNum": 1,
            "pageSize": 2,
            "totalPages": 1,
            "totalElements": 2,
            "list": [
                {
                    "request_id": "c187a9f3-5b10-443e-8804-bf979c05f8d7",
                    "app_id": "VY9XET01O5RT6HTH",
                    "api_code": "ecode-ac.case.add",
                    "request_occur_time": "2021-08-04 17:05:30",
                    "response_code": "0"
                },
                {
                    "request_id": "f3022afc-469a-40ec-a449-527eaf20329b",
                    "app_id": "VY9XET01O5RT6HTH",
                    "api_code": "ecode-ac.case.add",
                    "request_occur_time": "2021-08-04 16:53:40",
                    "response_code": "0"
                }
            ]
        }
}
```
