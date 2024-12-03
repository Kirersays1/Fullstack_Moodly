import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'progreso',
    timestamps: false,
    freezeTableName: true
})
class Progress extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    declare id_progreso: number;

    @Column({
        type: DataType.INTEGER
    })
    declare id_usuario: number;

    @Column({
        type: DataType.INTEGER
    })
    declare id_curso: number;

    @Column({
        type: DataType.INTEGER,
    })
    declare porcentaje_progreso: number;
}

export default Progress;
