import { Router } from "express";
import gettingmessages from "../controllers/gettingmessages.js";


const router=Router();

router.get('/',gettingmessages);

export default router;