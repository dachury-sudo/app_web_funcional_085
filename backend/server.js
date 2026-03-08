const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect("mongodb://127.0.0.1:27017/senaApp")
.then(()=>console.log("MongoDB conectado"))
.catch(err=>console.log(err));


const userRoutes = require("./routes/users.routes");
const productRoutes = require("./routes/products.routes"); 

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes); 


const PORT = 5000;

app.listen(PORT,()=>{
console.log("Servidor corriendo en puerto "+PORT);
});