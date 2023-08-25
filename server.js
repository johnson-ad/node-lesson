const express = require("express")
const errorHandler = require("./middleware/errorHandler")
const connectDb = require("./config/dbConnection")
const dotenv = require("dotenv").config()

// Connection wicth  mongoDB
connectDb()

const app = express()

const port = process.env.PORT || 5000

//on utilise les middleware express.json() pour afficher le body de la requiete
app.use(express.json())

//on utilise les middleware avec la methode use()
app.use("/api/contacts", require("./routes/contactRoutes"))
app.use("/api/users", require("./routes/userRoutes"))

//La gestion des error
app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})