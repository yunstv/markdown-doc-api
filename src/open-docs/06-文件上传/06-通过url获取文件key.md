## 通过url获取文件key

#### 接口说明

* 适用对象 : 渠道参与方
* 请求类型 : POST
* 请求地址: /api/file/key

**域名列表**

| 序号 | 环境 | 请求地址                                  |
| ---- | ---- | ----------------------------------------- |
| 1    | 测试 | http://test-gateway.ejuetc.com/inner/base |
| 2    | 预发 | http://pre-gateway.ejuetc.com/inner/base  |
| 3    | 生产 | http://gateway.ejuetc.com/inner/base      |

#### 请求参数
| 参数 | 是否必填 | 类型 | 最大长度 | 参数描述 |
|:----|:-------:|:-----|:-------|:--------|
| company_id | 是 | String | 32 | 公司id |
| old_url | 是 | String | 200 | 需要查询的文件地址 |
| file_type | 是 | String | 32 | 文件类型，IMAGE、FILE、VIDEO、VR  |
| file_sub_type | 否 | String | 32 | 图片文件类型，IMAGE: PNG、JPG、BMP、TIFF、WEBP，VIDEO：MP4 |


#### 业务参数请求样例
```
{
  "company_id": "32180",
  "old_url": "http://test-tmhouse-oss.ebaas.com/O729PY4ID3D18T3S/IMAGE/1630041802926/035342_c5791fa4-7c62-42dc-ae27-45f8a81f14d5.JPG!style0.jpg",
  "file_type": "IMAGE",
  "file_sub_type": "JPG"
}
```

#### 应答报文

| 参数 | 类型 | 最大长度 | 参数描述 | 示例值 |
|:----|:----|:--------|:--------|:------|
| data | String | 200 | 文件key |  |


#### 应答样例

```
{
  "requestId": null,
  "responseCode": "000",
  "responseMsg": "成功",
  "data": "O729PY4ID3D18T3S/IMAGE/-1215425401/L2Rvd25sb2FkL0ltYWdlcy8yMDIxMDIx"
}
```

### 返回码
| 返回码 | 描述 | 解决方案 |
|:------|:----|:-----|
| 400 | 参数{paramName}不能为空 | 检查参数名称是否正确，参数是否赋值 |
|400009| 公司id{0}不存在 | 检查参数后再试或联系管理员 |
|400010| url{0}异常 | 检查参数后再试或联系管理员 |