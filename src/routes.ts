import { Router } from "express"

import { authController } from "./controllers/authController"

const router = Router()

router.use("/auth", authController)

router.get("/", (request, response) => {
  return response.send("API runing")
})

export { router }
