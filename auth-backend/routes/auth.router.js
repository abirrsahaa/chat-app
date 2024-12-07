import { Router } from "express";
import signup from "../controllers/signup.js";
import login from "../controllers/login.js";




const router=Router();

router.post("/signup",signup);
router.post("/login",login);

export default router;


// this is what a single api looks like in the backend which is of the form /auth/*