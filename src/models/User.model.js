import {Model, DataTypes} from 'sequelize';
import { dbConfig } from '../config/db.config.js';

export class User extends Model{}

export const initUser = () => {
    User.init({
        id: { 
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty: {msg: 'El nombre no puede ser un campo vacío'},
                len: {
                    args: [2,100],
                    msg:'El nombre no puede ser menor a 2 ni mayor a 100 caracteres',
                },
                is:{
                    args: /^[a-zA-ZñÑáéíóúüÜÁÉÍÓÚ\s]+$/,
                    msg:'El nombre sólo puede contener letras del abecedario español'
                }
            }
        },
        apellido_paterno:{
            type: DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty: {msg: 'El apellido paterno no puede ser un campo vacío'},
                len: {
                    args: [2,50],
                    msg:'El apellido paterno no puede ser menor a 2 ni mayor a 50 caracteres',
                },
                isAlpha:true,
                is:{
                    args: /^[a-zA-ZñÑáéíóúüÜÁÉÍÓÚ\s]+$/,
                    msg:'El apellido paterno sólo puede contener letras del abecedario español'
                }
            }
        },
        apellido_materno:{
            type: DataTypes.STRING,            
            validate:{            
                len: {
                    args: [2,50],
                    msg:'El apellido materno no puede ser menor a 2 ni mayor a 50 caracteres',
                },
                isAlpha:true,
                is:{
                    args: /^[a-zA-ZñÑáéíóúüÜÁÉÍÓÚ\s]+$/,
                    msg:'El apellido materno sólo puede contener letras del abecedario español'
                }
            }
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique:{msg:'El correo electrónico ingresado ya se encuentra en uso'},
            validate:{
                notEmpty:{msg:'El correo no puede ser un campo vacío'},
                isEmail:{msg: 'El correo ingresado no es válido'},
            }
        },
        telefono:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:{msg:'El teléfono no puede estar vacío'},
                is:{
                    args: /^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/,
                }
            }
        },
        active:{
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },{
        sequelize: dbConfig,
        modelName: 'User',
        tableName: 'users',
        timestamps: true
    })
}