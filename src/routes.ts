import { Router } from "express"

import { usersController } from "./controllers/usersController"
import { authController } from "./controllers/authController"

const router = Router()

router.use("/users", usersController)
router.use("/auth", authController)

router.get("/", (request, response) => {
  return response.send("API runing")
})

export { router }
