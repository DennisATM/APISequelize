import { Op } from "sequelize";
import { ValidationError } from "../../errors/TypeError.js";

export const isArrayValidate = (data)=>{
    if(!Array.isArray(data))
        throw new ValidationError(
            'El dato a evaluar debe ser de tipo Array de strings'
        );
}

/**
 * Valida que el registro que se está recibiendo no exista en el campo que se está evaluando, en caso que se encuentre registrado arrojará un error de validación.
 * @param {class} Modelo - Modelo de los datos que se comunica con la DB 
 * @param {object} data - Datos a evaluar en la petición hacia la DB 
 * @param {Array<String>} fields - Campos que se desea evaluar en la clausula where 
 * @param {string} excluidID - ID en formato UUID que será excluido de la validación, por defecto será NULL
 * @throws {ValidationError} - si el valor existe arrojara un error de validación.
 */

export const validateExistData = async (Modelo, data, fields, excluidID = null) =>{
    const duplicatedFields = [];

    isArrayValidate(fields);

    for(const field of fields){
        if (data[field]){
            const whereClause = {[field]: data[field]};
            
            if(excluidID){
                whereClause.id = {[Op.ne]:excluidID};
            };

            const existData = await Modelo.findOne({where: whereClause});
            if (existData){
                duplicatedFields.push(field);
            };
        }
    }

    if(duplicatedFields.length>0){
        const fieldsString = duplicatedFields.map(field=>`"${field}"`).join(', ');
        throw new ValidationError(`Los campos ${fieldsString} ya están en uso por otro registro en "${Modelo.name}"`);
    };
}