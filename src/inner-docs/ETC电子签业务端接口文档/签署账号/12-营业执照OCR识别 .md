## 营业执照OCR识别

#### 接口说明

* 适用对象 : 电子签业务端
* 请求类型 : POST
* 请求地址 : /esign/api/ocr/org


#### 请求参数
| 参数 | 是否必填 | 类型 | 最大长度 | 参数描述 | 示例值 |
|:----|:-------:|:-----|:-------|:--------|:------|
| etc-token | 是 | String | 32 | etc访问令牌，header |  |
| etc-sys-id | 是 | String | 32 | 系统类型（固定E02），header | E02 |
| img | 是 | String | 255 | 营业执照base64字符串。<br/>注意不要带图片BASE64前缀“data:image/jpeg;base64,”<br/>图片类型支持：jpg，jpeg，png，bmp。<br/>图片建议分辨率为1024*768，图片大小控制在3M以内 |  |




#### 业务参数请求样例
```
{
    "img": "adasdasdadasdadaddsd"
}
```


#### 应答报文

| 参数 | 类型 | 最大长度 | 参数描述 | 示例值 |
|:----|:----|:--------|:--------|:------|
| address | String | 255 | 地址 |  |
| validPeriod | String | 255 | 证件有效期 |  |
| certImage | object |  | 证件图片对象 |
| frontUrl | String | 255 | 证件原图正面url |  |
| thumbnailFrontUrl | String | 255 | 证件缩略图正面url |  |
| backUrl | String | 255 | 证件原图反面url |  |
| thumbnailBackUrl | String | 255 | 证件缩略图反面url |  |
| message | String | 提示信息 | success |  |



#### 应答样例

```
{
    "requestId": "42dd6c6e-247e-487f-87e8-dd97067b877b",
    "responseCode": "000",
    "responseMsg": "成功",
    "data": {
        "address": "浙江省杭州市",
        "validPeriod": "2019.01.01-2039.01.01",
        "message": "success",
        "certImage": {
            "frontUrl": "https://cdn.ebaas.com/1623916954995/test1.png",
            "backUrl": "",
            "thumbnailFrontUrl": "https://cdn.ebaas.com/1623916954995/test1.png@imageView2/1/w/200/h/200",
            "thumbnailBackUrl": ""
        }
    }
}
```
