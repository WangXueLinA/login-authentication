const Koa = require('koa');
const app = new Koa();
const static = require('koa-static');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const views = require('koa-views');
const router = require('./routes');
const JWT = require('./util/JWT');
app.use(bodyParser()); //获取post参数
app.use(static(path.join(__dirname, 'public'))); //静态资源

app.use(views(path.join(__dirname, 'views'), { extension: 'ejs' }));

//token判断拦截
app.use(async (ctx, next) => {
  if (ctx.url.includes('login')) {
    await next();
    return;
  }

  const token = ctx.headers['authorization']?.split(' ')[1];
  if (token) {
    const payload = JWT.verify(token);
    if (payload) {
      //重新计算过期时间
      const newToken = JWT.generate(
        {
          _id: payload._id,
          username: payload.username,
        },
        '5s',
      );
      ctx.set('Authorization', newToken);
      await next();
    } else {
      //401
      ctx.status = 401;
      ctx.body = { errCode: -1, errInfo: 'token过期' };
    }
  } else {
    await next();
  }
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000, () => console.log('服务端口3000启动成功'));
