var express = require('express');
var router = express.Router();
var Event = require('../models/event');

router.post('/',function (req,res) {
    var newEvent = new Event({
        lab: req.body.lab,
        eventname: req.body.eventname,
        description: req.body.description,
        starttime: req.body.starttime,
        endtime: req.body.endtime,
        bookedby: req.body.user
    });

    Event.createEvent(newEvent,function (err,event) {
        if(err){
            res.json({state:false, msg:"data not inserted"});
        }
        if(event){
            res.json({state:true, msg:"data inserted"});
        }
    });
});

router.get('/:lab?/:user?', function (req, res) {
   if(!(req.params.lab === ' ' && req.params.user === ' ')){
       Event.findByCategory(req.params.lab, req.params.user, function (err, events) {
           if(err){
               res.status(400);
               res.json(err)
           }else{
               res.json(events)
           }
       })
   }
   else {
       Event.getAllEvents(function (err, events) {
           if(err){
               res.status(400);
               res.json(err)
           }else{
               res.json(events)
           }
       })
   }
});

router.delete('/:objectId?', function (req,res) {
    if(req.params.objectId){
        Event.deleteObject(req.params.objectId, function (err, response) {
            if(err){
                res.status(400);
                res.json(err)
            }else{
                res.json(response)
            }
        })
    }
});


module.exports = router;