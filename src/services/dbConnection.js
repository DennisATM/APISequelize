import { dbConfig } from "../config/db.config.js"
import { initUser } from "../models/user.model.js";

export const dbConnection = async ()=>{
    try {
        await dbConfig.authenticate();

        initUser();
        await dbConfig.sync({alter:true});

        console.log(`Logramos conectarnos a la base de Datos a traves de Sequelize 😁`);
    } catch (error) {
        console.error(`No pudimos conectarnos a la base de Datos ${error}`);
        process.exit();
    }
}