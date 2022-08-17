## 签署文件PDF转图片

#### 接口说明

* 适用对象 : 接入电子签的商户
* 请求类型 : POST
* apiCode : esign.signflows.pdf2img


#### 请求参数
| 参数 | 是否必填 | 类型 | 最大长度 | 参数描述 | 示例值 |
|:----|:-------:|:-----|:-------|:--------|:------|
| flowId | 是 | String | 64 | 签署流程id |  |


#### 业务参数请求样例
```
{
    "flowId": "2a84381050ae4dd3862c0d834875a207"
}
```


#### 应答报文

| 参数 | 类型 | 最大长度 | 参数描述 | 示例值 |
|:----|:----|:--------|:--------|:------|
| imgUrls | Array数组 | 255 | 文件地址 |  |


#### 应答样例

```
{
    "requestId":"42dd6c6e-247e-487f-87e8-dd97067b877b",
    "responseCode":"000",
    "responseMsg":"成功",
    "data":{
        "imgUrls":[
            "http://test-etc-oss.ebaas.com/1624244708498-静默签署授权书.png",
            "http://test-etc-oss.ebaas.com/1624244709544-静默签署授权书.png"
        ]
    }
}
```
