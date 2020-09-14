import { Router, Request, Response, NextFunction } from "express"
import { User } from "../models/user"
import bcrypt from "bcrypt"
import { config } from "dotenv"
import formatedResponse from "../helpers/response"
import jwt from "jsonwebtoken"

config()

const PASSWORD_SALTS = Number(process.env.PASSWORD_SALTS)
const JWT_SECRET = process.env.JWT_KEY
const REFRESH_JWT_SECRET = process.env.REFRESH_JWT_KEY

const router = Router()

router.get("/sign-in", async (request: Request, response: Response) => {
  const { email, password }: { email: any; password: any } = request.body

  if (email && password) {
    const user = await User.findOne({ where: { email: email } })
    if (!user)
      return response
        .status(404)
        .send(formatedResponse("Usuário não cadastrado"))

    const userPassword = user.password.toString()

    const authored = bcrypt.compareSync(password, userPassword)

    if (!authored)
      return response
        .status(404)
        .send(formatedResponse("Credenciais incorretas"))

    user.password = null

    //JWT sign
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1 hour",
    })
    const refreshToken = jwt.sign({ userId: user.id }, REFRESH_JWT_SECRET, {
      expiresIn: "30 days",
    })

    return response
      .status(200)
      .send(
        formatedResponse(
          "Logado com sucesso",
          { user },
          { token, refreshToken }
        )
      )
  }
  return response.sendStatus(400)
})

router.post("/sign-up", async (request: Request, response: Response) => {
  const { name, password, email } = request.body

  if (name && password && email) {
    const alreadyRegister = await User.findOne({ where: { email } })

    if (alreadyRegister)
      return response
        .status(400)
        .send(formatedResponse("Usuário já registrado"))

    const cryptedPassword = bcrypt.hashSync(password, PASSWORD_SALTS)

    const user = await User.create({
      email,
      name: name,
      password: cryptedPassword,
    })

    user.password = null

    //JWT
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1 hour",
    })
    const refreshToken = jwt.sign({ userId: user.id }, REFRESH_JWT_SECRET, {
      expiresIn: "30 days",
    })

    return response
      .status(201)
      .send(
        formatedResponse("Usuário criado", { user }, { token, refreshToken })
      )
  }
  return response.status(400).send(formatedResponse("Dados incompletos"))
})

export { router as authController }
