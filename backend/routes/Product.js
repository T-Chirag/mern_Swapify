const express=require('express')
const productController=require("../controllers/Product")
const router=express.Router()
const cookieParser = require('cookie-parser');
// app.use(cookieParser());
router
    .post("/",productController.create)
    .get("/",productController.getAll)
    .get("/lister/:id",productController.getByLister)
    .get("/:id",productController.getById)
    .patch("/:id",productController.updateById)
    .patch("/undelete/:id",productController.undeleteById)
    .delete("/:id",productController.deleteById)

module.exports=router