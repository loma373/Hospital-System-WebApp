const mongoose=require('mongoose')

const roomschema=mongoose.Schema({
    name:{
        type:String,
    },
    cost:{
        type:Number,
    },
    quantity:{
        type:Number,
    }
})

module.exports=mongoose.model('RoomDB',roomschema);