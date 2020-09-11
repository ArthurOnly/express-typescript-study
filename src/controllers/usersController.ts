import { Router, Request, Response, NextFunction } from "express"
import { generateToken, tokenMiddleware } from "../helpers/jwt"

const router = Router()

router.get("/", async (request: Request, response: Response) => {
  const { username, password } = request.body
})

router.post("/", tokenMiddleware, (request: Request, response: Response) => {
  return response.send("Success")
})

export { router as usersController }
