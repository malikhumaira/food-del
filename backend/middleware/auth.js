import jwt from "jsonwebtoken";

const authMiddleware = async (req,res,next) => {
    const {token} = req.headers;
    if(!token) {
        return res.json({success:false, message:'Not Authorized, Login Again'})
    } try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch(error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

export default authMiddleware;

// when user will send an item id, using that id
// a token will be created and request will be sent along with it
// to decode the token we will use middleware 