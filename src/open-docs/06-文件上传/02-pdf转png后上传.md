## 文件上传

#### 接口说明

* 适用对象 : 渠道参与方
* 请求类型 : POST
* apiCode : base.file.pdf_ex_upload

#### 请求参数
| 参数 | 是否必填 | 类型 | 最大长度 | 参数描述 |
|:----|:-------:|:-----|:-------|:--------|
| file_name | 是 | String | 32 | 文件名称 |
| file_type | 是 | String | 32 | 文件类型，FILE  |
| file_sub_type | 否 | String | 32 | 文件类型，PDF |
| file | 否 | String |  | file需转为Base64，file和file_url不能同时为空，若同时有值时，file优先级更高。<br/>注意不要带图片BASE64前缀“data:image/jpeg;base64,” |
| file_url | 否 | String | 200 | 可公开访问的文件地址  |
| is_private | 否  | boolean | 32 | 默认为false |
| exType | 是  | integer | 32 | 转图片类型 1，转成1张图；2，几页pdf转成几张图 |


#### 业务参数请求样例
```
{
    "file_name":"test1.png",
    "file_type":"FILE",
    "file_sub_type":"PDF",
    "file_url":"http://qiushilian.ess.ejucloud.cn/test1.pdf",
    "is_private":false,
    "exType": 1
}
```

#### 应答报文

| 参数 | 类型 | 最大长度 | 参数描述 | 示例值 |
|:----|:----|:--------|:--------|:------|
| image_url_list | String | 200 | 文件访问地址 |  |


#### 应答样例

```
{
    "requestId":"eb053acf-66a0-4974-a7b4-2f2354460755",
    "code":"000",
    "msg":"成功",
    "data":{
        {"image_url_list":["http://test-etc-oss.ebaas.com/test1.png!style0.jpg"]}
    }
}
```