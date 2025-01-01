const express=require('express')
const cartController=require('../controllers/Cart')
const router=express.Router()

router
    .post("/add",cartController.create)
    .get("/user/:id",cartController.getByUserId)
    .patch("/:id",cartController.updateById)
    .delete("/:id",cartController.deleteById)
    .delete("/user/:id",cartController.deleteByUserId)

module.exports=router