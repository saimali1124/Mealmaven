const jwt = require("jsonwebtoken");
const SuperAdmin = require("../models/superadminschema");

const authenticateSuperAdmin =async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        
        const verifyToken =jwt.verify(token, process.env.SECRET_KEY);
        const rootSuperAdmin = await SuperAdmin.findOne({_id:verifyToken._id, "tokens.token": token});
        if(!rootSuperAdmin) {throw new Error('User not Found')}
        
        req.token=token;
        req.rootSuperAdmin = rootSuperAdmin;
        req.SuperAdminID = rootSuperAdmin._id; 

        next();
    
    } catch(err) {
        res.status(401).send('Unauthorized');
        console.log(err);
    }
}

module.exports = authenticateSuperAdmin;