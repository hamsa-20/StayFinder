import jwt from 'jsonwebtoken';
const genToken=async (user)=>{
    try {
        let token=await jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );
        return token;
    } catch (error) {
        console.error("Error generating token:", error);
        
    }
}
export default genToken;
