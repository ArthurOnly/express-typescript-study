import { Router, Request, Response, NextFunction } from "express"
import { generateToken, tokenMiddleware } from "../helpers/jwt"

const router = Router()

router.get("/", (request: Request, response: Response) => {
  const token = generateToken({ user: "arthur" }, "token")
  const refresh = generateToken({ user: "arthur" }, "refresh_token")
  return response.send(`${token} & ${refresh}`)
})

router.post("/", tokenMiddleware, (request: Request, response: Response) => {
  return response.send("Success")
})

export { router as usersController }
