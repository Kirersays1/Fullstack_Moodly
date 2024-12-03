import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'materia',
    timestamps: false,
    freezeTableName: true
})

class Materia extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    declare id_materia: number;

    @Column({
        type: DataType.STRING,
    })
    declare titulo: string;

    @Column({
        type: DataType.TEXT,
    })
    declare descripcion: string;
}

export default Materia;
