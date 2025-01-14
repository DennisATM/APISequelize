import { ValidationError } from "../errors/TypeError.js"
import { User } from "../models/user.model.js";

export const createUser= async (req, res, next)=>{
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
        next(error);
    }
}

export const getAllUsers = async (req, res, next)=>{
    try {
        const users = await User.findAll();
        
        res.status(200).json({
            message: 'Lista de usuarios encontrados con éxito',
            status:200,
            data: users
        });

    } catch (error) {
       next(error);
    }
}

export const getAllActiveUsers = async (req, res, next) =>{
    try {
        const activeUsers = await User.findAll({
            where:{ active:true }
        });

        res.status(200).json({
            message:'Lista de usuarios activos encontrados con éxito',
            status:200,
            data : activeUsers
        });
    } catch (error) {
        next(error);
    }
}

export const getUsersByFilter = async (req, res, next) =>{
    try {
        const filter = req.query; //recibe los filtros como un objeto {clave:'valor'}
        
        const whereClauses = {}; //va a ser un contedor para los filtros recibidos

        for (const key in filter){
            if(filter.hasOwnProperty(key)){
                whereClauses[key] = filter[key];
            }
        }

        const usersFilter = await User.findAll({
            where:{ ...whereClauses, active: true }
        })

        res.status(200).json({
            message:'Lista de usuarios filtrados encontrados con éxito',
            status:200,
            data : usersFilter
        });

    } catch (error) {
        next(error);
    }
}

export const getUsersById = async (req, res, next) => {
    try {
        const { id } = req.params;
    
        const user = await User.findByPk(id);
    
        res.status(200).json ({
            message:'Usuario encontrado con éxito',
            status:200,
            data : user
        });
        
    } catch (error) {
        next(error);
    }
}

export const getActiveUserById = async (req, res, next ) => {
    try {
        const {id} = req.params;
        const user = await User.findOne({
            where:{id, active:true}
        });
    
        res.status(200).json ({
            message:'Usuario encontrado con éxito',
            status:200,
            data : user
        });
        
    } catch (error) {
       next(error); 
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const {id} = req.params;
        const updateData = req.body;
        
        if( updateData){
            const existUser = await User.findOne({ where: { email : updateData.email }});
            if ( existUser && existUser.id != id){
                throw new ValidationError(`El correo electrónico se encuentra en uso por otro usuario.`)
            };

        }
        
        const [updateRows, [updateUser] ] = await User.update(updateData, {
            where: {id, active:true },
            returning: true
        });

        if (updateRows === 0){
            console.error(`No se encontró al usuario con el id: ${id}`)
        }

        res.status(200).json({
            message:'Usuario actualizado con éxito',
            status:200,
            data : updateUser
        })
    } catch (error) {
        next(error);
    }
}