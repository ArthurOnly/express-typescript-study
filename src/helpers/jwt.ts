import { config } from "dotenv"
import jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from "express"

config()

const TOKEN_KEY = process.env.JWT_KEY
const REFRESH_TOKEN_KEY = process.env.REFRESH_JWT_KEY

const TOKENS_TIME = {
  token: "1 hour",
  refresh_token: "7 days",
}

function generateToken(payload: Object, type: String) {
  if (type == "token") {
    const token = jwt.sign(payload, TOKEN_KEY, {
      expiresIn: TOKENS_TIME.token,
    })
    return `Baerer ${token}`
  }
  const token = jwt.sign(payload, REFRESH_TOKEN_KEY, {
    expiresIn: TOKENS_TIME.refresh_token,
  })
  return `Baerer ${token}`
}

function verifyToken(token: String, type: String) {
  try {
    const tokenParts = token.split(" ")

    if (tokenParts[0] != "Baerer") return false

    let decoded_token = null

    if (type == "token") {
      decoded_token = jwt.verify(tokenParts[1], TOKEN_KEY)
    }
    if (type == "refresh_token") {
      decoded_token = jwt.verify(tokenParts[1], REFRESH_TOKEN_KEY)
    }

    return decoded_token
  } catch {
    return false
  }
}

function tokenMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers
  const tokens = authorization.split(";")

  const token = verifyToken(tokens[0], "token")
  const refresh_token = verifyToken(tokens[1], "refresh_token")

  console.log(token, refresh_token)

  if (!token && !refresh_token) return res.sendStatus(403)

  if (!token && refresh_token) {
    const newToken = generateToken({ user: refresh_token.user }, "token")
    res.setHeader("cookie", `token=${newToken}`)
  }
  next()
}

export { generateToken, tokenMiddleware }
