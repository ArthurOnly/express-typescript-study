import { Router, Request, Response, NextFunction } from "express"
import { User } from "../models/user"
import bcrypt from "bcrypt"
import { config } from "dotenv"

config()

const PASSWORD_SALTS = Number(process.env.PASSWORD_SALTS)

const router = Router()

router.get("/sign-in", async (request: Request, response: Response) => {
  const { email, password }: { email: any; password: any } = request.body

  if (email && password) {
    const user = await User.findOne({ where: { email: email } })
    if (!user) return response.send("No email")

    const userPassword = user.password.toString()

    const authored = bcrypt.compareSync(password, userPassword)

    if (!authored) return response.send("incorrect password")

    return response.sendStatus(200)
  }
  return response.sendStatus(400)
})

router.post("/sign-up", async (request: Request, response: Response) => {
  const { username, password, email } = request.body

  if (username && password && email) {
    const alreadyRegister = await User.findOne({ where: { email } })

    if (alreadyRegister) return response.status(400).send("Já registrado")

    const cryptedPassword = bcrypt.hashSync(password, PASSWORD_SALTS)

    const user = await User.create({
      email,
      name: username,
      password: cryptedPassword,
    })

    return response.status(201).send(user)
  }
  return response.sendStatus(400)
})

export { router as authController }
