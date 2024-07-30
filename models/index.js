// Require in the Models for User, Event and Location
const User = require('./User.js');
const Event = require('./Event.js');
const Location = require('./Location.js');

// Each Event belongs to a User as the event author
Event.belongsTo(User, {
    foreignKey: 'event_author',
});
// Each Location belongs to an Event as the event location
Location.belongsTo(Event, {
    foreignKey: 'event_location',
});
// Each User can have many Events where they are the event author
User.hasMany(Event, {
    foreignKey: 'event_author',
});
// Each Event may have only one location
Event.hasOne(Location, {
    foreignKey: 'location_id',
});
// Each Event can have many Users as attendees
Event.hasMany(User, {
    foreignKey: 'event_attendees',
});
//  Each Location can have many Events taking place there
Location.hasMany(Event, {
    foreignKey: 'event_location',
});


module.exports = { User, Event, Location };


