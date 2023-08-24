const { log } = require("console");
const express = require ("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = express();
const logger = require("morgan")
const cors =require("cors")
const port = 5000;


dotenv.config();
// routes
const categoryRoute = require("./routes/categories")
const productRoute = require("./routes/products")
const billRoute = require("./routes/bills")
const authRoute = require("./routes/auth")
const userRoute = require("./routes/users")


dotenv.config();

const connect = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected mongo")
    } catch (error) {
        throw error
    }
}
app.use(express.json());
app.use(cors())
app.use(logger("dev"))

app.use("/api/categories", categoryRoute)
app.use("/api/products", productRoute)
app.use("/api/bills", billRoute)
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)

app.get("/", (req,res)=> res.send("Salam"))
// middlewares




app.listen(port, () =>{
    connect();
    console.log(`Example app listening on port ${port}`);
})