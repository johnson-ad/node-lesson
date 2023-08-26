const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

//@desc Register a user
//@route POST /api/users/register
//@acces public
const registerUser = asyncHandler(async ( req, res)=>{
    const { username, email, password} = req.body
    if(!username || !email || !password){
        res.status(400)
        throw new Error("All fields are mandatory !")
    }

    // On verifi si le user existe deja
    const userAvailable = await User.findOne({email})
    if(userAvailable){
        res.status(400)
        throw new Error("User already register !")
    }

    //Hash password 
    const hashedPawword = await bcrypt.hash(password,10)
    console.log("Hashe password :", hashedPawword)


    const user = await User.create({
        username, 
        email, 
        password : hashedPawword
    })

    console.log(`User created: ${user}`)
    if(user){
        res.status(201).json({ _id : user.id, email: user.email})
    }else{
        res.status(400)
        throw new Error("User data us not valid")
    }
    
    res.json({message : "Register the user"})
})

//@desc Login user
//@route POST /api/users/login
//@acces public
const loginUser = asyncHandler(async ( req, res)=>{
    const { email, password } = req.body
    if(!email || !password){
        res.status(400)
        throw new Error("All fields are mandatory !")
    }
         
    const user = await User.findOne({email})

    //Compare password witch hashedpassword
    if(user && ( await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            // My payload is user
            user : {
                username : user.username,
                email : user.email,
                id : user.id
            }
        }, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn : "15m"
        })

        res.status(200).json({ accessToken })
    }else {
        res.status(401)
        throw new Error("email or password is not valid")
    }
      
})


//@desc Current user info
//@route GET /api/users/current
//@acces private
const currentUser = asyncHandler(async ( req, res)=>{
    res.json(req.user)
})



module.exports = { registerUser, loginUser, currentUser}