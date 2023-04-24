const mongoose=require('mongoose')

const nurseschema=mongoose.Schema({
    name:{
        type:String,
        required: [true,'must provide a name'],
        trim:true,
        maxlength:[20,'name cannot be more than 20 characters'],
    },
    phno:{
        type:Number,
        required:[true,'must provide a valid number'],
        trim:true,
        maxlength:[10,'number cannot be more than 10 characters'],
        minlength:[10,'number cannot be less than 10 characters']
    },
    exp:{
        type:Number,
        required:[true,'must provide a Experience'],
        trim:true,
    }
})

module.exports=mongoose.model('NurseDB',nurseschema);