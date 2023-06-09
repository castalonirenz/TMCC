var express = require('express');
const mapModel = require('../model/mapModel');
var router = express.Router();
const MapModel = require('../model/mapModel')
const fs = require('fs');
const { request } = require('https');
/* GET users listing. */


// module.exports = router;


module.exports = () => {

   
    router.post('/saveMap',  function (req, res, next) {


        let gcode = req.body.gcode
        let image = req.body.image
        let secCode = req.body.seccode
        let name = req.body.name



        // var bitmap = fs.readFile(image);
        // // convert binary data to base64 encoded string
        // let a = new Buffer(bitmap).toString('base64');

        const createMap = new mapModel({

           gcode,
           image,
           secCode,
           name


        })
     

        MapModel.find({ name, gcode, secCode }, "", async (err, d) => {

            if (err) {
                res.status(500)
                res.send({
                    msg: "Something went wrong."
                })
            }
            else {

                if (d.length == 0) {

                    createMap.save()
                    res.send({
                        "???": "!!!"
                    })
                }
                else {

                    try {
                        // const dataToSave =  newmap.save();

                        MapModel.updateOne({
                            gcode,
                        }, {
                            gcode: gcode,
                            image: image,
                            secCode: secCode,
                            name: name

                        }, function (err, docs) {

                            res.send({
                                msg: "Success update",
                                docs,
                            })
                        })

                    }
                    catch (error) {
                        res.status(400).json({ message: error.message })
                        res.send({
                            error: "something went wrong"
                        })
                    }
                   
                }
            }
        })

        

      


    });


    router.post('/getMaps', (req, res, next) => {


        mapModel.find().all().then(v => {

            res.send({
                result: v
            })
        })
            .catch(err => {
                res.status(500)
                res.send({
                    error: "Check server"
                })
            })

    })


    router.post('/updateMap', (req, res, next) => {

        
        let gcode = req.body.gcode
        let image = req.body.image
        let secCode = req.body.seccode
        let name = req.body.name

        mapModel.find({ secCode, gcode }, "", (err, user) => {
            if (err) return handleError(err);
            // 'athletes' contains the list of athletes that match the criteria.
            else {

                let data = user[0]
                mapModel.updateOne({ secCode, gcode },
                    { name: name, image: image }, function (err, docs) {
                        if (err) {
                            
                        }
                        else {
                            

                            res.send({
                                result: "success"
                            })
                     
                        }
                    });

            }

        });

    })


    router.post('/deleteMap', (req, res, next) => {

        
        let gcode = req.body.gcode
        let image = req.body.image
        let secCode = req.body.seccode
        let name = req.body.name
        

        mapModel.deleteOne({ secCode, gcode }, (err, user) => {
            if (err) return handleError(err);
            // 'athletes' contains the list of athletes that match the criteria.
            else {

                res.send({
                    result: "success"
                })

            }

        });

    })



    return router

}
