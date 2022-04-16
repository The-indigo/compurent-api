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
            devices:deviceId
        })
        await basketObject.save()
            return res.status(200).json({success:true, message:"Add to basket success "})
    } catch (e) {
        console.log(e)
        next(e)
    }
}