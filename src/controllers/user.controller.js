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

export const getAllUsers = async (req, res)=>{
    try {
        const users = await User.findAll();
        
        res.status(200).json({
            message: 'Lista de usuarios encontrados con éxito',
            status:200,
            data: users
        });

    } catch (error) {
        console.error(error);
    }
}

export const getAllActiveUsers = async (req, res) =>{
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
        console.error(error);
    }
}

export const getUsersByFilter = async (req, res) =>{
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
        console.error(error);
    }
}

export const getUsersById = async (req, res) => {
    try {
        const { id } = req.params;
    
        const user = await User.findByPk(id);
    
        res.status(200).json ({
            message:'Usuario encontrado con éxito',
            status:200,
            data : user
        });
        
    } catch (error) {
        console.error(error);
    }
}

export const getActiveUserById = async (req, res ) => {
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
       console.error(error); 
    }
}