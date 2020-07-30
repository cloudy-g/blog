## 论坛
#### 1. 注册
- 基本数据 用户名，密码，邮箱

- 使用数据库 mongodb ，插件 mongoose 

- 前端通过 jquery ajax post提交数据，

- 后端通过设置 session 来保存用户状态信息， 

   - 配置 session

   ```javascript
   // 
   app.use(session({
       // 在加密时加上这段字符串
       secret: 'gyblog', 
       resave: false,
     // true 表示无论本次请求设不设置session都会给客户端分配cookie
     // false 表示只有在这次请求设置session时才会给客户端分配cookie
       saveUninitialized: false
   //   cookie: { secure: true }
   }))
   // 使用
   req.session.user = user;
   ```

   ##### 注意：服务端重定向只针对同步请求才有效，异步请求无效

#### 2. 登录
#### 3. 首页更新

#### 4中间件

- express 中间件

  - ```javascript
    // 中间件 实际上就是一个处理函数
    app.use(function(req, res, next) {
        ...
        next()  // 调用下一个匹配的处理中间件
    })
    // ex :
    app.get('/', (req, res, next) => {
        fs.readFile('./a.txt', (err, data) => {
            if (err) {
                next(err); // 调用下一个中间件
            }
            ...
        })
    })
    app.use((err, req, res, next) => {
        if(err) {
            res.render('404.html');
        	return;
        }
    	....
    })
    ```

  - 