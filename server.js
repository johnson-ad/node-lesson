const express = require("express")

const dotenv = require("dotenv").config()

const app = express()

const port = process.env.PORT || 5000

//on utilise les middleware express.json() pour afficher le body de la requiete
app.use(express.json())

//on utilise les middleware avec la methode use()
app.use("/api/contacts", require("./routes/contactRoutes"))

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})