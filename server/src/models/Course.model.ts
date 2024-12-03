import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'curso',
    timestamps: false,
    freezeTableName: true
})
class Course extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    declare id_curso: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare id_usuario: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare id_materia: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare id_material_didactico: number;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW
    })
    declare fecha_creacion: Date;
}

export default Course;
