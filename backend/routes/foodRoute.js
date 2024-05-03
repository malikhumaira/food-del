import express from "express"
import { addFood, listFood } from "../controllers/foodController.js"
import multer from "multer"

const foodRouter = express.Router();

// image Storage Engine

const storage =multer.diskStorage({
    destination: "uploads",
    filename:(req,file,cb)=>{     //cb:callback
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

foodRouter.post("/add",upload.single("image"), addFood)
foodRouter.get('/list', listFood)





export default foodRouter;