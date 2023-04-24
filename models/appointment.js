const mongoose=require('mongoose')

const appointmentschema=mongoose.Schema({
    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DocDB'
    },
    patient:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PatientDB'
    },
    time:{
        type:String
    }
},{
    timestamps:true
})

module.exports=mongoose.model('Appointment DB',appointmentschema)