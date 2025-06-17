import User from "../models/user.model.js";
import genToken from "../config/token.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
    try {
        let { name, email, password } = req.body;
        let existUser=await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        let hashedPassword = await bcrypt.hash(password,10)
        let user = await User.create({
            name,
            email,
            password: hashedPassword // Store the hashed password
        });
        let token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: "strict",  // Prevent CSRF attacks
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
            
        });

        return res.status(201).json(user);
        // Ideally, you should hash the password here
    } catch (error) {
        return res.status(500).json({ message: "signUp error", error: error.message });
    }


}
export const login = async (req, res) => {
    try {
        let {email, password } = req.body;
        let user=await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exists" });
        }
        // Compare the provided password with the stored hashed password
        let isMatch = await bcrypt.compare(password, user.password);
        if( !isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }
        let token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: "strict",  // Prevent CSRF attacks
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
            
        });

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: "login error", error: error.message });
    }
}
export const logout = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        return res.status(500).json({ message: "logOut error", error: error.message });
        
    }
}