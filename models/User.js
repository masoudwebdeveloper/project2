// Require sequelize and bcrypt for password hashing
const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

// Define new class User
class User extends Model {}

// Requires each user to have an auto-incremented integer id. Requires a unique username as a string and requires a password between 4-20 characters which must be alphanumeric and is case-sensitive
User.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 20],
        isAlphanumericWithCase: function (value) {
          if (!/^[a-zA-Z0-9]+$/.test(value)) {
            throw new Error(
              "Username must be alphanumeric and case-sensitive."
            );
          }
        },
      },
    },
  },

  {
    hooks: {
      beforeCreate: async (newUserInfo) => {
        newUserInfo.password = await bcrypt.hash(newUserInfo.password, 10);
        return newUserInfo;
      },
    },
    sequelize,
    timestamps: true,
    freezeTableName: true,
    modelName: "User",
  }
);

// Export this user class
module.exports = User;
