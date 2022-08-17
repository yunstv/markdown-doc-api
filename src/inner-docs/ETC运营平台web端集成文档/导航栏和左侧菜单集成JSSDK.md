## 导航栏和左侧菜单集成JSSDK

#### 说明

为了统一运营平台的各个业务方系统的导航栏和左侧菜单的风格

#### 1、引入导航栏和左侧菜单

- 在页面的入口引入JSSDK

```js
<script src="{PATH_ENV}/etc/ETCOPTSDK.min.js"></script>
```

- 本地环境开发阶段

```js

<script src="http://dev-work.eju.com/etc/ETCOPTSDK.min.js"></script>

```

- 部署到生产环境阶段

```js
// 开发环境
<script src="http://dev-work.eju.com/etc/ETCOPTSDK.min.js"></script>

// 测试环境
<script src="http://work-test.eju.com/etc/ETCOPTSDK.min.js"></script>

// 正式环境
<script src="http://work.eju.com/etc/ETCOPTSDK.min.js"></script>
```

#### 2、配置左侧导航栏入口和左侧菜单

需要有配置菜单权限的人员登录运营平台进行配置
> 开发环境：http://dev-work.eju.com/

> 测试环境：http://work-test.eju.com/

> 正式环境：http://work.eju.com/

#### 3、使用示例

```js
new window.ETCOPTSDK()
```

##### 执行成功示例

便会在当前页，注入导航栏与左侧菜单

> 菜单数据根据账号，业务，权限等不同而不同

![gateway](./1.png)

![gateway](./2.png)

#### 4、调试问题

- JS资源加载未完成前，引用了JSSDK
- 参考6、基本示例
```

- 本地开发调试JSSDK请求的接口存在跨域问题

```js
// 本地开发调试时，在入口引用
// dev-work.eju.com服务端已做跨域处理
// 一般调试时情况都正常，如遇到问题，请联系我们
<script src="http://dev-work.eju.com/etc/ETCOPTSDK.min.js"></script>
// 出现跨域问题时，本地开发环境运行时，js资源引入问题
// 如
<script src="http://work-test.eju.com/etc/ETCOPTSDK.min.js"></script>
// 或
<script src="http://work.eju.com/etc/ETCOPTSDK.min.js"></script>
// 如上两种情况，本地调试时或发布到生产环境时，引入js与生产环境域名不一致时，都会出现跨域报错问题
// 本地调试时解决方式
// 设置服务代理
app.use(
  '/api',
  createProxyMiddleware({
    // target: 'http://work.eju.com',
    // target: 'http://ev-work.eju.com',
    target: 'http://work-test.eju.com',
    changeOrigin: true,
  })
)
// 如果本地调试引入正常，但生产环境出现问题，请检查引入的ETCOPTSDK JSSDK 资源路径是否与线上环境资源是否一致
```

- 调试时，提示token无效或失效问题

```js
/**
 * 如果需要获取在dev环境配置的菜单数据
 * 请先访问 http://dev-work.eju.com/ 登录成功后
 * 打开开发者工具，将 localStorage 中
 * pro__Access-Token 字段及value 复制到本地服务器环境的localStorage中
 * pro__Login_Userinfo 字段及value 复制到本地服务器环境的localStorage中
 * 操作至此，刷新即可
 * 若本地调试时，需要获取其他环境配置的菜单数据，操作同上 
 * 开发环境：http://dev-work.eju.com/
 * 测试环境：http://work-test.eju.com/
 * 正式环境：http://work.eju.com/
 *／
```

#### 5、JSSDK资源引入建议

##### 如果你的项目生产环境地址属于以下几种
 
> 开发环境：http://dev-work.eju.com/

> 测试环境：http://work-test.eju.com/

> 正式环境：http://work.eju.com/

建议部署到生产环境时，JSSDK资源引入方式调整为

```js
// 使用相对路径引入
// 避免部署不同生产环境时，引入资源环境不一致问题
<script src="/etc/ETCOPTSDK.min.js"></script>
```

##### 其它情况引入方式

```js
// 开发环境
<script src="http://dev-work.eju.com/etc/ETCOPTSDK.min.js"></script>
// 测试环境
<script src="http://work-test.eju.com/etc/ETCOPTSDK.min.js"></script>
// 正式环境
<script src="http://work.eju.com/etc/ETCOPTSDK.min.js"></script>
```
#### 6、基本示例

```js
// 引入js
// index.html
// 开发环境
<script src="http://dev-work.eju.com/etc/ETCOPTSDK.min.js"></script>
// 测试环境
// <script src="http://work-test.eju.com/etc/ETCOPTSDK.min.js"></script>
// 正式环境
// <script src="http://work.eju.com/etc/ETCOPTSDK.min.js"></script>

let ETCOPTSDKTime
let timeOrder = 10
function isETCOPTSDKFunc(cb) {
  if (!timeOrder) {
    console.error('未找到方法ETCOPTSDK, 请检查引入状态，并刷新重试');
    return ETCOPTSDKTime && clearTimeout(ETCOPTSDKTime)
  }
  if (Object.hasOwnProperty.call(window, 'ETCOPTSDK')) {
    cb && cb()
    return ETCOPTSDKTime && clearTimeout(ETCOPTSDKTime)
  }
  ETCOPTSDKTime = setTimeout(() => {
    timeOrder -= 1
    isETCOPTSDKFunc(cb)
  }, 300)
}

// 调用sdk
// index.js
isETCOPTSDKFunc(function() {
  new window.ETCOPTSDK()
})

```
