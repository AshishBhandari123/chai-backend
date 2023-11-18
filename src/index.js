// const dotenv = require("dotenv").config();
// import mongoose from "mongoose"
// import express from "express"

// import { DB_NAME } from "./constants.js"

// const app = express();


// ( async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error", (error) => {
//             console.log("ERRR:", error);
//             throw error
//         })

//         app.listen(process.env.PORT, () => {
//             console.log(`App is listening on PORT ${process.env.PORT}`)
//         })
//     } catch (error) {
//         console.error("Error:", error)
//         throw error
//     }
// } )()

import dotenv from "dotenv";
import connectDB from "./db/index.js";


dotenv.config({
    path: './env'
})



connectDB();