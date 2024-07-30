// Require in sequelize
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Define new class Location
class Location extends Model { }

// makes location id an auto-incremente integer that cannot be null. Requires zip_code to be an integer and to be unique as well as not null
Location.init(
  {
    location_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    location_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    zip_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    event_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Event',
        key: 'event_id',
      },
    },
  },
  { sequelize, timestamps: true, freezeTableName: true, modelName: "location" }
);

// Export this model class
module.exports = Location;
