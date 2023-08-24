//on utilise les middleware express-async-handler rend les erreurs Express beaucoup plus faciles à gérer
const asyncHandler = require("express-async-handler")

//@desc Get all contacts
//@route GET /api/contacts
//@acces public
const getContacts = asyncHandler(async (req,res)=>{
    res.status(200).json({message : "Get all contacts"})
})

//@desc Get one contacts
//@route GET /api/contacts/:id
//@acces public
const getContact = asyncHandler(async (req,res)=>{
    res.status(200).json({message : `Get contact for ${req.params.id}`})
})

//@desc Create new contacts
//@route POST /api/contacts
//@acces public
const createContacts = asyncHandler(async (req,res)=>{
    console.log("The request body is :", req.body)
    const { name, email, phone } = req.body
    if(!name || !email || !phone){
        res.status(400)
        throw new Error("All fields are mandatory !")
    }
    res.status(201).json({message : "Create contacts"})
})


//@desc Update contacts
//@route PUT /api/contacts:id
//@acces public
const updateContacts = asyncHandler(async (req,res)=>{
    res.status(200).json({message : `Create contact for ${req.params.id}`})
})

//@desc Delete contacts
//@route DELETE /api/contacts/:id
//@acces public
const delteContacts = asyncHandler(async (req,res)=>{
    res.status(200).json({message : `Delete contact for ${req.params.id}`})
})

module.exports = {getContacts, getContact, createContacts, updateContacts,delteContacts}