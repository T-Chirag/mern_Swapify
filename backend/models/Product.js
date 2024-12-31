const mongoose=require("mongoose")
const {Schema}=mongoose

const productSchema= new Schema({

    _id:{
        type:Number,
        required:true
    },

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
        type:Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    images:{
        type:[String],
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true,versionKey:false})

module.exports=mongoose.model('Product',productSchema)
