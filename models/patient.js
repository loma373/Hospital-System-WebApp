const mongoose=require('mongoose')

const patientschema=mongoose.Schema({
    name:{
        type:String,
        trim:true,
        maxlength:[50,'name cannot be more than 50 character']
    },
    phno:{
        type:Number,
        required:[true,'must provide a valid number'],
        trim:true,
    },
    symptoms:{
        type:String,
        trim:true,
    },
    room:{
        type:String
    },
},{
    timestamps:true
})

module.exports=mongoose.model('PatientDB',patientschema)