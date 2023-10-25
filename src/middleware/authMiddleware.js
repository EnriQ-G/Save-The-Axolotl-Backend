const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/usersModel');

const protect = asyncHandler(async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            //obtenemos el token
            token =req.headers.authorization.split(' ')[1];
            //verificamos el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //buscamos el usuario por el id
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch(error){
            console.log(error);
            res.status(401);
            throw new Error('No autorizado, token fallido');
        }
    }

    if (!token){
        res.status(401);
        throw new Error('No autorizado, no se proporciono token');
    }
}
)

const isAdmin = asyncHandler(async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            //obtenemos el token
            token =req.headers.authorization.split(' ')[1];
            //verificamos el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //buscamos el usuario por el id
            req.user = await User.findById(decoded.id).select('-password');
            if(req.user && req.user.isAdmin){
                next();
            } else {
                res.status(401);
                throw new Error('No autorizado, no es administrador');
            }

        } catch(error){
            console.log(error);
            res.status(401);
            throw new Error('No autorizado, token fallido');
        }
    }

    if (!token){
        res.status(401);
        throw new Error('No autorizado, no se proporciono token');
    }
}
)

module.exports = { 
    protect,
    isAdmin
}