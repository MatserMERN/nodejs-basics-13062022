const express = require("express")
const app = express()
const router = express.Router()
const mongoose = require("mongoose")
const Student = require("../5.models/student")
const cors = require('cors')

app.use(cors())

app.use(express.json())

mongoose.connect("mongodb://localhost:27017/studentdb", (err) => {
    if (err) {
        throw err
    } else {
        console.log("Connected to MongoDB Successfully !!!")
    }
})

router.get("/", (request, response) => {
    response.json("Welcome to Student API using MongoDB")
})

router.get("/students", (request, response) => {
    Student.getStudents(function (err, data) {
        if (err) {
            throw err
        }
        response.json(data)
    })
})

// router.get("/students/:id", (request, response) => {
//     const studentId = request.params.id
//     Student.getStudentById(studentId, (err, data) => {
//         if (err) {
//             throw err
//         }
//         response.json(data)
//     })
// })

router.get("/students/:text", (request, response) => {
    const text = request.params.text
    Student.getStudentByText(text, (err, data) => {
        if (err) {
            throw err
        }
        response.json(data)
    })
})


router.post("/students", (request, response) => {
    const student = request.body
    Student.createStudent(student, (err, data) => {
        if (err) {
            throw err
        }
        response.json(data)
    })
})

router.put("/students/:id", (request, response) => {
    const studentId = request.params.id
    const student = request.body

    Student.updateStudent(studentId, student, (err, data) => {
        if(err){
            throw err
        }
        response.json(data)
    })
})

router.delete("/students/:id", (request, response) => {
    const studentId = request.params.id
    Student.deleteStudent(studentId, (err, data) => {
        if(err){
            throw err
        }
        response.json(data)
    })
})

app.use("/api", router)

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server is listening at PORT ${PORT}`)
})