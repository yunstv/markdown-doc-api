## 身份证OCR识别

#### 接口说明

* 适用对象 : 电子签业务端
* 请求类型 : POST
* 请求地址 : /esign/api/ocr/idCard


#### 请求参数
| 参数 | 是否必填 | 类型 | 最大长度 | 参数描述 | 示例值 |
|:----|:-------:|:-----|:-------|:--------|:------|
| etc-token | 是 | String | 32 | etc访问令牌，header |  |
| etc-sys-id | 是 | String | 32 | 系统类型（固定E02），header | E02 |
| infoImg | 是 | String | 255 | 身份证正面base64字符串。<br/>注意不要带图片BASE64前缀“data:image/jpeg;base64,”<br/>图片类型支持：jpg，jpeg，png，bmp。<br/>图片建议分辨率为1024*768，图片大小控制在3M以内 |  |
| emblemImg | 是 | String | 255 | 身份证反面base64字符串。<br/>注意不要带图片BASE64前缀“data:image/jpeg;base64,”<br/>图片类型支持：jpg，jpeg，png，bmp。<br/>图片建议分辨率为1024*768，图片大小控制在3M以内 |  |



#### 业务参数请求样例
```
{
    "infoImg": "adasdasdadasdadaddsd",
    "emblemImg": "asdasdadadasddasdsds"
}
```


#### 应答报文

| 参数 | 类型 | 最大长度 | 参数描述 | 示例值 |
|:----|:----|:--------|:--------|:------|
| validPeriod | String | 255 | 证件有效期 |  |
| idNumber | String | 32 | 证件号 |  |
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
        "validPeriod": "2010年09月02日至2020年09月01日",
        "idNumber": "330100199001015011",
        "message": "success",
        "certImage": {
            "frontUrl": "https://cdn.ebaas.com/1623916954995/test1.png",
            "thumbnailFrontUrl": "https://cdn.ebaas.com/1623916954995/test1.png@imageView2/1/w/200/h/200",
            "backUrl": "https://cdn.ebaas.com/1623916954995/test1.png",
            "thumbnailBackUrl": "https://cdn.ebaas.com/1623916954995/test1.png@imageView2/1/w/200/h/200"
        }
    }
}
```


