const Basket = require('../models/basket');


exports.addToBasket = async (req, res, next) => {
    const deviceId = req.params.deviceId;
    const ownerId = req.user._id;
    try {
        let basketObject = new Basket({
            basketOwner: ownerId,
        })
        basketObject.devices.push({
            deviceId: deviceId,
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}