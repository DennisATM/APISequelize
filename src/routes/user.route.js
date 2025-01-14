import { Router } from "express";
import { createUser, getActiveUserById, getAllActiveUsers, getAllUsers, getUsersByFilter, getUsersById, updateUser } from "../controllers/user.controller.js";

const router = Router();

router.post('/user',createUser);
router.get('/user',getAllActiveUsers);
router.get('/user/filter',getUsersByFilter);
router.get('/user/:id',getActiveUserById);
router.put('/user/:id', updateUser);
router.get('/admin/user',getAllUsers);
router.get('/admin/user/:id',getUsersById);

export default router;