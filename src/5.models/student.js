const mongoose = require("mongoose")
const Schema = mongoose.Schema

const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }
}, {versionKey: false})

studentSchema.index({'$**': 'search'});

const Student = module.exports = mongoose.model("student", studentSchema, "student")

module.exports.getStudents = function(callback){
    Student.find(callback)
}

module.exports.getStudentById = function(studentId, callback){
    Student.findById({_id: studentId}, callback)
}

module.exports.getStudentByText = function(text, callback){
    Student.find({$text: {$search: text}}, callback)
}

module.exports.createStudent = function(student, callback){
    Student.create(student, callback)
}

module.exports.updateStudent = function(studentId, student, callback){
    const {name, email, city } = student
    Student.updateOne({_id: studentId}, {$set : {name,email,city}}, callback)
    // Student.updateOne(
    //     {_id: studentId}, 
    //     {
    //         $set : {name,email,city}
    //     }
    // , callback)
}

module.exports.deleteStudent = function(studentId, callback){
    Student.deleteOne({_id: studentId}, callback )
}