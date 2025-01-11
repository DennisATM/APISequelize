import { User } from "../models/user.model.js";

export const createUser= async (req, res)=>{
    try {
        const data = req.body;
        const user = await User.create(data);
        console.log(user);

        res.status(201).json({
            message: 'Usuario creado con éxito',
            status: 201,
            data:user
        })
    } catch (error) {
        console.error(error);
    }
}