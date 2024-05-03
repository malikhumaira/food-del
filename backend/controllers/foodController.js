import foodModel from "../models/foodModel.js";
import fs from 'fs' //importing file system from node.js, to get info about files and perform crud operations

// add food item

const addFood = async(req, res) => {
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
        
    })
    try {
        await food.save();
        res.json({success:true, message: "Food Added"})
    } catch(error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

// Read food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success:true, data:foods})
    } catch(error) {
        console.log(error);
        res.json({success:false, message:'Error'})
    }
}
export {addFood, listFood};