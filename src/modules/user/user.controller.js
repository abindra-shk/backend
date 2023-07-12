const { encryptPassword, comparePassword } = require('../../plugins/bcrypt');
const userModel= require('./user.schema');

const userRegister = async (req,res) => {
    const {username, password}= req.body;
    const user = await userModel.findOne({
        username
    });

    if(user){
        return res.status(400).send({
            message: 'User already exists'
        })
    }else{
        const encryptedPassword =await encryptPassword(password)
        await userModel.create({
            username,password :encryptedPassword
        })
        return res.status(401).send({
            data: null,
            message: 'User created successfully'
        })
    }
}

const userLogin = async (req,res) => {
    const {username, password}= req.body;
    const user = await userModel.findOne({
        username,
    });

    if(user){
        const isPasswordRight = await comparePassword(password, user.password)
        if(isPasswordRight){
        return res.send({
            data: user,
            message: 'User logged in successfully'
        })
        }else{
            return res.status(401).send({
                data: null,
                message: 'Credentials incorrect'
            })
        }
    }else{
        return res.status(401).send({
            data: null,
            message: 'Credentials incorrect'
        })
    }
}

module.exports = {
    userLogin,
    userRegister
}