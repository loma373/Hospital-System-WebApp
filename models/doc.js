const mongoose=require('mongoose')

const docschema=mongoose.Schema({
    name:{
        type:String,
        required: [true,'must provide a name'],
        trim:true,
        maxlength:[50,'name cannot be more than 50 characters']
    },
    gender:{
        type:String
    },
    age:{
        type:Number
    },
    phno:{
        type:Number,
        required:[true,'must provide a phone number'],
        trim:true,
        unique:true,
    },
    specialization:{
        type:String,
        trim:true,
    },
    email:{
        type:String,
        required:[true,'must provide email']
    },
    password:{
        type:String,
        required:[true,'must provide password']
    },
    exp:{
        type:Number,
        trim:true,
    },
    start:{
        type:String
    },
    end:{
        type:String
    },
    slot:{
        type:Number
    },
    freeslots:[{
        type:String
    }],
    busyslots:[{
        type:String
    }],
    verify:{
        type:Boolean,
        default:false,
    },
    intro:{
        type:String
    },
    workexp:{
        type:String
    },
    class12:{
        type:String
    },
    class12marks:{
        type:Number
    },
    mbbs:{
        type:String
    },
    mbbsmarks:{
        type: Number
    }
},{
    timestamps:true
})

module.exports=mongoose.model('DocDB',docschema);