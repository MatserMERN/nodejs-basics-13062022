const express = require("express")
const app= express()
const router = express.Router()
const sql = require("mssql")
const cors = require('cors')

app.use(cors())

const dbconfig={
    user: 'sa',
    password: 'user@123',
    server: 'LAPTOP-U67E8814',
    database: 'studentdb',
    options: {
        trustServerCertificate: true // change to true for local dev / self-signed certs
      }
}

sql.connect(dbconfig, (err)=>{
    if(err){
        throw err
    } else {
        console.log(`Connected to SQLDB Successfully !!!`)
    }
})

app.use(express.json())

router.get("/", (req, res) => {
    res.json("Welcome to Student API using SQL server")
})

router.get("/students", (req, res) => {
    const selectQuery = `SELECT * FROM student`
    const request = new sql.Request()
    request.query(selectQuery, (err, data)=> {
        if(err){
            throw err
        }
        res.json(data.recordset)
    })
})

router.get("/students/:id", (req, res) => {
    const studentId = req.params.id
    const selectQueryById = `SELECT * FROM student Where _id = ${studentId}`
    const request = new sql.Request()
    request.query(selectQueryById, (err, data)=> {
        if(err){
            throw err
        }
        res.json(data.recordset)
    })
})

router.post("/students", (req, res) => {
    const {name, email, city} = req.body
    const insertQuery = `INSERT INTO student (name, email, city) VALUES ('${name}', '${email}', '${city}')`
    const request = new sql.Request()
    request.query(insertQuery, (err, data) => {
        if(err){
            throw err
        }
        res.json(data)
    })
})

router.put("/students/:id", (req, res) => {
    const studentId = req.params.id
    const {name, email, city} = req.body
    const updateQuery = `UPDATE student 
                         SET name ='${name}', email='${email}', city='${city}' 
                         WHERE _id =${studentId}`
    const request = new sql.Request()
    request.query(updateQuery, (err, data) => {
        if(err){
            throw err
        }
        res.json(data)
    })
})

router.delete("/students/:id", (req, res) => {
    const studentId = req.params.id
    const deleteQuery = `DELETE FROM student WHERE _id = ${studentId}`
    const request = new sql.Request()
    request.query(deleteQuery, (err, data) => {
        if(err){
            throw err
        }
        res.json(data)
    })
})

app.use("/api", router)

const PORT = 3001

app.listen(PORT, () => console.log(`Server listening at PORT ${PORT}`))