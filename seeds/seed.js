const sequelize = require('../config/connection.js');
const { User, Event, Location } = require('../models');


const userData = require('./userData.json');
const eventData = require('./eventData.json');
const locationData = require('./locationData.json');



const seedDatabase = async () => {

    await sequelize.sync({ force: true });
    
    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
      });

      await Location.bulkCreate(locationData, {
        individualHooks: true,
        returning: true,
    });

      await Event.bulkCreate(eventData, {
        individualHooks: true,
        returning: true,
    });

};
    
seedDatabase();