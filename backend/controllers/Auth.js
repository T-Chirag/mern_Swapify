const User = require("../models/User");
const bcrypt=require('bcryptjs');

const { sanitizeUser } = require("../utils/SanitizeUser");
const { generateToken } = require("../utils/GenerateToken");

let User_ID = null; // Initialize as null or some default value

// Function to set the User ID
exports.setUserID = (id) => {
  User_ID = id;
};

// Function to get the current User ID
exports.getUserID = () => User_ID;




exports.signup=async(req,res)=>{    
    try {
        const existingUser=await User.findOne({email:req.body.email})
        
        // if user already exists
        if(existingUser){
            return res.status(400).json({"message":"User already exists"})
        }

        // hashing the password
        const hashedPassword=await bcrypt.hash(req.body.password,10)
        req.body.password=hashedPassword

        // creating new user
        const createdUser=new User(req.body)
        await createdUser.save()

        // getting secure user info
        const secureInfo=sanitizeUser(createdUser)

        // generating jwt token
        const token=generateToken(secureInfo)

        // Store the token in localStorage
        // localStorage.setItem('token', token); // Replace `response.data.token` with your actual token


        // sending jwt token in the response cookies
        res.cookie('token',token,{
            sameSite:process.env.PRODUCTION==='true'?"None":'Lax',
            maxAge:new Date(Date.now() + (parseInt(process.env.COOKIE_EXPIRATION_DAYS * 24 * 60 * 60 * 1000))),
            httpOnly:true,
            secure:process.env.PRODUCTION==='true'?true:false
        })

        res.status(201).json(sanitizeUser(createdUser))

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error occured during signup, please try again later"})
    }
}

exports.login=async(req,res)=>{
    try {
        // checking if user exists or not
        const existingUser=await User.findOne({email:req.body.email})

        // if exists and password matches the hash
        if(existingUser && (await bcrypt.compare(req.body.password,existingUser.password))){

            // getting secure user info
            // setUserID(existingUser._id);

            
            // console.log("Userid="+User_ID);
            
            const secureInfo=sanitizeUser(existingUser)
            
           
            // generating jwt token
            const token=generateToken(secureInfo)

             // Replace `response.data.token` with your actual token
            const User_id = existingUser._id;
            // localStorage.setItem('User_id',User_id);

            // sending jwt token in the response cookies
            res.cookie('token',token,{
                sameSite:process.env.PRODUCTION==='true'?"None":'Lax',
                maxAge:new Date(Date.now() + (parseInt(process.env.COOKIE_EXPIRATION_DAYS * 24 * 60 * 60 * 1000))),
                httpOnly:true,
                secure:process.env.PRODUCTION==='true'?true:false
            })
            return res.status(200).json(sanitizeUser(existingUser))
        }
        
        return res.status(404).json({message:"Invalid Credentails"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Some error occured while logging in, please try again later'})
    }
}


exports.logout=async(req,res)=>{
    try {

        try {
            // Extract the token from cookies or headers
            const token = req.cookies.token; // Assuming you're storing the token in cookies
            if (!token) {
                return res.status(401).json({ message: 'No token provided. User not logged in.' });
            }
    
            // Verify and decode the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decoded._id; // Adjust based on your token's payload structure
    
            // Fetch user details from the database
            const user = await User.findById(userId).select('-password'); // Avoid fetching sensitive fields like password
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }
    
            // Log user details to the console
            console.log('Logged-in User Details:', {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role, // Assuming you have a 'role' field in your user model
            });
    
            // Respond with user details if needed
            res.status(200).json({ message: 'User logged in.', user });
        } catch (error) {
            console.error('Error logging user details:', error);
            res.status(500).json({ message: 'Internal server error' });
        }

        res.cookie('token',{
            maxAge:0,
            sameSite:process.env.PRODUCTION==='true'?"None":'Lax',
            httpOnly:true,
            secure:process.env.PRODUCTION==='true'?true:false
        })
        localStorage.removeItem('token');

        res.status(200).json({message:'Logout successful'})
    } catch (error) {
        console.log(error);
    }
}

exports.checkAuth=async(req,res)=>{
    try {
        if(req.user){
            const user=await User.findById(req.user._id)
            return res.status(200).json(sanitizeUser(user))
        }
        res.sendStatus(401)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
}