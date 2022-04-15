const mongoose = require('mongoose');
const Schema = mongoose.Schema

const BasketSchema = new Schema({
         basketOwner: {
        type: mongoose.Schema.ObjectId,
         ref:'User'
    },
    devices: [
      {
        deviceId:{type: mongoose.Schema.Types.ObjectId, ref: 'Computer'} , 
        hours : Number
        }  
        
    ] 

        
})


module.exports=mongoose.model('Basket', BasketSchema)