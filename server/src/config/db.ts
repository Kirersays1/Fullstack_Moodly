import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'
dotenv.config()

const db = new Sequelize("postgresql://moddly_api_user:hPEn6mkKozaijkrznoJ4T5HmC9OEd3Mp@dpg-ct2fngtsvqrc73ai1f3g-a.oregon-postgres.render.com/moddly_api?ssl=true",
    {
    models: [__dirname + '/../models/**/*.ts']
})

export default db