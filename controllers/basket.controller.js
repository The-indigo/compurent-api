const Basket = require('../models/basket');


exports.addToBasket = async (req, res, next) => {
    const deviceId = req.params.deviceId;
    // const hours= req.body.hours
    const ownerId = req.body.user
    console.log(`owner`, ownerId)
        console.log(`device`, deviceId)

    // try {
    //     let basketObject = new Basket({
    //         basketOwner: ownerId,
    //     })
    //     basketObject.devices.push({
    //         deviceId: deviceId,
    //         hours:hours
    //     })
    // } catch (e) {
    //     console.log(e)
    //     next(e)
    // }
}