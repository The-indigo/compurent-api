const Basket = require('../models/basket');


exports.addToBasket = async (req, res, next) => {
    const deviceId = req.params.deviceId;
    const ownerId = req.user._id;
    try {
        if (!ownerId) {
            return res.status(401).json({failed:true, message:"Unauthorized request.Ensure you are authorized"})
        }
        let basketObject = new Basket({
            basketOwner: ownerId,
            device:deviceId
        })
        await basketObject.save()
            return res.status(200).json({success:true, message:"Add to basket success "})
    } catch (e) {
        console.log(e)
        next(e)
    }
}

exports.viewBasket = async (req, res, next) => {
    const owner = req.user._id
    try {
        if (!owner) {
        return res.status(401).json({failed:true, message:"Unauthorized request.Ensure you are authorized"})
        }
        let basketItems = await Basket.find({ basketOwner: owner }).populate('device')
        if (!basketItems) {
        return res.status(404).json({failed:true, message:"No data found for this user"})
        }

        return res.status(200).json(basketItems)
    } catch (e) {
        console.log(e)
        next(e)
    }
}

exports.deleteBasketById = async (req, res, next) => {
    const id= req.params.id
        try {
         await Basket.findByIdAndDelete(id)
        return res.status(200).json("done")
    } catch (e) {
           console.log(e)
        next(e)
    }
}

//admin
exports.viewAllBasket = async (req, res, next) => {
    try {
        const allBaskets = await Basket.find()
        return res.status(200).json(allBaskets)
    } catch (e) {
           console.log(e)
        next(e)
    }
}

exports.deleteBasket = async (req, res, next) => {
    const id= req.body.id
        try {
         await Basket.deleteMany({basketOwner:id})
        return res.status(200).json("done")
    } catch (e) {
           console.log(e)
        next(e)
    }
}