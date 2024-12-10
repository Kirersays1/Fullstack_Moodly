import express from 'express'
import colors from 'colors'
import router  from './router'
import db from './config/db'
import cors , {CorsOptions} from 'cors'
import morgan from 'morgan'

// Conectar a base de datos
async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log( colors.blue( 'Conexión exitosa a la BD'))
    } catch (error) {
        console.log( colors.red.bold( 'Hubo un error al conectar a la BD') )
    }
}
connectDB()

// Instancia de express
const server = express()

//Permitir conexiones
const corsOptions = {
    origin: function(origin,callback) {
        if(origin==process.env.FRONTEND_URL){
            callback(null,true)
        }else{
            callback(new Error('ACCESO DENEGADO'),false)
        }
    },

}
server.use(cors(corsOptions))

//Loggin backend
server.use(morgan('dev'))

// Leer datos de formularios
server.use(express.json())

server.use('/api/', router)

export default server