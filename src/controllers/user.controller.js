import { NotFoundError, ValidationError } from "../errors/TypeError.js";
import { User } from "../models/user.model.js";
import { validateExistData } from "../utils/validate/validate.js";

export const createUser= async (req, res, next)=>{
    try {
        const data = req.body;

        await validateExistData(User, data, ['email','telefono']);

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
        const users = await User.findAll({paranoid:false});
        
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
        
        // if( updateData){
        //     const existUser = await User.findOne({ where: { email : updateData.email }});
        //     if ( existUser && existUser.id != id){
        //         throw new ValidationError(`El correo electrónico se encuentra en uso por otro usuario.`)
        //     };
        // }
        
        await validateExistData(User, updateData, ['email']);

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

export const deleteUser = async (req, res) =>{
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user){
            throw new NotFoundError('El usuario que desea eliminar, no se encuentra registrado!!');
        };

        user.active=false;
        user.save();
        user.destroy();

        res.status(200).json({
            message: 'Usuario eliminado con éxito',
            status:200
        })
    } catch (error) {
        next(error);
    }
}

export const restoreUser = async (req, res, next) =>{
    try {
        const {id} = req.params;
        
        const user = await User.findByPk(id,{paranoid:false});
        
        if(!user) throw new NotFoundError('El usuario que quiere restaurar no existe!!');

        if(user.deleteAt === null) throw new ValidationError('El usuario no ha sido eliminado');

        user.active='true';
        user.save();
        await user.restore();

        res.status(200).json({
            message:'Usuario restaurado con éxito',
            status:200,
            data: user
        })

    } catch (error) {
        next(error);
    }
}