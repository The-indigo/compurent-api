const Computers = require('../models/computer');

exports.getComputers = async (req, res, next) => {
    try {
        console.log(req.isAuthenticated())
        const computers = await Computers.find();
        if (!computers) {
            return res.status(400).json({failed: true, message: 'Error getting computers'});
        }
        return res.status(200).json(computers);
    } catch (e) {
        console.log(e)
        next(e)
    }  
}
exports.addComputers = async (req, res, next) => {
    const body= req.body
    try {
        let newComputerObject = new Computers({
               imageUrl: body.image,
            description:body.description,
            price: body.price,
            isDesktop: body.desktop ? body.desktop : false,
            isServer: body.server ? body.server : false,
           isLaptop:body.laptop ? body.laptop : false
        })
        const addComputer = await Computers.create(newComputerObject)
        if (!addComputer) {
            return res.status(400).json({failed:true,message:"Error adding this product please try again"})
        }
        return res.status(200).json({success:true,message:"Success", addComputer})

    } catch (e) {
        console.log(`Adding computer error ${e}`)
        next(e)
    }
}
exports.getComputerById = async (req, res, next) => {
    const id = req.params.id;
    try {
        let computer = await Computers.findById(id);
        if (!computer) {
            return res.status(404).json({failed:true, message:"Item not found"})
        }
       return res.status(200).json(computer)
    } catch (e) {
          console.log(`Getting computer by id error ${e}`)
        next(e)
    }
}
exports.updateComputer = async(req, res, next) => {
    const id = req.params.id;
    const body = req.body
    try {
        let updatedComputer = Computers({
    "_id": id,
    "imageUrl": body.image,
    "description": body.description,
            "price": body.price,
            "isDesktop": body.isDesktop,
            "isLaptop": body.isLaptop,
            "isServer": body.isServer
        });
        const update = await Computers.updateOne({ _id: id }, updatedComputer)
        if (!update) {
            return res.status(400).json({failed:true, message:"Update failed please try again"})
        }
         return res.status(200).json({success:true,message:"Update successful", update})
    } catch (e) {
        console.log(`Updating computer error ${e}`)
    }    
}


exports.deleteComputer =  async(req, res, next) => {
    let id = req.params.id;
    try {
        const del = await Computers.deleteOne({ _id: id })
        if(!del) return res.status(400).json({failed:true,message:"Could not delete"})

         return res.status(201).json({success:true,message:"Deleteed successfully"})
    } catch (e) {
        console.log(`Deleting computer error ${e}`)
    }
        
}