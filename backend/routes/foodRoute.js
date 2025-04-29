// import multer from "multer"
// const storage = multer.diskStorage({
//     destination:"uploads",
//     filename:(req,file,cb)=>{
//         return cb(null,`${Date.now()}${file.originalname}`)
//     }
// })
// const upload = multer({storage:storage})

import express from "express"
import { addFood,listFood,removeFood } from "../controllers/foodController.js"

const foodRouter = express.Router();

foodRouter.post("/add", addFood)
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood);





export default foodRouter;