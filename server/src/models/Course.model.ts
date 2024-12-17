import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User from './User.model';
import Materia from './Materia.model';
import Material from './Material.model';

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

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare id_usuario: number;

    @ForeignKey(() => Materia)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare id_materia: number;

    @ForeignKey(() => Material)
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

    // Asociaciones
    @BelongsTo(() => User)
    declare usuario: User;

    @BelongsTo(() => Materia)
    declare materia: Materia;

    @BelongsTo(() => Material)
    declare materialDidactico: Material;
}

export default Course;
