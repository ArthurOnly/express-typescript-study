import { Router, Request, Response, response } from "express"

const router = Router()

router.get("/", (request: Request, response: Response) => {
  const data = request.body
  console.log(data)
  return response.send("Success")
})

export { router }
