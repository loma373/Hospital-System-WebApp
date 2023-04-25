const docdata=require('../models/doc')
const patdata=require('../models/patient')
const roomdata=require('../models/rooms')
const appointment=require('../models/appointment')

const mongoose=require('mongoose')
const db=mongoose.connection


const showAbout=async(req,res)=>{
    res.render("about")
}

const showHome=async(req,res)=>{
    res.render("home")
}

const docRegister=async(req,res)=>{
    try {
        res.render("docadd",{
            msg:''
        })
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const patRegister=async(req,res)=>{
    try {
        res.render("patientadd",{
            msg:''
        })
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const addDoctor=async(req,res)=>{
    try {
        console.log("starting")
        const findphno=await docdata.findOne({phno:req.body.phno})
        const findemail=await docdata.findOne({email:req.body.email})
        
        if(findphno!=null && findemail!=null){
            res.render("docadd",{
                msg:'Login credentials already in use. Try Again!'
            })

            return
        }
        if(req.body.password==req.body.ppassword){
            const adddoc=await docdata.create(req.body)
            req.session.user=req.body.email
            res.redirect('/api/v1/docdash')
        } else{
            res.render("docadd",{
                msg:'Password did not match. Try Again!'
            })
        }
        
    } catch (error) {
        res.render("docadd",{
            msg:'Error please try again'
        })
        return
    }
}

const addroom=async(req,res)=>{
    try {
        const addr=await roomdata.create(req.body)
        console.log(addr)
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const addPatient=async(req,res)=>{
    try {
        const findpat=await patdata.findOne({phno:req.body.phno})
        if(findpat){
            res.render("patientadd",{
                msg:'Phone number already in use please use different number'
            })
        }
        const addpat=await patdata.create(req.body)
        req.session.user=req.body.phno
        res.redirect('/api/v1/patdash')
    } catch (error) {
        res.render("patientadd",{
            msg:'Error please try again'
        })
        return
    }
}

const Login=async(req,res)=>{
    try {
        res.render("login",{
            msg:''
        })
    } catch (error) {
        res.send("500 error try later")
    }
}

const docLogin=async(req,res)=>{
    const doc=await docdata.findOne({email:req.body.email})
    if(doc==null){
        res.render("login",{
            msg:'Unregistered user'
        })
        //res.redirect('/api/v1/login')
        console.log("Unregistered user")
        return
    }

    if(req.body.password==doc.password){
        req.session.user=req.body.email
    } else{
        res.render("login",{
            msg:'Wrong password'
        })
        //res.redirect('/api/v1/login')
        console.log("wrong password")
        return
    }
    res.redirect('/api/v1/docdash')
}

const loginPatient=async(req,res)=>{
    try {
        const {phno:patphone}=req.body
        const patdetails=await patdata.findOne({phno:patphone})
        const docs=await docdata.find({})
        
        if(!patdetails){
            res.render("login",{
                msg:'Unregistered phone number please register first'
            })
            console.log("unregistered user")
            return
        }
        req.session.user=req.body.phno
        res.redirect('/api/v1/patdash')
    } catch (error) {
        res.send("error")
    }
}

const PatDash=async(req,res)=>{                                   
    try {
        if(req.session.user){
            const patdetails=await patdata.findOne({phno:req.session.user})
            const appointmentdetails=await appointment.find({patient:patdetails._id}).populate('doctor')
            const docs=await docdata.find({})
            //console.log(docdetails)
            res.render("patdash",{
                data:appointmentdetails,
                data2:patdetails,
                data3:docs,
                msg:''
            })
        } else{
            res.send("session timed out")
        }
        
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const DocDash=async(req,res)=>{                             
    try {
        if(req.session.user){
            const docdetails=await docdata.findOne({email:req.session.user})
            const appointmentdetails=await appointment.find({doctor:docdetails._id}).populate('patient')
            res.render("docdash",{
                data:docdetails,
                data2:appointmentdetails,
                msg:''
            })
        } else{
            res.send("session timed out")
        }
        
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const Logout=async(req,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log("error")
        }else{
            res.redirect('/api/v1/login')
            console.log("logged out")
            return
        }
    })
}

const filterSearch=async(req,res)=>{
    const docs=await docdata.find({specialization:req.body.specialization,"exp":{$gt:Number(req.body.exp)}})
    res.render("showdocs",{
        data:docs
    })
}


const showDocs=async(req,res)=>{
    try {
        const showdoc=await docdata.find().sort({
            name:1
        })
        
        res.render("showdocs",{
            data: showdoc
        })
    } catch (error) {
        res.send("eerro")
    }
}

const viewDocs=async(req,res)=>{
    try {
        const showdoc=await docdata.find().sort({
            name:1,yearOfExp:-1
        })
        //console.log(showdoc)
        res.render("docsview",{
            data: showdoc
        })
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const searchDoc=async(req,res)=>{
    try {
        const finddoc=await docdata.find({name:req.body.searchname})

        res.render("showdocs",{
            data:finddoc
        })        
    } catch (error) {
        res.status(500).json({msg:error})
    }
}


const makeAppointment=async(req,res)=>{
    try {
        const {id:docid}=req.params
        const finddoc=await docdata.findById(docid)
        //res.status(201).json({finddoc})
        res.render("makeappointment",{
            data:finddoc
        })
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const addAppointment=async(req,res)=>{
    try {
        const addpat=await patdata.create(req.body)
        
        const makeAppointment=await appointment.create({
            doctor:req.body.doctor,
            patient:addpat._id,
            time:req.body.time
        })

        const docupdate=await docdata.updateOne({_id:req.body.doctor},{$push:{"busyslots":req.body.time}})
        const docupdate2=await docdata.updateOne({_id:req.body.doctor},{$pull:{"freeslots":req.body.time}})
        
        req.session.user=addpat.phno
        res.redirect('/api/v1/patdash')
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const deleteAppointment=async(req,res)=>{
    try {
        const {id:delid}=req.body
        const appointmentdetails=await appointment.findOne({_id:delid})
        const docupdate=await docdata.updateOne({_id:appointmentdetails.doctor},{$pull:{"busyslots":appointmentdetails.time}})
        const docupdate2=await docdata.updateOne({_id:appointmentdetails.doctor},{$push:{"freeslots":appointmentdetails.time}})

        if(req.body.marker=="pat"){
            const patappointmentdetails=await appointment.findOne({_id:delid}).populate('patient')
            const appointmentdelete=await appointment.deleteOne({_id:delid})
            req.session.user=patappointmentdetails.patient.phno
            res.redirect('/api/v1/patdash')
        } else{
            const docappointmentdetails=await appointment.findOne({_id:delid}).populate('doctor')
            const appointmentdelete=await appointment.deleteOne({_id:delid})
            req.session.user=docappointmentdetails.doctor.email
            res.redirect('/api/v1/docdash')
        }
    } catch (error) {
        res.send("try later unexpected error")
    }
}



const showRooms=async(req,res)=>{
    try {
        const rooms=await roomdata.find()
        res.render("rooms",{
            data:rooms
        })
    } catch (error) {
        res.status(500).json({msg:error})
    }
}



const editDetails=async(req,res)=>{
    try {
        const doc=await docdata.findById(req.body.id)
        //console.log(doc)
        if(req.body.start || req.body.end || req.body.slot){
            function getTimes(start, end, slot) {
                start = parseInt(start) * 2 + (+start.slice(-2) > 0);
                end = parseInt(end) * 2 + (+end.slice(-2) > 0) + 1;
                return Array.from({length: end - start}, (_, i) => 
                    [i + start >> 1, (i + start)%2*slot]
                ).map(([h, m]) => 
                    `${h % 12 || 12}:${m} ${"AP"[+(h > 11)]}M`.replace(/\b\d\b/g, "0$&")
                );
            }
            
            times=getTimes(req.body.start,req.body.end,req.body.slot)

            var update1=await docdata.updateOne({_id:doc._id},{
                start:req.body.start,
                end:req.body.end,
                slot:req.body.slot,
                freeslots:times,
                verify:true
            })
        }
        else if(req.body.time){
            var appointmentdetails=await appointment.findOne({_id:req.body.appointmentId})
            var oldtime=appointmentdetails.time
            var docupdate=await docdata.updateOne({_id:doc._id},{$push:{"freeslots":oldtime}},{$pull:{"busyslots":oldtime}})
            var docupdate2=await docdata.updateOne({_id:doc._id},{$pull:{"freeslots":req.body.time}},{$push:{"busyslots":req.body.time}})
            var updateappointment=await appointment.updateOne({_id:req.body.appointmentId},{time:req.body.time})
        }
        
        else if(req.body.class12){
            var update2=await docdata.updateOne({_id:doc._id},{
                class12:req.body.class12,
                class12marks:req.body.class12marks,
                mbbs:req.body.mbbs,
                mbbsmarks:req.body.mbbsmarks
            }) 
        }
        else if(req.body.workexp || req.body.exp || req.body.specialization){
            
            console.log(req.body.id)
            console.log(doc._id)
            const update3=await docdata.updateOne({_id:doc._id},{
                workexp:req.body.workexp,
                exp:req.body.exp,
                specialization:req.body.specialization
            })
            
        }
        else if(req.body.gender || req.body.age){
            var update6=await docdata.updateOne({_id:doc._id},{
                gender:req.body.gender,
                age:req.body.age
            })
        }
        else if(req.body.intro){
            var update4=await docdata.updateOne({_id:doc._id},{
                intro:req.body.intro
            })
        }
        else if(req.body.newpassword){
            if(req.body.currpassword==doc.password && req.body.newpassword==req.body.newppassword){
                var update5=await docdata.updateOne({_id:doc._id},{
                    password:req.body.newpassword
                })
            }else{
                throw(error)
            }
        }
        req.session.user=doc.email
        res.redirect('/api/v1/docdash')
    } catch (error) {
        res.send("error")
    }
}


const editPat=async(req,res)=>{
    try {
        const patdetails=await patdata.findById(req.body.id)
        //console.log(req.body.doc)
        if(req.body.room){
            var roomcount=await roomdata.updateOne({name:patdetails.room}, {$inc:{quantity:1}})
            var roomupdate=await patdata.updateOne({_id:req.body.id}, {room:req.body.room})
            var roomcount=await roomdata.updateOne({name:req.body.room}, {$inc:{quantity:-1}})
        } else if(req.body.doctor){
            var addappointment=await appointment.create({
                doctor:req.body.doctor,
                patient:patdetails._id
            })
        } else if(req.body.time){
            var appointmentupdate=await appointment.updateOne({_id:req.body.appointmentId},{time:req.body.time})
            var appointmentdetails=await appointment.findOne({_id:req.body.appointmentId})
            const docupdate=await docdata.updateOne({_id:appointmentdetails.doctor},{$push:{"busyslots":req.body.time}})
            const docupdate2=await docdata.updateOne({_id:appointmentdetails.doctor},{$pull:{"freeslots":req.body.time}})
        } else{
            var symptoms=await patdata.updateOne({_id:req.body.id},{symptoms:req.body.symptoms})
        }
        
        req.session.user=patdetails.phno
        res.redirect('/api/v1/patdash')
        
    } catch (error) {
        res.status(500).json({msg:"ello"})
    }
}




module.exports={
    addDoctor,showDocs,searchDoc,addPatient,makeAppointment,addroom,addAppointment,Login, docRegister, showHome, showAbout, Logout, PatDash,
    DocDash,deleteAppointment,showRooms,viewDocs,editDetails,loginPatient,editPat, patRegister,docLogin, filterSearch
}