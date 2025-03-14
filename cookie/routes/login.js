
const Router = require("koa-router")
const router = new Router()
router.get("/", async (ctx) => {
   await ctx.render("login", { username: "xuelin" }) //自动找views/home.ejs
})

router.post("/", (ctx)=>{
  const { username, password } = ctx.request.body
  if (username === "xuelin" && password === "1125") {
    //设置sessionId
    ctx.session.user = {
      username: "xuelin"
    }
    ctx.body = {
      code: 200,
      message: "登录成功"
    }
  } else {
    ctx.body = {
      code: 301,
      message: "用户名密码不匹配，登录失败"
    }
  }
})

router.put("/", (ctx)=>{
  ctx.cookies.set('sessionId', '', { maxAge: 0 })
  ctx.body = {
    code: 200,
    message: "退出成功"
  }
})

module.exports = router