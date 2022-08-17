# 签名验签SDK

## 1.JAVASDK

**maven仓库坐标**

```
<groupId>com.etc</groupId>
    <artifactId>etc-crypto-sdk</artifactId>
<version>0.1.1-SNAPSHOT</version>
```

### 网关请求签名

**工具类方法**:

 `com.etc.sdk.util.ETCGatewayUtils.createETCGatewayRequest`

**请求参数**

| 参数            | 类型   | 是否必填 | 最大长度 | 描述                                  | 示例值           |
| :-------------- | :----- | :------- | -------- | :------------------------------------ | :--------------- |
| app_id          | String | 是       | 16       | 应用ID；16位字符串（ETC开放平台获取） | OIG0AF4DMOK2VC2N |
| client_sign     | String | 否       |          | 客户端签名包                          |                  |
| api_code        | String | 是       | 64       | 业务接口code码                        | test.add         |
| request_content | string | 否       |          | 业务接口参数                          |                  |
| private_key     | string | 是       |          | 签名私钥（从ETC开放平台获取）         |                  |

**响应参数**`ETCGatewayRequest`

| 参数            | 类型   | 是否必填 | 最大长度 | 描述                                                  | 示例值           |
| :-------------- | :----- | :------- | -------- | :---------------------------------------------------- | :--------------- |
| app_id          | String | 是       | 16       | 应用ID；16位字符串（ETC开放平台获取）                 | OIG0AF4DMOK2VC2N |
| nonce           | String | 是       | 6        | 6位随机字符                                           | 123AO9           |
| timestamp       | Long   | 是       | 13       | 13位请求时间戳                                        | 1604990109987    |
| sign            | String | 是       | 255      | 将请求参数按字典排序后使用私钥进行RSA签名生成的字符串 | 1VUinhsNiIdF+w   |
| client_sign     | String | 否       |          | 客户端签名包                                          |                  |
| api_code        | String | 是       | 64       | 业务接口code码                                        | test.add         |
| request_content | string | 否       |          | 业务接口参数                                          |                  |

