## ocr身份信息认证

#### 接口说明

ocr身份信息认证  


**域名列表**

| 序号  | 环境  | 请求地址                                            |
| :---: | :---: | :-------------------------------------------------- |
|   1   | 测试  | test-etc.ebaas.com                                  |
|   2   | 生产  | openapi.ebaas.com        |

#### 请求说明
* 请求类型 : POST
* 请求地址 : /api/gateway
* api_code  : ocr.recognition.idcard

### 请求参数
`requestBody`

| 参数            | 类型   | 是否必填 | 最大长度 | 描述                                                  | 示例值           |
| :-------------- | :----- | :------- | -------- | :---------------------------------------------------- | :--------------- |
| app_id          | String | 是       | 16       | 应用ID；16位字符串（ETC开放平台获取）                 | OIG0AF4DMOK2VC2N |
| nonce           | String | 是       | 6        | 6位随机字符                                           | 123AO9           |
| timestamp       | Long   | 是       | 13       | 13位请求时间戳                                        | 1604990109987    |
| sign            | String | 是       | 255      | 将请求参数按字典排序后使用私钥进行RSA签名生成的字符串 | 1VUinhsNiIdF+w   |
| client_sign     | String | 否       |          | 客户端签名包                                          |                  |
| api_code        | String | 是       | 64       | 业务接口code码                                        | test.add         |
| **request_content** | **String** | **否**       |          | **业务接口参数**                                          |                  |
| infoImg         | String | 是       |          | 身份证正面base64字符串。 注意不要带图片BASE64前缀“data:image/jpeg;base64,” 图片类型支持：jpg，jpeg，png，bmp。 图片建议分辨率为1024*768，图片大小控制在3M以内                                         |                  |
| emblemImg       | String | 是       |          | 身份证反面base64字符串。 注意不要带图片BASE64前缀“data:image/jpeg;base64,” 图片类型支持：jpg，jpeg，png，bmp。 图片建议分辨率为1024*768，图片大小控制在3M以内                                         |                  |



#### 业务参数请求样例
```
{
    "apiCode":"ocr.recognition.idcard",
    "appId":"78IR5R1S4HYE5Z0O",
    "nonce":"154946",
    "timestamp":1641793168353,   
    "sign":"bKbke9rwNji4LiTdfPd/Fn2oy7BptYW4/XPAQ1L51xnj2P0E8JnhzJ0XgLNe5f+N/nTGMxUPqnZMPMOEO6HYOXb9fVMckdLNVF5EZhvS3SIorCWjSpaSio21Z84DIe2Qq992mXOcGDzMSii49P4bdZEhgb1OxDuS2M5+cVnTtNI=",
    "request_content":{
        "infoImg":"SBa4EPA0ZyH6lNAjmZcCDIeZdZd7",
        "emblemImg":"SBa4EPA0ZyH6lNAjmZcCDIeZdZd7"
    }
    
}
```


### 响应参数
| 参数       | 类型       | 是否必填 | 最大长度 | 描述       | 示例值                                    |
| :--------- | :--------- | -------- | -------- | :--------- | :---------------------------------------- |
| request_id | String     | 是       | 64       | 请求ID     | 请求的唯一标识                            |
| code       | String     | 是       | 32       | 响应状态码 | 000状态码为成功响应，其他状态码为失败响应 |
| msg        | String     | 否       | 255      | 响应信息   | 成功或失败的错误信息                      |
| data       | JSONObject | 否       |          | 响应数据   | 业务接口返回的响应数据                    |
| name | String | 否| 32 | 姓名 |  |
| gender | String | 否| 32 | 性别 |  |
| nation | String | 否| 32 | 民族 |  |
| birthDay | String|否 | 32 | 出生 |  |
| address | String | 否| 256 |地址 |  |
| idNo | String | 否|64 | 身份证号码 |  |
| validityPeriod | String| 否| 64 | 有效日期 |  |
| issuedBy | String | 否|  128 | 签发机构 |  |
| msg | String | 否|  128 | 返回信息 |  |


### 响应样例

`成功样例`

```
{
	"request_id": "90b7b340-5b49-4549-914c-78208d68cb95",
	"code": "000",
	"msg": "成功",
	"data": {
		"validityPeriod": "2016.02.05-2026.02.05",
		"birthDay": "1997/04/10",
		"address": "甘肃省景泰县一条山镇人民路2号1栋1单元501室",
		"verifyId": "517c7b20-1053-48ee-8d77-f2898e56c969",
		"gender": "男",
		"nation": "汉",
		"issuedBy": "景泰县公安局",
		"name": "狄国钰",
		"msg": "success",
		"idNo": "620402199704102410"
	}
}
```
