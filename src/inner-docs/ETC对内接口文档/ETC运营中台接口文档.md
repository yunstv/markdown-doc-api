# ETC运营中台接口文档

## 一、网关统一接口调用

### 接口说明

**域名列表**

| 序号 | 环境 | 请求地址 |
|:---:|:----:|:-------|
| 1 | 开发 | http://10.122.153.9:5086 |
| 2 | 测试 | http://10.122.153.10:5086 |
| 3 | 生产 | http://gateway.ejuetc.com |

**请求类型**

* POST

**请求地址**

* /api/gateway

### 请求参数
`Body`

| 参数 | 描述 | 类型 | 是否必填 | 说明 |
|:----|:-----|:----|:-------|:-----|
| appId | 应用ID | String | 是 | 16位字符串 |
| nonce | 临时随机数 | String | 是 | 6位随机字符 |
| timestamp | 请求时间戳 | Long | 是 | 13位数字 |
| sign | 签名字符串 | String | 是 | 将请求参数按字典排序后使用私钥进行RSA签名生成的字符串 |
| apiCode | 业务接口code码 | String | 是 | 指定实际调用的业务接口 |
| params | 业务接口参数 | JSONObject | 否 | 实际调用的业务接口所需要的参数 |

### 请求样例

```
POST http://GatewayHost/api/gateway
Accept: */*
Cache-Control: no-cache
Content-Type: application/json
{
  "appId" : "OIG0AF4DMOK2VC2N",
  "nonce" : "123AO9",
  "timestamp" : 1604990109987,
  "sign": "1VUinhsNiIdF+w2BJ5tChfyxMHOfgPf+4FhJyTH7Mrr/WNx57ndZhWjaal62/WKMf0M49n+WHWbXmb5qY0wyiSSrz5HK/dd/bkDK6BBFLn4IbR3XCF4wxJ48mm8nrRvNQ2MY3RGug1OmmeD8nG5+alpN35sXCgU3aOHyfU5PLfg8=",
  "apiCode": "test.add",
  "params": {
    "name": "测试"
  }
}
```

### 响应参数
| 参数 | 描述 | 类型 | 说明 |
|:----|:-----|:----|:----|
| requestId | 请求ID | String | 请求的唯一标识 |
| responseCode | 响应状态码 | String | 000状态码为成功响应，其他状态码为失败响应 |
| responseMsg | 响应信息 | String | 成功或失败的错误信息 |
| data | 响应数据 | JSONObject | 业务接口返回的响应数据 |

### 响应样例

`成功样例`

```
{
  "requestId": "b372be68-6fa6-4590-b927-a4096e6a05e6",
  "responseCode": "000",
  "responseMsg": "成功",
  "data": [
    {
      "testId": 5,
      "testName": "测试"
    }
  ]
}
```

`失败样例`

```
{
  "requestId": "42dd6c6e-247e-487f-87e8-dd97067b877b",
  "responseCode": "401001",
  "responseMsg": "验证签名失败",
  "data": null
}
```
### 错误码
| 错误码 | 描述 | 建议 |
|:------|:----|:-----|
| 400 | 参数{paramName}不能为空 | 检查参数名称是否正确，参数是否赋值 |
| 400001 | appId不正确 | 检查appId是否正确 |
| 400002 | 接口已停用 | 联系管理员 |
| 401001 | 验证签名失败{errorMsg} | 检查待签名的字符串格式是否正确，检查待签名的字符串是否和当前的签名匹配或根据错误信息处理 |
| 401002 | 无权限访问当前接口 | 检查账号是否有权限或联系管理员 |
| 403001 | 请求时间非法或已过期 | 检查请求时间戳timestamp是否正确，请求有效时间应小于系统时间且在30秒内 |
| 403002 | 请勿重复请求 | 使用一个新的临时随机数nonce或等待60秒后重新请求 |
| 404001 | 接口不存在 | 检查apiCode是否正确或联系管理员 |
| 500 | 系统异常，请稍后再试或联系管理员 | 请稍后再试或联系管理员 |

## 二、网关签名验签
### 签名字符串
 对参数appId、nonce、timestamp、apiCode、业务参数进行字典排序，参数和值之间用“=”连接，参数之间用“&”连接。 <br/>`注：业务参数为params对象里的所有非对象、数组、集合类型的参数`
  
**签名字符串示例**
 
```
apiCode=test.add&appId=OIG0AF4DMOK2VC2N&name=测试&nonce=123AO9&timestamp=1604990109987
```

### 加签
用`私钥（ETC平台获取）`对签名字符串进行RSA签名,UTF-8编码。

**java 签名示例**

```
	/**
     * 用私钥对待签名字符串进行签名
     * 
     * @param content 
     * @param privateKey
     * @return
     */
    public static String rsaSign(String content, String privateKey) {
        try {
            PrivateKey priKey = getPrivateKeyFromPKCS8("RSA", new ByteArrayInputStream(privateKey.getBytes()));
            Signature signature = Signature.getInstance("SHA1WithRSA");
            signature.initSign(priKey);
            signature.update(content.getBytes(StandardCharsets.UTF_8));
            byte[] signed = signature.sign();
            return new String(Base64.encodeBase64(signed));
        } catch (Exception var7) {
            throw new BusinessException("401001", var7.getMessage());
        }
    }
    public static PrivateKey getPrivateKeyFromPKCS8(String algorithm, InputStream ins) throws Exception {
        if (ins != null && !StringUtils.isBlank(algorithm)) {
            KeyFactory keyFactory = KeyFactory.getInstance(algorithm);
            byte[] encodedKey = IOUtils.toString(ins, StandardCharsets.UTF_8).getBytes();
            encodedKey = Base64.decodeBase64(encodedKey);
            return keyFactory.generatePrivate(new PKCS8EncodedKeySpec(encodedKey));
        } else {
            return null;
        }
    }
```

**签名私钥示例**

```
MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAJYmnqO24pylH6D4+JBszn52ZV+hssW+77CaoNsnrPCUtD8ZXBPQ6tiPMhkFyJNrSMRUsQthOKlSD3Q+rPpjsAGAa+4OhFUs8R2oK9vej3SF+7zZ04cKJG+fLjGxa4R2bmzVbubZL+BAk9Y2qa1IKV7NNS7jT38O6sEzFRBik1ybAgMBAAECgYB3PxSeUJCId1s3LIO7r64PIVhBKtof0hPp3eQCKPBf4LmFo05NLo5UjuTqmn1BFuMjiV9R+lRVpKZBW8Vk1ebhEnej7+SEAyrTU2jFE/7+V+JYChWJY3ipyvnWnLvGNIB9Er0wHGK8R9o7lDi0+592x1tuOrxud1nJ56ID4DgfAQJBAM/77Z0nkbvEgdJ0hgSXAvwZ1EjSGtkGFVELlsuYM6kt3xQ+FCk2fmuiE7t8UObAVHx4HusnApIJUWrs8hxFAxMCQQC40LA2xUDYvqM9sYx7l98M6K0/LEuRMm8QLt+5lhNCeibh4MZI8kHADsgnqLY7EC4WunAbNFL/AREGMI+WM+lZAkEAwskM9rwSTqpxc2rSAQZ1Myn1mOW9YzfBSw/xgGfhKjbd0BV7yEVTDPbUSCjbk+DYv2G4gz8bty2m5N9YuIUhpQJAcNFDoEuNKEJHV/O4NAIjcLfgef3KK1pEHfbfL2UDYMM8VQpnQERSCrF7UWpVw3w/BjTNFm48c9ns0IB4RlJuEQJBAJ7wpryXOU9wj02vTciXHo955AnrbAVMyu/9flZTVRAZ1XQF5Unt2iSUl0kcwT7njANCX94bZTJilXqJnZK6MS0=
```

**签名结果示例**

```
CN0XEbwadVuQWHhTPfvPxCzZkd8VqTHH4TtL4Lx42lcvUxE0w5NfidiAi8q3lnsv83mb/Dc+SAZTmWaMfArgcnmCXKA8ChM1XyPPqNhSJd4RIQ/ZAonax32qJsYl2opC7xlYmo27hNtDzLpQPfux2vvXRHx2lswMLgfL23F1ENo=
```

### 验签
服务器接收到请求后，用相同的逻辑组装好签名字符串，然后用公钥和接收到的签名验签，UTF-8编码。

**java 验签示例**

```
    /**
     * 用公钥和签名字符串对签名进行验证
     * 
     * @param content 
     * @param sign
     * @param publicKey
     * @return
     */
    public static boolean rsaCheckContent(String content, String sign, String publicKey) {
        try {
            PublicKey pubKey = getPublicKeyFromX509("RSA", new ByteArrayInputStream(publicKey.getBytes()));
            Signature signature = Signature.getInstance("SHA1WithRSA");
            signature.initVerify(pubKey);
            signature.update(content.getBytes(StandardCharsets.UTF_8));
            return signature.verify(Base64.decodeBase64(sign.getBytes()));
        } catch (Exception var6) {
            throw new BusinessException("401001", var6.getMessage());
        }
    }
    public static PublicKey getPublicKeyFromX509(String algorithm, InputStream ins) throws Exception {
        KeyFactory keyFactory = KeyFactory.getInstance(algorithm);
        byte[] encodedKey = IOUtils.toString(ins, StandardCharsets.UTF_8).getBytes();
        encodedKey = Base64.decodeBase64(encodedKey);
        return keyFactory.generatePublic(new X509EncodedKeySpec(encodedKey));
    }
```

**签名公钥示例**

```
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCWJp6jtuKcpR+g+PiQbM5+dmVfobLFvu+wmqDbJ6zwlLQ/GVwT0OrYjzIZBciTa0jEVLELYTipUg90Pqz6Y7ABgGvuDoRVLPEdqCvb3o90hfu82dOHCiRvny4xsWuEdm5s1W7m2S/gQJPWNqmtSClezTUu409/DurBMxUQYpNcmwIDAQAB
```

## 三、业务接口列表
| 序号 | 接口名称 | apiCode | 接口说明 |
|:---:|:-------:|:--------|:--------|
| 1 | 用户－保存用户 | partner.broker.save |  |
| 2 | 房源－新建挂牌 | loupan.service.sale |  |
| 3 | 协作流程－创建流程单 | trade.service.create |  |
| 4 | 协作流程－更新流程单 | trade.service.update |  |
| 5 | 协作流程－保存二手房佣金分配 | trade.commission.secondhand.save |  |

## 四、业务接口说明


### 1、用户－保存用户

#### 接口说明

* 适用对象 : 渠道参与方
* 请求类型 : POST
* apiCode : partner.broker.save

#### 请求参数
| 参数 | 是否必填 | 类型 | 最大长度 | 参数描述 | 示例值 |
|:----|:-------:|:-----|:-------|:--------|:------|
| etc_broker_no | 否 | String | 32 | ETC用户编号 |  |
| biz_broker_id | 是 | String | 32 | 业务用户ID |  |
| biz_broker_name | 是 | String | 32 | 业务用户名称 |  |
| biz_broker_phone | 是 | String | 32 | 业务用户手机号 |  |
| biz_broker_type | 是 | String | 32 | 业务用户类型 | 类型枚举 |
| biz_broker_status | 是 | String | 32 | 业务用户状态 | 状态枚举 |
| biz_store_id | 是 | String | 32 | 用户所属门店ID |  |
| biz_store_name | 是 | String | 255 | 用户所属门店名称 |  |
| biz_company_id | 是 | String | 32 | 用户所属公司ID |  |
| biz_company_name | 是 | String | 255 | 用户所属公司名称 |  |

#### 请求样例
```
{
	"biz_broker_id" : "123456",
	"biz_broker_name" : "张三",
	"biz_broker_phone" : "13012345678",
	"biz_broker_type" : "T1",
	"biz_broker_status" : "ST01",
	"biz_store_id" : "S00001",
	"biz_store_name" : "门店01",
	"biz_company_id" : "C00001",
	"biz_company_name" : "公司01"
}
```

#### 应答报文

| 参数 | 是否必填 | 类型 | 最大长度 | 参数描述 | 示例值 |
|:----|:-------:|:----|:--------|:--------|:------|
| etc_broker_no | 是 | String | 32 | ETC用户编号 |  |

#### 应答样例

```
{
	"responseCode": "000",
	"responseMsg": "成功",
	"detail": null,
	"data": {
		"etc_broker_no": "U12345"
	}
}
```

### 2、房源－新建挂牌

#### 接口说明
* 适用对象 : 渠道参与方
* 请求类型 : POST
* apiCode : loupan.service.sale

#### 请求参数
| 参数 | 是否必填 | 类型 | 最大长度 | 参数描述 | 示例值 |
|:----|:-------:|:-----|:-------|:--------|:------|
| etc_ecode | 是 | String | 32 | E码编号 |  |
| etc_process_no | 是 | String | 32 | ETC流程编号 |  |

#### 请求样例
```
{
	"etc_ecode" : "X20201109150635695000001",
	"etc_process_no" : "EP000001"
}
```

#### 应答报文

| 参数 | 是否必填 | 类型 | 最大长度 | 参数描述 | 示例值 |
|:----|:-------:|:----|:--------|:--------|:------|
| etc_sale_id | 是 | String | 32 | ETC挂牌ID |  |

#### 应答样例

```
{
	"responseCode": "000",
	"responseMsg": "成功",
	"detail": null,
	"data": {
		"etc_sale_id": "12345"
	}
}
```

### 3、协作流程－创建流程单

#### 接口说明
* 适用对象 : 渠道参与方
* 请求类型 : POST
* apiCode : trade.service.create

#### 请求参数
| 参数 | 是否必填 | 类型 | 最大长度 | 参数描述 | 示例值 |
|:----|:-------:|:-----|:-------|:--------|:------|
| etc_sale_no | 是 | String | 32 | ETC挂牌编号 |  |
| etc_user_no | 是 | String | 32 | ETC客户编号 |  |

#### 请求样例
```
{
	"etc_sale_no" : "X20201109150635695000001",
	"etc_user_no" : "E0001000001"
}
```

#### 应答报文

| 参数 | 是否必填 | 类型 | 最大长度 | 参数描述 | 示例值 |
|:----|:-------:|:----|:--------|:--------|:------|
| etc_process_bill_no | 是 | String | 32 | ETC流程单编号 |  |

#### 应答样例

```
{
    "requestId": "42dd6c6e-247e-487f-87e8-dd97067b877b",
    "responseCode": "000",
    "responseMsg": "成功",
    "data": {
        "etc_process_bill_no": "F20201231112338656491666"
    }
}
```

### 4、协作流程－更新流程单

#### 接口说明

* 适用对象 : 渠道参与方
* 请求类型 : POST
* apiCode : trade.service.update

#### 请求参数
| 参数 | 是否必填 | 类型 | 最大长度 | 参数描述 | 示例值 |
|:----|:-------:|:-----|:-------|:--------|:------|
| etc_process_bill_no | 是 | String | 32 | ETC流程单编号 |  |
| etc_process_node_no | 是 | String | 32 | ETC流程节点编号 |  |
| biz_process_node_status | 是 | String | 32 | 流程节点状态 | 状态枚举 |
| biz_data_map | 是 | Map |  | 业务数据集合,详见业务数据Map |  |

#### 请求样例
```
{
	"etc_process_bill_no" : "F20201231112338656491666",
	"etc_process_node_no" : "EPN0000101",
	"biz_process_node_status" : "ORDERED",
	"biz_data_map" : {
		"CODE001" : "张三",
		"CODE002" : "5000"
	}
}
```

#### 应答报文

| 参数 | 是否必填 | 类型 | 最大长度 | 参数描述 | 示例值 |
|:----|:-------:|:----|:--------|:--------|:------|
| etc_process_bill_no | 是 | String | 32 | ETC流程单编号 |  |

#### 应答样例

```
{
    "requestId": "42dd6c6e-247e-487f-87e8-dd97067b877b",    
    "responseCode": "000",
    "responseMsg": "成功",
    "data": {
        "etc_process_bill_no": "F20201231112338656491666"
    }
}
```

### 5、协作流程－保存二手房佣金分配

#### 接口说明

* 适用对象 : 渠道参与方
* 请求类型 : POST
* apiCode : trade.commission.secondhand.save

#### 请求参数
| 参数 | 是否必填 | 类型 | 最大长度 | 参数描述 | 示例值 |
|:----|:-------:|:-----|:-------|:--------|:------|
| etc_process_bill_no | 是 | String | 32 | ETC流程单编号 |  |
| public_estate_type | 是 | String | 32 | 公盘类型 |  |
| commission_list | 是 | List |  | 佣金分配集合 |  |
| role_type | 是 | String | 32 | 角色类型 |  |
| role_type_name | 是 | String | 32 | 角色类型名称 |  |
| allocation_proportion | 是 | String | 32 | 分配比例 | 20.00 |
| broker_id | 是 | String | 32 | 角色人ID |  |
| broker_name | 是 | String | 32 | 角色人姓名 |  |
| broker_phone | 是 | String | 32 | 角色人手机号 |  |
| store_id | 是 | String | 32 | 门店ID |  |
| store_name | 是 | String | 255 | 门店名称 |  |
| company_id | 是 | String | 32 | 公司ID |  |
| company_name | 是 | String | 255 | 公司名称 |  |


#### 请求样例
```
{
    "etc_process_bill_no": "F20201231112338656491666",
    "public_estate_type": "T001",
    "commission_list": [{
        "role_type": "1",
        "role_type_name": "录入人",
        "allocation_proportion": "35.00",
        "broker_id": "B001",
        "broker_name": "张三",
        "broker_phone": "13100000001",
        "store_id": "S001",
        "store_name": "门店01",
        "company_id": "C001",
        "company_name": "公司01"
    },{
        "role_type": "3",
        "role_type_name": "钥匙人",
        "allocation_proportion": "10.00",
        "broker_id": "B002",
        "broker_name": "李四",
        "broker_phone": "13100000002",
        "store_id": "S002",
        "store_name": "门店02",
        "company_id": "C002",
        "company_name": "公司02"
    }]
}
```

#### 应答报文

| 参数 | 是否必填 | 类型 | 最大长度 | 参数描述 | 示例值 |
|:----|:-------:|:----|:--------|:--------|:------|
| etc_process_bill_no | 是 | String | 32 | ETC流程单编号 |  |

#### 应答样例

```
{
    "requestId": "42dd6c6e-247e-487f-87e8-dd97067b877b",    
    "responseCode": "000",
    "responseMsg": "成功",
    "data": {
        "etc_process_bill_no": "F20201231112338656491666"
    }
}
```
