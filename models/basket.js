const mongoose = require('mongoose');
const Schema = mongoose.Schema

const BasketSchema = new Schema({
         basketOwner: {
        type: mongoose.Schema.ObjectId,
         ref:'User'
    },
  device: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Computer',
  }
        
    ] 

        
})


module.exports=mongoose.model('Basket', BasketSchema)