const mongoose = require('mongoose');
const Schema = mongoose.Schema

const basketSchema = new Schema({
         basketOwner: {
        type: mongoose.Schema.ObjectId,
         ref:'User'
    },
  devices: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Computer',
  }
        
    ] 

        
})


module.exports=mongoose.model('Basket', basketSchema)