/**
 * Created by Greg JEFTIC on 19/11/2016.
 */
var mongoose = require('mongoose');

// club schema
var studentsSchema = mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    birthdate:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    personne:{
        type: String
    },
    club:{
        type: String
    },
    lessons:{
        type: Number
    },
    email:{
        type: String,
        reqired: true
    },
    notes:{
        type: String
    },
    yearSubscription:{
        type: Boolean,
        default: false
    },
    trimesterSubscription:{
        type: Boolean,
        default: false
    },
    subscriptionDate:{
        type: Date,
        default: Date.now()
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

var Students = module.exports = mongoose.model('Students', studentsSchema);

// Get students
module.exports.getStudents = function(callback, limit){
    Students.find(callback).limit(limit);
};

// Get student by ID
module.exports.getStudentById = function(id, callback){
    Students.findById(id, callback);
};

// ADD student
module.exports.addStudents = function(students, callback){
    Students.create(students, callback);
};

// Update student
module.exports.updateStudents = function(id, students, options, callback){
    var query = {_id: id};
    var update = {
        fullName : students.fullName,
        birthdate : students.birthdate,
        phone : students.phone,
        personne : students.personne,
        club: students.club,
        lessons : students.lessons,
        email : students.email,
        notes: students.notes,
        subscriptionDate : students.subscriptionDate,
        trimesterSubscription : students.trimesterSubscription,
        yearSubscription : students.yearSubscription,
        isDeleted: students.isDeleted
    };
    Students.findOneAndUpdate(query, update, options, callback);
};

// Delete student
module.exports.deleteStudent = function(id, callback){
    var query = {_id: id};
    Students.remove(query, callback);
};
