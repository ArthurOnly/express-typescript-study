import { Router, Request, Response, NextFunction } from "express"
import { User } from "../models/user"
import bcrypt from "bcrypt"

const router = Router()

router.get("/", async (request: Request, response: Response) => {
  const { email, password }: { email: any; password: any } = request.body

  if (email && password) {
    const user = await User.findOne({ where: { email: email } })
    if (!user) return response.sendStatus(404)

    const authored = bcrypt.compareSync(user.password, password)
  }
  return response.sendStatus(400)
})

router.post("/", (request: Request, response: Response) => {
  const { username, password } = request.body

  if (username && password) {
    //const user =
  }
  return response.sendStatus(400)
})

export { router as usersController }
