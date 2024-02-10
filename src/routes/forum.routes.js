import { Router } from "express";
import {
    createForum,
    getForums,
    getForumById,
    updateForum,
    deleteForum
} from "../controllers/forum.controllers.js";

const router = Router();

// Rutas para manejar operaciones CRUD en los foros
router.post("/forums", createForum);
router.get("/forums", getForums);
router.get("/forums/:id", getForumById);
router.put("/forums/:id", updateForum);
router.delete("/forums/:id", deleteForum);

export default router;