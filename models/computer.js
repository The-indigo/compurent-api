let mongoose = require('mongoose');

// create a model class
let Computer = mongoose.Schema({
    imageUrl: String,
    description: String,
    price: Number,
    inUse: false,
    isDesktop:       {
            type: Boolean,
            // default: true,
    },
        isLaptop:       {
            type: Boolean,
            // default: false,
    },
            isServer:       {
            type: Boolean,
            // default: false,
        },
},
{
  collection: "Computers"
});

module.exports = mongoose.model('Computer', Computer);