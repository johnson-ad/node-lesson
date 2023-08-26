//on utilise les middleware express-async-handler rend les erreurs Express beaucoup plus faciles à gérer
const asyncHandler = require("express-async-handler")

// Import contact model
const Contact = require("../models/contactModel")

//@desc Get all contacts
//@route GET /api/contacts
//@acces private
const getContacts = asyncHandler(async (req,res)=>{
    const contacts =  await Contact.find({user_id : req.user.id})
    res.status(200).json(contacts)
})

//@desc Get one contacts
//@route GET /api/contacts/:id
//@acces private
const getContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact not found")
    }

    res.status(200).json(contact)
})

//@desc Create new contact
//@route POST /api/contacts
//@acces private
const createContact = asyncHandler(async (req,res)=>{
    console.log("The request body is :", req.body)
    const { name, email, phone } = req.body
    if(!name || !email || !phone){
        res.status(400)
        throw new Error("All fields are mandatory !")
    }

    const contact = await Contact.create({
        name, 
        email, 
        phone,
        user_id : req.user.id // req.user.id proviens du middleware validateToken ligne 17
    })
 
    res.status(201).json(contact)
})


//@desc Update contact
//@route PUT /api/contacts:id
//@acces private
const updateContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact not found")
    }


    //Empecher aux autres user de modifier ou delete un autre contact 
    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("User don't have permission to update other user contact")
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new : true}
    )

    res.status(200).json(updatedContact)
})

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("User don't have permission to update other user contact")
    }

    await Contact.deleteOne({_id : req.params.id});
    res.status(200).json(contact);
});

module.exports = {getContacts, getContact, createContact, updateContact, deleteContact}