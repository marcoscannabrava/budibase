const Router = require("@koa/router")
const controller = require("../controllers/workflow")
const authorized = require("../../middleware/authorized")
const { BUILDER } = require("../../utilities/accessLevels")

const router = Router()

router
  .get("/api/:instanceId/workflows", authorized(BUILDER), controller.fetch)
  .get("/api/workflows/:id", authorized(BUILDER), controller.find)
  .get(
    "/api/:instanceId/workflows/:id/:action",
    authorized(BUILDER),
    controller.fetchActionScript
  )
  .put("/api/:instanceId/workflows", authorized(BUILDER), controller.update)
  .post("/api/:instanceId/workflows", authorized(BUILDER), controller.create)
  .post("/api/workflows/action", controller.executeAction)
  .delete(
    "/api/:instanceId/workflows/:id/:rev",
    authorized(BUILDER),
    controller.destroy
  )

module.exports = router
