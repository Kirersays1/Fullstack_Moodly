import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'usuario',
    timestamps: false, // Desactiva createdAt y updatedAt
    freezeTableName: true, // Usa el nombre definido sin pluralizar
})
class User extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true, // Define esta columna como clave primaria
        autoIncrement: true // Habilita el autoincremento
    })
    declare id_usuario: number; // Renombramos la columna id a id_usuario

    @Column({
        type: DataType.STRING
    })
    declare nombre: string;

    @Column({
        type: DataType.STRING(100)
    })
    declare email: string;

    @Column({
        type: DataType.STRING(100)
    })
    declare password: string;

    @Column({
        type: DataType.STRING(100)
    })
    declare rol: string;
}

export default User;
