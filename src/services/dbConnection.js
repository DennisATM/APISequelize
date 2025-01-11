import { dbConfig } from "../config/db.config.js"

export const dbConnection = async ()=>{
    try {
        await dbConfig.authenticate();
        console.log(`Logramos conectarnos a la base de Datos a traves de Sequelize 😁`);
    } catch (error) {
        console.error(`No pudimos conectarnos a la base de Datos ${error}`);
        process.exit();
    }
}