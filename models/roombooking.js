const mongoose=require("mongoose")

const bookingschema=mongoose.Schema({
patient:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"PatientDB"
},
room:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"RoomDB"
}
},{
    timestamps:true
})

module.exports=mongoose.model("RoomBookingDB", bookingschema)