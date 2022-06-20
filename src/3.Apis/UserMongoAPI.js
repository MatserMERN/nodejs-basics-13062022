const express = require("express")
const app = express()
const router = express.Router()
const mongoose = require("mongoose")
const UserModel = require("../5.models/user")

app.use(express.json())

mongoose.connect("mongodb://localhost:27017/userdb", (err) => {
    if (err) {
        throw err
    } else {
        console.log("Connected to MongoDB Successfully !!!")
    }
})

router.get("/", (request, response) => {
    response.json("Welcome to User API using MongoDB")
})

router.get("/users", async (request, response) => {
    const users = await UserModel.find()
    response.json(users)
})

router.get("/users/:id", async (request, response) => {
     const userId = request.params.id
     const users = await UserModel.findById({_id: userId})
     response.json(users)
   // response.json(await UserModel.findById({_id: request.params.id}))
})

router.post("/users", async (request, response) => {
    const user = new UserModel(request.body)
    try {
        await user.save()
        response.json(user)
    } catch(error){
        response.status(500).send(error)
    }
})

router.put("/users/:id", async (request, response) => {
    const userId = request.params.id
    const user = request.body
    const res = await UserModel.updateOne({_id: userId}, user)
    response.json(res)
})

router.delete("/users/:id", async (request, response) => {
    const userId = request.params.id
    const res = await UserModel.deleteOne({_id: userId})
    response.json(res)
})

app.use("/api", router)

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server is listening at PORT ${PORT}`)
})