//@desc Get all contacts
//@route GET /api/contacts
//@acces public
const getContacts = (req,res)=>{
    res.status(200).json({message : "Get all contacts"})
}

//@desc Get one contacts
//@route GET /api/contacts/:id
//@acces public
const getContact = (req,res)=>{
    res.status(200).json({message : `Get contact for ${req.params.id}`})
}

//@desc Create new contacts
//@route POST /api/contacts
//@acces public
const createContacts = (req,res)=>{
    console.log("The request body is :", req.body)
    res.status(201).json({message : "Create contacts"})
}


//@desc Update contacts
//@route PUT /api/contacts:id
//@acces public
const updateContacts = (req,res)=>{
    res.status(200).json({message : `Create contact for ${req.params.id}`})
}

//@desc Delete contacts
//@route DELETE /api/contacts/:id
//@acces public
const delteContacts = (req,res)=>{
    res.status(200).json({message : `Delete contact for ${req.params.id}`})
}

module.exports = {getContacts, getContact, createContacts, updateContacts,delteContacts}