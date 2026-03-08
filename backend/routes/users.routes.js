const express = require("express");
const router = express.Router();

const User = require("../models/User");


router.get("/", async (req,res)=>{

try{

const users = await User.find();

res.json(users);

}catch(error){

res.status(500).json({message:error.message});

}

});


router.post("/", async (req,res)=>{

try{

const user = new User({
name:req.body.name,
email:req.body.email,
password:req.body.password
});

const savedUser = await user.save();

res.json(savedUser);

}catch(error){

res.status(400).json({message:error.message});

}

});


router.put("/:id", async (req,res)=>{

try{

const updatedUser = await User.findByIdAndUpdate(
req.params.id,
req.body,
{new:true}
);

res.json(updatedUser);

}catch(error){

res.status(400).json({message:error.message});

}

});


router.delete("/:id", async (req,res)=>{

try{

await User.findByIdAndDelete(req.params.id);

res.json({message:"Usuario eliminado"});

}catch(error){

res.status(500).json({message:error.message});

}

});

module.exports = router;
