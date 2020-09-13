import { DataTypes, Model, Optional } from "sequelize"
import { database } from "../database/database"

interface UserAttributes {
  id: number
  name: string
  password: String
  email: String
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

const User = database.define<UserInstance>(
  "user",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { createdAt: false, updatedAt: false }
)

export { User }
