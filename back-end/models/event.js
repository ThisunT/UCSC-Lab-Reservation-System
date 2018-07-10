var mongoose = require('mongoose');
var schema = mongoose.Schema;

var eventSchema = new schema({
    lab: {type:String, required:true},
    eventname: {type:String, required:true},
    description: {type:String},
    starttime: {type:Date, required:true},
    endtime: {type:Date, required:true},
    bookedby: {type:String, required:true}
});

var Event = module.exports = mongoose.model("Event",eventSchema);

module.exports.createEvent = function(newEvent, callback){
    newEvent.save(callback);
};

module.exports.findByCategory = function (lab, user, callback) {
    if(lab===' ' || lab===undefined){
        var query = {bookedby:user};
        Event.find(query,callback);
    }
    else if(user===' ' || user===undefined){
        var query = {lab:lab};
        Event.find(query,callback);
    }
    else {
        var query = {lab:lab, bookedby:user};
        Event.find(query,callback);
    }


  // if(category.substring(0,3)==="Lab"){
  //     var queryLab = {lab:category};
  //     Event.find(queryLab,callback);
  //   }
  //   else {
  //     var queryUser = {bookedby:category};
  //     Event.find(queryUser,callback);
  // }
};

module.exports.deleteObject = function (objectId, callback) {
    Event.deleteOne({_id: objectId},callback);
};

module.exports.getAllEvents = function (callback) {
    var query = {};
    Event.find(query,callback);
};
