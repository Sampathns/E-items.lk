const User = require('../models/User');
const jwt = require('jsonwebtoken');

const registerUser = async (req,res) => {
    try{
        const {name,email,password} = req.body;

        const userExists = await User.findOne ({email});
        if (userExists){
            return res.status(400).json({message: 'User already exists'});

        }

        const user = await User.create({
            name,
            email,
            password
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email:user.email,
                role: user.role
            });
        }

    }catch(err){
        res.status(400).json({message: err.message});
    }
};

const authUser = async (req,res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if (user && (await user.matchPassword)){
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
                message: "Login Successful"
            });
        }else{
            res.status(401).json({message:'Invalid email or password'});

        }

    }catch(err){
        res.status(500).json({message: err.message});

    }

};
const getUserProfile = async (req,res) => {
    try{
        const user = await User.findById(req.body.userId || req.query.id);
        if(user){
            res.json({
                _id: user._id,
                name: user.name,
                email:user.email,
                role:user.role
            });
        }else{
            res.status(404).json({message: 'User not found'});
        }
        
    }catch(err){
        res.status(500).json({message: err.message});

    }
};
const getUsers = async (req,res) =>{
    try{
        const users = await User.find({});
        res.json(users);
    }catch(err){
        res.status(500).json({message: err.message});

    }

};
const generateToken = (id) => {
     return jwt.sign({ id }, 'mysecretkey', { expiresIn: '30d' });
};
module.exports = {
    registerUser,
    authUser,
    getUserProfile,
    getUsers
};
