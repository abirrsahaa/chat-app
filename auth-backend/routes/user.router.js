import {Router } from "express";
import verifyjwt from "../middleware/verifyjwt.js";
import user from "../controllers/user.js";

const router=Router();

router.get('/user',verifyjwt,user);

export default router;