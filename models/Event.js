// Require in sequelize
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Define new class Event
class Event extends Model { }

// Requires that each event gets an auto-incremented id which is an integer and not null. Requires a location as pulled from the locations_id key and requires content of the Event to be text. Allows for one user to be tied to the event as the author and allows many users to be tied as attendees
Event.init(
  {
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    event_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    event_content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    event_author: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "user_id",
      },
    },

    event_location: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Location",
        key: "location_id",
      },
    },

    event_attendees: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "user_id",
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    modelName: "Event",
  }
);

// Export this model class
module.exports = Event;
