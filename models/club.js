const mongoose = require('mongoose');

const clubNames = mongoose.Schema({
    name: { type: String, default: '' },
    country: { type: String, default: '' },
    image: { type: String, default: 'default.png' },
    fans: [{
        username: { type: String, default: '' },
        email: {type: String, defult: ''},
    }],
});

module.exports = mongoose.model('Club', clubNames);