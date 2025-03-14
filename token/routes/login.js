const Router = require("koa-router")
const JWT = require("../util/JWT")

const router = new Router()
router.get("/", async (ctx)=>{
   await ctx.render("login", { username: "xuelin" }) //自动找views/home.ejs
})

router.post("/", (ctx) => {
  const { username, password } = ctx.request.body
  if (username === "xuelin" && password === "1125") {
      //设置header
    const token = JWT.generate({
      _id: "111",
      username: "xuelin"
    }, "5s")
    
    //token返回在header
    ctx.set("Authorization", token)
    ctx.body = {
      code: 200,
      message: "登录成功"
    }
  } else {
    ctx.body = {
      code: 403,
      message: "用户名密码不匹配，登录失败"
    }
  }
})

module.exports = router