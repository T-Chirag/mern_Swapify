const mongoose=require("mongoose")
const {Schema}=mongoose

const productSchema= new Schema({

    title:{
        type:String,
        required:true
    },
    name:{
        type:String,

    },
    description:{
        type:String,
        
    },
    original_price:{
        type:Number,
        
    },
    category:{
        type:String,
        required:true
    },
    images:{
        type:[String],
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    lister:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
},{timestamps:true,versionKey:false})

module.exports=mongoose.model('Product',productSchema)
