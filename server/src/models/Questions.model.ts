import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'preguntas',
    timestamps: false,
    freezeTableName: true
})

class Questions extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    declare id_pregunta: number;

    @Column({
        type: DataType.INTEGER
    })
    declare id_examen: number;

    @Column({
        type: DataType.TEXT,
    })
    declare texto_pregunta: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare tipo_pregunta: 'opcion_multiple' | 'opcion_abierta';
}

export default Questions;
