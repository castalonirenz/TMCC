var express = require('express');
var router = express.Router();
const studentRecordModel = require('../model/studentRecordModel')
const scheduleModel = require('../model/ScheduleModel');
const gradingModel = require('../model/gradeModel');
const gradeModel = require('../model/gradeModel');
/* GET users listing. */


// module.exports = router;


module.exports = () => {

    router.post('/getteachersection', function (req, res, next) {


        let gcode = req.query.gcode
        let secCode = req.query.seccode
        let sy = req.query.sy
        let teacher_id = req.query.teacher_id

        scheduleModel.find({  sy, teacher_id }, "", (err, list) => {
            if (err) return handleError(err);
            // 'athletes' contains the list of athletes that match the criteria.
            else {



                res.send({
                    list,
                    params: req.query
                })

                // Get all student info under this grade
            }

        }).select('secCode')




    });

    router.post('/getteacherschedule', function (req, res, next) {


        let sy = req.query.sy
        let teacher_id = req.query.teacher_id

        scheduleModel.find({ sy, teacher_id }, "", (err, list) => {
            if (err) return handleError(err);
            // 'athletes' contains the list of athletes that match the criteria.
            else {



                res.send({
                    list,
                    params: req.query
                })

                // Get all student info under this grade
            }

        })




    });

    router.post('/getstudentlist', function (req, res, next) {


        let gradeCode = req.query.gcode
        let secCode = req.query.seccode
        let schoolYear = req.query.sy

        studentRecordModel.find({ secCode, gradeCode, schoolYear }, "", (err, list) => {
            if (err) return handleError(err);
            // 'athletes' contains the list of athletes that match the criteria.
            else {



                res.send({
                    list,
                    params: req.query
                })

                // Get all student info under this grade
            }

        })




    });


    router.post('/getSubject', function (req, res, next) {


        let gcode = req.query.gcode
        let secCode = req.query.seccode
        let sy = req.query.sy
        let teacher_id = req.query.teacher_id

        scheduleModel.find({ sy, teacher_id, secCode }, "", (err, list) => {
            if (err) return handleError(err);
            // 'athletes' contains the list of athletes that match the criteria.
            else {



                res.send({
                    list,
                    params: req.query
                })

                // Get all student info under this grade
            }

        }).select('subject')




    });

    router.post('/importGrade', async function (req, res, next) {

        let file = req.query.file



        await file.map((i, index) => {


            gradeModel.find({ gcode: i.Gcode, secCode: i.SecCode, subject: i.subject, sy: i.sy, LRNNumber: i.LRNNumber}, '', (err, sched) => {

                if (!err) {
                 
                    if (sched.length != 0) {

                        
                        gradeModel.updateOne({ gcode: i.Gcode, secCode: i.SecCode, subject: i.subject, sy: i.sy, LRNNumber: i.LRNNumber}, {
                            gcode: i.Gcode, secCode: i.SecCode, subject: i.subject, sy: i.sy, LRNNumber: i.LRNNumber, first: i.first, second: i.second, third: i.third, fourth: i.fourth
                        }, function (error, docs) {
                            
                            if (!error) {
                                res.status(200)

                            }
                        })
                    }
                    else {
                        const schedule = new gradeModel({
                            gcode: i.Gcode, secCode: i.SecCode, subject: i.subject, sy: i.sy, LRNNumber: i.LRNNumber, first: i.first, second: i.second, third: i.third, fourth: i.fourth
                        })

                        try {

                            const dataToSave = schedule.save();
                            res.status(200).json(dataToSave)
                        }
                        catch (error) {
                            // res.status(400).json({ message: error.message })
                            // res.send({
                            //     error: "something went wrong"
                            // })
                        }
                    }
                }
                else {

                }

            })



        })

        res.send({
            msg: "success"
        })



    });


    router.post('/gradeStudent', async function (req, res, next) {


        let gcode = req.query.gcode
        let secCode = req.query.seccode
        let sy = req.query.sy
        let LRNNumber = req.query.studentID
        let subject = req.query.subject
        // let gradeVal = req.query.grade
        // let selectedPeriod = req.query.selectedPeriod
        let first = req.query.first
        let second = req.query.second
        let third = req.query.third
        let fourth = req.query.fourth
        

     


        // gradeModel.updateOne({
        //     gcode,
        //     secCode
        // })

        gradeModel.find({ gcode, secCode, LRNNumber, sy, subject }, '',  (err, grade) => {

           
            if (err) return handleError(err)
            else{

                if(grade.length != 0){
                    
                    gradeModel.updateOne({
                        sy,
                        gcode,
                        secCode,
                        LRNNumber,
                        subject,
                        }, {
                        first: first,
                        second: second,
                        third: third,
                        fourth: fourth,
                        }, function (error, docs){
                            if(!error){
                                res.status(200)
                                res.send({
                                    msg: 'success'
                                })
                            }
                            else{
                                
                            }
                        })
                }

                else{
                    const gradeSave = new gradeModel({
                        sy,
                        gcode,
                        secCode,
                        LRNNumber,
                        first: first,
                        second: second,
                        third: third,
                        fourth: fourth,
                        subject,
                        studentID: LRNNumber
                    })

                    try {
                        const dataToSave = gradeSave.save();
                        res.status(200).json(dataToSave)
                       
                    }
                    catch (error) {
                        res.status(400).json({ message: error.message })
                        res.send({
                            error: "something went wrong"
                        })
                    }
                }
            }
            // else {
              

            //     if(grade.length == 0){

            //         const gradeSave = new gradeModel({
            //             sy,
            //             gcode,
            //             secCode,
            //             LRNNumber,
            //             first: gradeVal,
            //             second: '',
            //             third: '',
            //             fourth :'',
            //             subject: '',
            //             subject,
            //             studentID: LRNNumber
            //         })

            //         try {
            //             const dataToSave =  gradeSave.save();
            //             res.status(200).json(dataToSave)
            //         }
            //         catch (error) {
            //             res.status(400).json({ message: error.message })
            //             res.send({
            //                 error: "something went wrong"
            //             })
            //         }

            //     }

            //     else{
                 


            //         if(selectedPeriod == 1){
            //             gradeModel.updateOne({
            //                 sy,
            //                 gcode,
            //                 studentID: LRNNumber,
            //                 subject
            //             }, {
            //                 first: gradeVal,
            //                 subject: subject
            //             }, function (err, docs){
            //                 
            //                 res.send({
            //                     msg: "Success update",
            //                     docs,
            //                     subject
            //                 })
            //             })
            //         }
            //         else if (selectedPeriod == 2) {
            //             gradeModel.updateOne({
            //                 sy,
            //                 gcode,
            //                 studentID: LRNNumber,
            //                 subject

            //             }, {
            //                 second: gradeVal,
            //                 subject: subject
            //             }, function (err, docs) {
            //                 
            //                 res.send({
            //                     msg: "Success update",
            //                     docs,
            //                     gradeVal
            //                 })
            //             })
            //         }

            //         else if (selectedPeriod == 3) {
            //             gradeModel.updateOne({
            //                 sy,
            //                 gcode,
            //                 studentID: LRNNumber,
            //                 subject

            //             }, {
            //                 third: gradeVal,
            //                 subject: subject
            //             }, function (err, docs) {
            //                 
            //                 res.send({
            //                     msg: "Success update",
            //                     docs,
            //                     gradeVal
            //                 })
            //             })
            //         }
            //         else if (selectedPeriod == 4) {
            //             gradeModel.updateOne({
            //                 sy,
            //                 gcode,
            //                 studentID: LRNNumber,
            //                 subject

            //             }, {
            //                 fourth: gradeVal,
            //                 subject: subject
            //             }, function (err, docs) {
            //                 
            //                 res.send({
            //                     msg: "Success update",
            //                     docs,
            //                     gradeVal
            //                 })
            //             })
            //         }
            //     }
            // }
        })


    




    });



    
    return router
    
}
