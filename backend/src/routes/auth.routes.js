import { Router } from "express";
import {
  login,
  logout,
  register,
  verifyToken,
} from "../controllers/auth.controlers.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
import passport from "passport";

const router = Router();

router.post("/register", validateSchema(registerSchema), register,(req,res)=>{
  console.log("Renderizando vista de registro...");
  res.render('register',{user:req.user})
});
router.post("/login", validateSchema(loginSchema), login,(req,res)=>{
  console.log("Renderizando vista de login...");

  res.render('login',{user:req.user})
});
router.get("/verify", verifyToken);
router.post("/logout", verifyToken, logout);
// auth with google+
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));
// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/profile');
});


export default router;
