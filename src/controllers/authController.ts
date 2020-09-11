import { Request, Response, Router } from "express"
import { generateHashPassword } from "../helpers/bcrypt"
import bcrypt from "bcrypt"

const router = Router()

router.post("/", async (request: Request, response: Response) => {
  const { username, password } = request.body

  if (!username || !password) {
    return response.sendStatus(400)
  }
})

export { router as authController }
