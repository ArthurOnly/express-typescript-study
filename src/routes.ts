import { Router } from "express"

import { usersController } from "./controllers/usersController"

const router = Router()

router.use("/users", usersController)

router.get("/", (request, response) => {
  return response.send("API runing")
})

export { router }
