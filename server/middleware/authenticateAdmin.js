const jwt = require("jsonwebtoken");
const Admin = require("../models/adminschema");

const authenticate =async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        
        const verifyToken =jwt.verify(token, process.env.SECRET_KEY);
        const rootAdmin = await Admin.findOne({_id:verifyToken._id, "tokens.token": token});
        if(!rootAdmin) {throw new Error('User not Found')}
        
        req.token=token;
        req.rootAdmin = rootAdmin;
        req.AdminID = rootAdmin._id; 

        next();
    
    } catch(err) {
        res.status(401).send('Unauthorized');
        console.log(err);
    }
}

module.exports = authenticate;