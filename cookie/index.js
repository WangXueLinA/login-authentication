const Koa = require("koa")
const app = new Koa()
const static = require("koa-static")
const path = require("path")
const bodyParser =  require("koa-bodyparser")
const views = require("koa-views")
const session = require("koa-session-minimal")
const router = require("./routes")
app.use(bodyParser()) //获取post参数
app.use(static(path.join(__dirname,"public"))) //静态资源

//配置 模板引擎
app.use(views(path.join(__dirname, "views"), { extension: "ejs" }))

//session配置
app.use(
  session({
    key: "sessionId",
    cookie:{
      maxAge: 10 * 1000 // 60s
    }
  })
)

//session判断拦截
app.use(async (cxt, next)=>{
  if (cxt.url.includes("login")) {
    await next()
    return
  }
  if (cxt.session.user) {
    await next()
  } else {
    cxt.redirect("/login")
  }
})

app.use(router.routes()).use(router.allowedMethods())
app.listen(3000, ()=> console.log("服务监听在3000端口"))