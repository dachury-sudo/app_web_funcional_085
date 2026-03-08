const express = require("express");
const router = express.Router();
const Product = require("../models/Product");


router.get("/", async (req,res)=>{
try{

const products = await Product.find();
res.json(products);

}catch(error){
res.status(500).json({message:error.message});
}
});



router.post("/", async (req,res)=>{
try{

const product = new Product({
name:req.body.name,
price:req.body.price,
description:req.body.description
});

const savedProduct = await product.save();

res.json(savedProduct);

}catch(error){
res.status(400).json({message:error.message});
}
});


router.put("/:id", async (req,res)=>{
try{

const updatedProduct = await Product.findByIdAndUpdate(
req.params.id,
req.body,
{ returnDocument:"after" }
);

res.json(updatedProduct);

}catch(error){
res.status(400).json({message:error.message});
}
});


router.delete("/:id", async (req,res)=>{
try{

await Product.findByIdAndDelete(req.params.id);

res.json({message:"Producto eliminado"});

}catch(error){
res.status(500).json({message:error.message});
}
});

module.exports = router;