const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const cookieParser = require('cookie-parser')


const authData = async (req, res, next)=>{
try {
    router.use(cookieParser());
    const token = req.cookies.jwtToken;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    const relyUser = await User.findOne({_id:verifyToken._id, 'tokens.token':token });
    if(!relyUser){throw new Error('user not found')}
    req.token = token;
    req.relyUser = relyUser;
    req.userID = relyUser._id;
    next();
} catch (err) {
    res.status(401).send('Unauthorized: user')
    console.log(err);
}
}

module.exports = authData;