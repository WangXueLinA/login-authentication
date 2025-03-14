const Router = require("koa-router")
const router = new Router()
router.get("/", async (ctx)=>{
   await ctx.render("home", { username: "xuelin" }) //自动找views/home.ejs
})



module.exports = router