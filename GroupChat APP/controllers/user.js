const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const util = require('util');
const hashAsync = util.promisify(bcrypt.hash);

const isStringValid = (string) => {
    if(!string || string.length ===0){
        return true;
    }else
        return false;
}

const signup = async (req, res) => {
    try {
        const { name, email,phone, password } = req.body;

        if (isStringValid(name) || isStringValid(email) || isStringValid(password) || isStringValid(phone)){
            return res.status(400).json({ err: "Bad parameter. Something missing" });
        }

        const hashedPassword = await hashAsync(password, 10);

        await User.create({
            name,
            email,
            phone,
            password: hashedPassword
        });

        res.status(201).json({ message: 'Successfully signed up!!' });
    } catch (error) {
        console.error(error);

        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ success: false, message: 'Email is already in use. Please use a different email.' });
        }

        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const generateAccessToken = (id , name ) => {
    return jwt.sign({ userId: id , name:name } , 'secret_key')
}


const login = async (req , res) => {
    
    try{
        const {email, password} = req.body;
        
        if(isStringValid(email) || isStringValid(password)){
            return res.status(400).json({success:false ,message:'Email id or password is missing'})
        }

       
        const user = await User.findAll({where:{email}});
        
        if(user.length > 0){
            bcrypt.compare(password , user[0].password , (err,result) =>{
                if(err){
                    throw new Error('Something went wrong');
                }
                if(result){
                    res.status(200).json({success: true , message: "user logged in successfully" , token : generateAccessToken(user[0].id , user[0].name)})
                }else{
                    return res.status(400).json({success:false,message:'Password is incorrect'})
                }
            })
        }else{
            return res.status(404).json({success:false , message:'User Does not exist'})
        }
        
    }
    catch(err){
        
        res.status(500).json({message:err, success:false});
    }
}


module.exports = {
    signup,
    login,
    generateAccessToken
}