const express=require('express');
const router=express.Router();

const {addDoctor,addPatient,showDocs,searchDoc, makeAppointment,addroom, addAppointment, DocDash, showHome, showAbout, docLogin, Logout, filterSearch,
    deleteAppointment, Login, loginPatient,editPat, showRooms, viewDocs, editDetails, docRegister, patRegister,PatDash}=require('../controllers/helper.js')

router.route('/alldocs').get(showDocs)
router.route('/showdocs').post(filterSearch)
router.route('/about').get(showAbout)
router.route('/home').get(showHome)
router.route('/patregister').get(patRegister)
router.route('/docregister').get(docRegister)
router.route('/login').get(Login)
router.route('/logindoc').post(docLogin)
router.route('/logout').get(Logout)
router.route('/docdash').get(DocDash)
router.route('/loginpat').post(loginPatient)
router.route('/patdash').get(PatDash)
router.route('/showrooms').get(showRooms)
router.route('/adddoc').post(addDoctor)
router.route('/viewdocs').get(viewDocs)
router.route('/searchdoc').post(searchDoc)
router.route('/addpat').post(addPatient)
router.route('/addpat2').post(addAppointment)
router.route('/makeappointment/:id').get(makeAppointment)
router.route('/rooms').post(addroom)
router.route('/delete').post(deleteAppointment)
router.route('/editdetails').post(editDetails)
router.route('/edit').post(editPat)


module.exports=router;