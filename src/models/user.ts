import { DataTypes } from "sequelize"
import { database } from "../database/database"

const User = database.define("user", {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

export { User }
