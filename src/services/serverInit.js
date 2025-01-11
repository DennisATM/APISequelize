import { dbConnection } from "./dbConnection.js";


export const serverInit = async(app, port) =>{
    try {
        console.log('Verificando conexion a la base de datos');
        await dbConnection();

        app.listen(port, ()=>{
            console.log(`Servidor corriendo en el puerto: ${port} 😒`);
        })
    } catch (error) {
        console.error('No Se pudo iniciar el servidor ')       
    }
}