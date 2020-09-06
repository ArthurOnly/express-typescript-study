import { Router } from "express"

import { router as usersController } from "./controllers/usersController"

const router = Router()

router.use("/users", usersController)

router.get("/", (request, response) => {
  return response.send("API runing")
})

export { router }
