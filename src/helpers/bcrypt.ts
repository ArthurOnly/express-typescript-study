import bcrypt from "bcrypt"

const SALTS = 10

async function generateHashPassword(raw_password: String) {
  const password = bcrypt.hash(raw_password, SALTS)
  return password
}
