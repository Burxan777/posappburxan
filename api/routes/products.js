const Product = require("../models/Product")
const express = require("express");
const router = express.Router();

router.get("/get-all", async (req,res)=>{
    try {
        const categories = await Product.find();
        res.status(200).json(categories)
    } catch (error) {
      res.status(500).json(error);
    }
})

router.post("/add-product", async (req,res)=>{
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(200).json("axirki alindi.")
    } catch (error) {
      res.status(500).json(error);
    }
})

router.put("/update-product", async (req, res) => {
    try {
        await Product.findOneAndUpdate({ _id: req.body.productId }, req.body);
      res.status(200).json("Item updated successfully.");
    } catch (error) {
      res.status(500).json(error);
    }
  });

  router.delete("/delete-product", async (req, res) => {
    try {
      await Product.findOneAndDelete({ _id:req.body._id });
      res.status(200).json("Item deleted successfully.");
    } catch (error) {
      res.status(500).json(error);
    }
  });
module.exports = router;