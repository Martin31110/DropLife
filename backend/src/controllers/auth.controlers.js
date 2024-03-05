import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { TOKEN_SECRET } from "../config.js";
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
    
    try {
        const {email, password, username } = req.body;
        
        const userFound = await User.findOne({email})
        
        if(userFound)  
            return res.status(400).json(["The email is already in use"])
        //Encrypt the password
            const passwordHash = await bcrypt.hash(password, 10) 

        //Schema fro the DataBase
        const newUser = new User({
            username,
            email,
            password: passwordHash
        })

        //Saved the User
        const userSaved = await newUser.save();


        //Call the token Fuction form config js
        const token = await createAccessToken({ 
          id: userSaved._id 
        })


        res.cookie('token', token, {
            httpOnly: process.env.NODE_ENV !== "development",
            secure: true,
            sameSite: "none",
        })



        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAT: userSaved.createdAt,
            updateAT: userSaved.updatedAt
        })


        //Made the json with tha data


    } catch (error) {
        res.status(500).json({ message: error.message });
    }


};

//Login

export const login  = async (req, res) => {
    try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });

    if (!userFound)
      return res.status(400).json({
        message: ["The email does not exist"],
      });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({
        message: ["The password is incorrect"],
      });
    }

    const token = await createAccessToken({
      id: userFound._id,
      username: userFound.username,
    });

    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }


};

//Logout

export const logout =  (req, res ) => {
    res.cookie('token', "", {
        expires: new Date(0),
    });
    return res.sendStatus(200)
};


//Verify the token for the login
export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.send(false);
  
    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
      if (error) return res.sendStatus(401);
  
      const userFound = await User.findById(user.id);
      if (!userFound) return res.sendStatus(401);
  
      return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
      });
    });
  };

//profile

export const profile = async (req, res) => {
    try {
        const userFound = await User.findById(req.user.id);

        if (!userFound) {
            return res.status(400).json({ message: "User not found" });
        }

        const userProfile = {
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        };

        return res.json(userProfile);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};